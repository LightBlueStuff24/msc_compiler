import type { int, ObjectStruct } from "../../../shared/types.ts";
import {
  type IEvent,
  type IPermutation,
  type IBlockData,
  type IStates,
  IBlockComponents,
} from "../../interfaces";
import { ParseComponent } from "../../contents/ComponentParser.ts";
import { BlockRegistry } from "../../Registries.ts";
import Log, { getExtendedClass } from "@utils";
import xtend from "deepmerge";

export class Block extends IBlockComponents {
  private static Data: IBlockData = {
    format_version: config.project.version,
    "minecraft:block": {
      description: { identifier: "" },
      components: {}
    },
  };
  private static Components = this.Data["minecraft:block"].components;

  public static Namespace: string;

  public static Version: int[];

  public static Identifier: string;

  public static States: IStates;

  public static Permutations: IPermutation[];

  public static Events: ObjectStruct<string, IEvent>;

  public static async init() {
    this.Data["minecraft:block"].description.identifier = `${
      config.project.prefix
    }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    await this.ParseComponents();
    return JSON.stringify(this.Data);
  }

  private static async ParseComponents() {
    const extendedClass = getExtendedClass(this);
    let newExtendedObject;
    //@ts-ignore
    if (extendedClass)
      newExtendedObject = xtend(this, BlockRegistry.Get(extendedClass));
    const parsedComponentData = await ParseComponent(
      newExtendedObject ?? this,
      "block"
    );
    if (parsedComponentData) {
      this.Components = parsedComponentData;
    } else {
      Log.warn(`ParseComponent failed to parse ${this.name}`);
    }
  }
}
