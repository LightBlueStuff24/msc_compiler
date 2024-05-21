import { ObjectStruct } from "../types";
import Log from "./Log";
import { isInt } from "./Utils";

function IsNumericType(type: string): boolean {
    return (
      type === "integer" || type === "number"
    );
  };
  
  function GetNumericType(component: ObjectStruct): string {
    if (IsNumericType(component.type)) {
      return "int";
    } else {
      return !isInt(component?.default) ? "float" : "int";
    }
  }


function TraverseRef(
  object: ObjectStruct,
  ref: string
): ObjectStruct | undefined {
  const key = ref.split("/").pop() as string;
  const refValue = object[key];
  if (refValue) return refValue;
  Log.error(`Failed to traverse ref ${ref}`);
  return undefined;
}

export {
  TraverseRef,
  GetNumericType,
  IsNumericType
}