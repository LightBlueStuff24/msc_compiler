import Log from "../utilities/Log";
import { checkProperties, isType, getArrayType } from "../utilities/Utils";
import type { ObjectStruct } from "../utilities/typedef";

export namespace Parser {

  export function ParseObject(cv: any, mobj: any, parsedComponentData: any, object: ObjectStruct): void {
    const cvLen = Object.keys(cv).length;
    const mobjProperties = mobj.properties;
    const unknownProperties = checkProperties(cv, mobjProperties.map(obj => obj.name));
    if (unknownProperties.length > 0) {
      Log.error(`<${object.name}> contains unknown properties: ${unknownProperties.join(', ')}`);
    }
    if (mobjProperties.length > cvLen) {
      Log.error(`Mismatch in properties for <${object.name}>`);
      return;
    }
    mobjProperties.forEach((property: ObjectStruct) => {
      const propertyValue = cv[property.alias];
      if (propertyValue) {
        if (typeof propertyValue !== property.type) {
          if (property.type === 'array' && Array.isArray(propertyValue)) {
            Parser.ParseArray(propertyValue, property, parsedComponentData[mobj.name][property.name], object);
          } else {
            Log.error(`<${object.name}> expected ${property.alias} to be type ${property.type}`);
            return;
          }
        }
        else {
          if (property.type === 'object') {
            Parser.ParseObject(propertyValue, property, parsedComponentData[mobj.name][property.name], object);
          }
          parsedComponentData[mobj.name][property.name] = propertyValue;
        }

      } else {
        parsedComponentData[mobj.name][property.name] = property.default;
      }
    });
  }

  export function ParseArray(cv: any[], mobj: any, parsedComponentData: any, object: ObjectStruct): void {
    if (!Array.isArray(cv)) {
      Log.error(`<${object.name}> expected array for value of ${mobj.name}`);
      return;
    }
    if (mobj.items.maxItems !== undefined && (cv.length < mobj.items.maxItems || cv.length > mobj.items.maxItems)) {
      Log.error(`<${object.name}> expected array length of ${mobj.items.maxItems}, instead got ${cv.length}`);
      return;
    }
    if (!isType(cv, mobj.items.type)) {
      Log.error(`<${object.name}> expected array elements to be type ${mobj.items.type}[], instead got ${getArrayType(cv)}[]`);
      return;
    }
    parsedComponentData[mobj.name] = cv;
  }


  export function ParseValues(num, mobj, object, parsedComponentData: any) {
  }
}
