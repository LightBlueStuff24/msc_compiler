class Permutation {

    /**
   * @private
   */
  static __Data = {
      "components": {}
    
  };

  static __components = this.__Data['components']
  
     /**
   * @BlockData
   */
  
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
  static OnPlayerDestroyed;
  static QueuedTicking;
  static RandomTicking;

  static init(){
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
    if (typeof this.DestroyTime == "boolean") {
      this.__components["minecraft:destructible_by_mining"] = this.DestroyTime;
    }
    else if (typeof this.DestroyTime == "number") {
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
    }
    else if (typeof this.ExplosionResistance == "number") {
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
      }
      else return new Error(`[${this.name}] [component: friction]: expected {float} instead found {integer} `)
    }
    else return new Error(`[${this.name}] [component: friction]: expected {number} instead found {${typeof this.Friction}}`)
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
        __Transformation["translation"] = []
        this.Transformation["Translation"].forEach(value=>{
          if(typeof value == "number") {
            __Transformation["translation"].push(value)
          }
          else return new Error(`[${this.name}] [component: Transformation] [child: Translation]: expected type {number} instead found {${typeof value}}`)
        })
      }
      if(this.Transformation["Rotation"]) {
        __Transformation["rotation"] = []
        this.Transformation["Rotation"].forEach(value=>{
          if(typeof value == "number") {
            __Transformation["rotation"].push(value)
          }
          else return new Error(`[${this.name}] [component: Transformation] [child: Rotation]: expected type {number} instead found {${typeof value}}`)
        })
      }
      if(this.Transformation["Scale"]) {
        __Transformation["scale"] = []
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
    if(typeof this.MapColor == "object") {
      if(this.MapColor["R"] && this.MapColor["B"] && this.MapColor["G"]) {
        this.__components["minecraft:map_color"] = [this.MapColor["R"], this.MapColor["B"], this.MapColor["G"]]
      }
      else return new Error(`[${this.name}] [component: MapColor]: expected MapColor={R: number, B: number, G: number} instead found {${this.MapColor}}`)
    }
    else return new Error(`[${this.name}] [component: MapColor]: expected type {string|object} instead found {${typeof this.MapColor}}`)
  }
  /**
   * @handleCollisionBox
   */
  if(this.CollisionBox) {
    if(typeof this.CollisionBox == "object") {
      let __CollisionBox = {}
      if(this.CollisionBox["Origin"]) {
        this.CollisionBox["Origin"].forEach(o=>{
          if(typeof o == "number") {
            __CollisionBox["origin"].push(o)
          }
          else return new Error(`[${this.name}] [component: CollisionBox] [child: Origin]: expected type {number} instead found {${typeof o}}`)
        })
      }
      if(this.CollisionBox["Size"]) {
        this.CollisionBox["Size"].forEach(s=>{
          if(typeof s == "number") {
            __CollisionBox["size"].push(s)
          }
          else return new Error(`[${this.name}] [component: CollisionBox] [child: Size]: expected type {number} instead found {${typeof s}}`)
        })
      }
      this.__components["minecraft:collision_box"] = __CollisionBox;
    }
    else return new Error(`[${this.name}] [component: CollisionBox]: expected type {object} instead found {${typeof this.CollisionBox}}`)
  }
  /**
   * @handleSelectionBox
   */
  if(this.SelectionBox) {
    if(typeof this.SelectionBox == "object") {
      let __SelectionBox = {}
      if(this.SelectionBox["Origin"]) {
        this.SelectionBox["Origin"].forEach(o=>{
          if(typeof o == "number") {
            __SelectionBox["origin"].push(o)
          }
          else return new Error(`[${this.name}] [component: SelectionBox] [child: Origin]: expected type {number} instead found {${typeof s}}`)
        })
      }
      if(this.SelectionBox["Size"]) {
        this.SelectionBox["Size"].forEach(s=>{
          if(typeof s == "number") {
            __SelectionBox["size"].push(s)
          }
          else return new Error(`[${this.name}] [component: SelectionBox] [child: Size]: expected type {number} instead found {${typeof s}}`)
        })
      }
      this.__components["minecraft:selection_box"] = __SelectionBox;
    }
    else return new Error(`[${this.name}] [component: SelectionBox]: expected type {object} instead found {${typeof this.SelectionBox}}`)
  }
  /**
   * @handleOnStepOn
   */
  if(this.OnStepOn) {
    if(typeof this.OnStepOn == "object") {
      let __OnStepOn = {}
      if(this.OnStepOn["Condition"]) {
        if(typeof this.OnStepOn["Condition"] == "string") {
          __OnStepOn["condition"] = this.OnStepOn["Condition"];
        }
        else return new Error(`[${this.name}] [component: OnStepOn] [child: Condition]: expected type {string} instead found {${typeof this.OnStepOn["Condition"]}}`)
      }
      if(this.OnStepOn["Event"]) {
        if(typeof this.OnStepOn["Event"] == "string") {
          __OnStepOn["event"] = this.OnStepOn["Event"];
        }
        else return new Error(`[${this.name}] [component: OnStepOn] [child: Event]: expected type {string} instead found {${typeof this.OnStepOn["Event"]}}`)
      }
      if(this.OnStepOn["Target"]) {
        if(typeof this.OnStepOn["Target"] == "string") {
          if(this.OnStepOn["Target"] == ("self" || "other")) {
            __OnStepOn["target"] = this.OnStepOn["Target"];
          }
          else return new Error(`[${this.name}] [component: OnStepOn] [child: Target]: expected type {Targets} instead found {${this.OnStepOn["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnStepOn] [child: Target]: expected type {string} instead found {${typeof this.OnStepOn["Target"]}}`)
      }
      this.__components["minecraft:on_step_on"] = __OnStepOn;
    }
    else return new Error(`[${this.name}] [component: OnStepOn]: expected {object} instead found {${typeof this.OnStepOn}}`)
  }
  /**
   * @handleOnStepOff
   */
  if(this.OnStepOff) {
    if(typeof this.OnStepOff == "object") {
      let __OnStepOff = {}
      if(this.OnStepOff["Condition"]) {
        if(typeof this.OnStepOff["Condition"] == "string") {
          __OnStepOff["condition"] = this.OnStepOff["Condition"]
        }
        else return new Error(`[${this.name}] [component: OnStepOff] [child: Condition]: expected type {string} instead found {${typeof this.OnStepOff["Condition"]}}`)
      }
      if(this.OnStepOff["Event"]) {
        if(typeof this.OnStepOff["Event"] == "string") {
          __OnStepOff["event"] = this.OnStepOff["Event"]
        }
        else return new Error(`[${this.name}] [component: OnStepOff] [child: Event]: expected type {string} instead found {${typeof this.OnStepOff["Event"]}}`)
      }
      if(this.OnStepOff["Target"]) {
        if(typeof this.OnStepOff["Target"] == "string") {
          if(this.OnStepOff["Target"] == ("self" || "other")) {
            __OnStepOff["target"] = this.OnStepOff["Target"]
          }
          else return new Error(`[${this.name}] [component: OnStepOff] [child: Target]: expected type {Targets} instead found {${this.OnStepOff["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnStepOff] [child: Target]: expected type {string} instead found {${typeof this.OnStepOff["Target"]}}`)
      }
      this.__components["minecraft:on_step_off"] = __OnStepOff;
    }
    else return new Error(`[${this.name}] [component: OnStepOff]: expected {object} instead found {${typeof this.OnStepOn}}`)
  }
  /**
   * @handleOnFallOn
   */
  if(this.OnFallOn) {
    if(typeof this.OnFallOn == "object") {
      let __OnFallOn = {}
      if(this.OnFallOn["Condition"]) {
        if(typeof this.OnFallOn["Condition"] == "string") {
          __OnFallOn["condition"] = this.OnFallOn["Condition"];
        }
        else return new Error(`[${this.name}] [component: OnFallOn] [child: Condition]: expected type {string} instead found {${typeof this.OnFallOn["Condition"]}}`)
      }
      if(this.OnFallOn["Event"]) {
        if(typeof this.OnFallOn["Event"] == "string") {
          __OnFallOn["event"] = this.OnFallOn["Target"];
        }
        else return new Error(`[${this.name}] [component: OnFallOn] [child: Event]: expected type {string} instead found {${typeof this.OnFallOn["Event"]}}`)
      }
      if(this.OnFallOn["Target"]) {
        if(typeof this.OnFallOn["Target"] == "string") {
          if(this.OnFallOn["Target"] == ("self" || "other")) {
            __OnFallOn["target"] = this.OnFallOn["Target"];
          }
          else return new Error(`[${this.name}] [component: OnFallOn] [child: Target]: expected type {Targets} instead found {${this.OnFallOn["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnFallOn] [child: Target]: expected type {string} instead found {${typeof this.OnFallOn["Target"]}}`)
      }
      this.__components["minecraft:on_fall_on"] = __OnFallOn;
    }
    else return new Error(`[${this.name}] [component: OnFallOn]: expected {object} instead found {${typeof this.OnFallOn}}`)
  }
  /**
   * @handleOnPlayerPlacing
   */
  if(this.OnPlayerPlacing) {
    if(typeof this.OnPlayerPlacing == "object") {
      let __OnPlayerPlacing = {}
      if(this.OnPlayerPlacing["Condition"]) {
        if(typeof this.OnPlayerPlacing["Condition"] == "string") {
          __OnPlayerPlacing["condition"] = this.OnPlayerPlacing["Condition"];
        }
        else return new Error(`[${this.name}] [component: OnPlayerPlacing] [child: Condition]: expected type {string} instead found {${typeof this.OnPlayerPlacing["Condition"]}}`)
      }
      if(this.OnPlayerPlacing["Event"]) {
        if(typeof this.OnPlayerPlacing["Event"] == "string") {
          __OnPlayerPlacing["event"] = this.OnPlayerPlacing["Target"];
        }
        else return new Error(`[${this.name}] [component: OnPlayerPlacing] [child: Event]: expected type {string} instead found {${typeof this.OnPlayerPlacing["Event"]}}`)
      }
      if(this.OnPlayerPlacing["Target"]) {
        if(typeof this.OnPlayerPlacing["Target"] == "string") {
          if(this.OnPlayerPlacing["Target"] == ("self" || "other")) {
            __OnPlayerPlacing["target"] = this.OnPlayerPlacing["Target"];
          }
          else return new Error(`[${this.name}] [component: OnPlayerPlacing] [child: Target]: expected type {Targets} instead found {${this.OnPlayerPlacing["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnPlayerPlacing] [child: Target]: expected type {string} instead found {${typeof this.OnPlayerPlacing["Target"]}}`)
      }
      this.__components["minecraft:on_player_placing"] = __OnPlayerPlacing;
    }
    else return new Error(`[${this.name}] [component: OnPlayerPlacing]: expected {object} instead found {${typeof this.OnPlayerPlacing}}`)
  }
  /**
   * @handleOnPlayerDestroyeded
   */
  if(this.OnPlayerDestroyed) {
    if(typeof this.OnPlayerDestroyed == "object") {
      let __OnPlayerDestroyed = {}
      if(this.OnPlayerDestroyed["Condition"]) {
        if(typeof this.OnPlayerDestroyed["Condition"] == "string") {
          __OnPlayerDestroyed["condition"] = this.OnPlayerDestroyed["Condition"];
        }
        else return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Condition]: expected type {string} instead found {${typeof this.OnPlayerDestroyed["Condition"]}}`)
      }
      if(this.OnPlayerDestroyed["Event"]) {
        if(typeof this.OnPlayerDestroyed["Event"] == "string") {
          __OnPlayerDestroyed["event"] = this.OnPlayerDestroyed["Target"];
        }
        else return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Event]: expected type {string} instead found {${typeof this.OnPlayerDestroyed["Event"]}}`)
      }
      if(this.OnPlayerDestroyed["Target"]) {
        if(typeof this.OnPlayerDestroyed["Target"] == "string") {
          if(this.OnPlayerDestroyed["Target"] == ("self" || "other")) {
            __OnPlayerDestroyed["target"] = this.OnPlayerDestroyed["Target"];
          }
          else return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Target]: expected type {Targets} instead found {${this.OnPlayerDestroyed["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnPlayerDestroyed] [child: Target]: expected type {string} instead found {${typeof this.OnPlayerDestroyed["Target"]}}`)
      }
      this.__components["minecraft:on_player_destroyed"] = __OnPlayerDestroyed;
    }
    else return new Error(`[${this.name}] [component: OnPlayerDestroyed]: expected {object} instead found {${typeof this.OnPlayerDestroyed}}`)
  }
  /**
   * @handleOnPlaced
   */
  if(this.OnPlaced) {
    if(typeof this.OnPlaced == "object") {
      let __OnPlaced = {}
      if(this.OnPlaced["Condition"]) {
        if(typeof this.OnPlaced["Condition"] == "string") {
          __OnPlaced["condition"] = this.OnPlaced["Condition"];
        }
        else return new Error(`[${this.name}] [component: OnPlaced] [child: Condition]: expected type {string} instead found {${typeof this.OnPlaced["Condition"]}}`)
      }
      if(this.OnPlaced["Event"]) {
        if(typeof this.OnPlaced["Event"] == "string") {
          __OnPlaced["event"] = this.OnPlaced["Target"];
        }
        else return new Error(`[${this.name}] [component: OnPlaced] [child: Event]: expected type {string} instead found {${typeof this.OnPlaced["Event"]}}`)
      }
      if(this.OnPlaced["Target"]) {
        if(typeof this.OnPlaced["Target"] == "string") {
          if(this.OnPlaced["Target"] == ("self" || "other")) {
            __OnPlaced["target"] = this.OnPlaced["Target"];
          }
          else return new Error(`[${this.name}] [component: OnPlaced] [child: Target]: expected type {Targets} instead found {${this.OnPlaced["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnPlaced] [child: Target]: expected type {string} instead found {${typeof this.OnPlaced["Target"]}}`)
      }
      this.__components["minecraft:on_placed"] = __OnPlaced;
    }
    else return new Error(`[${this.name}] [component: OnPlaced]: expected {object} instead found {${typeof this.OnPlaced}}`)
  }
  /**
   * @handleOnInteract
   */
  if(this.OnInteract) {
    if(typeof this.OnInteract == "object") {
      let __OnInteract = {}
      if(this.OnInteract["Condition"]) {
        if(typeof this.OnInteract["Condition"] == "string") {
          __OnInteract["condition"] = this.OnInteract["Condition"];
        }
        else return new Error(`[${this.name}] [component: OnInteract] [child: Condition]: expected type {string} instead found {${typeof this.OnInteract["Condition"]}}`)
      }
      if(this.OnInteract["Event"]) {
        if(typeof this.OnInteract["Event"] == "string") {
          __OnInteract["event"] = this.OnInteract["Target"];
        }
        else return new Error(`[${this.name}] [component: OnInteract] [child: Event]: expected type {string} instead found {${typeof this.OnInteract["Event"]}}`)
      }
      if(this.OnInteract["Target"]) {
        if(typeof this.OnInteract["Target"] == "string") {
          if(this.OnInteract["Target"] == ("self" || "other")) {
            __OnInteract["target"] = this.OnInteract["Target"];
          }
          else return new Error(`[${this.name}] [component: OnInteract] [child: Target]: expected type {Targets} instead found {${this.OnInteract["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: OnInteract] [child: Target]: expected type {string} instead found {${typeof this.OnInteract["Target"]}}`)
      }
      this.__components["minecraft:on_interact"] = __OnInteract;
    }
    else return new Error(`[${this.name}] [component: OnInteract]: expected {object} instead found {${typeof this.OnInteract}}`)
  }
  /**
   * @handleQueuedTicking
   */
  if(this.QueuedTicking) {
    if(typeof this.QueuedTicking == "object") {
      let __QueuedTicking = {"on_tick":{}}
      if(this.QueuedTicking["Looping"]) {
        if(typeof this.QueuedTicking["Looping"] == "boolean") {
          __QueuedTicking["looping"] = this.QueuedTicking["Looping"];
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: Looping]: expected type {boolean} instead found {${typeof this.QueuedTicking["Looping"]}}`)
      }
      if(this.QueuedTicking["IntervalRange"]) {
        if(typeof this.QueuedTicking["IntervalRange"] != ("string" || "object" || "boolean" || "number" || "Function")) {
          this.QueuedTicking["IntervalRange"].forEach(r=>{
            if(typeof r == "number") {
              __QueuedTicking["condition"] = this.QueuedTicking["IntervalRange"];
            }
            else return  new Error(`[${this.name}] [component: QueuedTicking] [child: IntervalRange]: expected type {number} instead found {${typeof this.QueuedTicking["IntervalRange"]}}`)
          })
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: IntervalRange]: expected type {number[]} instead found {${typeof this.QueuedTicking["Condition"]}}`)
      }
      if(this.QueuedTicking["Condition"]) {
        if(typeof this.QueuedTicking["Condition"] == "string") {
          __QueuedTicking["on_tick"]["condition"] = this.QueuedTicking["Condition"];
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: Condition]: expected type {string} instead found {${typeof this.QueuedTicking["Condition"]}}`)
      }
      if(this.QueuedTicking["Event"]) {
        if(typeof this.QueuedTicking["Event"] == "string") {
          __QueuedTicking["on_tick"]["event"] = this.QueuedTicking["Target"];
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: Event]: expected type {string} instead found {${typeof this.QueuedTicking["Event"]}}`)
      }
      if(this.QueuedTicking["Target"]) {
        if(typeof this.QueuedTicking["Target"] == "string") {
          if(this.QueuedTicking["Target"] == ("self" || "other")) {
            __QueuedTicking["on_tick"]["target"] = this.QueuedTicking["Target"];
          }
          else return new Error(`[${this.name}] [component: QueuedTicking] [child: Target]: expected type {Targets} instead found {${this.QueuedTicking["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: QueuedTicking] [child: Target]: expected type {string} instead found {${typeof this.QueuedTicking["Target"]}}`)
      }
      this.__components["minecraft:queued_ticking"] = __QueuedTicking;
    }
    else return new Error(`[${this.name}] [component: QueuedTicking]: expected {object} instead found {${typeof this.QueuedTicking}}`)
  }
  /**
   * @handleRandomTicking
   */
  if(this.RandomTicking) {
    if(typeof this.RandomTicking == "object") {
      let __RandomTicking = {"on_tick":{}}
      if(this.RandomTicking["Condition"]) {
        if(typeof this.RandomTicking["Condition"] == "string") {
          __RandomTicking["on_tick"]["condition"] = this.RandomTicking["Condition"];
        }
        else return new Error(`[${this.name}] [component: RandomTicking] [child: Condition]: expected type {string} instead found {${typeof this.RandomTicking["Condition"]}}`)
      }
      if(this.RandomTicking["Event"]) {
        if(typeof this.RandomTicking["Event"] == "string") {
          __RandomTicking["on_tick"]["event"] = this.RandomTicking["Target"];
        }
        else return new Error(`[${this.name}] [component: RandomTicking] [child: Event]: expected type {string} instead found {${typeof this.RandomTicking["Event"]}}`)
      }
      if(this.RandomTicking["Target"]) {
        if(typeof this.RandomTicking["Target"] == "string") {
          if(this.RandomTicking["Target"] == ("self" || "other")) {
            __RandomTicking["on_tick"]["target"] = this.RandomTicking["Target"];
          }
          else return new Error(`[${this.name}] [component: RandomTicking] [child: Target]: expected type {Targets} instead found {${this.RandomTicking["Target"]}}`)
        }
        else return new Error(`[${this.name}] [component: RandomTicking] [child: Target]: expected type {string} instead found {${typeof this.RandomTicking["Target"]}}`)
      }
      this.__components["minecraft:random_ticking"] = __RandomTicking;
    }
    else return new Error(`[${this.name}] [component: RandomTicking]: expected {object} instead found {${typeof this.RandomTicking}}`)
  }
  return  Object.values(this.__Data).values().next().value

}
}

exports.Permutation = PermutationComponent