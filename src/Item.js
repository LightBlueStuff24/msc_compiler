const { validCategories } = require("./validationList");
const { ItemEventTriggerHandler, isNegative, SetMixin } = require("./utilities/exports_util");
const config = require('../msc.config.json');
Object.assign(Set.prototype, SetMixin)

/**
 * @typedef {Object} BlockPlacerComponent
 * @property {string} block - The block to be placed
 * @property {string[]} useOn - Blocks this item can be used on.
 */

/**
 * @typedef {Object} CoolDownComponent
 * @property {number} cooldown - Cooldown is the amount of time in seconds that this item will be unusable.
 * @property {string} category - Category is the cooldown category that this item is in.
 */

/**
 * @typedef {Object} DurabilityComponent
 * @property {string} damageChance - Damage chance is the percentage chance of this item losing durability.
 * @property {number} durability -  Durability is the amount of damage that this item can take before breaking..
 */

/**
 * @typedef {Object} EnchantableComponent
 * @property {string} value - What enchantments can be applied (ex. Using `bow` would allow this item to be enchanted as if it were a bow).
 * @property {number} slot - The value of the enchantment (minimum of 0).
 */

/**
 * @typedef {Object} DiggerComponent
 * @property {boolean} useEfficiency - Whether or not this item should take into account effieceny enchantment
 * @property {Array<{block:string,speed:number,onDig:{condition:string,event:string,target:string}}>} destroySpeed
 * @property {{condition:string,event:string,target:string}} [onDig] - Event to Trigger when this item is used to dig. Used in 1.16.100
 */

/**
 * @typedef {Object} WearableComponent
 * @property {number} slot - The slot that this item can be worn in.
 * @property {number} protection - The amount of protection this item provides.
 * @property {boolean} dispensable - Whether or not this item can be dispensed.
 */


/**
 * @typedef {Object} EntityPlacerComponent
 * @property {string} entity - The entity that will be placed.
 * @property {string[]} dispenseOn - List of blocks this item can be dispensed on
 * @property {string[]} useOn - List of blocks this item can be used on.
 */
/**
 * @typedef {Object} RepairableComponent
 * @property {string[]} repairItems - List of items that can repair this item.
 * @property {{condition:string,event:string,target:string}} [OnRepair] - Event to Trigger when this item is repaired.
 */

/**
 * @typedef {Object} FoodComponent
 * @property {boolean} canAlwaysEat - Whether the player can always eat this even when not hungry
 * @property {number} nutrition - The nutrional value of the item
 * @property {number} saturationModifier - The saturation modifier of the item, used in this formula: (nutrition * saturation_modifier * 2) when applying the saturation buff.
 * @property {{condition:string,event:string,target:string}} onConsume - Event to Trigger when this item is eaten/consumed
 * @property {string} onUseConvertTo - The item to convert to when this item is used.
 */

/**
 * @typedef {Object} FuelComponent
 * @property {number} duration - How long in seconds will this fuel cook items for.
 */

/**
 * @typedef {Object} ItemStorageComponent
 * @property {number} capacity - The max capacity of the item, default is 64.
 */

/**
 * @typedef {Object} ProjectileComponent
 * @property {number} criticalPower - The crictal damage the projectile does.
 * @property {string} projectileEntity - The entity that is fired as the projectile.
 */

/**
 * @typedef {Object} RecordComponent
 * @property {number} comparatorSignal - A number that reprents the strength of the signal.
 * @property {number} duration - Determines how long sound particles from the jukebox are spawned
 * @property {string} soundEvent - Corresponds to a sound event in the games code
 */

/**
 * @typedef {Object} ShooterComponent
 * @property {Array<{item:string,shouldSearchInventory:boolean,useInCreative:boolean,useInOffHand:boolean}>} ammunition Defines the item ammunitions that can be used
 * @property {boolean} [chargeOnDraw] - Charge on draw, Default is false.
 * @property {number} [launchScale] - Launch power scale. Default is set to 1.0.
 * @property {number} drawDuration - How long this item can draw for.
 * @property {number} launchPower - Launch power of this item.
 * @property {boolean} scalePowerByDraw - Whether or not to scale the power by the draw length of the item.
 */


