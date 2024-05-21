import { ObjectStruct, Vec3, float, path } from "../utilities/typedef";
import { IScripts } from "../interfaces/IEntity";

interface IClientEntityScripts extends IScripts {
  Scale: (string | float) | Vec3;
}

interface IBone {
  
}
export class IClientEntity {
  public static Geometry: string;
  public static Animations: ObjectStruct<string, string>;
  public static Scripts: IClientEntityScripts;
  public static Textures: ObjectStruct<string, path>;
}
