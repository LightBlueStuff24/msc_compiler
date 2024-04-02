import {
  IItemData,
  IItemComponents
} from "../interfaces/IItem";
import { ParseComponent } from '../contents/ComponentParser';
import config from "../../config";

export class Item extends IItemComponents {

  private static Data: IItemData = {
    "format_version": config.version,
    "minecraft:item": {
      "description": { "identifier": "" },
      "components": {}
    }
  };

  public static async init() {
    this.Data['minecraft:item'].description.identifier =
      `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this, 'item');
    if (parsedComponentData) {
      this.Data['minecraft:item'].components = parsedComponentData;
    }

    return JSON.stringify(this.Data);
  }
}
