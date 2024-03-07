import config from '../../config'
import type { int, float, bool, path, ObjectStruct } from '../utilities/typedef'

import type {
  IBlockData,
  IFlammable,
  ICollisionBox,
  ISelectionBox,
  IStates,
  IPermutation,
  IGeometry,
  IMaterialInstances,
  ITransformation,
  IQueuedTicking,
  IRandomTicking,
  IOnStepOnTrigger
} from '../interfaces/IBlock'
import type {
  IEventTrigger,
  IEvent
} from '../interfaces/IEvent';
import { ParseComponent } from '../contents/ComponentParser'




export class Block {

  static Data: IBlockData = {
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

  public static Flammable: IFlammable | int[];

  public static Friction: float;

  public static MaterialInstances: IMaterialInstances;

  public static MapColor: int[] | string;

  public static Loot: path;

  public static LightEmission: int;

  public static LightDampening: int;

  public static CollisionBox: ICollisionBox;

  public static SelectionBox: ISelectionBox;

  public static Geometry: IGeometry | string;

  public static Transformation: ITransformation;

  public static OnInteract: IEventTrigger;

  public static OnStepOn: IOnStepOnTrigger;

  public static OnStepOff: IEventTrigger;

  public static OnFallOn: IEventTrigger;

  public static OnPlaced: IEventTrigger;

  public static OnPlayerPlacing: IEventTrigger;

  public static OnPlayerDestroy: IEventTrigger;

  public static QueuedTicking: IQueuedTicking;

  public static RandomTicking: IRandomTicking;

  public static Events: ObjectStruct<string, IEvent>;

  public static async init() {
    this.Data['minecraft:block'].description.identifier =
      `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;
    const parsedComponentData = await ParseComponent(this, 'block');
    if (parsedComponentData) {
      this.Data['minecraft:block'].components = parsedComponentData;
    }
  
    return JSON.stringify(this.Data);
  }
}

