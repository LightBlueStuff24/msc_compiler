import type {
  int,
  float,
  bool,
  Vec3Array,
  ObjectStruct,
  path,
  Vec3,
} from "../../shared/types";
import type { RenderMethods, BlockFaces } from "../enums/BlockValues";
import {
  Direction,
  type Block,
  type Dimension,
  type Entity,
  type Player,
} from "@minecraft/server";

interface IBlockData {
  format_version: string;
  "minecraft:block": {
    description: {
      identifier: string;
    };
    components: ObjectStruct<string, ObjectStruct>;
    permutations: ObjectStruct<string, ObjectStruct>;
    events: ObjectStruct<string, ObjectStruct>;
  };
}

type IMaterialInstances = {
  [bone in BlockFaces]: {
    Texture: string;
    RenderMethod: RenderMethods;
    FaceDimming?: boolean;
    AmbientOcclusion?: boolean;
  };
};

interface ICollisionBox {
  Origin: Vec3Array;
  Size: Vec3Array;
}

interface ISelectionBox {
  Origin: Vec3Array;
  Size: Vec3Array;
}

interface IFlammable {
  CatchChanceModifier?: int;
  DestroyChanceModifier?: int;
}

interface IStates {
  [name: string]: int[] | bool[] | string[];
}

interface ITransformation {
  Scale: Vec3Array;
  Translation: Vec3Array;
  Rotation: Vec3Array;
}

interface IGeometry {
  Identifier: string;
  BoneVisibility: ObjectStruct<string, string | bool>;
}

interface ITickable {
  IntervalRange?: int[];
}

// Contains the components of the Block class
export class IBlockComponents {
  static DisplayName: string;

  static DestructableByMinining: int | bool;

  static DestructableByExplosion: int | bool;

  static Flammable: IFlammable | int[];

  static Friction: float;

  static MaterialInstances: IMaterialInstances;

  static MapColor: int[] | string;

  static Loot: path;

  static LightEmission: int;

  static LightDampening: int;

  static CollisionBox: ICollisionBox | bool;

  static SelectionBox: ISelectionBox | bool;

  static Geometry: IGeometry | string;

  static Transformation: ITransformation;

  static CustomComponents: IBlockComponents[];

  /**
   * Called when a player interacts with this block
   * @param block A in-game reference to this block
   * @param player The player that interacted with this block
   * @param dimension The dimension in which the event occured
   */
  static OnPlayerInteract(
    player: Player,
    face: Direction,
    faceLocation: Vec3,
    block: Block,
    dimension: Dimension
  ) {}

  /**
   * Called when a entity steps on this block
   * @param block A in-game reference to this block
   * @param entity The entity that stepped on this block
   * @param dimension The dimension in which the event occured
   */
  static OnStepOn(block: Block, entity: Entity, dimension: Dimension) {}

  /**
   * Called when a entity steps off this block
   * @param block A in-game reference to this block
   * @param entity The entity that stepped on this block
   * @param dimension The dimension in which the event occured
   */
  static OnStepOff(block: Block, entity: Entity, dimension: Dimension) {}

  /**
   * Called every time this block ticks. Use the {@link IBlockComponents.Tick Tick} component to configure the tick interval.
   * @param {Block} block - A reference to this in-game block.
   * @param {Dimension} dimension - The dimension in which the event occurred.
   */
  static OnTick(block: Block, dimension: Dimension) {}

  static OnEntityFallOn(
    entity: Entity,
    fallDistance: int,
    block: Block,
    dimension: Dimension
  ) {}

  static OnPlayerPlace(block: Block, dimension: Dimension, player: Player) {}

  static OnPlayerDestroy(block: Block, dimension: Dimension, player: Player) {}

  static Tick: ITickable;
}

export type {
  IMaterialInstances,
  IFlammable,
  IBlockData,
  IStates,
  ICollisionBox,
  ISelectionBox,
  ITickable,
  ITransformation,
  IGeometry,
};
