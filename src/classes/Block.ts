import config from '../../config'
import type { int, float, bool, path } from '../utilities/typedef'
import type {
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
import { ParseComponent } from '../contents/ComponentParser';



export class Block {
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

  public static async init() {
    this.Data['minecraft:block'].description.identifier = 
    `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this,'block');
    if (parsedComponentData){
      this.Component = parsedComponentData;
    }
    return JSON.stringify(this.Data)
  }
}