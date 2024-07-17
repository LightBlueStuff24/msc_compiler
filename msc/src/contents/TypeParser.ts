import Log, {
  Emsg,
  isType,
  getArrayType,
  isInt,
  isAlpha,
  isFloat,
} from "@utils";
import type { ObjectStruct } from "../../shared/types";

export namespace TypeParser {
  export function ParseObject(
    cv: any,
    mobj: any,
    parsedComponentData: any,
    object: ObjectStruct
  ): void {
    const mobjProperties = mobj.properties;
    mobjProperties.forEach((property: ObjectStruct) => {
      const { type, name, default: defaultValue, alias } = property;
      if (name.startsWith("$")) {
        Object.entries(cv).forEach(([k, v]) => {
          validateKey(k, alias);
          
        });
      }
      const propertyValue = cv[alias];
      if (propertyValue !== undefined) {
        if (type === "boolean") {
          parsedComponentData[mobj.name][name] = propertyValue;
          return;
        }
        const parser = getParser(type);
        if (parser) {
          if (type === "array" || type === "object") {
            parser(
              propertyValue,
              property,
              parsedComponentData[mobj.name][name],
              object
            );
          } else {
            // @ts-ignore
            parsedComponentData[mobj.name][name] = parser(
              propertyValue,
              property,
              object
            );
          }
        } else {
          Log.error(`<${object.name}> expected ${alias} to be type ${type}`);
          return;
        }
      } else {
        if (defaultValue === undefined) {
          Log.error(
            `<${object.name}> expected ${alias} to have a value with the type ${type}`
          );
          return;
        }
        parsedComponentData[mobj.name][name] = defaultValue;
      }
    });
  }

  export function ParseArray(
    cv: any[],
    mobj: any,
    parsedComponentData: any,
    object: ObjectStruct
  ): void {
    const { maxItems, type, name, items } = mobj.items;
    if (!Array.isArray(cv)) {
      Log.error(`<${object.name}> expected array for value of ${name}`);
      return;
    }
    if (maxItems && cv.length >= maxItems) {
      Log.error(
        `<${object.name}> expected max array length of ${maxItems}, instead got ${cv.length}`
      );
      return;
    }
    if (!isType(cv, type)) {
      Log.error(
        `<${
          object.name
        }> expected array elements to be type ${type}[], instead got ${getArrayType(
          cv
        )}[]`
      );
      return;
    } else {
      switch (type) {
        case "object":
          cv.forEach((element) =>
            TypeParser.ParseObject(
              element,
              mobj.items,
              parsedComponentData,
              object
            )
          );
          break;

        case "array":
          TypeParser.ParseArray(cv, items, parsedComponentData, object);
          break;

        case "int":
        case "float":
          cv.forEach((element, index) => {
            const parsedValue = TypeParser.ParseNums(element, { type }, object);
            parsedComponentData[name][index] = parsedValue;
          });
          break;

        default:
          Log.error(`<${object.name}> unsupported array type: ${type}`);
          return;
      }
    }
  }

  export function ParseNums(
    cv: number,
    mobj: any,
    object: any
  ): number | undefined {
    const { type } = mobj;
    switch (type) {
      case "int":
        if (!isInt(cv)) {
          Log.warn(
            `<${object.name}> expected value to be type ${type}, instead got float`
          );
          // Convert float to int
          return Math.round(cv);
        }
        return cv;
      case "float":
        if (!isFloat(cv)) {
          Log.warn(
            `<${object.name}> expected value to be type ${type}, instead got int`
          );
          // Convert int to float
          return parseFloat((cv as number).toFixed(10));
        }
        return cv;
      default:
        Log.error(`<${object.name}> unsupported numeric type: ${type}`);
        return;
    }
  }
}

function validateKey(key: string, alias: string) {
  if (alias.startsWith("$UPPER_CASE") && !isAlpha(key)) {
    Log.warn(`<${alias}> expects key ${key} to match $UPPER_CASE(${key})`);
  } else if (alias.startsWith("$LOWER_CASE") && isAlpha(key)) {
    Log.warn(`<${alias}> expects key ${key} to match $LOWER_CASE(${key})`);
  }
}

function getParser(type: string) {
  switch (type) {
    case "object":
      return TypeParser.ParseObject;
    case "array":
      return TypeParser.ParseArray;
    case "int":
    case "float":
      return TypeParser.ParseNums;
    default:
      return undefined;
  }
}
