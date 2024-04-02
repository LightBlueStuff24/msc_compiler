export default class Emsg {
  public static missingItem(name: string) {
    return `<${name}> using default value...`;
  }
  public static typeError(item: any, etype: string) {
    // TODO: get the item (key) as String
    return `<${item}> type ${etype} expected instead found ${typeof item}`;
  }
  public static pathError(name: string) {
    return `<${name}> Path not found!`;
  }
}