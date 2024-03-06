import type { int, float, bool, VectorArray, path, ObjectStruct } from '../utilities/typedef'
import type { RenderMethods, BlockFaces } from '../utilities/BlockValues'
import type { Block } from '../classes/Block'
import type { DamageType } from '../utilities/GlobalValues'

interface IBlockData {
  format_version: string,
  "minecraft:block": {
    description: { "identifier": string },
    components: ObjectStruct<string, ObjectStruct>
  }
}


type IComponents = IMaterialInstances | IFlammable | ICollisionBox | ISelectionBox


type IMaterialInstances = {
  [bone in BlockFaces]: {
    Texture: string
    RenderMethod: RenderMethods
    FaceDimming?: boolean
    AmbientOcclusion?: boolean
  }
}


interface ICollisionBox {
  Origin: number[],
  Size: number[]
}

interface ISelectionBox {
  Origin: VectorArray,
  Size: VectorArray
}

interface IFlammable{
  catch_chance_modifier?: int,
  destroy_chance_modifier?: int
}



interface IStates {
  [name: string]: int[] | bool[] | string[]
}

interface IPermutation {
  Condition: string,
  Components: IComponents,
}

interface IGeometry {
  Identifier: string
  BoneVisibility: ObjectStruct<string, string | bool>
}
interface Filter {

}

//#region BlockEventResponses
interface IPlaySound {
  Sound: string
  Target?: Filter
}

interface IDamage {
  Amount?: int
  AmountWhenHeld?: int
  Target?: Filter
  Type: keyof typeof DamageType
}

interface IDie {
  Target?: Filter
}

interface ISpawnParticleEffect {
  Data: int
  ParticleName: string
  Target: Filter
}

interface IRemoveMobEffect {
  EffectName: string
  Target?: Filter
}


interface IAddMobEffect extends IRemoveMobEffect {
  Amplifier?: int
  Duration?: float
}

interface IRunCommand {
  Command: string
  Commands?: string[]
  Target?: string
}

interface ISpawnLoot {
  Table: path
}

interface ITransformItem {
  TransformTo: string
}

interface ISetBlock {
  BlockType: string | typeof Block
}

interface ISetBlockAtPos extends ISetBlock {
  BlockOffset?: VectorArray
}

interface ISetBlockState {
  state: string
}

interface ITeleport {
  AvoidWater?: bool
  Destination?: VectorArray
  LandOnBlock?: bool
  MaxRange?: VectorArray
  Target?: Filter

}

interface IBlockEventTrigger {
  Event: string,
  Condition: string,
  Target: string
}
// #endregion

interface IBlockEvent {
  Teleport?: ITeleport
  AddMobEffect?: IAddMobEffect
  Damage?: IDamage
  Die?: IDie
  SpawnParticleEffect?: ISpawnParticleEffect
  SpawnLoot?: ISpawnLoot
  PlaySound?: IPlaySound
  RemoveMobEffect?: IRemoveMobEffect
  RunCommand?: IRunCommand
  SetBlock?: ISetBlock
  SetBlockAtPos?: ISetBlockAtPos
  SetBlockState?: ISetBlockState
  ShouldDecrementStack?: bool
  ShouldActorSwing?: bool
  TransformItem?: ITransformItem
}

interface IOnStepOnTrigger extends IBlockEventTrigger {
  MinFallDistance: float
}
interface IQueuedTicking {
  IntervalRange?: int[]
  Looping?: bool
  OnTick: IBlockEvent
}


interface IRandomTicking {
  OnTick: IBlockEvent
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
  IBlockEvent,
  IOnStepOnTrigger,
  IBlockEventTrigger,
  IGeometry
}

