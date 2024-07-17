import { type IItemData, IItemComponents } from "../../interfaces/IItem";
import { ParseComponent } from "../../contents/ComponentParser";
import { ItemRegistry } from "../../Registries";
import { getExtendedClass } from "@utils";
import { MenuGroups, MenuCategories } from "../../enums";
import type { int } from "../../../shared/types";



export class Item extends IItemComponents {
  /**
     * Namespace of the item
     */
  public static Namespace: string;

  /**
   * Format Version of the item
   */
  public static Version: int[];

  /**
  * Identifier of the item
  */
  public static Identifier: string;

  /**
   * Indicates whether the item is hidden in commands.
   */
  public static IsHiddenInCommands: boolean;

  /**
   * Group of the item.
   */
  public static Group: MenuGroups;

  /**
   * Category of the item.
   */
  public static Category: MenuCategories;

  private static Data: IItemData = {
    format_version: config.project.version,
    "minecraft:item": {
      description: { identifier: "" },
      components: {},
    },
  };

  public static async init() {
    this.Data["minecraft:item"].description.identifier = `${config.project.prefix
      }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    await this.ParseComponents();
    return JSON.stringify(this.Data)
    
  }


  private static async  ParseComponents(){
    const extendedClass = getExtendedClass(this)
    let newExtendedObject;
    if (extendedClass) newExtendedObject = xtend(this, ItemRegistry.Get(extendedClass));
    const parsedComponentData = await ParseComponent(newExtendedObject ?? this, "block");
    if (parsedComponentData) {
      this.Data["minecraft:item"].components = parsedComponentData;
    }
  }
}
