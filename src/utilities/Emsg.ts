export default class Emsg {
  public static missingItem(name)
  {
    return `<${name}> using default value...`;
  }
  public static typeError(item, etype)
  {
    // TODO: get the item (key) as String
    return `<${item}> type ${etype} expected instead found ${typeof item}`;
  }
  public static pathError(name)
  {
    return `<${name}> Path not found!`;
  }
}