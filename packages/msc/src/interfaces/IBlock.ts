import type { int, float, bool, Vec3Array, ObjectStruct, path } from '../utilities/typedef';
import type { RenderMethods, BlockFaces } from '../enums/BlockValues';
import type { IEventTrigger, IEvent } from './IEvent';


interface IBlockData {
  format_version: string,
  "minecraft:block": {
    description: {
      "identifier": string;
    },
    components: ObjectStruct<string, ObjectStruct>;
    permutations: ObjectStruct<string, ObjectStruct> ;
  };
}


type IMaterialInstances = {
  [bone in BlockFaces]: {
    Texture: string;
    RenderMethod: RenderMethods;
    FaceDimming?: boolean;
    AmbientOcclusion?: boolean;
  }
};


interface ICollisionBox {
  Origin: Vec3Array,
  Size: Vec3Array;
}

interface ISelectionBox {
  Origin: Vec3Array,
  Size: Vec3Array;
}

interface IFlammable {
  CatchChanceModifier?: int,
  DestroyChanceModifier?: int;
}

interface IStates {
  [name: string]: int[] | bool[] | string[];
}

interface ITransformation {
  Scale: Vec3Array;
  Translation: Vec3Array;
  Rotation: Vec3Array;
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

// Contains the components of the Block class
export class  IBlockComponents {

  static DisplayName: string;

  static DestroyTime: int | bool;

  static ExplosionResistance: int | bool;

  static Flammable: IFlammable | int[];

  static Friction: float;

  static MaterialInstances: IMaterialInstances;

  static MapColor: int[] | string;

  static Loot: path;

  static LightEmission: int;

  static LightDampening: int;

  static CollisionBox: ICollisionBox;

  static SelectionBox: ISelectionBox;

  static Geometry: IGeometry | string;

  static Transformation: ITransformation;

  static OnInteract: IEventTrigger;

  static OnStepOn: IOnStepOnTrigger;

  static OnStepOff: any;

  static OnFallOn: IEventTrigger;

  static OnPlaced: IEventTrigger;

  static OnPlayerPlacing: IEventTrigger;

  static OnPlayerDestroy: IEventTrigger;

  static QueuedTicking: IQueuedTicking;

  static RandomTicking: IRandomTicking;
}

export type {
  IMaterialInstances,
  IFlammable,
  IBlockData,
  IStates,
  ICollisionBox,
  ISelectionBox,
  IQueuedTicking,
  IRandomTicking,
  ITransformation,
  IOnStepOnTrigger,
  IEventTrigger,
  IGeometry,
}

