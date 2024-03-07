import type { int, float, bool, VectorArray, ObjectStruct } from '../utilities/typedef';
import type { RenderMethods, BlockFaces } from '../utilities/BlockValues';
import { IEventTrigger, IEvent } from './IEvent';

interface IBlockData {
  format_version: string,
  "minecraft:block": {
    description: { "identifier": string; },
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

// Complete this later
interface Filter {

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
  IGeometry,
  Filter
}

