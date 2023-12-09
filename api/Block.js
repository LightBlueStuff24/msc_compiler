const { isFloat } = require("../Utils.js")
const config = require("../msc.config.json");
const { validCategories, validGroups } = require('./Type.js')
const { BlockEventTriggerHandler, HandlePermCondition } = require('./Handler.js');
const Fuse = require('fuse.js');
Set.prototype.getClosestMatch = function (string) {
	const fuse = new Fuse(Array.from(this), {
		shouldSort: true,
		threshold: 0.6,
	});
	const result = fuse.search(string);
	return result.length > 0 ? result[0].item : null;
};


/**
 * @typedef {object} Flammable
 * @property {number} CatchChanceModifier
 * @property {number} DestroyChanceModifier
 */

class Block {
  /**
   * @private
   */
  static __Data = {
    "format_version": config["block"]["version"],
    "minecraft:block": {
      "description": {
        "identifier": "",
        "menu_category": {}
      },
      "components": {}
    }
  };
  /**
   * @private
   */
  static __components = this.__Data["minecraft:block"]["components"];
  /**
   * @BlockData
   */

  static Category;
  static Group;
  static IsHiddenInCommands;
  static DisplayName;
  static DestroyTime;
  static ExplosionResistance;
  static Friction;
  /**
   * @type {Flammable}
   */
  static Flammable;
  static Material;
  static LightEmmision;
  static LightDampening;
  static Geometry;
  static BoneVisibility;
  static PlacementFilter;
  static Transformation;
  static Loot;
  static MapColor;
  static CollisionBox;
  static SelectionBox;

  /**
   * @BlockEventTriggers
   */
  static OnStepOn;
  static OnStepOff;
  static OnInteract;
  static OnFallOn;
  static OnPlayerPlacing;
  static OnPlaced;
  static OnPlayerDestroyed;
  static QueuedTicking;
  static RandomTicking;
  /**
   * @BlockStatesAndPermutationss
   */
  static States;
  static Permutations;


