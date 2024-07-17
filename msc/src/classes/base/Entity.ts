import { IEntityComponents, type IEvent } from "../../interfaces";
import type { ObjectStruct } from "../../../shared/types.ts";
import { ParseComponent } from "../../contents/ComponentParser.ts";
import xtend from "deepmerge";
import { EntityRegistry } from "../../Registries.ts";
import { getExtendedClass } from "@utils";

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
  private static Components = this.Data["minecraft:entity"].components;
  public static Events: ObjectStruct<string, IEvent>;
  static async init() {
    this.Data["minecraft:entity"].description.identifier = `${
      config.project.prefix
    }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    await this.ParseComponents();
    return JSON.stringify(this.Data);
  }
  private static async ParseComponents() {
    const extendedClass = getExtendedClass(this);
    let newExtendedObject;
    // @ts-ignore
    if (extendedClass)
      newExtendedObject = xtend(this, EntityRegistry.Get(extendedClass));
    const parsedComponentData = await ParseComponent(
      newExtendedObject ?? this,
      "entity"
    );
    if (parsedComponentData) {
      this.Components = parsedComponentData;
    }
  }
}
