import { ITileEntity } from "../../interfaces/ITileEntity";
import { Block } from "./Block";
import { Entity } from "./Entity";

export class TileEntity extends ITileEntity {
  public static Block : typeof Block;
  public static Entity : typeof Entity;
  
}