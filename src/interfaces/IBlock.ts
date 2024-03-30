import type { int, float, bool, VectorArray, ObjectStruct } from '../utilities/typedef';
import type { RenderMethods, BlockFaces } from '../enums/BlockValues';
import type { IEventTrigger, IEvent } from './IEvent';


interface IBlockData {
  format_version: string,
  "minecraft:block": {
    description: { 
      "identifier": string;
      "menu_category"
    },
    components: ObjectStruct<string, ObjectStruct>;
  };
}

// Change this later
type IComponents = IMaterialInstances | IFlammable | ICollisionBox | ISelectionBox | ITransformation;

type IMaterialInstances = {
  [bone in BlockFaces]: {
    Texture: string;
    RenderMethod: RenderMethods;
    FaceDimming?: boolean;
    AmbientOcclusion?: boolean;
  }
};


interface ICollisionBox {
  Origin: VectorArray,
  Size: VectorArray;
}

interface ISelectionBox {
  Origin: VectorArray,
  Size: VectorArray;
}

interface IFlammable {
  CatchChanceModifier?: int,
  DestroyChanceModifier?: int;
}



interface IStates {
  [name: string]: int[] | bool[] | string[];
}

interface ITransformation {
  Scale: VectorArray;
  Translation: VectorArray;
  Rotation: VectorArray;
}


interface IPermutation {
  Condition: string,
  Components: IComponents,
}

interface IGeometry {
  Identifier: string;
  BoneVisibility: ObjectStruct<string, string | bool>;
}



interface IOnStepOnTrigger extends IEventTrigger {
  MinFallDistance: float;
}


interface IQueuedTicking {
  IntervalRange?: int[];
  Looping?: bool;
  OnTick: IEvent;
}


interface IRandomTicking {
  OnTick: IEvent;
}



export type {
  IMaterialInstances,
  IFlammable,
  IBlockData,
  IPermutation,
  IStates,
  ICollisionBox,
  ISelectionBox,
  IQueuedTicking,
  IRandomTicking,
  ITransformation,
  IOnStepOnTrigger,
  IEventTrigger,
  IGeometry
}

class IBlock {
  
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
}