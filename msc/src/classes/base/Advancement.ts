import type { IAdvancementData, IReward } from "../../interfaces/IAdvancement";
import Log, { isType, Emsg } from "@utils";

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
      this.Data.icon = "assets/textures/ui/advancement/default";
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
    return JSON.stringify(this.Data);
  }
}
