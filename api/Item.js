const { isNegative } = require("../Utils");
const { validCategories } = require("./CreativeCategory");


class Item {
    static __Data = {
        "format_version": config["version"],
        "minecraft:item": {
          "description": {
            "identifier": "",
            "menu_category": {}
          },
          "components": {},
        },
      };
      static __components = this.__Data["minecraft:item"]["components"];
      /**
       * @BlockData
       */
      static isHiddenInCommands = false;
      static Category;
      static Group;
      static AllowOffHand;
      static BlockPlacer;
      static DisplayName;
      static CoolDown;
      static Damage;
      static Digger;
      static Durability;
      static Enchantable;
      static Icon;
      static EntityPlacer;
      static Food;
      static Fuel;
      static Glint;
      static HandEquipped;
      static HoverTextColor;
      static InteractButton;
      static ItemStorage;
      static LiquidClipped;
      static MaxStackSize;
      static Projectile;
      static Record;
      static Repairable;
      static Shooter;
      static ShouldDespawn;
      static StackedByData;
      static Throwable;
      static UseAnimation;
      static UseDuration;
      static Wearable;
      /**
       * @CreatesItemObject
       */
      static init() {
        this.__Data["minecraft:item"]["description"]["identifier"] = `${c["prefix"]}:${this.name.toLowerCase()}`
        /**
         * @handleCategory
         */
        if (this.Category) {
          if (typeof this.Category == "string") {
            if(validCategories.has(this.Category)) {
              this.__Data["minecraft:block"]["description"]["menu_category"]["category"] = this.Category;
            } 
            else return new Error(`[${this.name}] [component: Category]: expected @class {Category} instead found ${this.Category}`);
          }
          else return new Error(`[${this.name}] [component: Category]: expected string instead found ${this.Category}`);
        }
        /**
         * @handleGroup
         */
        if (this.Group) {
          if (typeof this.Group==="string") {
            this.__Data["minecraft:block"]["description"]["menu_category"]["group"] = this.Group;
          }
          else return new Error(`[${this.name}] [component: Group]: expected string but instead found ${typeof this.Group}`);
        }
    
        /**
         * @handleDisplayName
         */
        if (this.DisplayName) {
          if (typeof this.DisplayName === "string") {
            this.__components["minecraft:display_name"] = {
              "value": this.DisplayName
            }
          } else
            return new Error(`[${this.name}] [component: DisplayName]: expected string instead found ${this.DisplayName}`);
        }
        /**
         * @handleDamage
         */
        if (this.Damage) {
          if (typeof this.Damage === "number" && !isNegative(this.Damage)) {
            this.__components["minecraft:damage"] = {
              "value": this.Damage,
            }
          } else return new Error(`[${this.name}] [component: Damage]: expected integer greater than -1 instead found ${typeof this.DestroyTime}`)
        }
        /**
         * @handleAllowOffHand
         */
        if (this.AllowOffHand) {
          if (typeof this.AllowOffHand === "boolean") {
            this.__components["minecraft:allow_off_hand"]=this.AllowOffHand;
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
            else return new Error(`[${this.name}] [component: CatchChanceModifier]: expected number instead found ${typeof this.CatchChanceModifier}`)
          }
          if (this.DestroyChanceModifier) {
            if (typeof this.DestroyChanceModifier === "number") {
              __Flammable["destory_chance_modifier"] = thid.DestroyChanceModifier;
            }
            else return new Error(`[${this.name}] [component: DestroyChanceModifier`)
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
              else return new Error(`[${this.name}] [component: RenderMethod]: expected @RenderMethod but found ${this.RenderMethod}`)
            }
            else return new Error(`[${this.name}] [component: RenderMethod]: expected string instead found ${typeof this.RenderMethod}`)
          }
          if(this.FaceDimming) {
            
          }
          if(this.AmbientOcclusion) {
            
          }
        }
    
        return JSON.stringify(this.__Data);
      }
}