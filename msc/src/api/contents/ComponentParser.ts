import Log, { ErrorMessage, isType } from "@utils";
import { TypeParser } from "./TypeParser";

async function ParseData(
  object: any,
  cd: string,
  cv: any,
  type: string
): Promise<void> {
  switch (cd) {
    case "Namespace":
      if (typeof cv !== "string") {
        Log.error(ErrorMessage.typeError(cd, "string"));
        return;
      }
      object.Data[
        `minecraft:${type}`
      ].description.identifier = `${cv}:${object.name.toLowerCase()}`;
      break;
    case "Version":
      if (!Array.isArray(cv) || cv.length !== 3) {
        Log.error(
          `<Version> type array with length 3 expected instead found ${typeof cv}`
        );
        return;
      }
      object.Data.format_version = cv.join(".");
      break;
    case "Identifier":
      if (typeof cv !== "string") {
        Log.error(ErrorMessage.typeError(cv, "string"));
        return;
      }
      const identifier: string =
        object.Data[`minecraft:${type}`].description.identifier;
      const parts: string[] = identifier.split(":");
      parts[1] = cv.toLowerCase();
      object.Data[`minecraft:${type}`].description.identifier = parts.join(":");
      break;

    case "IsHiddenInCommands":
      if (typeof cv != "boolean") {
        Log.error(ErrorMessage.typeError(cv, "boolean"));
        return;
      }
      break;

    case "Group":
      break;

    case "Category":
      break;

    case "Permutations":
      if (type != "block") {
        Log.error(`Type ${type} does not support Permutations`);
        return;
      }
      if (!isType(cv, "object")) {
        Log.error(ErrorMessage.typeError(cv, "object"));
        return
      }
      for (const permutation of cv) {
        const components = await Promise.all(
          permutation.Components.map((component) =>
            ParseComponent(component, "block")
          )
        );
        object.Data["minecraft:block"].permutations[permutation.Condition] = {
          components: Object.assign({}, ...components),
        };
      }
      break;
    default:
      Log.error(`Unknown component data type: ${cd}`);
      break;
  }
}

async function ParseComponent(
  object: Record<string,any>,
  type: string
): Promise<Record<string,any> | undefined> {
  if (!["block", "item", "entity", "recipe"].includes(type)){
    Log.error(`Unknown component type: ${type}`);
    return;
  }

  const parsedComponentData: any = {};
  const component = await import(`./components/${type}.json`);
  
  for (const [cd, cv] of Object.entries(object)) {
    if (["reset", "init", "Data", "Component"].includes(cd)) continue;
    if (
      [
        "Namespace",
        "Version",
        "Identifier",
        "IsHiddenInCommands",
        "Group",
        "Category",
        "Permutations",
        "Events",
      ].includes(cd)
    ) {
      await ParseData(object, cd, cv, type).catch((error) => {
        Log.error(`Error parsing ${cd}: ${error.message}`);
      });
    }
    const compInfo: any[] = component[cd];
    if (!compInfo) continue;
    const cdLen = compInfo.length;
    for (let i = 0; i < cdLen; i++) {
      const mobj: any = compInfo[i];
      const { type } = mobj;
      if (typeof cv != type) {
        if (mobj.type === "array" && Array.isArray(cv)) {
          TypeParser.ParseArray(cv, mobj, parsedComponentData, object);
        } else {
          // If their are more variations of this component and it isn't the last variation then continue to the next variation
          if (cdLen > 1 && compInfo.indexOf(mobj) != cdLen - 1) continue;
          Log.error(
            `<${object.name}> expected value of ${cd} to be type ${type}`
          );
          return;
        }
      } else {
        if (type === "object") {
          TypeParser.ParseObject(cv, mobj, parsedComponentData, object);
        }
        // Handle numbers
        // TypeParser.ParseValues(cv,mobj,object,parsedComponentData)
        if (typeof cv === "number") {
          parsedComponentData[mobj.name] = TypeParser.ParseNums(
            cv,
            mobj,
            object
          );
        }
      }

      // TODO: Allow enable and disable by config
      if (mobj.default !== undefined && !parsedComponentData[mobj.name]) {
        parsedComponentData[mobj.name] = mobj.default;
        Log.warn(`<${object.name}> using default value for ${mobj.name}`);
      }
    }
  }
  return parsedComponentData;
}

export { ParseComponent };

