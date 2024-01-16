import { EntityRegistry } from "./Registries/EntityRegistry.js";

const { ItemRegistry } = require("./Registries/ItemRegistry.js");
const { SetMixin, StringMixin } = require("./utilities/exports_util.js");
const { validEntities, validateFormat, validateTypes, validItems, validateKeys } = require("./validationList.js");
const { Components } = require("./Component.js");
const { ME, isStringArray, isObjectArray } = require("./utilities/helpers.js")
const config = require("../../msc.config.json");
//Adds mixins for Set and String Constructor
Object.assign(Set.prototype, SetMixin)
Object.assign(String.prototype, StringMixin)

class Entity {
    static __Data = {
        "format_version": config.block.version,
        "minecraft:entity": {
            "description": {
                "identifier": "",
                "properties": {}
            },
            "component_groups": {},
            "components": {

            },
            "events": {}
        }
    }
    static __components = this.__Data["minecraft:entity"].components
    static __componentGroups = this.__Data["minecraft:entity"].component_groups
    static Properties;
    /**
     * @type {Object.<string,Components[]>}
     */
    static ComponentGroups
    static IsSpawnable;
    static IsSummonable;
    static RuntimeID;
    static Animations;
    static Scripts;
    static AddRider;
    static AdmireItem;
    static Ageable;
    static AngerLevel
    static Angry;
    static BreakDoor;
    static AttackArea;
    static AttackCooldown;
    static Barter;
    static BlockClimber
    static BlockSensor;
    static Boostable;
    static Boss;
    static BreakBlocks;
    static Breathable;
    static Breedable;
    static Bribeable;
    static Buoyant;
    static CanBurnInDayLight;
    static CanJoinRaid;
    static CelebrateHunt;
    static CollisionBox;
    static CombatRegeneration;
    static ConditionalBandwidthOptimization;
    static HitBoxs;
    static DamageOverTime;
    static DamgeSensor;
    static Dash;
    static Despawn;
    static DryOutTimer;
    static EconomicTradeTable;
    static EntitySensor;
    static EnviromentSensor;
    static EquipItem;
    static Equippable;
    static ExhaustionValues;
    static ExperienceReward;
    static Explodable;
    static Flocking;
    static MovementTrackingEventEmitters;
    static Genetics;
    static Giveable;
    static GroupSize;
    static GrowsCrop;
    static Healable;
    static HeartBeat;
    static Home;
    static HurtConditions;
    static InsideBlockNotifier;
    static Insomnia;
    static InstantlyDespawn;
    static Interact;
    static Inventory;
    static Hopper;
    static DynamicJumping;
    static Jump;
    static Leashable;
    static LookAt;
    static isWanderingTrader;
    static MobEffect;
    static AmphibiousMovement;
    static BasicMovement;
    static FlyingMovement;
    static GenericMovement;
    static HoveringMovement;
    static JumpMovement;
    static SkipingMovement;
    static SwayingMovement;
    static Nameable;
    static ClimbingNavigation;
    static FloatingNavigation;
    static FlyingNavigation;
    static GenericNavigation;
    static HoveringNavigation;
    static SwimmingNavigation;
    static WalkingNavigation;
    static OutOfControl;
    static Peek;
    static isPersistent;
    static Physics;
    static PreferredPath;
    static Projectile;
    static Pushable;
    static TriggerRaid;
    static RailMovement;
    static RailSensor;
    static WhenRavagerBlocked;
    static Rideable;
    static ScaleByAge;
    static Scheduler;
    static Shareables;
    static Shooter;
    static Sittable;
    static SpawnEntity;
    static Strength;
    static SuspectTracking;
    static Tameable;
    static TameMount;
    static SenseTargetNearby;
    static Teleport;
    static TickWorld;
    static Timer;
    static TradeTable;
    static Trail;
    static Transformation;
    static Trusting;
    static AutoStepMax;
    static DampensVibrations;
    static WaterMovement;
    static AmbientSoundInterval;
    static CanClimb;
    static CanFly;
    static CanPowerJump;
    static Color;
    static SecondColor;
    static DefaultLookAngle;
    static Equipment;
    static IsFireImmune;
    static FloatsInLiquid;
    static FlySpeed;
    static Friction;
    static GroundOffset;
    static InputControl;
    static IsBaby;
    static IsCharged;
    static IsChested;
    static IsDyeable;
    static IsHiddenWhenInvisible;
    static isIgnited;
    static IsIllagerCaptain;
    static IsPregnant;
    static IsSaddled;
    static IsShaking;
    static IsSheared;
    static IsStackable;
    static IsTamed;
    static ItemControllable;
    static Loot;
    static MarkVariant;
    static MovementSoundDistanceOffset;
    static PushThrough;
    static Scale;
    static SkinId;
    static SoundVolume;
    static TypeFamily;
    static Variant;
    static WalkAnimationSpeed;
    static WantsJockey;
    static Events;
    static init() {
        this.__Data["minecraft:entity"].description.identifier = `${config.prefix}:${this.name}`
        for (const [cdata, cvalue] of Object.entries(this)) {
            switch (cdata) {
                case "Properties":
                    if (typeof cvalue !== 'object') throw ME(this, cvalue, [cdata], "object")
                    for (const [key, value] of Object.entries(cvalue)) {
                        validateKeys(['Range', 'Values', 'Type', 'Default'], value, this, [cdata, key])
                        const { Type, Values, Range, Default } = value
                        if (typeof value !== 'object') throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}]: Expected an object for the value of key "${key}" instead found ${typeof value}`)
                        if (!value.hasOwnProperty("Type")) throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}] [subChild:Type]: The key "${key}" is missing the required property "Type"`);
                        if (!value.hasOwnProperty("Default")) throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}] [subChild:Default]: The key "${key}" is missing the required property "Default"`);
                        if (!((Range && Type === "enum") || (Range && Type === 'bool'))) throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}] [subChild:Range]: The key "${key}" is missing the required property "Range"`);
                        if (!validateFormat(key)) throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}]: Expected the format "identifier:propertyName" for the key "${key}" instead found ${key}`)
                        if (typeof value.Type !== 'string') throw ME(this, Type, [cdata, key, "Type"], "string")
                        //Checks if the type contradicts with the default and range values, Example: bool type is not supposed to have range property and a type that is not enum is not supposed to have a Values property
                        if (
                            (typeof Default === 'string' && !Range && Values && Type !== "enum") || (typeof Default === 'boolean' && Range && Type !== "bool")
                        ) throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}] [subChild:Type]: Type '${Type}' is incompatible with the specified default '${Default}' and range '${Range}' values. Please ensure consistency between the Type, default, and range values`);
                        if (!Array.isArray(Range)) throw ME(this, Range, [cdata, key, "Range"], "number[]")

                        let propertyDef = this.__Data["minecraft:entity"].description.properties[key] = {
                            "type": Type,
                            "default": Default
                        };

                        if (Type == 'enum' && Values) {
                            propertyDef['values'] = Values
                        }

                        if (Type == 'int' && Range) {
                            propertyDef['range'] = Range
                        }

                    }
                    break;

                case "ComponentGroups":
                    if (typeof cvalue !== 'object') throw ME(this, cvalue, [cdata], "object");
                    for (const [key, value] of Object.entries(cvalue)) {
                        if (!validateFormat(key)) throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}]: Expected the format "customIdentifier:propertyName" for the key "${key}" instead found ${key}.`)
                        if (!Array.isArray(value)) throw ME(this, value, [cdata, key], "Component[]")
                        this.__componentGroups[key] = {
                            ...(value.map(component => component.init()))
                        }
                    }
                    break;

                case "IsSpawnable":
                    if (typeof cvalue !== 'boolean') throw ME(this, cvalue, [cdata], "boolean");
                    this.__Data["minecraft:entity"].description["is_spawnable"] = cvalue
                    break;

                case "IsSummonable":
                    if (typeof cvalue !== 'boolean') throw ME(this, cvalue, [cdata], "boolean");
                    this.__Data["minecraft:entity"].description["is_summonable"] = cvalue
                    break;

                case "RuntimeID":
                    if (typeof cvalue !== 'string') throw ME(this, cvalue, [cdata], "string");
                    const closestMatch = validEntities.getClosestMatch(cvalue)
                    if (!validEntities.has(cvalue)) throw new Error(`[${this.name}] [component: ${cdata}]: ${cvalue} is not a valid ID. ${closestMatch === null ? "Check the Docs for info" : `Did you mean ${closestMatch}`}`)
                    this.__Data["minecraft:entity"].description["runtime_identifier"] = cvalue
                    break;

                case "Animations":
                    if (typeof cvalue !== 'object') throw ME(this, cvalue, [cdata], "object");
                    for (const [key, value] of Object.entries(cvalue)) {
                        validateTypes(['string'], [key, value], [cdata, key], this)
                        this.__Data["minecraft:entity"].description["animations"][key] = value
                    }
                    break;

                case "Scripts":
                    if (typeof cvalue !== 'object') throw ME(this, cvalue, [cdata], "object");
                    validateKeys(['Animate'], cvalue, this, cdata)
                    const [key, value] = Object.entries(cvalue)[0]
                    if (!isStringArray(value)) throw ME(this, value, [cdata, key], "string[]")
                    const animKeysSet = new Set(Object.keys(this.Animations));
                    value.forEach(element => {
                        if (!animKeysSet.has(element)) {
                            const closestMatch = animKeysSet.getClosestMatch(element);
                            throw new Error(`[${this.name}] [component: ${cdata}] [child:${key}]: The value '${element}' could not be found in Animations. ${closestMatch === null ? "Did you forget to add it?" : `Did you mean ${closestMatch}`}`);
                        }
                    });
                    this.__Data["minecraft:entity"].description["scripts"] = {
                        [key.toLowerCase()]: value
                    }
                    break;

                case "AddRider":
                    if (!this.Rideable) {
                        throw new Error(`[${this.name}] [component: ${cdata}]: This component requires the Rideable component. Please go back and add that`);
                    }

                    if (typeof cvalue !== 'object') {
                        throw ME(this, cvalue, [cdata], "object");
                    }

                    validateKeys(['SpawnEvent', 'EntityType'], cvalue, this, cdata)
                    validateTypes(['string'], [cvalue], [cdata], this)
                    const { SpawnEvent, EntityType } = cvalue;
                    let __AddRider = {};

                    if (SpawnEvent) {
                        const eventsSet = new Set(Object.keys(this.Events));
                        if (!eventsSet.has(SpawnEvent)) {
                            const closestMatch = eventsSet.getClosestMatch(SpawnEvent);
                            throw new Error(`[${this.name}] [component: ${cdata}] [child:SpawnEvent]: The value '${SpawnEvent}' could not be found in Events. ${closestMatch === null ? "Did you forget to add it?" : `Did you mean ${closestMatch}`}`);
                        }
                        __AddRider.spawn_event = SpawnEvent;
                    }

                    if (EntityType) {
                        if (!validEntities.has(EntityType) && EntityRegistry.hasEntry(EntityType))
                            __AddRider.entity_types = EntityType;
                    }

                    this.__components["minecraft:addrider"] = __AddRider;
                    break;



                case "AdmireItem":
                    if (typeof cvalue !== 'object') throw ME(this, cvalue, [cdata], "object");
                    let __AdmireItem = {}
                    // Checks if the object does not have unknown or incorrect keys
                    validateKeys(['Duration', 'CoolDownAfterAttack'], cvalue, this, cdata);
                    validateTypes(['number'], [cvalue], [cdata], this)
                    const { Duration: AdmireItemDuration, CooldownAfterAttack } = cvalue
                    if (Duration) {
                        __AdmireItem['duration'] = AdmireItemDuration
                    }
                    if (CooldownAfterAttack) {
                        __AdmireItem['cooldown_after_being_attacked'] = CooldownAfterAttack
                    }
                    this.__components["minecraft:admire_item"] = __AdmireItem
                    break;

                case "Ageable":
                    if (typeof cvalue !== 'object') throw ME(this, cvalue, [cdata], "object");
                    let __Ageable = {}
                    let __FeedItems = []
                    validateKeys(['ItemsToDrop', 'TransformToItem', 'Duration', 'OnGrowUp', 'FeedItems'], cvalue, this, cdata)
                    const itemRegistrySet = new Set(ItemRegistry.Registries.map(item => item.Identifier));
                    const { OnGrowUp, Duration, FeedItems, TransformToItem, ItemsToDrop } = cvalue
                    validateTypes(['object', 'number', 'string'], [OnGrowUp, Duration, TransformToItem], [cdata, key], this);
                    // TODO: Add in event handler(filters is going to be a pain)
                    if (OnGrowUp) {

                    }

                    if (Duration) {
                        __Ageable["duration"] = Duration
                    }
                    if (FeedItems) {
                        if (!(isStringArray(FeedItems) || isObjectArray(FeedItems))) {
                            throw ME(this, FeedItems, [cdata, "FeedItems"], "string[] | object[]");
                        }
                        if (isStringArray(FeedItems)) {
                            const cleanedValue = FeedItems.map(val => val.clean())
                            for (const item of cleanedValue) {
                                if (!validItems.has(item) || !ItemRegistry.hasEntry(item)) {
                                    const closestMatch = validItems.getClosestMatch(item);
                                    const closestRegistryMatch = itemRegistrySet.getClosestMatch(item)
                                    throw new Error(`[${this.name}] [component: ${cdata}] [child:FeedItems]: The value '${value}' in key "${key}" could not be found in the registry. ${closestMatch === null ? closestRegistryMatch === null ? "Did you forget to add it?" : `Did you mean ${closestRegistryMatch}` : `Did you mean ${closestMatch}`}`);
                                }
                            }
                            __FeedItems = FeedItems
                        } else {
                            FeedItems.forEach(obj => {
                                validateKeys(['Item', 'GrowthAmount'], obj, this, [cdata, "FeedItems"]);
                                const { Item, GrowthAmount } = obj;
                                validateTypes(['number', 'string | object'], [GrowthAmount, Item], [cdata, "FeedItems"], this);
                                let itemObj = {};
                                if (typeof Item === 'object') {
                                    const { AnyTag } = Item;
                                    validateKeys(['AnyTag'], Item, this, [cdata, "FeedItems", "Items"]);
                                    if (AnyTag) {
                                        if (!Array.isArray(AnyTag)) {
                                            throw ME(this, AnyTag, [cdata, "FeedItems", "Items", "AnyTag"], 'string[]');
                                        }
                                        itemObj = { 'item': { 'any_tag': AnyTag } };
                                    }
                                }
                                itemObj = { 'item': Item };
                                if (GrowthAmount) {
                                    itemObj['growth_amount'] = GrowthAmount;
                                }

                                __FeedItems.push(itemObj);
                            });

                        }
                        __Ageable["feed_items"] = __FeedItems
                    }

                    if (ItemsToDrop) {
                        if (!(isStringArray(ItemsToDrop))) {
                            throw ME(this, ItemsToDrop, [cdata, "ItemsToDrop"], "string[]");
                        }
                        const cleanedValue = ItemsToDrop.map(val => val.clean())
                        for (const item of cleanedValue) {
                            if (!validItems.has(item) || !ItemRegistry.hasEntry(item)) {
                                const closestMatch = validItems.getClosestMatch(item);
                                const closestRegistryMatch = itemRegistrySet.getClosestMatch(item)
                                throw new Error(`[${this.name}] [component: ${cdata}] [child:ItemsToDrop]: The element "${item}" could not be found in the registry. ${closestMatch === null ? closestRegistryMatch === null ? "Did you forget to add it?" : `Did you mean ${closestRegistryMatch}` : `Did you mean ${closestMatch}`}`);
                            }
                        }
                        __Ageable['drop_items'] = ItemsToDrop
                    }

                    if (TransformToItem) {
                        validateTypes(['string'], [TransformToItem], [cdata, "TransformToItem"], this);
                        if (!validItems.has(TransformToItem) || !ItemRegistry.hasEntry(TransformToItem)) {
                            const closestMatch = validItems.getClosestMatch(TransformToItem);
                            const closestRegistryMatch = itemRegistrySet.getClosestMatch(TransformToItem)
                            throw new Error(`[${this.name}] [component: ${cdata}] [child:TransformToItem]: The item "${TransformToItem}" could not be found in the registry. ${closestMatch === null ? closestRegistryMatch === null ? "Did you forget to add it?" : `Did you mean ${closestRegistryMatch}` : `Did you mean ${closestMatch}`}`);
                        }
                        __Ageable['transform_to_item'] = TransformToItem
                    }
                    this.__components['minecraft:ageable'] = __Ageable
                    break;

                case "AngerLevel":

                    break;

                case "Angry":

                    break;

                case "BreakDoor":

                    break;

                case "AttackArea":

                    break;

                case "AttackCooldown":

                    break;

                case "Barter":

                    break;

                case "BlockClimber":

                    break;

                case "BlockSensor":

                    break;

                case "Boostable":

                    break;

                case "Boss":

                    break;

                case "BreakBlocks":

                    break;

                case "Breathable":

                    break;

                case "Breedable":

                    break;

                case "Bribeable":

                    break;

                case "Buoyant":

                    break;

                case "CanBurnInDayLight":

                    break;

                case "CanJoinRaid":

                    break;

                case "CelebrateHunt":

                    break;

                case "CollisionBox":

                    break;

                case "CombatRegeneration":

                    break;

                case "ConditionalBandwidthOptimization":

                    break;

                case "HitBoxs":

                    break;

                case "DamageOverTime":

                    break;

                case "DamgeSensor":

                    break;

                case "Dash":

                    break;

                case "Despawn":

                    break;

                case "DryOutTimer":

                    break;

                case "EconomicTradeTable":

                    break;

                case "EntitySensor":

                    break;

                case "EnviromentSensor":

                    break;

                case "EquipItem":

                    break;

                case "Equippable":

                    break;

                case "ExhaustionValues":

                    break;

                case "ExperienceReward":

                    break;

                case "Explodable":

                    break;

                case "Flocking":

                    break;

                case "MovementTrackingEventEmitters":

                    break;

                case "Genetics":

                    break;

                case "Giveable":

                    break;

                case "GroupSize":

                    break;

                case "GrowsCrop":

                    break;

                case "Healable":

                    break;

                case "HeartBeat":

                    break;

                case "Home":

                    break;

                case "HurtConditions":

                    break;

                case "InsideBlockNotifier":

                    break;

                case "Insomnia":

                    break;

                case "InstantlyDespawn":

                    break;

                case "Interact":

                    break;

                case "Inventory":

                    break;

                case "Hopper":

                    break;

                case "DynamicJumping":

                    break;

                case "Jump":

                    break;

                case "Leashable":

                    break;

                case "LookAt":

                    break;

                case "isWanderingTrader":

                    break;

                case "MobEffect":

                    break;

                case "AmphibiousMovement":

                    break;

                case "BasicMovement":

                    break;

                case "FlyingMovement":

                    break;

                case "GenericMovement":

                    break;

                case "HoveringMovement":

                    break;

                case "JumpMovement":

                    break;

                case "SkipingMovement":

                    break;

                case "SwayingMovement":

                    break;

                case "Nameable":

                    break;

                case "ClimbingNavigation":

                    break;

                case "FloatingNavigation":

                    break;

                case "FlyingNavigation":

                    break;

                case "GenericNavigation":

                    break;

                case "HoveringNavigation":

                    break;

                case "SwimmingNavigation":

                    break;

                case "WalkingNavigation":

                    break;

                case "OutOfControl":

                    break;

                case "Peek":

                    break;

                case "isPersistent":

                    break;

                case "Physics":

                    break;

                case "PreferredPath":

                    break;

                case "Projectile":

                    break;

                case "Pushable":

                    break;

                case "TriggerRaid":

                    break;

                case "RailMovement":

                    break;

                case "RailSensor":

                    break;

                case "WhenRavagerBlocked":

                    break;

                case "Rideable":

                    break;

                case "ScaleByAge":

                    break;

                case "Scheduler":

                    break;

                case "Shareables":

                    break;

                case "Shooter":

                    break;

                case "Sittable":

                    break;

                case "SpawnEntity":

                    break;

                case "Strength":

                    break;

                case "SuspectTracking":

                    break;

                case "Tameable":

                    break;

                case "TameMount":

                    break;

                case "SenseTargetNearby":

                    break;

                case "Teleport":

                    break;

                case "TickWorld":

                    break;

                case "Timer":

                    break;

                case "TradeTable":

                    break;

                case "Trail":

                    break;

                case "Transformation":

                    break;

                case "Trusting":

                    break;

                case "AutoStepMax":

                    break;

                case "DampensVibrations":

                    break;

                case "WaterMovement":

                    break;

                case "AmbientSoundInterval":

                    break;

                case "CanClimb":

                    break;

                case "CanFly":

                    break;

                case "CanPowerJump":

                    break;

                case "Color":

                    break;

                case "SecondColor":

                    break;

                case "DefaultLookAngle":

                    break;

                case "Equipment":

                    break;

                case "IsFireImmune":

                    break;

                case "FloatsInLiquid":

                    break;

                case "FlySpeed":

                    break;

                case "Friction":

                    break;

                case "GroundOffset":

                    break;

                case "InputControl":

                    break;

                case "IsBaby":

                    break;

                case "IsCharged":

                    break;

                case "IsChested":

                    break;

                case "IsDyeable":

                    break;

                case "IsHiddenWhenInvisible":

                    break;

                case "isIgnited":

                    break;

                case "IsIllagerCaptain":

                    break;

                case "IsPregnant":

                    break;

                case "IsSaddled":

                    break;

                case "IsShaking":

                    break;

                case "IsSheared":

                    break;

                case "IsStackable":

                    break;

                case "IsTamed":

                    break;

                case "ItemControllable":

                    break;

                case "Loot":

                    break;

                case "MarkVariant":

                    break;

                case "MovementSoundDistanceOffset":

                    break;

                case "PushThrough":

                    break;

                case "Scale":

                    break;

                case "SkinId":

                    break;

                case "SoundVolume":

                    break;

                case "TypeFamily":

                    break;

                case "Variant":

                    break;

                case "WalkAnimationSpeed":

                    break;

                case "WantsJockey":

                    break;

            }
        }
    }


}