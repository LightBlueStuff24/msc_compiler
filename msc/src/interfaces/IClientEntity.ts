import { ObjectStruct, bool, int, path } from "../types";
import { IScripts } from "./IEntity";

interface IClientScripts extends IScripts {
  Scale?: string | number;
  Initialize?: string[];
  ParentSetup?: string | number | bool;
  PreAnimation?: string[];
  ShouldUpdateBonesAndEffectsOffScreen: bool;
  ShouldUpdateEffectsOffScreen: bool;
  SpawnEgg: ISpawnEgg;
}

interface ISpawnEgg {
  BaseColor: string;
  Texture: path;
  OverlayColor: string;
  TextureIndex: int;
}

export class IClientEntity {
  public static Geometry: ObjectStruct<string, string>;
  public static Animations: ObjectStruct<string, string>;
  public static Scripts: IClientScripts;
  public static Textures: ObjectStruct<string, path>;
  public static Materials: ObjectStruct<string, string>;
  public static RenderControllers: string[];
}
