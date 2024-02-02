const { Components } = require("./Component.js");
const config = require("../../msc.config.json");
const { isValidCategory, isValidGroup } = require('../validation.js')
const { BlockEventTriggerHandler, ME, isFloat, SetMixin,getClassExtendsOf} = require('../../utilities/exports_util.js');
//const { BlockLootTable } = require("./LootTable.js")
Object.assign(Set.prototype, SetMixin);

class Block {
  /**
   * 
   * @private
   */
  static __Data = {
    "format_version": config.formatVersions.find(obj => obj.name === 'block').version,
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
  static lastState = {};

  /**
   * @private
   */
  static reset() {
    Block.__components = {}
    // Delete properties from the class that were in lastState but not in the current state
    if (Object.keys(Block.lastState).length > 0) {
      for (const key in Block.lastState) {
        if (key === '__components' || key === '__Data' || key === 'reset' || typeof this[key] === 'function') continue;
        if (!this[key]) {
          delete this[key];
        }
      }
    }
    // Update lastState with the current state
    Block.lastState = Object.fromEntries(
      Object.entries(this)
        .filter(([key, value]) => key !== 'lastState' && key !== '__Data' && key !== 'reset' && key !== '__components' && value !== null && value !== undefined)
    );
  }
  /**
   * Components of Block.
   * @type {BlockComponents}
   * @private
   */
  static __components = this.__Data["minecraft:block"].components;
  /**
   * Defines the format version of the Block.
   * @type {string}
   */
  static Version;
  /**
   * (Optional) Defines the namespaces of the Block.
   * @type {string}
   */
  static Namespace;
  /**
   * (Optional) Defines the Identifier for the Block.
   * @type {string}
   */
  static Identifier;
  /**
   * Defines the Category for the Block to be in creative menu.
   * @type {string}
   */
  static Category;
  /**
   * Defines the Group for the Block to be in creative menu.
   * @type {string}
   */
  static Group;
  /**
   * Defines if the Block will be showen in command/chat or not.
   * @type {boolean} 
   */
  static IsHiddenInCommands;
  /**
   * Block's "minecraft:display_name" component.
   * @type {string}
   */
  static DisplayName;
  /**
   * Block's "minecraft:destructible_by_mining" component
   * @type {boolean|number}
   */
  static DestroyTime;
  /** @type {boolean|number} */
  static ExplosionResistance;
  /** @type {number} */
  static Friction;
  /** @type {FlammableComponent} */
  static Flammable;
  /** @type {MaterialInstancesComponent} */
  static MaterialInstances;
  /** @type {number} */
  static LightEmmision;
  /** @type {number} */
  static LightDampening;
  /** @type {string} */
  static Geometry;
  /** @type {BoneVisibilityComponent} */
  static BoneVisibility;
  /** @type {PlacementFilterComponent} */
  static PlacementFilter;
  /** @type {TransformationComponent} */
  static Transformation;
  /** @type {string} */
  static Loot;
  /** @type {MapColorComponent} */
  static MapColor;
  /** @type {CollisionBoxComponent} */
  static CollisionBox;
  /** @type {SelectionBoxComponent} */
  static SelectionBox;
  /** @type {CraftingTableComponent} */
  static CraftingTable;
  /** @type {OnStepOnComponent}*/
  static OnStepOn;
  /** @type {OnStepOffComponent} */
  static OnStepOff;
  /** @type {OnInteractComponent}*/
  static OnInteract;
  /** @type {OnFallOnComponent} */
  static OnFallOn;
  /** @type {OnPlayerPlacingComponent} */
  static OnPlayerPlacing;
  /** @type {OnPlacedComponent} */
  static OnPlaced;
  /** @type {OnPlayerDestroyedComponent} */
  static OnPlayerDestroyed;
  /** @type {QueuedTickingComponent} */
  static QueuedTicking;
  /** @type {RandomTickingComponent} */
  static RandomTicking;
  /**
   * @BlockStatesAndPermutationss
   */
  /** @type {{[name:string]: number[]|string[]|boolean[]}} */
  static States;
  /** @type {Components[]} */
  static Permutations;

  /**
   * @CreatesBlockObject
   */
  static init() {
    if (getClassExtendsOf(this) === 'Block') {this.reset()};
    this.__Data["minecraft:block"].description.identifier = `${config.globalNamespace}:${this.name.toLowerCase()}`
    //Filters out the keys that have no value
    for (const [cdata, cvalue] of Object.entries(this).filter(([_, val]) => val !== undefined)) {
      switch (cdata) {
        // Ignoring private properties
        case "__Data": break;
        case "__components": break;
        case "reset": break;
        case "init": break;

        // Handling Components
        case "Version": {
          if (typeof cvalue != "string") return ME(this, cvalue, [cdata], "string");
          this.__Data.format_version = cvalue;
        }; break;
        case "Namespace": {
          if (typeof cvalue != "string") return ME(this, cvalue, [cdata], "string");
          this.__Data["minecraft:block"].description.identifier.split(":")[0].replace(config.globalNamespace, cvalue)
        }; break;
        case "Identifier": {
          if (typeof cvalue != "string") return ME(this, cvalue, [cdata], "string");
          this.__Data["minecraft:block"].description.identifier.split(":")[1].replace(this.name.toLowerCase(), cvalue)
        }; break;
        case "Category": {
          if (typeof cvalue != "string") return ME(this, cvalue, [cdata], "string")
          if (!isValidCategory(cvalue)) return new Error(`[${this.name}] [component: Category]: ${cvalue} is not a valid Category. please check CategoriesAndGroups.md to see all the valid categories.\n`)
          this.__Data["minecraft:block"].description.menu_category.category = cvalue;
        }; break;
        case "Group": {
          if (typeof cvalue != "string") return ME(this, cvalue, [cdata], "string")
          if (!isValidGroup(cvalue)) return new Error(`[${this.name}] [component: Group]: ${cvalue} is not a valid Group. please check CategoriesAndGroups.md to see all the valid groups.\n`)
          this.__Data["minecraft:block"].description.menu_category.group = cvalue;
        }; break;
        case "IsHiddenInCommands": {
          if (typeof cvalue != "boolean") return ME(this, cvalue, [cdata], "boolean")
          this.__Data["minecraft:block"].description.menu_category.is_hidden_inCommands = cvalue;
        }; break;
        case "DisplayName": {
          if (typeof cvalue != "string") return ME(this, cvalue, [cdata], "string");
          this.__components["minecraft:display_name"] = cvalue;
        }; break;
        case "Friction": {
          if (!(typeof cvalue == "number" && isFloat(cvalue))) return ME(this, cvalue, [cdata], "float")
          if (!(0.0 <= cvalue && 1.0 >= cvalue)) return new Error(`[${this.name}] [component: Friction]: Expected the value to be in range of 0.0 to 1.0\n`);
          this.__components["minecraft:friction"] = cvalue;
        }; break;
        case "LightEmmision": {
          if (typeof cvalue != "number") return ME(this, cvalue, [cdata], "number")
          this.__components["minecraft:light_emmision"] = cvalue;
        }; break;
        case "LightDampening": {
          if (typeof cvalue != "number") return ME(this, cvalue, [cdata], "number")
          this.__components["minecraft:light_dampening"] = cvalue;
        }; break;
        case "Tags": {
          if (!Array.isArray(cvalue)) return ME(this, cvalue, [cdata], "string[]")
          cvalue.map((t, i) => {
            if (typeof t != "string") return ME(this, t, [cdata, i], "string")
            this.__components[`tag:${t}`] = {}
          })
        }; break;
        case "Geometry": {
          if (typeof cvalue != "string") return Me(this, cvalue, [cdata], "string")
          this.__components["minecraft:geometry"] = {
            identifier: cvalue
          }
        }; break;
        case "BoneVisibility": {
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
          this.__components["minecraft:geometry"].bone_visibility = {}
          for (let [k, v] of Object.entries(cvalue)) {
            if (typeof k != "string") return ME(this, k, [cdata, k], "string")
            if (!Array.isArray(v)) return ME(this, v, [cdata, k, v], "string[]|number[]|boolean[]")
            this.__components["minecraft:geometry"].bone_visibility[k] = v;
          }
        }; break;
        case "MapColor": {
          if (typeof cvalue == "string") {
            this.__components["minecraft:map_color"] = cvalue;
          }
          if (Array.isArray(cvalue)) {
            let mapcolor = []
            cvalue.map(c => {
              if (c < 0 && c > 255) return new Error(`[${this.name}] [component: MapColor]: Expected number to be between 0-255 instead found ${c}`)
              mapcolor.push(c)
            })
            this.__components["minecraft:map_color"] = mapcolor;
          }
          else return ME(this, cvalue, [cdata], "string|number[]")
        }; break;
        case "DestroyTime": {
          if (typeof cvalue == "number") {
            this.__components["minecraft:destructible_by_mining"] = { seconds_to_destroy: cvalue };
          }
          else if (typeof cvalue == "boolean") {
            this.__components["minecraft:destructible_by_mining"] = cvalue;
          }
          else return ME(this, cvalue, [cdata], "boolean|number");
        }; break;
        case "ExplosionResistance": {
          if (typeof cvalue == "number") {
            this.__components["minecraft:explosion_resistance"] = { explosion_resistance: cvalue }
          }
          else if (typeof cvalue == "boolean") {
            this.__components["minecraft:explosion_resistance"] = cvalue;
          }
          else return ME(this, cvalue, [cdata], "boolean|number");
        }; break;
        case "Flammable": {
          if (typeof cvalue == "boolean") {
            this.__components["minecraft:flammable"] = cvalue;
          }
          if (Array.isArray(cvalue)) return ME(this, cvalue, [cdata], "boolean|number[]")
          if (!(typeof cvalue[0] == "number" || cvalue[0] == null)) return ME(this, cvalue, [cdata, "CatchChance"], "number|null");
          if (!(typeof cvalue[1] == "number" || cvalue[1] == null)) return ME(this, cvalue, [cdata, "DestroyChance"], "number|null");
          if (cvalue[1] == null) {
            this.__components["minecraft:flammable"] = { catch_chance_modifier: cvalue[0] }
          }
          if (cvalue[0] == null) {
            this.__components["minecraft:flammable"] = { destroy_chance_modifier: cvalue[1] }
          }
          if (typeof cvalue[0] == "number" && typeof cvalue[1] == "number") {
            this.__components["minecraft:flammable"] = {
              catch_chance_modifier: cvalue[0],
              destroy_chance_modifier: cvalue[1]
            }
          }
        }; break;
        case "MaterialInstances": {
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
          let __MaterialInstancesInstances = {}
          for (let [k, v] of Object.entries(cvalue)) {
            let __MaterialInstances = {}
            if (typeof v != "object") return ME(this, v, [cdata, k], "object")
            if (v.Texture) {
              if (typeof v.Texture != "string") return ME(this, v, [cdata, k, "Texture"], "string")
              __MaterialInstances.texture = v.Texture;
            }
            if (v.RenderMethod) {
              if (typeof v.RenderMethod != "string") return ME(this, v, [cdata, k, "RenderMethod"], "string")
              if (!isRenderMethod(v.RenderMethod)) return new Error(`[${this.name}] [component: ${cdata}] [child: ${k}] [subChild: RenderMethod]: Expected (opaque|blend|alpha_test|double_sided)`)
              __MaterialInstances.render_method = v.RenderMethod;
            }
            if (v.FaceDimming) {
              if (typeof v != "boolean") return ME(this, v, [cdata, k, "FaceDimming"], "boolean")
              __MaterialInstances.face_dimming = v.FaceDimming;
            }
            if (v.AmbientOcclusion) {
              if (typeof v != "boolean") return ME(this, v, [cdata, k, "AmbientOcclusion"], "boolean")
              __MaterialInstances.ambient_occlusion = v.AmbientOcclusion;
            }
            __MaterialInstancesInstances[__MaterialInstances]
          }
          this.__components["minecraft:material_instances"] = __MaterialInstancesInstances;
        }; break;
        case "PlacementFilter": {
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
          let placementfilter = {}
          if (cvalue.AllowedFaces) {
            if (!Array.isArray(cvalue.AllowedFaces)) return ME(this, cvalue.AllowedFaces, [cdata, "AllowedFaces"], "string[]")
            placementfilter.allowed_faces = []
            cvalue.AllowedFaces.map((f, i) => {
              if (typeof f != "string") return ME(this, f, [cdata, "AllowedFaces"], "string[]")
              if (!isValidBlockFace(f)) return new Error(`[${this.name}] [component: PlacementFilter] [child: AllowedFaces] [subChild: ${i}]: Expected (up|down|east|west|north|south) instead found ${f}.\n`)
              placementfilter.allowed_faces.push(f)
            })
          }
          if (cvalue.BlockFilter) {
            if (!Array.isArray(cvalue.BlockFilter)) return ME(this, cvalue.BlockFilter, [cdata, "BlockFilter"], "string[]|object[]")
            placementfilter.block_filter = []
            cvalue.BlockFilter.map((b, i) => {
              if (typeof b == "string") { placementfilter.block_filter.push(b) }
              else if (typeof b == "object") {
                if (!b.tags) return new Error(`[${this.name}] [component: PlacementFilter] [child: BlockFilter] [subChild: ${i}] Expected property 'tags'`)
                let pfobj = { tags: b.tags }
                placementfilter.block_filter.push(pfobj)
              }
              else return ME(this, b, [cdata, "BlockFilter", b], "string|object")
            })
          }
        }; break;
        case "Transformation": {
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
          let transformation = {}
          if (cvalue.Translation) {
            if (!Array.isArray(cvalue.Translation)) return ME(this, cvalue.Translation, [cdata, "Translation"], "number[]")
            transformation.translation = []
            cvalue.Translation.map(x => {
              if (typeof x != "number") return ME(this, x, [cdata, "Translation", x], "number")
              transformation.translation.push(x)
            })
          }
          if (cvalue.Rotation) {
            if (!Array.isArray(cvalue.Rotation)) return ME(this, cvalue.Rotation, [cdata, "Rotation"], "number[]")
            transformation.rotation = []
            cvalue.Rotation.map(x => {
              if (typeof x != "number") return ME(this, x, [cdata, "Rotation", x], "number")
              transformation.rotation.push(x)
            })
          }
          if (cvalue.Scale) {
            if (!Array.isArray(cvalue.Scale)) return ME(this, cvalue.Scale, [cdata, "Scale"], "number[]")
            transformation.scale = []
            cvalue.Scale.map(x => {
              if (typeof x != "number") return ME(this, x, [cdata, "Scale", x], "number")
              transformation.scale.push(x)
            })
          }
          this.__components["minecraft:transformation"] = transformation;
        }; break;
        case "CollisionBox": {
          if (typeof cvalue == "boolean") { this.__components["minecraft:_box"] = cvalue; }
          else if (typeof cvalue == "object") {
            let collisionbox = {};
            if (cvalue.Origin) {
              if (!Array.isArray(cvalue.Origin)) return ME(this, cvalue.Origin, [cdata, "Origin"], "number[]")
              let origin = []
              cvalue.Origin.map(x => {
                if (typeof x != "number") return ME(this, x, [cdata, "Origin", x], "number")
                origin.push(x)
              })
              collisionbox.origin = origin;
            }
            if (cvalue.Size) {
              if (!Array.isArray(cvalue.Size)) return ME(this, cvalue.Size, [cdata, "Size"], "number[]")
              let size = []
              cvalue.Size.map(x => {
                if (typeof x != "number") return ME(this, x, [cdata, "Size", x], "number")
                size.push(x)
              })
              collisionbox.size = size;
            }
            this.__components["minecraft:collision_box"] = collisionbox;
          }
          else return ME(this, cvalue, [cdata], "boolean|object")
        }; break;
        case "SelectionBox": {
          if (typeof cvalue == "boolean") { this.__components["minecraft:_box"] = cvalue; }
          else if (typeof cvalue == "object") {
            let selectionbox = {};
            if (cvalue.Origin) {
              if (!Array.isArray(cvalue.Origin)) return ME(this, cvalue.Origin, [cdata, "Origin"], "number[]")
              let origin = []
              cvalue.Origin.map(x => {
                if (typeof x != "number") return ME(this, x, [cdata, "Origin", x], "number")
                origin.push(x)
              })
              selectionbox.origin = origin;
            }
            if (cvalue.Size) {
              if (!Array.isArray(cvalue.Size)) return ME(this, cvalue.Size, [cdata, "Size"], "number[]")
              let size = []
              cvalue.Size.map(x => {
                if (typeof x != "number") return ME(this, x, [cdata, "Size", x], "number")
                size.push(x)
              })
              selectionbox.size = size;
            }
            this.__components["minecraft:selection_box"] = selectionbox;
          }
          else return ME(this, cvalue, [cdata], "object")
        }; break;
        case "CraftingTable": {
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
          this.__components["minecraft:crafting_table"] = {}
          if (cvalue.TableName) {
            if (typeof cvalue.TableName != "string") return ME(this, cvalue.TableName, [cdata, "TableName"], "string")
            this.__components["minecraft:crafting_table"].table_name = cvalue.TableName
          }
          if (cvalue.CraftingTags) {
            if (!Array.isArray(cvalue.CraftingTags)) return ME(this, cvalue.CraftingTags, [cdata, "CraftingTags"], "string[]")
            this.__components["minecraft:crafting_table"].crafting_tags = []
            cvalue.CraftingTags.map(x => {
              if (typeof x != "string") return ME(this, x, [cdata, "CraftingTags", x], "string")
              this.__components["minecraft:crafting_table"].crafting_tags.push(x)
            })
          }
        }; break;
        case "OnStepOn": this.__components["minecraft:on_step_on"] = BlockEventTriggerHandler(this.OnStepOn, [cdata], this); break;
        case "OnStepOff": this.__components["minecraft:on_step_off"] = BlockEventTriggerHandler(this.OnStepOff, [cdata], this); break;
        case "OnFallOn": this.__components["minecraft:on_fall_on"] = BlockEventTriggerHandler(this.OnFallOn, [cdata], this); break;
        case "OnInteract": this.__components["minecraft:on_interact"] = BlockEventTriggerHandler(this.OnInteract, [cdata], this); break;
        case "OnPlaced": this.__components["minecraft:on_placed"] = BlockEventTriggerHandler(this.OnPlaced, [cdata], this); break;
        case "OnPlayerPlacing": this.__components["minecraft:on_player_placed"] = BlockEventTriggerHandler(this.OnPlayerPlacing, [cdata], this); break;
        case "OnPlayerDestroyed": this.__components["minecraft:on_player_destroyed"] = BlockEventTriggerHandler(this.OnPlayerDestroyed, [cdata], this); break;
        case "QueuedTicking": {
          this.__components["minecraft:queued_ticking"] = {}
          this.__components["minecraft:queued_ticking"].on_tick = BlockEventTriggerHandler(this.QueuedTicking, [cdata], this)
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
          if (cvalue.Looping) {
            if (typeof cvalue.Looping != "boolean") return ME(this, cvalue.Looping, [cdata, "Looping"], "boolean")
            this.__components["minecraft:queued_ticking"].looping = cvalue;
          }
          if (cvalue.IntervalRange) {
            if (!Array.isArray(cvalue.IntervalRange)) return ME(this, cvalue.IntervalRange, [cdata, "IntervalRange"], "number[]")
            let ir = this.__components["minecraft:queued_ticking"].interval_range = []
            cvalue.IntervalRange.map(x => {
              if (typeof x != "number") return ME(this, x, [cdata, "IntervalRange"], "number")
              ir.push(x)
            })
          }
        }; break;
        case "RandomTicking": {
          if (typeof cvalue != "object") return ME(this, cvalue, [cdata], "object")
        }; break;
      }
    }
    this.__Data["minecraft:block"]["components"] = this.__components

    return JSON.stringify(this.__Data, null, 2);
  }
}
module.exports = {
  Block
};