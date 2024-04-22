import config from "../../../../config";
import { ParseComponent } from "../contents/ComponentParser";
import { IClientEntity } from "../interfaces/IClientEntity";
import { FileOperations, getModel, isInt } from "../utilities/Utils";
import { bool } from "../utilities/typedef";

export class ClientEntity extends IClientEntity {
  private static Data = {
    format_version: [],
    "minecraft:client_entity": {
      description: {
        identifier: "",
        properties: {},
      },
    },
  };

  /**
   * Allows you to control this entities animation through scripting
   */
  public static UseScriptableAnimations: bool;
  static async init() {
    if (this.UseScriptableAnimations) {
      // Returns the parsed model file
      const modelFile = await getModel(this.Geometry);
      modelFile.bones.forEach(bone=>{
      
      })
    }
    const parsedData = await ParseComponent(this, "client_entity");
    if (parsedData) {
      return JSON.stringify(
        parsedData,
        null,
        config.msc.compilerOptions.fileIndent
      );
    }
  }
}
