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
  //@ts-expect-error
  ITransformation,
  IQueuedTicking,
  IRandomTicking,
  IOnStepOnTrigger,
  IBlockEventTrigger,
  IBlockEvent
} from '../interfaces/IBlock'
import { ParseComponent } from '../contents/ComponentParser'
import { BlockFaces, RenderMethods } from '../utilities/BlockValues'



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

  public static CollisionBox: ICollisionBox;

  public static SelectionBox: ISelectionBox;

  public static Geometry: IGeometry | string;

  public static Transformation: ITransformation;

  public static OnInteract: IBlockEventTrigger;

  public static OnStepOn: IOnStepOnTrigger;

  public static OnStepOff: IBlockEventTrigger;

  public static OnFallOn: IBlockEventTrigger;

  public static OnPlaced: IBlockEventTrigger;

  public static OnPlayerPlacing: IBlockEventTrigger;

  public static OnPlayerDestroy: IBlockEventTrigger;

  public static QueuedTicking: IQueuedTicking;

  public static RandomTicking: IRandomTicking;

  public static Events: ObjectStruct<string, IBlockEvent>;

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

