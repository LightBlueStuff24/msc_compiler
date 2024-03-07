import {
    IBlockPlacer,
    ICoolDown,
    IDigger,
    IDurability,
    IEnchantable,
    IEntityPlacer,
    IFood,
    IFuel,
    IIcon,
    IItemStorage,
    IProjectile,
    IRecord,
    IRepairable,
    IShooter,
    IThrowable,
    IWearable,
    IItemData
} from "../interfaces/IItem";
import { ParseComponent } from '../contents/ComponentParser';
import config from "../../config";

class Item {

    static Data: IItemData = {
        "format_version": config.version,
        "minecraft:item": {
            "description": { "identifier": "" },
            "components": {}
        }
    };

    /**
     * Indicates whether the item is hidden in commands.
     */
    public static IsHiddenInCommands: boolean;

    /**
     * Group of the item.
     */
    public static Group: string;

    /**
     * Whether the item is allowed in the off-hand.
     */
    public static AllowOffHand: boolean;

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
    public static Damage: number;

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
    public static MaxStackSize: number;

    /**
     * Projectile component for the item.
     */
    public static Projectile: IProjectile;

    public static Identifier: string;

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

    public static async init() {
        this.Data['minecraft:item'].description.identifier =
            `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;
        const parsedComponentData = await ParseComponent(this, 'item');
        if (parsedComponentData) {
            this.Data['minecraft:item'].components = parsedComponentData;
        }

        return JSON.stringify(this.Data);
    }
}
