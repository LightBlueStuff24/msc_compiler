import type { int } from "../../../shared/types";
import type { Item } from "./Item";

export class Enchant {
  public static Name: string;
  public static MaxLevel: int;
  public static Item: typeof Item;
}
