import { ObjectStruct } from '../utilities/typedef';
import { IEventTrigger } from './IEvent';
interface IItemData {
    format_version: string,
    "minecraft:item": {
        description: { "identifier": string; },
        components: ObjectStruct<string, ObjectStruct>;
    };
}


interface IIcon {
    texture: string;
}


interface IBlockPlacer {
    block: string;
    useOn: string[];
}

interface ICoolDown {
    cooldown: number;
    category: string;
}

interface IDurability {
    damageChance: string;
    durability: number;
}

interface IEnchantable {
    value: string;
    slot: number;
}

interface IDigger {
    useEfficiency: boolean;
    destroySpeed: { block: string, speed: number, onDig: IEventTrigger; }[];
    onDig?: IEventTrigger;
}

interface IWearable {
    slot: number;
    protection: number;
    dispensable: boolean;
}

interface IEntityPlacer {
    entity: string;
    dispenseOn: string[];
    useOn: string[];
}

interface IRepairable {
    repairItems: string[];
    OnRepair?: IEventTrigger;
}

interface IFood {
    canAlwaysEat: boolean;
    nutrition: number;
    saturationModifier: number;
    onConsume: IEventTrigger;
    onUseConvertTo: string;
}

interface IFuel {
    duration: number;
}

interface IItemStorage {
    capacity: number;
}

interface IProjectile {
    criticalPower: number;
    projectileEntity: string;
}

interface IRecord {
    comparatorSignal: number;
    duration: number;
    soundEvent: string;
}

interface IShooter {
    ammunition: { item: string, shouldSearchInventory: boolean, useInCreative: boolean, useInOffHand: boolean; }[];
    chargeOnDraw?: boolean;
    launchScale?: number;
    drawDuration: number;
    launchPower: number;
    scalePowerByDraw: boolean;
}

interface IThrowable {
    doSwing: boolean;
    launchScale?: number;
    drawDuration: { max?: number, min?: number; };
    launchPower: number;
    scalePowerByDraw: boolean;
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

export {
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