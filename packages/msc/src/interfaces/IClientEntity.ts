import { ObjectStruct, path } from "../utilities/typedef";
import { IScripts } from "../interfaces/IEntity";
export class IClientEntity {
  public static Geometry: string;
  public static Animations: ObjectStruct<string, string>;
  public static Scripts: IScripts;
  public static Textures: ObjectStruct<string, path>;
}
