import { BlockVolume, world } from "@minecraft/server";
import { int } from "../../utilities/typedef";
import { Item } from "./Item";

class MyEnchantBookItem extends Item {
  public static Glint: boolean = true;
}
export class Enchant {
  public static Name: string;
  public static MaxLevel: int;
  public static Item: typeof Item;
}
