const { isFloat } = require("../Utils.js")
const c = require("../config.json");

const config = c["block"];

class Block {
  static CurrentClassName = new this().constructor.name;
  static __Data = {
    "format_version": config["version"],
    "minecraft:block": {
      "description": {
        "identifier": `${c["prefix"]}:${this.CurrentClassName.toLowerCase()}`,
        "menu_category": {}
      },
      "components": {},
    },
  };
  static __components = this.__Data["minecraft:block"]["components"];
  static getClasName() {
    return this.name
  }
  /**
   * @BlockData
   */
  static Identifier;
  static Category;
  static Group;
  static DisplayName;
  static DestroyTime;
  static ExplosionResistance;
  static Friction;
  static CatchChanceModifier;
  static DestroyChanceModifier;
  static Texture;
  static RenderMethod;
  static FaceDimming;
  static AmbientOcclusion;
  static LightEmmision = undefined;
  static LightAbsorption;
  static Geometry;
  /**
   * @BlockEvents
   */
  static OnStepOn;
  static OnStepOff;
  static OnInteract;
  /**
   * @CreatesBlockObject
   */
  static init() {
    /**
     * @handleCategory
     */
    if (this.Category) {
      if (typeof this.Category == "string") {
        if (
          this.Category ===
          ("construction" ||
            "equipments" ||
            "items" ||
            "nature" ||
            "none")
        ) {
          this.__Data["minecraft:block"]["description"]["menu_category"]["category"] =
            this.Category;
        } else
          return new BlockError(
            `[${this.CurrentClassName}] [component: Category]: expected @class {Category} instead found ${this.Category}`
          );
      } else
        return new BlockError(
          `[${this.CurrentClassName}] [component: Category]: expected string instead found ${this.Category}`
        );
    }
    /**
     * @handleGroup
     */
    if (this.Group) {
      if (typeof this.Group === "string") {
        this.__Data["minecraft:block"]["description"]["menu_category"]["group"] = this.Group;
      }
      else return new BlockError(`[]`);
    }

    /**
     * @handleDisplayName
     */
    if (this.DisplayName) {
      if (typeof this.DisplayName === "string") {
        this.__components["minecraft:display_name"] = this.DisplayName;
      } else
        return new BlockError(
          `[${this.CurrentClassName}] [component: DisplayName]: expected string instead found ${this.DisplayName}`
        );
    }
    /**
     * @handleDestroytime
     */
    if (this.DestroyTime) {
      if (typeof this.DestroyTime === "boolean") {
        this.__components["minecraft:destructible_by_mining"] =
          this.DestroyTime;
      }
      if (typeof this.DestroyTime === "number") {
        this.__components["minecraft:destructible_by_mining"] = {
          seconds_to_destroy: this.DestroyTime,
        };
      }
    }
    /**
     * @handleExplosionResistance
     */
    if (this.ExplosionResistance) {
      if (typeof this.ExplosionResistance === "boolean") {
        this.__components["minecraft:destructible_by_explosion"] =
          this.ExplosionResistance;
      }
      if (typeof this.ExplosionResistance === "number") {
        this.__components["minecraft:destructible_by_explosion"] = {
          seconds_to_destroy: this.ExplosionResistance,
        };
      }
    }
    /**
     * @handleFriction
     */
    if (typeof this.Friction) {
      if (typeof this.Friction === "number") {
        if (isFloat(this.Friction)) {
          this.__components["minecraft:friction"] = this.Friction;
        }
      }
    }
    /**
     * @handleFlammable
     */
    if (this.CatchChanceModifier || this.DestroyChanceModifier) {
      let __Flammable = this.__Data["minecraft:block"]["components"]["minecraft:flammable"] = {}
      if (this.CatchChanceModifier) {
        if (typeof this.CatchChanceModifier === "number") {
          __Flammable["catch_chance_modifier"] = this.CatchChanceModifier;
        }
        else return new BlockError(`[${this.CurrentClassName}] [component: CatchChanceModifier]: expected number instead found ${typeof this.CatchChanceModifier}`)
      }
      if (this.DestroyChanceModifier) {
        if (typeof this.DestroyChanceModifier === "number") {
          __Flammable["destory_chance_modifier"] = thid.DestroyChanceModifier;
        }
        else return new BlockError(`[${this.CurrentClassName}] [component: DestroyChanceModifier`)
      }
    }
    /**
     * @handleMaterialInstance
     */
    if (this.Texture || this.RenderMethod || this.FaceDimming || this.AmbientOcclusion) {
      let __Materialll
      if (this.Texture) {
        if (typeof this.Texture === "string") {

        }
      }
    }

    return JSON.stringify(this.__Data);
  }
}

exports.Block = Block;