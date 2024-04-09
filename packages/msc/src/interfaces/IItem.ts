import type { Item } from '../classes/Item';
import { MenuCategories, MenuGroups } from '../enums/GlobalValues';
import type { WearableSlot } from '../enums/ItemValues';
import type { ObjectStruct, bool, int } from '../utilities/typedef';
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
    IsHidddenInCommands?: bool;
    Category: MenuCategories;
    Group?: MenuGroups;
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
    MinDrawDuration: number;
    MaxDrawDuration: number;
    LaunchPower: number;
    ScaleByPowerByDraw: boolean;
}

export class IItemComponents {
    /**
     * Namespace of the item
     */
    public static Namespace: string;

    /**
     * Format Version of the item
     */
    public static Version: int[];

    /**
    * Identifier of the item
    */
    public static Identifier: string;

    /**
     * Indicates whether the item is hidden in commands.
     */
    public static IsHiddenInCommands: boolean;

    /**
     * Group of the item.
     */
    public static Group: MenuGroups;

    /**
     * Category of the item.
     */
    public static Category: MenuCategories;

    /**
     * Whether the item is allowed in the off-hand.
     */
    public static AllowInOffHand: boolean;

    /**
     * Block placer component.
     */
    public static BlockPlacer: IBlockPlacer;

    /**
     * Display name of the item.
     */
    public static DisplayName: string;

    /**
     * Max Damage item has
     */
    public static MaxDamage: number;

    /**
     * Cooldown duration for the item.
     */
    public static CoolDown: ICoolDown;

    /**
     * Damage value of the item.
     */
    public static Damage: int;

    /**
     * Digger component for the item.
     */
    public static Digger: IDigger;

    /**
     * Durability component for the item.
     */
    public static Durability: IDurability;

    /**
     * Enchantable component for the item.
     */
    public static Enchantable: IEnchantable;

    /**
     * Icon component for the item.
     */
    public static Icon: IIcon;

    /**
     * Entity placer component for the item.
     */
    public static EntityPlacer: IEntityPlacer;

    /**
     * Food component for the item.
     */
    public static Food: IFood;

    /**
     * Fuel component for the item.
     */
    public static Fuel: IFuel;

    /**
     * Glint property for the item.
     */
    public static Glint: boolean;

    /**
     * Hand equipped property for the item.
     */
    public static HandEquipped: boolean;

    /**
     * Hover text color property for the item.
     */
    public static HoverTextColor: string;

    /**
     * Interact button property for the item.
     */
    public static InteractButton: boolean;

    /**
     * Item storage component for the item.
     */
    public static ItemStorage: IItemStorage;

    /**
     * Liquid clipped property for the item.
     */
    public static LiquidClipped: boolean;

    /**
     * Max stack size property for the item.
     */
    public static MaxStackSize: int;

    /**
     * Projectile component for the item.
     */
    public static Projectile: IProjectile;

    /**
     * Record component for the item.
     */
    public static Record: IRecord;

    /**
     * Repairable component for the item.
     */
    public static Repairable: IRepairable;

    /**
     * Shooter component for the item.
     */
    public static Shooter: IShooter;

    /**
     * Should despawn property for the item.
     */
    public static ShouldDespawn: boolean;

    /**
     * Stacked by data property for the item.
     */
    public static StackedByData: boolean;

    /**
     * Throwable component for the item.
     */
    public static Throwable: IThrowable;

    /**
     * Use animation property for the item.
     */
    public static UseAnimation: string;

    /**
     * Use duration property for the item.
     */
    public static UseDuration: number;

    /**
     * Wearable component for the item.
     */
    public static Wearable: IWearable;
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
