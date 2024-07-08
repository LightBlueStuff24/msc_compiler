import { ObjectStruct } from "../../types";
import Log from "../Log";
import { isInt } from "../Utils";


function resolveType(component: ObjectStruct): string {
  if (component && (component.type === "integer" || component.type === "number")) {
    return component.type === "integer" ? "int" : isInt(component?.default) ? "int" : "float";
  }
  return component.type;
}

function traverseRef(object: ObjectStruct, ref: string): ObjectStruct | undefined {
  const key = ref.split("/").pop()!
  const refValue = object[key];
  if (refValue) return refValue;
  Log.error(`Failed to traverse ref ${ref}`);
  return undefined;
}

export { traverseRef, resolveType };
