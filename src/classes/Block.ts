import config from '../../config'
import type { int, float, bool, path, ObjectStruct } from '../utilities/typedef'

import { IBlock } from '../interfaces/IBlock'
import type {
  IEventTrigger,
  IEvent
} from '../interfaces/IEvent';
import { ParseComponent } from '../contents/ComponentParser'





export class Block extends IBlock {

  static Data: IBlockData = {
    "format_version": config.version,
    "minecraft:block": {
      "description": { "identifier": "" },
      "components": {}
    }
  }
  private static Component = this.Data['minecraft:block'].components;

  public static Namespace: string;

  public static Version: int[];

  public static Identifier: string;

  public static async init() {
    this.Data['minecraft:block'].description.identifier =
      `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this, 'block');
    if (parsedComponentData) {
      this.Data['minecraft:block'].components = parsedComponentData;
    }
  
    return JSON.stringify(this.Data);
  }
}