  /**
   * @CreatesBlockObject
   */
  static init() {
    this.__Data["minecraft:block"]["description"]["identifier"] = `${config["prefix"]}:${this.name.toLowerCase()}`
    /**
     * @handleCategory
     */
    if (this.Category) {
      if (typeof this.Category != "string") return new Error(`[${this.name}] [component: Category]: expected type {string} instead found {${this.Category}}`);
      if (!validCategories.has(this.Category.toLowerCase())) throw new Error(`[${this.name}] [component: Category]: Invalid category "${this.Category}". Did you mean "${validCategories.getClosestMatch(this.Category)}"?`);
      this.__Data["minecraft:block"].description.menu_category.category = this.Category;
    }
    /**
     * @handleGroup
     */
    if (this.Group) {
      if (typeof this.Group != "string") return new Error(`[${this.name}] [component: Group]: expected type {string} instead found {${this.Group}}`);
      if (!validGroups.has(this.Group.toLowerCase())) throw new Error(`[${this.name}] [component: Group]: Invalid category "${this.Group}". Did you mean "${validGroups.getClosestMatch(this.Group)}"?`);
      this.__Data["minecraft:block"].description.menu_category.group = this.Group;
    }
    /**
     * @handleIsHiddenInCommands
     */
    if (this.IsHiddenInCommands) {
      if (typeof this.IsHiddenInCommands != "boolean") return new Error(`[${this.name}] [component: IsHiddenInCommands]: expected type {boolean} instead found {${typeof this.IsHiddenInCommands}}`)
      this.__Data["minecraft:block"].description.menu_category.is_hidden_in_commands = this.IsHiddenInCommands;
    }
    /**
     * @handleDisplayName
     */
    if (this.DisplayName) {
      if (typeof this.DisplayName == "string") {
        this.__components["minecraft:display_name"] = this.DisplayName;
      }
      else return new Error(`[${this.name}] [component: DisplayName]: expected type {string} instead found {${this.DisplayName}}`);
    }
    /**
     * @handleDestroytime
     */
    if (this.DestroyTime) {
      switch (typeof this.DestroyTime) {
        case "boolean": this.__components["minecraft:destructible_by_mining"] = this.DestroyTime; break;
        case "number": this.__components["minecraft:destructible_by_mining"] = { explosion_resistance: this.DestroyTime }; break;
        default: return new Error(`[${this.name}] [component: DestroyTime]: expected type {boolean|integer} instead found {${typeof this.DestroyTime}}`)
      }
    }
    /**
     * @handleExplosionResistance
     */
    if (this.ExplosionResistance) {
      switch (typeof this.ExplosionResistance) {
        case "boolean": this.__components["minecraft:destructible_by_explosion"] = this.ExplosionResistance; break;
        case "number": this.__components["minecraft:destructible_by_explosion"] = { explosion_resistance: this.ExplosionResistance }; break;
        default: return new Error(`[${this.name}] [component: ExplosionResistance]: expected type {boolean|integer} instead found {${typeof this.ExplosionResistance}}`)
      }
    }
    /**
     * @handleFriction
     */
    if (this.Friction) {
      if (typeof this.Friction != "number") return new Error(`[${this.name}] [component: friction]: expected {number} instead found {${typeof this.Friction}}`)
      if (!isFloat(this.Friction)) return new Error(`[${this.name}] [component: friction]: expected {float} instead found {integer} `)
      this.__components["minecraft:friction"] = this.Friction;
    }
    /**
     * @handleFlammable
     */
    if (this.Flammable) {
      let __Flammable = this.__Data["minecraft:block"]["components"]["minecraft:flammable"] = {}
      if (this.Flammable.CatchChanceModifier) {
        if (typeof this.Flammable.CatchChanceModifier != "number") return new Error(`[${this.name}] [component: CatchChanceModifier]: expected {number} instead found {${typeof this.CatchChanceModifier}}`)
        __Flammable.catch_chance_modifier = this.Flammable.CatchChanceModifier;
      }
      if (this.Flammable.DestroyChanceModifier) {
        if (typeof this.Flammable.DestroyChanceModifier != "number") return new Error(`[${this.name}] [component: DestroyChanceModifier]: expected {number} instead found {${typeof this.CatchChanceModifier}}`)
        __Flammable.destory_chance_modifier = this.Flammable.DestroyChanceModifier;
      }
    }
    /**
     * @handleMaterialInstance
     */
    if (this.Material) {
      let __Material = {}
      if (typeof this.Material != "object") return new Error(`[${this.name}] [component: Material]: expected type {Material} instead found {${typeof this.Material}}`)
      for (let [m, v] of Object.entries(this.Material)) {
        if (typeof v != "object") return new Error(`[${this.name}] [component: Material] [bone: ${m}]: expected type {MaterialInstances} instead found {${typeof v}}`)
        let __MaterialInstances = {}
        if (v.Texture) {
          if (typeof v.Texture != "string") return new Error(`[${this.name}] [component: Material] [bone: ${m}] [child: Texture]: expected {string} instead found {${typeof v.Texture}}`)
          __MaterialInstances.texture = v.Texture;
        }
        if (v.RenderMethod) {
          if (typeof v.RenderMethod != "string") return new Error(`[${this.name}] [component: Material] [bone: ${m}] [child: RenderMethod]: expected {string} instead found {${typeof v.RenderMethod}}`)
          if (v.RenderMethod != ("opaque" || "blend" || "alpha_test" || "double_sided")) return new Error(`[${this.name}] [component: Material] [bone: ${m}] [child: RenderMethod]: expected type {RenderMethod} but found {${v.RenderMethod}}`)
          __MaterialInstances.render_method = v.RenderMethod;
        }
        if (v.FaceDimming) {
          if (typeof v.FaceDimming != "boolean") return new Error(`[${this.name}] [component: Material] [bone: ${m}] [child: FaceDimming]: expected {boolean} instead found {${typeof v.FaceDimming}}`)
          __MaterialInstances.face_dimming = v.FaceDimming;
        }
        if (v.AmbientOcclusion) {
          if (typeof v.AmbientOcclusion != "boolean") return new Error(`[${this.name}] [component: Material] [bone: ${m}] [child: AmbientOcclusion]: expected {boolean} instead found {${typeof v.AmbientOcclusion}}`)
          __MaterialInstances.ambient_occlusion = v.AmbientOcclusion;
        }
        __Material[m] = __MaterialInstances;
      }
      this.__components["minecraft:material_instances"] = __Material;
    }
    /**
     * @handleBlockLightEmmision
     */
    if (this.LightEmmision) {
      if (typeof this.LightEmmision != "number") return new Error(`[${this.name}] [component: LightEmmision]: expected {number} instead found {${typeof this.LightEmmision}}`)
      this.__components["minecraft:block_light_emmision"] = this.LightEmmision;
    }
    /**
     * @handleBlockLightDampening
     */
    if (this.LightDampening) {
      if (typeof this.LightDampening != "number") return new Error(`[${this.name}] [component: LightDampening]: expected {number} instead found {${typeof this.LightDampening}}`)
      this.__components["minecraft:block_light_dampening"] = this.LightDampening;
    }
    /**
     * @handleGeometry
     */
    if (this.Geometry || this.BoneVisibility) {
      if (this.Geometry) {
        if (typeof this.Geometry != "string") return new Error(`[${this.name}] [component: Geometry]: expected {string} instead found {${typeof this.Geometry}}`)
        this.__components["minecraft:geometry"] = {
          "identifier": this.Geometry
        }
      }
      if (this.BoneVisibility) {
        if (!this.Geometry) return new Error(`[${this.name}] [component: BoneVisibility]: using BoneVisibility needs a geometry component.`)
        if (typeof this.BoneVisibility != "object") return new Error(`[${this.name}] [component: BoneVisibility]: expected {object} instead found {${typeof this.BoneVisibility}}`)
        for (const [bone, value] of this.BoneVisibility) {
          if (typeof bone == "string" && typeof value == ("string" || "boolean")) {
            this.__components["minecraft:geometry"]["bone_visibility"] = { bone: value }
          }
          if (typeof bone != "string") return new Error(`[${this.name}] [component: bone_visibility] [child: ${bone}]: expected {string} instead found {${typeof bone}}`)
          if (typeof value != ("string" || "boolean")) return new Error(`[${this.name}] [component: bone_visibility] [child: ${value}]: expected {string} or boolean instead found {${typeof value}}`)
        }
      }
    }
    /**
     * @handlePlacementFilter
     */
    if (this.PlacementFilter) {
      if (typeof this.PlacementFilter != "object") return new Error(`[${this.name}] [component: PlacementFilter]: expected type {object} instead found {${typeof this.PlacementFilter}}`)
      let __PlacementFilter = { conditions: [] }
      for (const condition of this.PlacementFilter.conditions) {
        let __condition = {}
        if (condition.AllowedFaces) {
          __condition.allowed_faces = []
          condition.AllowedFaces.forEach(face => {
            if (typeof face != "string") return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces]: expected {string} instead found {${typeof face}}`)
            if (!(["up", "down", "north", "south", "east", "west"].includes(face))) return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces]: expected type {Faces} instead found {${face}}`)
            __condition.allowed_faces.push(face)
          });
        }
        if (condition.BlockFilter) {
          __condition.block_filter = []
          condition.BlockFilter.forEach(block => {
            switch (typeof block) {
              case 'string': __condition.block_filter.push(block); break;
              case 'object':
                for (let o of block) {
                  if (!o.tags) return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected property {tags}`);
                  if (typeof o.tags != "string") return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected type {string} instead found {${typeof o.tags}})`)
                  __condition.block_filter.push(o)
                }
                break;
              default: return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected type {Blocks|string} instead found ${typeof block}`)
            }
          })
        }
        __PlacementFilterconditions.push(__condition)
      }
      this.__components["minecraft:placement_filter"] = __PlacementFilter;
    }
    /**
     * @handleTransformation
     */
    if (this.Transformation) {
      if (typeof this.Transformation != "object") return new Error(`[${this.name}] [component: Transformation]: expected type {object} instead found {${typeof this.Transformation}}`)
      let __Transformation = {}
      if (this.Transformation.Translation) {
        this.TransformationTranslation.forEach(v => {
          if (typeof v != "number") return new Error(`[${this.name}] [component: Transformation] [child: Translation]: expected type {number} instead found {${typeof v}}`)
          __Transformation.translation.push(v)
        })
      }
      if (this.Transformation.Rotation) {
        this.Transformation.Rotation.forEach(v => {
          if (typeof v != "number") return new Error(`[${this.name}] [component: Transformation] [child: Rotation]: expected type {number} instead found {${typeof v}}`)
          __Transformation.rotation.push(v)
        })
      }
      if (this.Transformation.Scale) {
        this.Transformation.Scale.forEach(value => {
          if (typeof value != "number") return new Error(`[${this.name}] [component: Transformation] [child: Scale]: expected type {number} instead found {${typeof v}}`)
          __Transformation.scale.push(value)
        })
      }
      this.__components["minecraft:transformation"] = __Transformation;
    }
    /**
     * @handleLoot
     */
    if (this.Loot) {
      if (typeof this.Loot != "string") return new Error(`[${this.name}] [component: Loot]: expected type {string} instead found {${typeof this.Loot}}`)
      this.__components["minecraft:loot"] = this.Loot;
    }
    /**
     * @handleMapColor
     */
    if (this.MapColor) {
      switch (typeof this.MapColor) {
        case "string":
          this.__components["minecraft:map_color"] = this.MapColor;
          break;
        case "object":
          if (!(this.MapColor["R"] && this.MapColor["B"] && this.MapColor["G"])) return new Error(`[${this.name}] [component: MapColor]: expected MapColor={R: number, B: number, G: number} instead found {${this.MapColor}}`)
          this.__components["minecraft:map_color"] = [this.MapColor["R"], this.MapColor["B"], this.MapColor["G"]]
          break;
        default:
          return new Error(`[${this.name}] [component: MapColor]: expected type {string|object} instead found {${typeof this.MapColor}}`)
      }
    }
    /**
     * @handleCollisionBox
     */
    if (this.CollisionBox) {
      if (typeof this.CollisionBox != "object") return new Error(`[${this.name}] [component: CollisionBox]: expected type {object} instead found {${typeof this.CollisionBox}}`)
      let __CollisionBox = {}
      if (this.CollisionBox["Origin"]) {
        this.CollisionBox["Origin"].forEach(o => {
          if (typeof o != "number") return new Error(`[${this.name}] [component: CollisionBox] [child: Origin]: expected type {number} instead found {${typeof o}}`)
          __CollisionBox["origin"].push(o)
        })
      }
      if (this.CollisionBox["Size"]) {
        this.CollisionBox["Size"].forEach(s => {
          if (typeof s != "number") return new Error(`[${this.name}] [component: CollisionBox] [child: Size]: expected type {number} instead found {${typeof s}}`)
          __CollisionBox["size"].push(s)
        })
      }
      this.__components["minecraft:collision_box"] = __CollisionBox;
    }
    /**
     * @handleSelectionBox
     */
    if (this.SelectionBox) {
      if (typeof this.SelectionBox != "object") return new Error(`[${this.name}] [component: SelectionBox]: expected type {object} instead found {${typeof this.SelectionBox}}`)
      let __SelectionBox = {}
      if (this.SelectionBox["Origin"]) {
        this.SelectionBox["Origin"].forEach(o => {
          if (typeof o != "number") return new Error(`[${this.name}] [component: SelectionBox] [child: Origin]: expected type {number} instead found {${typeof s}}`)
          __SelectionBox["origin"].push(o)
        })
      }
      if (this.SelectionBox["Size"]) {
        this.SelectionBox["Size"].forEach(s => {
          if (typeof s == "number") return new Error(`[${this.name}] [component: SelectionBox] [child: Size]: expected type {number} instead found {${typeof s}}`)
          __SelectionBox["size"].push(s)
        })
      }
      this.__components["minecraft:selection_box"] = __SelectionBox;
    }

    /**
     * @handleOnStepOn
     */
    if (this.OnStepOn) { this.__components["minecraft:on_step_on"] = BlockEventTriggerHandler(this.OnStepOn, this.__Data, "OnStepOn", this) }
    /**
     * @handleOnStepOff
     */
    if (this.OnStepOff) { this.__components["minecraft:on_step_off"] = BlockEventTriggerHandler(this.OnStepOff, this.__Data, "OnStepOff", this) }
    /**
     * @handleOnFallOn
     */
    if (this.OnFallOn) { this.__components["minecraft:on_fall_on"] = BlockEventTriggerHandler(this.OnFallOn, this.__Data, "OnFallOn", this) }
    /**
     * @handleOnPlayerPlacing
     */
    if (this.OnPlayerPlacing) { this.__components["minecraft:on_player_placing"] = BlockEventTriggerHandler(this.OnPlayerPlacing, this.__Data, "OnPlayerPlacing", this) }
    /**
     * @handleOnPlayerDestroyeded
     */
    if (this.OnPlayerDestroyed) { this.__components["minecraft:on_player_destroyed"] = BlockEventTriggerHandler(this.OnPlayerDestroyed, this.__Data, "OnPlayerDestroyed", this); }
    /**
     * @handleOnPlaced
     */
    if (this.OnPlaced) { this.__components["minecraft:on_placed"] = BlockEventTriggerHandler(this.OnPlaced, this.__Data, "OnPlaced", this); }
    /**
     * @handleOnInteract
     */
    if (this.OnInteract) { this.__components["minecraft:on_interact"] = BlockEventTriggerHandler(this.OnInteract, this.__Data, "OnInteract", this); }
    /**
     * @handleQueuedTicking
     */
    if (this.QueuedTicking) {
      if (typeof this.QueuedTicking != "object") return new Error(`[${this.name}] [component: QueuedTicking]: expected {object} instead found {${typeof this.QueuedTicking}}`);
      if (!this.__Data["minecraft:block"]["events"]) this.__Data["minecraft:block"]["events"] = {}
      let __QueuedTicking = { "on_tick": {} }
      if (this.QueuedTicking.Looping) {
        if (typeof this.QueuedTicking.Looping != "boolean") return new Error(`[${this.name}] [component: QueuedTicking] [child: Looping]: expected type {boolean} instead found {${typeof this.QueuedTicking["Looping"]}}`)
        __QueuedTicking.looping = this.QueuedTicking.Looping;
      }
      if (this.QueuedTicking.IntervalRange) {
        if (typeof this.QueuedTicking.IntervalRange === ("string" || "object" || "boolean" || "number" || "Function")) return new Error(`[${this.name}] [component: QueuedTicking] [child: IntervalRange]: expected type {number[]} instead found {${typeof this.QueuedTicking["Condition"]}}`)
        this.QueuedTicking.IntervalRange.forEach(r => {
          if (typeof r != "number") return new Error(`[${this.name}] [component: QueuedTicking] [child: IntervalRange]: expected type {number} instead found {${typeof this.QueuedTicking["IntervalRange"]}}`)
          __QueuedTicking.condition = this.QueuedTicking.IntervalRange;
        })
      }
      if (ths.QueuedTicking.Condition || this.QueuedTicking.Event || this.QueuedTicking.Target || this.QueuedTicking.Action) {
        __QueuedTicking = BlockEventTriggerHandler(this.QueuedTicking, this.__Data, "QueuedTicking", this);
      }
      this.__components["minecraft:queued_ticking"] = __QueuedTicking;
    }
    /**
     * @handleRandomTicking
     */
    if (this.RandomTicking) {
      if (typeof this.RandomTicking != "object") return new Error(`[${this.name}] [component: RandomTicking]: expected {object} instead found {${typeof this.RandomTicking}}`)
      if (!this.__Data["minecraft:block"]["events"]) this.__Data["minecraft:block"]["events"] = {}
      let __RandomTicking = { "on_tick": {} }
      if (ths.RandomTicking.Condition || this.RandomTicking.Event || this.RandomTicking.Target || this.RandomTicking.Action) {
        __RandomTicking = BlockEventTriggerHandler(this.RandomTicking, this.__Data, "RandomTicking", this);
      }
      this.__components["minecraft:random_ticking"] = __RandomTicking;
    }
    /**
     * @handleStates
     */
    if (this.States) {
      if (typeof this.States !== "object") {
        return new Error(`[${this.name}] [property: States]: expected type {object} instead found ${typeof this.States}`);
      }

      let __States = {};

      for (let [state, values] of Object.entries(this.States)) {
        if (typeof state !== "string") {
          return new Error(`[${this.name}] [property: States] [name: ${state}]: expected type {string} instead found ${typeof state}`);
        }

        let stateName = `${config["prefix"]}:${state}`;
        __States[stateName] = [];

        if (!Array.isArray(values)) {
          return new Error(`[${this.name}] [property: States] [name: ${stateName}]: expected type {string[]} instead found ${typeof values}`);
        }

        values.forEach(v => {
          if (typeof v !== "boolean" && typeof v !== "number") {
            return new Error(`[${this.name}] [property: States] [name: ${stateName}]: expected type {string[]|number[]|boolean[]} instead found ${typeof v}`);
          }
          __States[stateName].push(v);
        });
      }

      this.__Data["minecraft:block"].description.states = __States;
    }

    /**
     * @handlePermutations
     */
    if (this.Permutations) {
      if (typeof this.Permutations !== "object") {
        return new Error(`[${this.name}] [property: Permutations]: expected type {object} instead found {${typeof this.Permutations}}`);
      }

      let __Permutations = [];

      for (let [condition, permData] of Object.entries(this.Permutations)) {
        let __permuteData = {};

        if (typeof condition !== "string") {
          return new Error(`[${this.name}] [property: Permutations] [perm: ${condition}]: expected type {string} instead found {${typeof condition}}`);
        }

        __permuteData.condition = HandlePermCondition(condition, this.__Data, this);

        if (typeof permData !== "object") {
          return new Error(`[${this.name}] [property: Permutations] [perm_value: ${permData}]: expected type {object} instead found {${typeof permData}}`);
        }

        __permuteData.components = permData;
        __Permutations.push(__permuteData);
      }

      this.__Data["minecraft:block"].permutations = __Permutations;
    }

    return JSON.stringify(this.__Data);


  }
}

class BasicBlock extends Block{
  constructor (name){
    this.name = name
  }
  static DisplayName = this.name
}
exports = {
  Block,
  BasicBlock
};