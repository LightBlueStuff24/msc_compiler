import config from '../../config'
import Log from '../utilities/Log'
import { int, float, bool, path } from '../utilities/typedef'

import {
  IBlockData,
  IFlammable,
  //@ts-expect-error
  ICollisionBox,
   //@ts-expect-error
  ISelectionBox,
   //@ts-expect-error
  IBlockEventTrigger,
  IStates,
  IPermutation,
   //@ts-expect-error
  IGeometry,
  IMaterialInstances,
   //@ts-expect-error
  ITransformation,
  //@ts-expect-error
  IQueuedTicking,
  //@ts-expect-error
  IRandomTicking
} from '../interfaces/IBlock'



class Block {
  private static Data: IBlockData = {
    "format_version": config.version,
    "minecraft:block": {
      "description": { "identifier": "" },
      "components": {}
    }
  }
  private static Component = this.Data['minecraft:block'].components;
  
  public static Namespace: string;
  
  public static Version: int[];

  public static Identifier: string;

  public static States: IStates;

  public static Permutations: IPermutation[];

  public static DisplayName: string;

  public static DestroyTime: int | bool;

  public static ExplosionResistance: int | bool;

  public static Flammable: IFlammable;

  public static Friction: float;

  public static MaterialInstances: IMaterialInstances;

  public static MapColor: int[] | string;

  public static Loot: path;

  public static CollisionBox: ICollisionBox;

  public static SelectionBox: ISelectionBox;
  
  public static Geometry: IGeometry;
  
  public static Transformation: ITransformation;
  
  public static OnInteract: IBlockEventTrigger;

  public static OnStepOn: IBlockEventTrigger;

  public static OnStepOff: IBlockEventTrigger;

  public static OnFallOn: IBlockEventTrigger;

  public static OnPlaced: IBlockEventTrigger;

  public static OnPlayerPlacing: IBlockEventTrigger;

  public static OnPlayerDestroy: IBlockEventTrigger;

  public static QueuedTicking: IQueuedTicking;

  public static RandomTicking: IRandomTicking;

  public static init() {
    this.Data['minecraft:block'].description.identifier = 
    `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;
    for(let [cd, cv] of Object.entries(this).filter(([_, val])=> val !== undefined))
    {
      switch (cd)
      {
        // private properties
        case 'Data': break;
        case 'Component': break;
        case 'reset': break;
        case 'init': break;
        // public properties
        case 'Namespace': {
          if(cv === undefined) return Log.error(`${Log.highlight(this.name)} 'Namespace' is undefined`)
          else this.Data['minecraft:block'].description.identifier = `${this.Namespace}:${this.name.toLowerCase()}`
        }; break;
        case 'Version': {
          if(!Array.isArray(cv)) return Log.error(`${Log.highlight(this.name)} 'Version' should be int[]`)
          this.Data['format_version'] = `${cv[0]}.${cv[1]}.${cv[2]}`;
        };
        
      }
    }
  }
}