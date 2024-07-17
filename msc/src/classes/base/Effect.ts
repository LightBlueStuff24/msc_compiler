import { Entity } from "@minecraft/server";
import type { IEffectData } from "../../interfaces/IEffect";
import type { int } from "../../../shared/types";

class Effect {
  private static Data: IEffectData = {
    name: "",
    icon: "",
    max_amplifier: 1,
  };
  public static Name: string;
  public static MaxAmplifier: int;
  public static Icon: string;

  /**
   * When this effect is applied to an entity.
   * @param entity Entity this effect was applied to
   */
  public static OnEffectApplied(entity: Entity) {}

  /**
   * Updates the effect state on each tick.
   * @param entity The entity to which the effect is applied.
   */
  public static OnTick(entity?: Entity): void {}

  /**
   * When this effect is removed.
   * @param entity Entity to remove the effect from
   */
  public static OnEffectRemove(entity: Entity) {}

  static async init() {
    if (this.Icon) {
      this.Data.icon = this.Icon;
    }

    if (this.Name) {
      this.Data.name = this.Name;
    }

    if (this.MaxAmplifier) {
      this.Data.max_amplifier = this.MaxAmplifier;
    }
  }
}

