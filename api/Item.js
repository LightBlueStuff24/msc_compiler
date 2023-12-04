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
      static IsHiddenInCommands = false;
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
         * @handleIsHiddenInCommands
         */
        if(this.IsHiddenInCommands) {
          if(typeof this.IsHiddenInCommands == "boolean") {
            this.__Data["minecraft:block"]["description"]["menu_category"]["is_hidden_in_commands"] = this.IsHiddenInCommands;
          }
          else return new Error(`[${this.name}] [component: IsHiddenInCommands]: expected type {boolean} instead found {${typeof this.IsHiddenInCommands}}`)
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
            return new Error(`[${this.name}] [component: DisplayName]: expected type {string} instead found {${this.DisplayName}}`);
        }
        /**
         * @handleDamage
         */
        if (this.Damage) {
          if (typeof this.Damage === "number" && !isNegative(this.Damage)) {
            this.__components["minecraft:damage"] = {
              "value": this.Damage,
            }
          } else return new Error(`[${this.name}] [component: Damage]: expected type {integer} greater than -1 instead found ${typeof this.DestroyTime}`)
        }
        /**
         * @handleAllowOffHand
         */
        if (this.AllowOffHand) {
          if (typeof this.AllowOffHand === "boolean") {
            this.__components["minecraft:allow_off_hand"]=this.AllowOffHand;
          }
        }
        return JSON.stringify(this.__Data);
      }
}