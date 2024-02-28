import Log from '../utilities/Log';
import type { ObjectStruct } from '../utilities/typedef.ts';

async function ParseData(object: any, cd: string, cv: any, type: string): Promise<void> {
  if (cd === 'Namespace') {
    if (typeof cv !== "string") return Log.error(`<Namespace> type string expected instead found ${typeof cv}`);
    else object.Data['minecraft:block'].description.Identifier = `${cv}:${object.name.toLowerCase()}`;
  }
  if (cd === 'Version') {
    if (!Array.isArray(cv)) return Log.error(`<Version> type array expected instead found ${typeof cv}`);
    if (cv.length !== 3) return Log.error(`<Version> array length should be 3. [number, number, number]`);
    object.Data.format_version = `${cv[0]}.${cv[1]}.${cv[2]}`;
  }
  if (cd === 'Identifier') {
    if (typeof cv !== "string") return Log.error(`<Identifier> type string expected instead found ${typeof cv}`);
    else {
      let identifier: string = object.Data[`minecraft:${type.toLowerCase()}`].description.identifier;
      const parts: string[] = identifier.split(':');
      parts[1] = cv.toLowerCase();
      object.Data[`minecraft:${type.toLowerCase()}`].description.identifier = parts.join(':');
    }
  }
}

export async function ParseComponent(object: ObjectStruct, type: string): Promise<ObjectStruct | void> {
  let parsedComponentData: ObjectStruct = {};
  let component: any;
  if (type === 'block') component = require('./components/block.json');
  if (type === 'item') component = require('./components/item.json');
  if (type === 'entity') component = require('./components/entity.json');
  if (type === 'recipe') component = require('./components/recipe.json');

  // Looping through What's in my block class
  for (const [cd, cv] of Object.entries(object)) {
    // skipping these methods/variables
    if (['reset', 'init', 'Data', 'Component'].includes(cd)) continue;
    if (cd === 'Namespace' || cd === 'Version' || cd === 'Identifier') await ParseData(object, cd, cv, type);

    // This gets checks if componentList has that component
    if (!component[cd]) return Log.error(`<${object.name}> unknown component ${cd}`);
    // Getting the array length of cd
    const cdLen: number = cv.length;
    // looping through the array
    for (let i = 0; i < cdLen; i++) {
      // [i] : {}
      const mobj: any = cv[i];
      if (typeof cv === mobj.type) {
        // Your logic for typeof cv === mobj.type
      } else if (mobj.type === "array") {
        if (!(mobj.maxItem <= cv.length)) return Log.error(``);
      }
    }
  }

  return parsedComponentData;
}
