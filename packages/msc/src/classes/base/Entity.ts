import config from "../../../../../config.ts";
import { IEntityComponents } from "../../interfaces/IEntity.ts";
import type { ObjectStruct } from "../../utilities/typedef.ts";
import { IEvent } from "../../interfaces/IEvent.ts";
import { ParseComponent } from "../../contents/ComponentParser.ts";

export class Entity extends IEntityComponents {
  private static Data = {
    format_version: [],
    "minecraft:entity": {
      description: {
        identifier: "",
        properties: {},
      },
      component_groups: {},
      components: {},
      events: {},
    },
  };
  static Components = this.Data["minecraft:entity"].components;
  public static Events: ObjectStruct<string, IEvent>;
  static async init() {
    this.Data["minecraft:entity"].description.identifier = `${
      config.project.prefix
    }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this, "entity");
    if (parsedComponentData) {
      this.Components = parsedComponentData;
    }
    return JSON.stringify(this.Data);
  }
}
