import type { DamageType } from "../enums/GlobalValues";
import type { int, float, bool, Vec3Array, path, ObjectStruct } from "../utilities/typedef";
import type { IFilter } from './IFIilter.ts';
import { Block } from '../classes/Block';


//#region EventResponses
interface IPlaySound {
    Sound: string;
    Target?: IFilter;
}
interface IDamage {
    Amount?: int;
    AmountWhenHeld?: int;
    Target?: IFilter;
    Type: keyof typeof DamageType;
}
interface IDie {
    Target?: IFilter;
}
interface ISpawnParticleEffect {
    Data?: int;
    ParticleName: string;
    Target?: IFilter;
}
interface IRemoveMobEffect {
    EffectName: string;
    Target?: IFilter;
}
interface IAddMobEffect {
    EffectName: string;
    Target?: IFilter;
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
    BlockOffset?: Vec3Array;
}
interface ISetBlockState {
    State: string;
}
interface ITeleport {
    AvoidWater?: bool;
    Destination?: Vec3Array;
    LandOnBlock?: bool;
    MaxRange?: Vec3Array;
    Target?: IFilter;

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
    Sequence?: IEvent[];
    Randomize?: IEvent[];
}


