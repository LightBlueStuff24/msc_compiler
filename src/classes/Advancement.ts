import type { IReward } from "../interfaces/IAdvancement"
import Log from "../utilities/Log"
import Emsg from "../utilities/Emsg"

class Advancement {
  private Data = {}
  public static Icon: string;
  public static Name: string;
  public static Description: string;
  public static Rewards: IReward[];
  public static async init() {
    if(!this.Icon) {
      if(typeof this.Icon != "string") Log.error(Emsg.typeError(this.Icon, "string"))
      Log.warn(Emsg.missingItem("Icon"))
      this.Data.icon=this.Icon||"textures/ui/advancement/default"
    }
    if(this.Name) {
      if(typeof this.Name != "string") Log.error(Emsg.typeError(this.Name))
      Log.warn(Emsg.missingItem("Name"))
      this.Data.name=this.Name||"New Name";
    }
    if(this.Description) {
      if(typeof this.Description != "string") Log.error(Emsg.typeError(this.Description, "string"))
      Log.warn(Emsg.missingItem("Description"))
      this.Data.description=this.Description||"There is no description";
    }
    if(this.Rewards) {
      if(!Array.isArray(this.Rewards)) Log.error()
      this.Data.rewards=this.Rewards;
      
    }
    return JSON.stringify(this.Data);
  }
}