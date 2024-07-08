export namespace Emsg {
  export function missingItem(name: string) {
    return `<${name}> using default value...`;
  }
  export function typeError(item: any, etype: string) {
    // TODO: get the item (key) as String
    return `<${item}> type ${etype} expected, instead found ${typeof item}`;
  }
  export function pathError(name: string) {
    return `<${name}> Path not found!`;
  }
}