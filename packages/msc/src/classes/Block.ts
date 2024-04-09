
import type { int, ObjectStruct } from "../utilities/typedef";
import {
  type IBlockData,
  type IStates,
  IBlockComponents,
} from "../interfaces/IBlock";
import type { IEvent } from "../interfaces/IEvent";
import type { IPermutation } from "../interfaces/IPermutation.ts";
import { ParseComponent } from "../contents/ComponentParser";
import config from "../../../../config.ts";

export class Block extends IBlockComponents {
  private static Data: IBlockData = {
    format_version: config.version,
    "minecraft:block": {
      description: { identifier: "" },
      components: {},
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
      config.prefix
    }:${this.name.replace(/([a-Z])([A-Z])/, "$1_$2").toLowerCase()}`;
    if (this.Permutations) {
      this.Data["minecraft:block"].permutations;
    }
    const parsedComponentData = await ParseComponent(this, "block");
    if (parsedComponentData) {
      this.Components = parsedComponentData;
    }
    return JSON.stringify(this.Data);
  }

  public static OnStepOff(ev) {

  }
}

class Skmevjdbsn extends Block {
  static Geometry = {
    Identifier: "jdnsnsn",
    BoneVisibility: {
      "Scraft:bone": true,
    },
  };
}
