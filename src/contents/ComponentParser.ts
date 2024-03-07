import Log from '../utilities/Log';
import type { ObjectStruct } from '../utilities/typedef';
import { ParseObject, ParseArray } from './TypeParser';

async function ParseData(object: any, cd: string, cv: any, type: string): Promise<void> {
  switch (cd) {
    case 'Namespace':
      if (typeof cv !== "string") {
        Log.error(`<Namespace> type string expected instead found ${typeof cv}`);
        return;
      }
      object.Data['minecraft:block'].description.Identifier = `${cv}:${object.name.toLowerCase()}`;
      break;
    case 'Version':
      if (!Array.isArray(cv) || cv.length !== 3) {
        Log.error(`<Version> type array with length 3 expected instead found ${typeof cv}`);
        return;
      }
      object.Data.format_version = cv.join('.');
      break;
    case 'Identifier':
      if (typeof cv !== "string") {
        Log.error(`<Identifier> type string expected instead found ${typeof cv}`);
        return;
      }
      const identifier: string = object.Data[`minecraft:${type.toLowerCase()}`].description.identifier;
      const parts: string[] = identifier.split(':');
      parts[1] = cv.toLowerCase();
      object.Data[`minecraft:${type.toLowerCase()}`].description.identifier = parts.join(':');
      break;
    default:
      Log.error(`Unknown component data type: ${cd}`);
      break;
  }
}

async function ParseComponent(object: ObjectStruct, type: string): Promise<ObjectStruct<string, ObjectStruct> | void> {
  let parsedComponentData: any = {};
  let component: any;
  if (['block', 'item', 'entity', 'recipe'].includes(type)) {
    component = await import(`./components/${type}.json`);
  } else {
    Log.error(`Unknown component type: ${type}`);
    return;
  }

  for (const [cd, cv] of Object.entries(object)) {
    if (['reset', 'init', 'Data', 'Component'].includes(cd)) continue;
    if (['Namespace', 'Version', 'Identifier'].includes(cd)) {
      await ParseData(object, cd, cv, type).catch((error) => {
        Log.error(`Error parsing ${cd}: ${error.message}`);
      });
    }
    const compInfo = component[cd];
    if (!compInfo) {
      Log.error(`<${object.name}> unknown component ${cd}`);
      continue;
    }
    const cdLen: number = compInfo.length;
    for (let i = 0; i < cdLen; i++) {
      const mobj: any = compInfo[i];
      if (typeof cv === mobj.type) {
        if (mobj.type === "object") {
          ParseObject(cv, mobj, parsedComponentData, object);
        } else if (mobj.type === "array") {
          ParseArray(cv, mobj, parsedComponentData, object);
        }
        // Handle numbers or bools
        // ParseValues(cv,mobj,parsedComponentData,)
        parsedComponentData[mobj.name] = cv;
      }
      if (mobj.default !== undefined && !parsedComponentData[mobj.name]) {
        parsedComponentData[mobj.name] = mobj.default;
        Log.warn(`<${object.name}> using default value for ${mobj.name}`);
      }
    }
  }
  return parsedComponentData;
}

export { ParseComponent };