/**
 * @typedef {Object} ThrowableComponent
 * @property {boolean} doSwing Whether to play the swing animation when thrown.
 * @property {number} [launchScale] - Launch power scale. Default is set to 1.0.
 * @property {{max?:number,min?:number}} drawDuration - How long this item can draw for, default is 0.
 * @property {number} launchPower - Launch power of this item.
 * @property {boolean} scalePowerByDraw - Whether or not to scale the power by the draw length of the item.
 * /
/**
 * @typedef {Object} ItemComponents
 * @property {RepairableComponent} [Repairable]- The repariable component
 * @property {boolean} [IsHiddenInCommands=false] - Whether the item is hidden in commands.
 * @property {string} [Category] - The category of the item.
 * @property {string} [Group] - The group of the item.
 * @property {boolean} [AllowOffHand] - Whether the item can be used in the offhand.
 * @property {BlockPlacerComponent} [BlockPlacer] - The block placer component.
 * @property {string} [DisplayName] - The display name of the item.
 * @property {CoolDownComponent} [CoolDown] - The cooldown of the item.
 * @property {number} [Damage] - The damage value of the item.
 * @property {DiggerComponent} [Digger] - The digger component.
 * @property {DurabilityComponent} [Durability] - The durability of the item.
 * @property {EnchantableComponent} [Enchantable] - Whether the item can be enchanted.
 * @property {string|{texture:string}} [Icon] - The icon component.
 * @property {EntityPlacerComponent} [EntityPlacer] - The entity placer component.
 * @property {FoodComponent} [Food] - The food component.
 * @property {FuelComponent} [Fuel] - The fuel component.
 * @property {boolean} [Glint] - Whether the item has a glint effect.
 * @property {boolean} [HandEquipped] - Whether the item is hand-equipped.
 * @property {string} [HoverTextColor] - The hover text color of the item.
 * @property {string} [InteractButton] - The interact button of the item.
 * @property {ItemStorageComponent} [ItemStorage] - The item storage component.
 * @property {boolean} [LiquidClipped] - Whether the item is liquid clipped.
 * @property {number} [MaxStackSize] - The maximum stack size of the item.
 * @property {ProjectileComponent} [Projectile] - The projectile component.
 * @property {RecordComponent} [Record] - The record component.
 * @property {RepairableComponent} [Repairable] - Whether the item is repairable.
 * @property {ShooterComponent} [Shooter] - The shooter component.
 * @property {boolean} [ShouldDespawn] - Whether the item should despawn.
 * @property {boolean} [StackedByData] - Whether the item is stacked by data.
 * @property {ThrowableComponent} [Throwable] - Whether the item is throwable.
 * @property {boolean} [UseAnimation] - The use animation of the item.
 * @property {boolean} [UseDuration] - The use duration of the item.
 * @property {WearableComponent} [Wearable] - Whether the item is wearable.
 */



/**
 * Represents an item definition in Bedrock Edition.
 * @class
 */
class Item {
	/**
	 * Static data for the item.
	 * @type {Object}
	 * @private
	 */
	static __Data = {
		"format_version": config.item["version"],
		"minecraft:item": {
			"description": {
				"identifier": `${config["prefix"]}:${this.name.toLowerCase()}`,
				"category": "none"
			},
			"components": {},
		},
	};

	/**
	 * Components of the item.
	 * @type {ItemComponents}
	 * @private
	 */
	static __components = this.__Data["minecraft:item"]["components"];

	/**
	 * Indicates whether the item is hidden in commands.
	 * @type {boolean}
	 */
	static IsHiddenInCommands = false;

	/**
	 * Category of the item.
	 * @type {string}
	 */
	static Category;

	/**
	 * Group of the item.
	 * @type {string}
	 */
	static Group;

	/**
	 * Whether the item is allowed in the off-hand.
	 * @type {boolean}
	 */
	static AllowOffHand;

