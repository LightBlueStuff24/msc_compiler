import { IItemData, IItemComponents } from "../interfaces/IItem";
import { ParseComponent } from "../contents/ComponentParser";
import config from "../../../../config";
import { Block, ItemStack, Player } from "@minecraft/server";

export class Item extends IItemComponents {
  private static Data: IItemData = {
    format_version: config.version,
    "minecraft:item": {
      description: { identifier: "" },
      components: {},
    },
  };

  public static async init() {
    this.Data["minecraft:item"].description.identifier = `${
      config.prefix
    }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this, "item");
    if (parsedComponentData) {
      this.Data["minecraft:item"].components = parsedComponentData;
    }
    if (this.hasOwnProperty("onRightClick")) {
    }
    return JSON.stringify(this.Data);
  }

  public static onRightClick(
    player: Player,
    itemStack: ItemStack,
    block: Block
  ) {
    
  }
}
