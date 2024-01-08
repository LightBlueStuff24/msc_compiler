const { isFloat } = require("../../Utils.js")
const config = require("../../msc.config.json");
class Entity {
    static #__Data = {
        "format_version":config.block.version,
        "minecraft:entity": {
            "description": {
                "identifier": "",
                "properties": {}
            },
            "components": {

            },
            "events":{}
        }
    }
    static __components = this.#__Data["minecraft:entity"].components
    static Properties;
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
    static init() {
        this.#__Data["minecraft:entity"].description.identifier = `${config.prefix}:${this.name}`
        for (const [cdata,cvalue] of Object.entries(this)){
            switch (cdata){
            case "Properties":
        
            break;
            
            case "ComponentGroups":
        
            break;
            
            case "IsSpawnable":
        
            break;
            
            case "IsSummonable":
        
            break;
            
            case "RuntimeID":
        
            break;
            
            case "Animations":
        
            break;
            
            case "Scripts":
        
            break;
            
            case "AddRider":
            
            break;
            
            case "AdmireItem":
        
            break;
            
            case "Ageable":
        
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