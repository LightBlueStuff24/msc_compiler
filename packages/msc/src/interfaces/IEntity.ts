import { Entity } from "../classes/base/Entity";
import { EntityIdentifiers, PropertyType } from "../enums/EntityValues";
import { ObjectStruct, bool, float, int } from "../utilities/typedef";

interface IProperty {
  Type: PropertyType;
  Default: any;
  Values?: any[];
  Range?: (int | float)[];
  SyncWithClient: bool;
}

interface IScripts {
  Animate: string[];
}

interface IAddRider {
  SpawnEvent?: string;
  EntityType?: EntityIdentifiers;
}

interface IAdmireItem {
  Duration: number;
  CooldownAfterBeingAttacked?: number;
}

interface IAgeable {
  Duration: number;
  FeedItems?: (string | IFeedItem)[];
  DropItems?: string[];
  TransformToItem?: string;
}

interface IFeedItem {
  Item: string;
  GrowthAmount?: number;
  AnyTag?: string[];
}

export class IEntityComponents {
  public static Properties: ObjectStruct<string, IProperty>;
  public static ComponentGroups: ObjectStruct<
    string,
    IEntityComponents | IEntityComponents[]
  >;
  public static IsSpawnable: bool;
  public static IsSummonable: bool;
  public static RuntimeId: EntityIdentifiers;
  public static Animations: ObjectStruct<string, string>;
  public static Scripts: IScripts;
  public static AddRider: IAddRider;
  public static AdmireItem: IAdmireItem;
  public static Ageable: IAgeable;
  public static AngerLevel;
  public static Angry;
  public static BreakDoor;
  public static AttackArea;
  public static AttackCooldown;
  public static Barter;
  public static BlockClimber;
  public static BlockSensor;
  public static Boostable;
  public static Boss;
  public static BreakBlocks;
  public static Breathable;
  public static Breedable;
  public static Bribeable;
  public static Buoyant;
  public static CanBurnInDayLight;
  public static CanJoinRaid;
  public static CelebrateHunt;
  public static CollisionBox;
  public static CombatRegeneration;
  public static ConditionalBandwidthOptimization;
  public static HitBoxs;
  public static DamageOverTime;
  public static DamgeSensor;
  public static Dash;
  public static Despawn;
  public static DryOutTimer;
  public static EconomicTradeTable;
  public static EntitySensor;
  public static EnviromentSensor;
  public static EquipItem;
  public static Equippable;
  public static ExhaustionValues;
  public static ExperienceReward;
  public static Explodable;
  public static Flocking;
  public static MovementTrackingEventEmitters;
  public static Genetics;
  public static Giveable;
  public static GroupSize;
  public static GrowsCrop;
  public static Healable;
  public static HeartBeat;
  public static Home;
  public static HurtConditions;
  public static InsideBlockNotifier;
  public static Insomnia;
  public static InstantlyDespawn;
  public static Interact;
  public static Inventory;
  public static Hopper;
  public static DynamicJumping;
  public static Jump;
  public static Leashable;
  public static LookAt;
  public static isWanderingTrader;
  public static MobEffect;
  public static AmphibiousMovement;
  public static BasicMovement;
  public static FlyingMovement;
  public static GenericMovement;
  public static HoveringMovement;
  public static JumpMovement;
  public static SkipingMovement;
  public static SwayingMovement;
  public static Nameable;
  public static ClimbingNavigation;
  public static FloatingNavigation;
  public static FlyingNavigation;
  public static GenericNavigation;
  public static HoveringNavigation;
  public static SwimmingNavigation;
  public static WalkingNavigation;
  public static OutOfControl;
  public static Peek;
  public static isPersistent;
  public static Physics;
  public static PreferredPath;
  public static Projectile;
  public static Pushable;
  public static TriggerRaid;
  public static RailMovement;
  public static RailSensor;
  public static WhenRavagerBlocked;
  public static Rideable;
  public static ScaleByAge;
  public static Scheduler;
  public static Shareables;
  public static Shooter;
  public static Sittable;
  public static SpawnEntity;
  public static Strength;
  public static SuspectTracking;
  public static Tameable;
  public static TameMount;
  public static SenseTargetNearby;
  public static Teleport;
  public static TickWorld;
  public static Timer;
  public static TradeTable;
  public static Trail;
  public static Transformation;
  public static Trusting;
  public static AutoStepMax;
  public static DampensVibrations;
  public static WaterMovement;
  public static AmbientSoundInterval;
  public static CanClimb;
  public static CanFly;
  public static CanPowerJump;
  public static Color;
  public static SecondColor;
  public static DefaultLookAngle;
  public static Equipment;
  public static IsFireImmune;
  public static FloatsInLiquid;
  public static FlySpeed;
  public static Friction;
  public static GroundOffset;
  public static InputControl;
  public static IsBaby;
  public static IsCharged;
  public static IsChested;
  public static IsDyeable;
  public static IsHiddenWhenInvisible;
  public static isIgnited;
  public static IsIllagerCaptain;
  public static IsPregnant;
  public static IsSaddled;
  public static IsShaking;
  public static IsSheared;
  public static IsStackable;
  public static IsTamed;
  public static ItemControllable;
  public static Loot;
  public static MarkVariant;
  public static MovementSoundDistanceOffset;
  public static PushThrough;
  public static Scale;
  public static SkinId;
  public static SoundVolume;
  public static TypeFamily;
  public static Variant;
  public static WalkAnimationSpeed;
  public static WantsJockey;
}

export {
  IScripts
}