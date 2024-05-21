import { IBlockComponents, IEventTrigger } from "../../interfaces/IBlock";
import { IEntityComponents } from "../../interfaces/IEntity";
import { ITileEntity } from "../../interfaces/ITileEntity";
import { Block } from "./Block";
import { Entity } from "./Entity";

export class TileEntity extends ITileEntity {
  public static Block? : typeof Block;
  public static Entity? : typeof Entity;
  
}

class T extends TileEntity {
  static 
}
