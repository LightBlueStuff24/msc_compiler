import Log from "../utilities/Log";
import { checkProperties, isType, getArrayType } from "../utilities/Utils";
import type { ObjectStruct } from "../utilities/typedef";

export namespace TypeParser {

  export function ParseObject(cv: any, mobj: any, parsedComponentData: any, object: ObjectStruct): void {
    const cvLen = Object.keys(cv).length;
    const mobjProperties = mobj.properties;
    const mobjPropertyNames = mobjProperties.map(obj => obj.name);
    const unknownProperties = checkProperties(cv, mobjPropertyNames);
    if (unknownProperties.length > 0) {
      Log.error(`<${object.name}> contains unknown properties: ${unknownProperties.join(', ')}`);
    }
    if (mobjProperties.length > cvLen) {
      Log.error(`Mismatch in properties for <${object.name}>`);
      return;
    }
    mobjProperties.forEach((property: ObjectStruct) => {
      const { type, alias, name, default: defaultValue } = property;
      const propertyValue = cv[alias];
      if (propertyValue !== undefined) {
        if (typeof propertyValue !== type) {
          if (type === 'array' && Array.isArray(propertyValue)) {
            TypeParser.ParseArray(propertyValue, property, parsedComponentData[mobj.name][name], object);
          } else {
            Log.error(`<${object.name}> expected ${alias} to be type ${type}`);
          }
          return;
        }

        if (type === 'object') {
          TypeParser.ParseObject(propertyValue, property, parsedComponentData[mobj.name][name], object);
        }

        parsedComponentData[mobj.name][name] = propertyValue;
      } else {
        if (defaultValue === undefined) {
          Log.error(`<${object.name}> expected ${alias} to have a value with the type ${type}`);
          return;
        }
        parsedComponentData[mobj.name][name] = defaultValue;
      }
    });
  }

  export function ParseArray(cv: any[], mobj: any, parsedComponentData: any, object: ObjectStruct): void {
    const { maxItems, type, name } = mobj.items;
    if (!Array.isArray(cv)) {
      Log.error(`<${object.name}> expected array for value of ${name}`);
      return;
    }
    if (maxItems !== undefined && (cv.length < maxItems || cv.length > maxItems)) {
      Log.error(`<${object.name}> expected array length of ${maxItems}, instead got ${cv.length}`);
      return;
    }
    if (!isType(cv, type)) {
      Log.error(`<${object.name}> expected array elements to be type ${type}[], instead got ${getArrayType(cv)}[]`);
      return;
    } else {
      switch (type) {
        case 'object':
          cv.map(element => {
            TypeParser.ParseObject(element, mobj.items, parsedComponentData, object);
          });
          break;

        case 'array':
          TypeParser.ParseArray(cv, mobj.items.items, parsedComponentData, object);
          break;

        default:
          parsedComponentData[mobj.name] = cv;
          break;
      }
    }
  }


  export function ParseValues(num, mobj, object, parsedComponentData: any) {
  }
}
