import type { int, ObjectStruct } from "../../utilities/typedef.ts";
import {
  type IBlockData,
  type IStates,
  IBlockComponents,
} from "../../interfaces/IBlock.ts";
import type { IEvent } from "../../interfaces/IEvent.ts";
import type { IPermutation } from "../../interfaces/IPermutation.ts";
import { ParseComponent } from "../../contents/ComponentParser.ts";
import config from "../../../../../config.ts";
import { Entity, Dimension } from "@minecraft/server";

export class Block extends IBlockComponents {
  private static Data: IBlockData = {
    format_version: config.project.version,
    "minecraft:block": {
      description: { identifier: "" },
      components: {},
      permutations: {},
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
    if (this.Permutations) {
      this.Data["minecraft:block"].permutations;
    }
    const parsedComponentData = await ParseComponent(this, "block");
    if (parsedComponentData) {
      this.Components = parsedComponentData;
    }
    return JSON.stringify(this.Data);
  }

  /**
   *
   * @param block A reference to this Block
   * @param entity
   * @param dimension
   */
  public static OnStepOff(
    block: import("@minecraft/server").Block,
    entity: Entity,
    dimension: Dimension
  ) {}
}

class Skmevjdbsn extends Block {
  static Geometry = {
    Identifier: "jdnsnsn",
    BoneVisibility: {
      "Scraft:bone": true,
    },
  };
  static Permutations: IPermutation[];
}
