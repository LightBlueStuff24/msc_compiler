import type { IAdvancementData, IReward } from "../interfaces/IAdvancement";
import Log from "../utilities/Log";
import Emsg from "../utilities/Emsg";
import { isType } from "../utilities/Utils";

export class Advancement {
  private static Data: IAdvancementData = {
    icon: "",
    name: "",
    description: "",
    rewards: [],
  };
  public static Icon: string;
  public static Name: string;
  public static Description: string;
  public static Rewards: IReward[];
  public static async init() {
    if (!this.Icon) {
      if (typeof this.Icon != "string") {
        Log.error(Emsg.typeError(this.Icon, "string"));
        return;
      }
      this.Data.icon = this.Icon;
    } else {
      Log.warn(Emsg.missingItem("Icon"));
      this.Data.icon = "textures/ui/advancement/default";
    }

    if (this.Name) {
      if (typeof this.Name != "string") {
        Log.error(Emsg.typeError(this.Name, "string"));
        return;
      }
      this.Data.name = this.Name;
    } else {
      Log.warn(Emsg.missingItem("Name"));
      this.Data.name = "New Name";
    }

    if (this.Description) {
      if (typeof this.Description != "string") {
        Log.error(Emsg.typeError(this.Description, "string"));
        return;
      }
      this.Data.description = this.Description;
    } else {
      Log.warn(Emsg.missingItem("Description"));
      this.Data.description = "There is no description";
    }

    if (this.Rewards) {
      if (!isType(this.Rewards, "object")) {
        Log.error(Emsg.typeError(this.Rewards, "object"));
        return;
      }
      this.Data.rewards = this.Rewards;
    }

    return JSON.stringify(this.Data);
  }
}
