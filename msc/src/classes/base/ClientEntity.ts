import { ParseComponent } from "../../contents/ComponentParser";
import { IClientEntity } from "../../interfaces/IClientEntity";
import { getExtendedClass } from "@utils";
import xtend from "deepmerge";
import { EntityRegistry } from "../../Registries";

export class ClientEntity extends IClientEntity {
  private static Data = {
    format_version: [],
    "minecraft:client_entity": {
      description: {
        identifier: "",
      },
    },
  };

  /**
   * Allows you to control this entities animation through scripting
   */
  // public static UseScriptableAnimations: bool;
  static async init() {
    await this.ParseComponents();
    return JSON.stringify(this.Data);
  }

  private static async ParseComponents() {
    const extendedClass = getExtendedClass(this);
    let newExtendedObject;
    //@ts-ignore
    if (extendedClass)
      newExtendedObject = {
        name: this.name,
        // Add a new Registry for client entity maybe?
        ...xtend(this, EntityRegistry.Get(extendedClass)),
      };
      
    const parsedComponentData = await ParseComponent(
      newExtendedObject ?? this,
      "client_entity"
    );
    if (parsedComponentData) {
      Object.assign(
        this.Data["minecraft:client_entity"].description,
        parsedComponentData
      );
    }
  }
}
