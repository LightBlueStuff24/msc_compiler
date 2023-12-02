const { isFloat } = require("../Utils.js")
const c = require("../config.json");

const config = c["block"];

class Block {
  static __Data = {
    "format_version": config["version"],
    "minecraft:block": {
      "description": {
        "identifier": "",
        "menu_category": {}
      },
      "components": {},
    },
  };
  static __components = this.__Data["minecraft:block"]["components"];
  /**
   * @BlockData
   */
  
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
  static LightEmmision;
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
    this.__Data["minecraft:block"]["description"]["identifier"] = `${c["prefix"]}:${this.name.toLowerCase()}`
    /**
     * @handleCategory
     */
    if (this.Category) {
      if (typeof this.Category == "string") {
        if(this.Category===("construction"||"equipments"||"items"||"nature"||"none")){
          this.__Data["minecraft:block"]["description"]["menu_category"]["category"]=this.Category;
        } 
        else return new BlockError(`[${this.name}] [component: Category]: expected @class {Category} instead found ${this.Category}`);
      }
      else return new BlockError(`[${this.name}] [component: Category]: expected string instead found ${this.Category}`);
    }
    /**
     * @handleGroup
     */
    if (this.Group) {
      if (typeof this.Group==="string") {
        this.__Data["minecraft:block"]["description"]["menu_category"]["group"] = this.Group;
      }
      else return new BlockError(`[${this.name}] [component: Group]: expected string but instead found ${typeof this.Group}`);
    }

    /**
     * @handleDisplayName
     */
    if (this.DisplayName) {
      if (typeof this.DisplayName === "string") {
        this.__components["minecraft:display_name"] = this.DisplayName;
      } else
        return new BlockError(`[${this.name}] [component: DisplayName]: expected string instead found ${this.DisplayName}`);
    }
    /**
     * @handleDestroytime
     */
    if (this.DestroyTime) {
      if (typeof this.DestroyTime==="boolean") {
        this.__components["minecraft:destructible_by_mining"]=this.DestroyTime;
      }
      if (typeof this.DestroyTime==="number") {
        this.__components["minecraft:destructible_by_mining"] = {
          "seconds_to_destroy": this.DestroyTime,
        };
      }
    }
    /**
     * @handleExplosionResistance
     */
    if (this.ExplosionResistance) {
      if (typeof this.ExplosionResistance==="boolean") {
        this.__components["minecraft:destructible_by_explosion"]=this.ExplosionResistance;
      }
      if (typeof this.ExplosionResistance === "number") {
        this.__components["minecraft:destructible_by_explosion"] = {
          "explosion_resistance": this.ExplosionResistance,
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
        else return new BlockError(`[${this.name}] [component: CatchChanceModifier]: expected number instead found ${typeof this.CatchChanceModifier}`)
      }
      if (this.DestroyChanceModifier) {
        if (typeof this.DestroyChanceModifier === "number") {
          __Flammable["destory_chance_modifier"] = thid.DestroyChanceModifier;
        }
        else return new BlockError(`[${this.name}] [component: DestroyChanceModifier`)
      }
    }
    /**
     * @handleMaterialInstance
     */
    if (this.Texture || this.RenderMethod || this.FaceDimming || this.AmbientOcclusion) {
      let __MaterialInstances = {}
      if (this.Texture) {
        if (typeof this.Texture === "string") {
          __MaterialInstances["texture"] = this.Texture;
        }
      }
      if(this.RenderMethod) {
        if(typeof this.RenderMethod === "string") {
          if(this.RenderMethod == ("opaque"||"blend"||"alpha_test"||"double_sided")) {
            __MaterialInstances["render_method"] = this.RenderMethod;
          }
          else return new BlockError(`[${this.name}] [component: RenderMethod]: `)
        }
        else return new 
      }
      if(this.FaceDimming) {
        
      }
      if(this.AmbientOcclusion) {
        
      }
    }

    return JSON.stringify(this.__Data);
  }
}

exports.Block = Block;