import Log from "../utilities/Log";
import { checkProperties } from "../utilities/Utils";
import type { ObjectStruct } from "../utilities/typedef";


function isType(a: any[], type: string) {
  return Array.isArray(a) && a.every(element => typeof element === type);
}

function getArrayType(arr: any[]): string {
  const types: { [key: string]: number; } = {};
  arr.forEach(element => {
    const elementType = typeof element;
    types[elementType] = (types[elementType] || 0) + 1;
  });

  let maxCount = 0;
  let mostCommonType = '';
  for (const type in types) {
    if (types[type] > maxCount) {
      maxCount = types[type];
      mostCommonType = type;
    }
  }

  return mostCommonType;
}

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
      if (typeof propertyValue !== property.type && !Array.isArray(propertyValue)) {
        Log.error(`<${object.name}> expected ${property.alias} to be type ${property.type}`);
        return;
      }
      parsedComponentData[mobj.name][property.name] = propertyValue;
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

export function ParseValues(num,mobj,object,parsedComponentData: any) {

}