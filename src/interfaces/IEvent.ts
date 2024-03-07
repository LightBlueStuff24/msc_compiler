import type { DamageType } from "../utilities/GlobalValues";
import type { int, float, bool, VectorArray, path, ObjectStruct } from "../utilities/typedef";
import type { Filter } from './IBlock';
import type { Block } from '../classes/Block';


//#region BlockEventResponses
interface IPlaySound {
    Sound: string;
    Target?: Filter;
}
interface IDamage {
    Amount?: int;
    AmountWhenHeld?: int;
    Target?: Filter;
    Type: keyof typeof DamageType;
}
interface IDie {
    Target?: Filter;
}
interface ISpawnParticleEffect {
    Data?: int;
    ParticleName: string;
    Target?: Filter;
}
interface IRemoveMobEffect {
    EffectName: string;
    Target?: Filter;
}
interface IAddMobEffect {
    EffectName: string;
    Target?: Filter;
    Amplifier?: int;
    Duration?: float;
}
interface IRunCommand {
    Command: string;
    Commands?: string[];
    Target?: string;
}
interface ISpawnLoot {
    Table: path;
}
interface ITransformItem {
    TransformTo: string;
}
interface ISetBlock {
    BlockType: string | typeof Block;
}
interface ISetBlockAtPos extends ISetBlock {
    BlockOffset?: VectorArray;
}
interface ISetBlockState {
    State: string;
}
interface ITeleport {
    AvoidWater?: bool;
    Destination?: VectorArray;
    LandOnBlock?: bool;
    MaxRange?: VectorArray;
    Target?: Filter;

}
export interface IEventTrigger {
    Event: string;
    Condition: string;
    Target: string;
}
// #endregion
export interface IEvent {
    Teleport?: ITeleport;
    AddMobEffect?: IAddMobEffect;
    Damage?: IDamage;
    Die?: IDie;
    SpawnParticleEffect?: ISpawnParticleEffect;
    SpawnLoot?: ISpawnLoot;
    PlaySound?: IPlaySound;
    RemoveMobEffect?: IRemoveMobEffect;
    RunCommand?: IRunCommand;
    SetBlock?: ISetBlock;
    SetBlockAtPos?: ISetBlockAtPos;
    SetBlockState?: ISetBlockState;
    ShouldDecrementStack?: bool;
    ShouldActorSwing?: bool;
    TransformItem?: ITransformItem;
    Sequence?:ObjectStruct<string,IEvent>[];
    Randomize?:ObjectStruct<string,IEvent>[];
}
