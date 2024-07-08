import type { int, ObjectStruct } from "../../types";
import {
  type IEvent,
  type IPermutation,
  type IBlockData,
  type IStates,
  IBlockComponents,
} from "../../interfaces";
import { ParseComponent } from "../../contents/ComponentParser.ts";
import { BlockRegistry } from "../../Registries.ts";
import Log, { getExtendedClass } from "../../utilities";
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
    await Promise.all([this.ParseComponents(), this.ParsePermutations()]);
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

  private static async ParsePermutations() {
    if (this.Permutations) {
      for (const permutation of this.Permutations) {
        const components = await Promise.all(
          permutation.Components.map((component) =>
            ParseComponent(component, "block")
          )
        );
        this.Data["minecraft:block"].permutations[permutation.Condition] = {
          components: Object.assign({}, ...components),
        };
      }
    }
  }
}
