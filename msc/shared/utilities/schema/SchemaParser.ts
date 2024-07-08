import type { ObjectStruct } from "../../types";
import { FetchSchemas } from "./SchemaFetcher";
import Log from "../Log";
import { toAlpha } from "../Utils";
import { traverseRef, resolveType } from "./SchemaUtils";
import { deleteTag } from "isomorphic-git";

namespace SchemaTypeParser {
  export function ParseObject(
    componentInfo: ComponentInfo,
    schema: ObjectStruct,
    unParsedComponent: ObjectStruct
  ) {
    const parsedComponentObject: {
      name: string;
      type: string;
      properties: any[];
    } = {
      name: componentInfo.id,
      type: "object",
      properties: [],
    };
    if (!unParsedComponent.additionalProperties) {
      Object.entries(unParsedComponent.properties).forEach(
        ([propName, propValue]: [string, any]) => {
          if (propValue.hasOwnProperty("$ref"))
            propValue = traverseRef(schema, propValue.$ref);
          const parserResult = getParserFunction(propValue.type)(
            { name: toAlpha(propName), id: propName },
            propValue,
            schema
          );
          parsedComponentObject.properties.push({
            name: propName,
            alias: toAlpha(propName),
            ...parserResult,
          });
        }
      );
    }
    return parsedComponentObject;
  }

  export function ParseArray(
    componentInfo: ComponentInfo,
    schema: ObjectStruct,
    unParsedComponent: ObjectStruct
  ) {
    let items = unParsedComponent.items;
    if (items.hasOwnProperty("$ref")) items = traverseRef(schema, items.$ref);
    const parsedComponentObject = {
      name: componentInfo.id,
      type: "array",
      items: {},
    };

    let type = resolveType(items);
    if (Array.isArray(items)) {
      type = resolveType(items[0]);
      parsedComponentObject.items["maxItems"] =
        unParsedComponent.maxItems ?? items.length;
      items = items[0];
    }
    const parserResult = getParserFunction(type)(componentInfo, items, schema);
    // Remove unwanted properties
    delete parserResult.name;
    delete parserResult.default;

    Object.assign(parsedComponentObject.items, {
      type: type,
      ...parserResult,
    });
    return parsedComponentObject;
  }

  export function ParseValues(
    componentInfo: ComponentInfo,
    unParsedComponent: ObjectStruct
  ) {
    return {
      name: componentInfo.id,
      type: resolveType(unParsedComponent),
      default: unParsedComponent?.default,
    };
  }
}

export async function FetchAndParseSchemas() {
  const schemas = (await FetchSchemas()) as ObjectStruct;
  for (const [schemaName, schema] of Object.entries(schemas!)) {
    Log.info(`Parsing ${schemaName}`);
    const parsedSchemaData: ObjectStruct<string, ObjectStruct[]> = {};
    let components: ObjectStruct | undefined;
    try {
      switch (schemaName) {
        case "blocks":
          components = schema.B_components_ref.properties;
          break;
        case "entities":
          components = traverseRef(
            schema,
            schema.B.properties.components.$ref
          )?.properties;
          break;
        case "entity":
          components =
            schema.A.properties["minecraft:client_entity"].properties;
          break;

          case "entity":
          components =
            schema.E.properties["minecraft:client_entity"].properties.description.properties;
          break;
        default:
          components = schema.B?.components?.properties;
          break;
      }
    } catch (e) {
      Log.error(`Failed to parse ${schemaName}: ${e.message}`);
    }

    if (!components) continue;
    for (const [componentId, component] of Object.entries(components)) {
      let unParsedComponent = component;
      // Make this more smarter in determining whether to traverseRef
      if (unParsedComponent.hasOwnProperty('$ref')) unParsedComponent = traverseRef(schema, component.$ref);
      if (!unParsedComponent) continue;
      const componentName: string = toAlpha(unParsedComponent.title);
      parsedSchemaData[componentName] = [];
      const componentInfo: ComponentInfo = {
        id: componentId,
        name: componentName,
      };

      if (unParsedComponent.hasOwnProperty("oneOf")) {
        unParsedComponent.oneOf.forEach((obj: ObjectStruct) => {
          if (obj.hasOwnProperty("$ref")) obj = traverseRef(schema, obj.$ref)!;
          const parserResult = getParserFunction(obj.type)(
            componentInfo,
            obj,
            schema
          );
          parsedSchemaData[componentName].push(parserResult);
        });
      } else {
        const parserResult = getParserFunction(unParsedComponent.type)(
          componentInfo,
          unParsedComponent,
          schema
        );
        parsedSchemaData[componentName].push(parserResult);
      }
    }
  }
}

function getParserFunction(type: string): SchemaParserFunction {
  switch (type) {
    case "object":
      return (componentInfo, unParsedComponent, schema) =>
        SchemaTypeParser.ParseObject(componentInfo, schema!, unParsedComponent);
    case "array":
      return (componentInfo, unParsedComponent, schema) =>
        SchemaTypeParser.ParseArray(componentInfo, schema!, unParsedComponent);

    default:
      return SchemaTypeParser.ParseValues;
  }
}

interface ComponentInfo {
  /**
   * Id is the minecraft id of this unParsedComponent
   */
  id: string;
  /**
   * Name is the pascal version of the id
   */
  name: string;
}

type SchemaParserFunction = (
  componentInfo: ComponentInfo,
  unParsedComponent: ObjectStruct,
  schema?: ObjectStruct,
  ...args: any[]
) => ObjectStruct;
