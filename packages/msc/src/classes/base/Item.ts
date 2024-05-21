import { IItemData, IItemComponents } from "../../interfaces/IItem";
import { ParseComponent } from "../../contents/ComponentParser";
import { Block, ItemStack, Player } from "@minecraft/server";
import { BuildAsComponent } from "../../decorators";
import { ObjectStruct } from "../../utilities/typedef";

export class Item extends IItemComponents {
  /** Internal Property */
  private static MethodMap: ObjectStruct = {};
  private static Data: IItemData = {
    format_version: config.project.version,
    "minecraft:item": {
      description: { identifier: "" },
      components: {},
    },
  };

  public static async init() {
    this.Data["minecraft:item"].description.identifier = `${
      config.project.prefix
    }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this, "item");
    if (parsedComponentData) {
      this.Data["minecraft:item"].components = parsedComponentData;
    }
    // Build MethodMap
    const methods = Object.getOwnPropertyNames(this);
    for (const methodName of methods) {
      if (
        !(
          ["constructor", "init"].includes(methodName) &&
          this.MethodMap.hasOwnProperty(methodName)
        ) &&
        typeof this[methodName] === "function"
      ) {
        this.MethodMap[methodName] = {
          callback: this[methodName],
          type: "Event",
        };
      }
    }

    return {
      content: JSON.stringify(this.Data),
      methods: this.MethodMap,
    };
  }

  public static OnRightClick(
    player: Player,
    itemStack: ItemStack,
    block?: Block
  ): void {
    throw "Method not implemented";
  }


}