	/**
	 * Block placer component.
	 * @type {BlockPlacerComponent}
	 */
	static BlockPlacer;

	/**
	 * Display name of the item.
	 * @type {string}
	 */
	static DisplayName;


	/**
	 * Max Damage item has
	 * @type {number}
	 */
	static MaxDamage;

	/**
	 * Cooldown duration for the item.
	 * @type {CoolDownComponent}
	 */
	static CoolDown;

	/**
	 * Damage value of the item.
	 * @type {number}
	 */
	static Damage;

	/**
	 * Digger component for the item.
	 * @type {DiggerComponent}
	 */
	static Digger;

	/**
	 * Durability component for the item.
	 * @type {DurabilityComponent}
	 */
	static Durability;

	/**
	 * Enchantable component for the item.
	 * @type {EnchantableComponent}
	 */
	static Enchantable;

	/**
	 * Icon component for the item.
	 * @type {IconComponent}
	 */
	static Icon;

	/**
	 * Entity placer component for the item.
	 * @type {EntityPlacerComponent}
	 */
	static EntityPlacer;

	/**
	 * Food component for the item.
	 * @type {FoodComponent}
	 */
	static Food;

	/**
	 * Fuel component for the item.
	 * @type {FuelComponent}
	 */
	static Fuel;

	/**
	 * Glint property for the item.
	 * @type {boolean}
	 */
	static Glint;

	/**
	 * Hand equipped property for the item.
	 * @type {boolean}
	 */
	static HandEquipped;

	/**
	 * Hover text color property for the item.
	 * @type {string}
	 */
	static HoverTextColor;

	/**
	 * Interact button property for the item.
	 * @type {boolean}
	 */
	static InteractButton;

	/**
	 * Item storage component for the item.
	 * @type {ItemStorageComponent}
	 */
	static ItemStorage;

	/**
	 * Liquid clipped property for the item.
	 * @type {boolean}
	 */
	static LiquidClipped;

	/**
	 * Max stack size property for the item.
	 * @type {number}
	 */
	static MaxStackSize;

	/**
	 * Projectile component for the item.
	 * @type {ProjectileComponent}
	 */
	static Projectile;

	static Identifier;

	/**
	 * Record component for the item.
	 * @type {RecordComponent}
	 */
	static Record;

	/**
	 * Repairable component for the item.
	 * @type {RepairableComponent}
	 */
	static Repairable;

	/**
	 * Shooter component for the item.
	 * @type {ShooterComponent}
	 */
	static Shooter;

	/**
	 * Should despawn property for the item.
	 * @type {boolean}
	 */
	static ShouldDespawn;

	/**
	 * Stacked by data property for the item.
	 * @type {boolean}
	 */
	static StackedByData;

	/**
	 * Throwable component for the item.
	 * @type {ThrowableComponent}
	 */
	static Throwable;

	/**
	 * Use animation property for the item.
	 * @type {string}
	 */
	static UseAnimation;

	/**
	 * Use duration property for the item.
	 * @type {number}
	 */
	static UseDuration;

