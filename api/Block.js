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
      "components": {}
    }
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
  static OnPlayerDestroy;
  static OnDestroyed;
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
        if(this.Category==("construction"||"equipments"||"items"||"nature"||"none")) {
          this.__Data["minecraft:block"]["description"]["menu_category"]["category"] = this.Category;
        } 
        else return new Error(`[${this.name}] [component: Category]: expected type {Categorys} instead found {${this.Category}}`);
      }
      else return new Error(`[${this.name}] [component: Category]: expected type {string} instead found {${this.Category}}`);
    }
    /**
     * @handleGroup
     */
    if (this.Group) {
      if (typeof this.Group=="string") {
        this.__Data["minecraft:block"]["description"]["menu_category"]["group"] = this.Group;
      }
      else return new Error(`[${this.name}] [component: Group]: expected type {Groups|string} but instead found {${typeof this.Group}}`);
    }

    /**
     * @handleDisplayName
     */
    if (this.DisplayName) {
      if (typeof this.DisplayName == "string") {
        this.__components["minecraft:display_name"] = this.DisplayName;
      } else
        return new Error(`[${this.name}] [component: DisplayName]: expected type {string} instead found {${this.DisplayName}}`);
    }
    /**
     * @handleDestroytime
     */
    if (this.DestroyTime) {
      if (typeof this.DestroyTime == "boolean") {
        this.__components["minecraft:destructible_by_mining"] = this.DestroyTime;
      } else return new Error(`[${this.name}] [component: DestroyTime]: expected type {boolean|integer} instead found {${typeof this.DestroyTime}}`)
      if (typeof this.DestroyTime == "number") {
        this.__components["minecraft:destructible_by_mining"] = {
          "seconds_to_destroy": this.DestroyTime,
        }
      } else return new Error(`[${this.name}] [component: DestroyTime]: expected type {boolean|integer} instead found {${typeof this.DestroyTime}}`)
    }
    /**
     * @handleExplosionResistance
     */
    if (this.ExplosionResistance) {
      if (typeof this.ExplosionResistance == "boolean") {
        this.__components["minecraft:destructible_by_explosion"]=this.ExplosionResistance;
      } else return new Error(`[${this.name}] [component: ExplosionResistance]: expected type {boolean|integer} instead found {${typeof this.ExplosionResistance}}`)
      if (typeof this.ExplosionResistance == "number") {
        this.__components["minecraft:destructible_by_explosion"] = {
          "explosion_resistance": this.ExplosionResistance,
        };
      } else return new Error(`[${this.name}] [component: ExplosionResistance]: expected type {boolean|integer} instead found {${typeof this.ExplosionResistance}}`)
    }
    /**
     * @handleFriction
     */
    if (this.Friction) {
      if (typeof this.Friction == "number") {
        if (isFloat(this.Friction)) {
          this.__components["minecraft:friction"] = this.Friction;
        } else return new Error(`[${this.name}] [component: friction]: expected {float} instead found {integer} `)
      } else return new Error(`[${this.name}] [component: friction]: expected {number} instead found {${typeof this.Friction}}`)
    }
    /**
     * @handleFlammable
     */
    if (this.CatchChanceModifier || this.DestroyChanceModifier) {
      let __Flammable = this.__Data["minecraft:block"]["components"]["minecraft:flammable"] = {}
      if (this.CatchChanceModifier) {
        if (typeof this.CatchChanceModifier == "number") {
          __Flammable["catch_chance_modifier"] = this.CatchChanceModifier;
        }
        else return new Error(`[${this.name}] [component: CatchChanceModifier]: expected {number} instead found {${typeof this.CatchChanceModifier}}`)
      }
      if (this.DestroyChanceModifier) {
        if (typeof this.DestroyChanceModifier == "number") {
          __Flammable["destory_chance_modifier"] = thid.DestroyChanceModifier;
        }
        else return new Error(`[${this.name}] [component: DestroyChanceModifier]: expected {number} instead found {${typeof this.CatchChanceModifier}}`)
      }
    }
    /**
     * @handleMaterialInstance
     */
    if (this.Texture || this.RenderMethod || this.FaceDimming || this.AmbientOcclusion) {
      let __MaterialInstances = {}
      if (this.Texture) {
        if (typeof this.Texture == "string") {
          __MaterialInstances["texture"] = this.Texture;
        }
        else return new Error(`[${this.name}] [component: Texture]: expected {string} instead found {${typeof this.Texture}}`)
      }
      if(this.RenderMethod) {
        if(typeof this.RenderMethod == "string") {
          if(this.RenderMethod == ("opaque"||"blend"||"alpha_test"||"double_sided")) {
            __MaterialInstances["render_method"] = this.RenderMethod;
          }
          else return new Error(`[${this.name}] [component: RenderMethod]: expected type {RenderMethod} but found {${this.RenderMethod}}`)
        }
        else return new Error(`[${this.name}] [component: RenderMethod]: expected {string} instead found {${typeof this.RenderMethod}}`)
      }
      if(this.FaceDimming) {
        if(typeof this.FaceDimming == "boolean") {
          __MaterialInstances["face_dimming"] = this.FaceDimming;
        }
        else return new Error(`[${this.name}] [component: FaceDimming]: expected {boolean} instead found {${typeof this.FaceDimming}}`)
      }
      if(this.AmbientOcclusion) {
        if(typeof this.AmbientOcclusion == "boolean") {
          __MaterialInstances["ambient_occlusion"] = this.AmbientOcclusion;
        }
        else return new Error(`[${this.name}] [component: AmbientOcclusion]: expected {boolean} instead found {${typeof this.AmbientOcclusion}}`)
      }
      this.__components["minecraft:material_instances"] = __MaterialInstances;
    }
    /**
     * @handleBlockLightEmmision
     */
    if(this.LightEmmision){
      if(typeof this.LightEmmision == "number") {
        this.__components["minecraft:block_light_emmision"] = this.LightEmmision;
      }
      else return new Error(`[${this.name}] [component: LightEmmision]: expected {number} instead found {${typeof this.LightEmmision}}`)
    }
    /**
     * @handleBlockLightDampening
     */
    if(this.LightDampening){
      if(typeof this.LightDampening == "number") {
        this.__components["minecraft:block_light_dampening"] = this.LightDampening;
      }
      else return new Error(`[${this.name}] [component: LightDampening]: expected {number} instead found {${typeof this.LightDampening}}`)
    }
    /**
     * @handleGeometry
     */
    if(this.Geometry || this.BoneVisibility) {
      if(this.Geometry) {
        if(typeof this.Geometry == "string") {
          this.__components["minecraft:geometry"] = {
            "identifier": this.Geometry
          }
        }
        else return new Error(`[${this.name}] [component: Geometry]: expected {string} instead found {${typeof this.Geometry}}`)
      }
      if(this.BoneVisibility) {
        if(!this.Geometry) return new Error(`[${this.name}] [component: BoneVisibility]: using BoneVisibility needs a geometry component.`)
        if(typeof this.BoneVisibility == "object") {
          for(const [bone, value] of this.BoneVisibility) {
            if(typeof bone == "string" && typeof value == ("string"||"boolean")) {
              this.__components["minecraft:geometry"]["bone_visibility"] = { bone: value }
            }
            if(typeof bone != "string") return new Error(`[${this.name}] [component: bone_visibility] [child: ${bone}]: expected {string} instead found {${typeof bone}}`)
            if(typeof value != ("string" || "boolean")) return new Error(`[${this.name}] [component: bone_visibility] [child: ${value}]: expected {string} or boolean instead found {${typeof value}}`)
          }
        }
        else return new Error(`[${this.name}] [component: BoneVisibility]: expected {object} instead found {${typeof this.BoneVisibility}}`)
      }
    }
    /**
     * @handlePlacementFilter
     */
    if(this.PlacementFilter) {
      if(typeof this.PlacementFilter == "object") {
        let __PlacementFilter = {"conditions": []}
        for(const [condition, values] of Object.entries(this.PlacementFilter)) {
          let __condition = {}
          if(condition["AllowedFaces"]) {
            __condition["allowed_faces"]=[]
            condition["AllowedFaces"].forEach(face=>{
              if(typeof face == "string") {
                if(["up","down","north","south","east","west"].includes(face)) {
                  __condition["allowed_faces"].push(face)
                }
                else return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces]: expected type {Faces} instead found {${face}}`)
              }
              else return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces]: expected {string} instead found {${typeof face}}`)
            });
          }
          if(condition["BlockFilter"]) {
            __condition["block_filter"]=[]
            condition["BlockFilter"].forEach(block=>{
              if(typeof block == "string") {
                __condition["block_filter"].push(block)
              }
              if(typeof block == "object") {
                for(let [key, value] of Object.entries(block)) {
                  if(key!="tags") return new Error(``)
                  if(typeof value == "string") {
                    __condition["block_filter"].push({"tags": value})
                  }
                  else return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected type {string} instead found {${typeof value}})`)
                }
              }
              else return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter]: expected type {Blocks|string} instead found ${typeof block}`)
            })
          }
          __PlacementFilter["conditions"].push(__condition)
        }
        this.__components["minecraft:placement_filter"]=__PlacementFilter;
      }
      else return new Error(`[${this.name}] [component: PlacementFilter]: expected type {object} instead found {${typeof this.PlacementFilter}}`)
    }
    /**
     * @handleTransformation
     */
    if(this.Transformation) {
      if(typeof this.Transformation == "object") {
        let __Transformation = {}
        if(this.Transformation["Translation"]) {
          this.Transformation["Translation"].forEach(value=>{
            if(typeof value == "number") {
              __Transformation["translation"].push(value)
            }
            else return new Error(`[${this.name}] [component: Transformation] [child: Translation]: expected type {number} instead found {${typeof value}}`)
          })
        }
        if(this.Transformation["Rotation"]) {
          this.Transformation["Rotation"].forEach(value=>{
            if(typeof value == "number") {
              __Transformation["rotation"].push(value)
            }
            else return new Error(`[${this.name}] [component: Transformation] [child: Rotation]: expected type {number} instead found {${typeof value}}`)
          })
        }
        if(this.Transformation["Scale"]) {
          this.Transformation["Scale"].forEach(value=>{
            if(typeof value == "number") {
              __Transformation["scale"].push(value)
            }
            else return new Error(`[${this.name}] [component: Transformation] [child: Scale]: expected type {number} instead found {${typeof value}}`)
          })
        }
        this.__components["minecraft:transformation"] = __Transformation;
      }
      else return new Error(`[${this.name}] [component: Transformation]: expected type {object} instead found {${typeof this.Transformation}}`)
    }
    /**
     * @handleLoot
     */
    if(this.Loot) {
      if(typeof this.Loot == "string") {
        this.__components["minecraft:loot"] = this.Loot;
      }
      else return new Error(`[${this.name}] [component: Loot]: expected type {string} instead found {${typeof this.Loot}}`)
    }
    /**
     * @handleMapColor
     */
    if(this.MapColor) {
      if(typeof this.MapColor == "string") {
        this.__components["minecraft:map_color"] = this.MapColor;
      }
      if(this.MapColor[3])
    }
    /**
     * @handleCollisionBox
     */
    if(this.CollisionBox) {
      if(typeof this.CollisionBox == "object") {
        
      }
    }
    /**
     * @handleSelectionBox
     */
    if(this.SelectionBox) {
      if(typeof this.SelectionBox == "object") {
        
      }
    }
    
    return JSON.stringify(this.__Data);
  }
}

exports.Block = Block;