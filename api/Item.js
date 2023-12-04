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
      if (typeof this.Category != "string") return new Error(`[${this.name}] [component: Category]: expected type {string} instead found {${this.Category}}`);
      if (this.Category != ("construction" || "equipments" || "items" || "nature" || "none")) return new Error(`[${this.name}] [component: Category]: expected type {Categorys} instead found {${this.Category}}`);
      this.__Data["minecraft:block"]["description"]["menu_category"]["category"] = this.Category;
    }
    /**
     * @handleGroup
     */
    if (this.Group) {
      if (typeof this.Group != "string") return new Error(`[${this.name}] [component: Group]: expected type {Groups|string} but instead found {${typeof this.Group}}`);
      this.__Data["minecraft:block"]["description"]["menu_category"]["group"] = this.Group;
    }
    /**
     * @handleIsHiddenInCommands
     */
    if (this.IsHiddenInCommands) {
      if (typeof this.IsHiddenInCommands != "boolean") return new Error(`[${this.name}] [component: IsHiddenInCommands]: expected type {boolean} instead found {${typeof this.IsHiddenInCommands}}`)
      this.__Data["minecraft:block"]["description"]["menu_category"]["is_hidden_in_commands"] = this.IsHiddenInCommands;
    }
    /**
     * @handleDisplayName
     */
    if (this.DisplayName) {
      if (typeof this.DisplayName != "string") return new Error(`[${this.name}] [component: DisplayName]: expected type {string} instead found {${this.DisplayName}}`);
      this.__components["minecraft:display_name"] = {"value": this.DisplayName}
    }
    /**
     * @handleDamage
     */
    if (this.Damage) {
      if (typeof this.Damage != "number" && isNegative(this.Damage)) return new Error(`[${this.name}] [component: Damage]: expected type {integer} greater than -1 instead found ${typeof this.DestroyTime}`)
      this.__components["minecraft:damage"] = {"value": this.Damage}
    }
    /**
     * @handleAllowOffHand
     */
    if (this.AllowOffHand) {
      if (typeof this.AllowOffHand != "boolean") return new Error(`[${this.name}] [component: AllowOffHand]: expected type {string} instead found {${typeof this.AllowOffHand}}`)
      this.__components["minecraft:allow_off_hand"] = this.AllowOffHand;
    }
    return JSON.stringify(this.__Data);
  }
}