	/**
	 * Wearable component for the item.
	 * @type {WearableComponent}
	 */
	static Wearable;
	/**
	 * @CreatesItemObject
	 */
	static init() {
		this.__Data["minecraft:item"]["description"]["identifier"] = `${config["prefix"]}:${this.name.toLowerCase()}`
		this.Identifier = `${config["prefix"]}:${this.name.toLowerCase()}`
		/**
		 * @handleCategory
		 */
		if (this.Category) {
			if (typeof this.Category != "string") throw new Error(`[${this.name}] [component: Category]: expected type {string} instead found {${this.Category}}`);
			if (!validCategories.has(this.Category.toLowerCase())) throw new Error(`[${this.name}] [component: Category]: Invalid category "${this.Category}". Did you mean "${validCategories.getClosestMatch(this.Category)}"?`);
			this.__Data["minecraft:item"]["description"]["category"] = this.Category;
		}
		/**
		 * @handleDisplayName
		 */
		if (this.DisplayName) {
			if (typeof this.DisplayName != "string") throw new Error(`[${this.name}] [component: DisplayName]: expected type {string} instead found {${this.DisplayName}}`);
			this.__components["minecraft:display_name"] = {
				"value": this.DisplayName
			}
		}
		/**
		 * @handleDamage
		 */
		if (this.Damage) {
			if (typeof this.Damage != "number" || isNegative(this.Damage)) throw new Error(`[${this.name}] [component: Damage]: expected type {integer} greater than -1 instead found ${typeof this.DestroyTime}`)
			this.__components["minecraft:damage"] = this.Damage
		}
		/**
		 * @handleAllowOffHand
		 */
		if (this.AllowOffHand) {
			if (typeof this.AllowOffHand != "boolean") throw new Error(`[${this.name}] [component: AllowOffHand]: expected type {boolean} instead found {${typeof this.AllowOffHand}}`)
			this.__components["minecraft:allow_off_hand"] = this.AllowOffHand;
		}
		/**
		 * @handleBlockPlacer
		 */
		if (this.BlockPlacer) {
			if (typeof this.BlockPlacer != "object") throw new Error(`[${this.name}] [component: BlockPlacer]: expected type {object} instead found {${typeof this.BlockPlacer}}`)
			this.__components["minecraft:block_placer"] = {
				"block": this.BlockPlacer.block,
				"use_on": this.BlockPlacer.useOn
			};
		}
		/**
		 * @handleEntityPlacer
		 */
		if (this.EntityPlacer) {
			if (typeof this.EntityPlacer != "object") throw new Error(`[${this.name}] [component: EntityPlacer]: expected type {object} instead found {${typeof this.EntityPlacer}}`)
			this.__components['minecraft:entity_placer'] = {
				"entity": this.EntityPlacer.entity,
				"dispense_on": this.EntityPlacer.dispenseOn,
				"use_on": this.EntityPlacer.useOn
			}
		}
		/**
		 * @handleDigger
		 */
		if (this.Digger) {
			if (typeof this.Digger != "object") throw new Error(`[${this.name}] [component: Digger]: expected type {object} instead found {${typeof this.Digger}}`)
			this.__components['minecraft:digger'] = {
				"on_dig": ItemEventTriggerHandler(this.Digger.onDig, this.__Data, "OnDig", this),
				"use_efficiency": this.Digger.useEfficiency,
				"destroy_speeds": this.Digger.destroySpeed
			}
		}
		/**
		 * @handleRecord
		 */
		if (this.Record) {
			if (typeof this.Record != "object") throw new Error(`[${this.name}] [component: Record]: expected type {object} instead found {${typeof this.Record}}`)
			this.__components['minecraft:record'] = {
				"duration": this.Record.duration,
				"sound_event": this.Record.soundEvent,
				"comparator_signal": this.Record.comparatorSignal
			}
		}
		/**
		 * @handleProjectile
		 */
		if (this.Projectile) {
			if (typeof this.Projectile != "object") throw new Error(`[${this.name}] [component: Projectile]: expected type {object} instead found {${typeof this.Projectile}}`)
			this.__components['minecraft:projectile'] = {
				"critical_power": this.Projectile.criticalPower,
				"projectile_entity": this.Projectile.projectileEntity
			}
		}
		/**
		 * @handleShooter
		 */
		if (this.Shooter) {
			if (typeof this.Shooter != "object") throw new Error(`[${this.name}] [component: Shooter]: expected type {object} instead found {${typeof this.Shooter}}`)
			this.__components['minecraft:shooter'] = {
				"ammunition": this.Shooter.ammunition,
				"charge_on_draw": this.Shooter.chargeOnDraw ?? false,
				"max_draw_duration": this.Shooter.drawDuration ?? 0,
				"launch_power_scale": this.Shooter.launchScale ?? 1,
				"max_launch_power": this.Shooter.launchPower ?? 1,
				"scale_power_by_draw_duration": this.Shooter.scalePowerByDraw ?? false
			}
		}
		/**
		 * @handleItemStorage
		 */
		if (this.ItemStorage) {
			if (typeof this.ItemStorage != "object") throw new Error(`[${this.name}] [component: ItemStorage]: expected type {object} instead found {${typeof this.ItemStorage}}`)
			this.__components['minecraft:item_storage'] = {
				"capacity": this.ItemStorage?.capacity ?? 64
			}
		}
		/**
		 * @handleFood
		 */
		if (this.Food) {
			if (typeof this.Food != "object") throw new Error(`[${this.name}] [component: Food]: expected type {object} instead found {${typeof this.Food}}`)
			this.__components['minecraft:food'] = {
				"nutrition": this.Food.nutrition,
				"saturation_modifier": this.Food.saturationModifier,
				"can_always_eat": this.Food.canAlwaysEat,
				"on_consume": ItemEventTriggerHandler(this.Food.onConsume, this.__Data, "OnConsume", this),
				"using_converts_to": this.Food.onUseConvertTo
			}
		}
		/**
		 * @handleFuel
		 */
		if (this.Fuel) {
			if (typeof this.Fuel != "object") throw new Error(`[${this.name}] [component: Fuel]: expected type {object} instead found {${typeof this.Fuel}}`)
			this.__components['minecraft:fuel'] = {
				"duration": this.Fuel.duration
			}
		}
		/**
		 * @handleRepairable
		 */
		if (this.Repairable) {
			if (typeof this.Repairable != "object") throw new Error(`[${this.name}] [component: Repairable]: expected type {object} instead found {${typeof this.Repairable}}`)
			this.__components['minecraft:repairable'] = {
				"repair_items": this.Repairable.repairItems,
				"on_repair": ItemEventTriggerHandler(this.Repairable.OnRepair, this.__Data, "OnRepair", this)
			}
		}
		/**
		 * @handleEnchantable
		 */
		if (this.Enchantable) {
			if (typeof this.Enchantable != "object") throw new Error(`[${this.name}] [component: AllowOffHand]: expected type {boolean} instead found {${typeof this.AllowOffHand}}`)
			this.__components['minecraft:enchantable'] = {
				"value": this.Enchantable.value,
				"slot": this.Enchantable.slot
			};
		}
		/**
		 * @handleDurability
		 */
		if (this.Durability) {
			if (typeof this.Durability != "object") throw new Error(`[${this.name}] [component: Durability]: expected type {object} instead found {${typeof this.AllowOffHand}}`)
			this.__components['minecraft:durability'] = {
				"damage_chance": this.Durability.damageChance,
				"max_duration": this.Durability.durability
			};
		}
		/**
		 * @handleIcon
		 */
		if (this.Icon) {
			if (typeof this.Icon != ("string" || "object")) throw new Error(`[${this.name}] [component: Icon]: expected type {object} or {string} instead found {${typeof this.Icon}}`)
			this.__components['minecraft:icon'] = this.Icon
		}
		/**
		 * @handleShouldDespawn
		 */
		if (this.ShouldDespawn) {
			if (typeof this.ShouldDespawn != "boolean") throw new Error(`[${this.name}] [component: ShouldDespawn]: expected type {boolean} instead found {${typeof this.ShouldDespawn}}`)
			this.__components['minecraft:should_despawn'] = this.ShouldDespawn
		}
		/**
		 * @handleStackedByData
		 */
		if (this.StackedByData) {
			if (typeof this.StackedByData != "boolean") throw new Error(`[${this.name}] [component: StackedByData]: expected type {boolean} instead found {${typeof this.StackedByData}}`)
			this.__components['minecraft:stacked_by_data'] = this.StackedByData
		}
		/**
		 * @handleThrowable
		 */
		if (this.Throwable) {
			if (typeof this.Throwable != "object") throw new Error(`[${this.name}] [component: Throwable]: expected type {object} instead found {${typeof this.Throwable}}`)
			this.__components['minecraft:throwable'] = {
				"do_swing_animation": this.Throwable?.doSwing ?? false,
				"max_launch_power": this.Throwable?.launchPower ?? 1,
				"launch_power_scale": this.Throwable?.launchScale ?? 1,
				"max_draw_duration": this.Throwable.drawDuration?.max ?? 0,
				"min_draw_duration": this.Throwable.drawDuration?.min ?? 0,
				"scale_by_duration": this.Throwable?.scalePowerByDraw ?? false
			}
		}
		/**
		 * @handleCoolDown
		 */
		if (this.CoolDown) {
			if (typeof this.CoolDown != "object") throw new Error(`[${this.name}] [component: CoolDown]: expected type {object} instead found {${typeof this.CoolDown}}`)
			this.__components['minecraft:cooldown'] = {
				"duration": this.CoolDown.duration,
				"category": this.CoolDown.category
			}
		}
		/**
		 * @handleUseAnimation
		 */
		if (this.UseAnimation) {
			if (typeof this.UseAnimation != "string") throw new Error(`[${this.name}] [component: UseAnimation]: expected type {string} instead found {${typeof this.UseAnimation}}`)
			this.__components['minecraft:use_animation'] = this.UseAnimation
		}
		/**
		 * @handleUseDuration
		 */
		if (this.UseDuration) {
			if (typeof this.UseDuration != "number") throw new Error(`[${this.name}] [component: UseDuration]: expected type {number} instead found {${typeof this.UseDuration}}`)
			this.__components['minecraft:use_duration'] = this.UseDuration
		}
		/**
		 * @handleWearable
		 */
		if (this.Wearable) {
			if (typeof this.Wearable != "object") throw new Error(`[${this.name}] [component: Wearable]: expected type {object} instead found {${typeof this.Wearable}}`)
			this.__components['minecraft:wearable'] = {
				"slot": this.Wearable.slot,
				"protection": this.Wearable.protection,
				"dispensable": this.Wearable.dispensable
			}
		}
		/**
		 * @handleGlint
		 */
		if (this.Glint) {
			if (typeof this.Glint != "boolean") throw new Error(`[${this.name}] [component: Glint]: expected type {boolean} instead found {${typeof this.Glint}}`)
			this.__components['minecraft:glint'] = this.Glint
		}
		/**
		 * @handleHandEquipped
		 */
		if (this.HandEquipped) {
			if (typeof this.HandEquipped != "boolean") throw new Error(`[${this.name}] [component: HandEquipped]: expected type {boolean} instead found {${typeof this.HandEquipped}}`)
			this.__components['minecraft:hand_equipped'] = this.HandEquipped
		}
		/**
		 * @handleHoverTextColor
		 */
		if (this.HoverTextColor) {
			if (typeof this.HoverTextColor != "string") throw new Error(`[${this.name}] [component: HoverTextColor]: expected type {string} instead found {${typeof this.HoverTextColor}}`)
			this.__components['minecraft:hover_text_color'] = this.HoverTextColor;
		}
		/**
		 * @handleInteractButton
		 */
		if (this.InteractButton) {
			if (typeof this.InteractButton != "boolean") throw new Error(`[${this.name}] [component: InteractButton]: expected type {boolean} instead found {${typeof this.InteractButton}}`)
			this.__components['minecraft:interact_button'] = this.InteractButton;
		}
		/**
		 * @handleMaxStackSize
		 */
		if (this.MaxStackSize) {
			if (typeof this.MaxStackSize != "number") throw new Error(`[${this.name}] [component: MaxStackSize]: expected type {number} instead found {${typeof this.MaxStackSize}}`)
			this.__components['minecraft:max_stack_size'] = this.MaxStackSize;

		}
		/**
		 * @handleMaxDamage
		 */
		if (this.MaxDamage) {
			if (typeof this.MaxDamage != "number") throw new Error(`[${this.name}] [component: MaxDamage]: expected type {number} instead found {${typeof this.MaxDamage}}`)
			this.__components['minecraft:max_damage'] = this.MaxDamage;

		}
		return JSON.stringify(this.__Data);
	}

}

module.exports = {
	Item,
	Set

}