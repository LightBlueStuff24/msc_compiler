import Log from "../../utilities/Log";
import { ComponentInfo, ObjectStruct, SchemaParserFunction } from "../../types";
import { FetchSchemas } from "./SchemaFetcher";
import { IsNumericType, GetNumericType, TraverseRef } from "../../utilities/SchemaUtils";

export namespace SchemaTypeParser {
  export function ParseObject(
    componentInfo: ComponentInfo,
    schema: ObjectStruct,
    component: ObjectStruct,
    parsedSchemaData: ObjectStruct
  ) {
    if (component.additionalProperties === false) {
        
    }
  }

  export function ParseArray(
    componentInfo: ComponentInfo,
    schema: ObjectStruct,
    component: ObjectStruct,
    parsedSchemaData: ObjectStruct
  ) {
    let items = component.items;
    if (items.hasOwnProperty("$ref")) {
      items = TraverseRef(schema, items.$ref);
    }

    const type: string = IsNumericType(items)
      ? GetNumericType(items)
      : IsNumericType(items[1])
      ? GetNumericType(items[1])
      : items[1]?.type;

    parsedSchemaData[componentInfo.name].push({
      name: componentInfo.id,
      type,
    });

    const parserFunction = GetParserFunction(type);
    if (parserFunction)
      parserFunction(componentInfo, schema, items, parsedSchemaData);
  }

  export function ParseNums(
    componentInfo: ComponentInfo,
    component: ObjectStruct,
    parsedSchemaData: ObjectStruct
  ) {
    const type: string = GetNumericType(component);
    parsedSchemaData[componentInfo.name].push({
      name: componentInfo.id,
      type,
      default: component?.default,
    });
  }
}

async function FetchAndParseSchemas() {
  const schemas = await FetchSchemas();
  for (const [schemaName, schema] of Object.entries(schemas!)) {
    Log.info(`Parsing ${schemaName}`);
    const parsedSchemaData: ObjectStruct<string, ObjectStruct[]> = {};
    let components: ObjectStruct | undefined;

    switch (schemaName) {
      case "blocks":
        components = schema.B_components_ref.properties;
        break;
      case "entities":
        try {
          components = TraverseRef(
            schema,
            schema.B.properties.components.$ref
          )?.properties;
        } catch (e) {
          Log.error(`Failed to parse ${schemaName}: ${e.message}`);
        }
        break;
      case "entity":
        components = schema.A.properties["minecraft:client_entity"].properties;
        break;
      default:
        components = schema.B?.components?.properties;
        break;
    }

    if (!components) continue;

    for (const [componentId, componentRef] of Object.entries(components)) {
      const component = TraverseRef(schema, componentRef.$ref);
      if (!component) continue;

      const componentName = component.title.trim();
      parsedSchemaData[componentName] = [];

      const componentInfo: ComponentInfo = {
        id: componentId,
        name: componentName,
      };

      if (component.hasOwnProperty("oneOf")) {
        component.oneOf.forEach((obj: ObjectStruct) => {
          if (obj.type === "boolean" || obj.type === "string") {
            parsedSchemaData[componentName].push({
              name: componentId,
              type: obj.type,
              default: obj?.default,
            });
          } else {
            const parserFunction = GetParserFunction(obj.type);
            if (parserFunction)
              parserFunction(
                componentInfo,
                component,
                parsedSchemaData,
                schema
              );
          }
        });
      } else {
        if (component.type === "boolean" || component.type === "string") {
          parsedSchemaData[componentName].push({
            name: componentId,
            type: component.type,
            default: component?.default,
          });
        } else {
          const parserFunction = GetParserFunction(component.type);
          if (parserFunction)
            parserFunction(
              componentInfo,
              component,
              parsedSchemaData,
              schema
            );
        }
      }
    }
  }
}

function GetParserFunction(type: string): SchemaParserFunction | undefined {
  switch (type) {
    case "object":
      return (componentInfo, component, parsedSchemaData, schema) =>
        SchemaTypeParser.ParseObject(
          componentInfo,
          schema!,
          component,
          parsedSchemaData
        );
    case "array":
      return (componentInfo, component, parsedSchemaData, schema) =>
        SchemaTypeParser.ParseArray(
          componentInfo,
          schema!,
          component,
          parsedSchemaData
        );
    case "boolean":
    case "integer":
    case "float":
    case "number":
      return SchemaTypeParser.ParseNums;
    default:
      return undefined;
  }
}

