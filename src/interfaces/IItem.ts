import type { Item } from '../classes/Item';
import { MenuCategories, MenuGroups } from '../enums/GlobalValues';
import type { WearableSlot } from '../enums/ItemValues';
import type { ObjectStruct, bool } from '../utilities/typedef';
import type { IEventTrigger } from './IEvent';

interface IItemData {
    format_version: string,
    "minecraft:item": {
        description: { "identifier": string; },
        components: ObjectStruct<string, any>;
    };
}

interface IIcon {
    Texture: string;
    Frame: string;
}

interface IBlockPlacer {
    Block: string;
    UseOn: string[];
}

interface ICoolDown {
    Cooldown: number;
    Category: string;
}

interface IDurability {
    DamageChance: string;
    Durability: number;
}

interface IEnchantable {
    Value: string;
    Slot: WearableSlot;
}

interface IDigger {
    UseEfficiency: boolean;
    DestroySpeed: { block: string, speed: number, onDig: IEventTrigger; }[];
    OnDig?: IEventTrigger;
}

interface IWearable {
    Slot: WearableSlot;
    Protection: number;
    Dispensable: boolean;
}


interface IEntityPlacer {
    Entity: string;
    DispenseOn: string[];
    UseOn: string[];
}

interface IAmmunition {
    Item: string | typeof Item,
    ShouldSearchInventory: boolean,
    UseInCreative: boolean,
    UseInOffHand: boolean;
}
interface IRepairableEntry {
    Items: string[];
    RepairAmount: number;
}

interface IRepairable {
    RepairItems: IRepairableEntry[];
    OnRepair?: IEventTrigger;
}

interface IFood {
    CanAlwaysEat: bool;
    Nutrition: number;
    SaturationModifier: number;
    OnConsume: IEventTrigger;
    OnUseConvertTo: string;
}

interface IMenuCategory {
    IsHidddenInCommands?:bool
    Category:MenuCategories
    Group?:MenuGroups
}

interface IFuel {
    Duration: number;
}

interface IItemStorage {
    Capacity: number;
}

interface IProjectile {
    CriticalPower: number;
    ProjectileEntity: string;
}

interface IRecord {
    ComparatorSignal: number;
    Duration: number;
    SoundEvent: string;
}

interface IShooter {
    Ammunition: IAmmunition[];
    ChargeOnDraw?: boolean;
    LaunchScale?: number;
    DrawDuration: number;
    LaunchPower: number;
    ScalePowerByDraw: boolean;
}

interface IThrowable {
    DoSwing: boolean;
    LaunchScale?: number;
    DrawDuration: { max?: number, min?: number; };
    LaunchPower: number;
    ScaleByPowerByDraw: boolean;
}

interface IItemComponents {
    Repairable?: IRepairable;
    IsHiddenInCommands?: boolean;
    Category?: string;
    Group?: string;
    AllowOffHand?: boolean;
    BlockPlacer?: IBlockPlacer;
    DisplayName?: string;
    CoolDown?: ICoolDown;
    Damage?: number;
    Digger?: IDigger;
    Durability?: IDurability;
    Enchantable?: IEnchantable;
    Icon?: string | IIcon;
    EntityPlacer?: IEntityPlacer;
    Food?: IFood;
    Fuel?: IFuel;
    Glint?: boolean;
    HandEquipped?: boolean;
    HoverTextColor?: string;
    InteractButton?: string;
    ItemStorage?: IItemStorage;
    LiquidClipped?: boolean;
    MaxStackSize?: number;
    Projectile?: IProjectile;
    Record?: IRecord;
    Shooter?: IShooter;
    ShouldDespawn?: boolean;
    StackedByData?: boolean;
    Throwable?: IThrowable;
    UseAnimation?: boolean;
    UseDuration?: boolean;
    Wearable?: IWearable;
}

export type {
    IBlockPlacer,
    ICoolDown,
    IDigger,
    IDurability,
    IEnchantable,
    IEntityPlacer,
    IFood,
    IFuel,
    IItemComponents,
    IItemStorage,
    IProjectile,
    IRecord,
    IRepairable,
    IShooter,
    IThrowable,
    IWearable,
    IIcon,
    IItemData
};
