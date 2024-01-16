/**
 * Enum of all runtime Identifiers
 * @enum {string}
 */
const RuntimeIDs = {
  AGENT: "agent",
  ALLAY: "allay",
  AREA_EFFECT_CLOUD: "area_effect_cloud",
  ARMADILLO: "armadillo",
  ARMOR_STAND: "armor_stand",
  ARROW: "arrow",
  AXOLOTL: "axolotl",
  BALLOON: "balloon",
  BAT: "bat",
  BEE: "bee",
  BLAZE: "blaze",
  BOAT: "boat",
  BREEZE: "breeze",
  CAMEL: "camel",
  CAT: "cat",
  CAVE_SPIDER: "cave_spider",
  CHALKBOARD: "chalkboard",
  CHEST_BOAT: "chest_boat",
  CHEST_MINECART: "chest_minecart",
  CHICKEN: "chicken",
  COD: "cod",
  COMMAND_BLOCK_MINECART: "command_block_minecart",
  COW: "cow",
  CREEPER: "creeper",
  DOLPHIN: "dolphin",
  DONKEY: "donkey",
  DRAGON_FIREBALL: "dragon_fireball",
  DROWNED: "drowned",
  EGG: "egg",
  ELDER_GUARDIAN: "elder_guardian",
  ELDER_GUARDIAN_GHOST: "elder_guardian_ghost",
  ENDER_CRYSTAL: "ender_crystal",
  ENDER_DRAGON: "ender_dragon",
  ENDER_PEARL: "ender_pearl",
  ENDERMAN: "enderman",
  ENDERMITE: "endermite",
  EVOCATION_FANG: "evocation_fang",
  EVOCATION_ILLAGER: "evocation_illager",
  EYE_OF_ENDER_SIGNAL: "eye_of_ender_signal",
  FALLING_BLOCK: "falling_block",
  FIREBALL: "fireball",
  FIREWORKS_ROCKET: "fireworks_rocket",
  FISHING_HOOK: "fishing_hook",
  FOX: "fox",
  FROG: "frog",
  GHAST: "ghast",
  GLOW_SQUID: "glow_squid",
  GOAT: "goat",
  GUARDIAN: "guardian",
  HOGLIN: "hoglin",
  HOPPER_MINECART: "hopper_minecart",
  HORSE: "horse",
  HUSK: "husk",
  ICE_BOMB: "ice_bomb",
  IRON_GOLEM: "iron_golem",
  ITEM: "item",
  LEASH_KNOT: "leash_knot",
  LIGHTNING_BOLT: "lightning_bolt",
  LINGERING_POTION: "lingering_potion",
  LLAMA: "llama",
  LLAMA_SPIT: "llama_spit",
  MAGMA_CUBE: "magma_cube",
  MINECART: "minecart",
  MOOSHROOM: "mooshroom",
  MOVING_BLOCK: "moving_block",
  MULE: "mule",
  NPC: "npc",
  OCELOT: "ocelot",
  PAINTING: "painting",
  PANDA: "panda",
  PARROT: "parrot",
  PHANTOM: "phantom",
  PIG: "pig",
  PIGLIN: "piglin",
  PIGLIN_BRUTE: "piglin_brute",
  PILLAGER: "pillager",
  PLAYER: "player",
  POLAR_BEAR: "polar_bear",
  PUFFERFISH: "pufferfish",
  RABBIT: "rabbit",
  RAVAGER: "ravager",
  SALMON: "salmon",
  SHEEP: "sheep",
  SHIELD: "shield",
  SHULKER: "shulker",
  SHULKER_BULLET: "shulker_bullet",
  SILVERFISH: "silverfish",
  SKELETON: "skeleton",
  SKELETON_HORSE: "skeleton_horse",
  SLIME: "slime",
  SMALL_FIREBALL: "small_fireball",
  SNIFFER: "sniffer",
  SNOW_GOLEM: "snow_golem",
  SNOWBALL: "snowball",
  SPIDER: "spider",
  SPLASH_POTION: "splash_potion",
  SQUID: "squid",
  STRAY: "stray",
  STRIDER: "strider",
  TADPOLE: "tadpole",
  THROWN_TRIDENT: "thrown_trident",
  TNT: "tnt",
  TNT_MINECART: "tnt_minecart",
  TRADER_LLAMA: "trader_llama",
  TRIPOD_CAMERA: "tripod_camera",
  TROPICALFISH: "tropicalfish",
  TURTLE: "turtle",
  VEX: "vex",
  VILLAGER: "villager",
  VILLAGER_V2: "villager_v2",
  VINDICATOR: "vindicator",
  WANDERING_TRADER: "wandering_trader",
  WARDEN: "warden",
  WIND_CHARGE_PROJECTILE: "wind_charge_projectile",
  WITCH: "witch",
  WITHER: "wither",
  WITHER_SKELETON: "wither_skeleton",
  WITHER_SKULL: "wither_skull",
  WITHER_SKULL_DANGEROUS: "wither_skull_dangerous",
  WOLF: "wolf",
  XP_BOTTLE: "xp_bottle",
  XP_ORB: "xp_orb",
  ZOGLIN: "zoglin",
  ZOMBIE: "zombie",
  ZOMBIE_HORSE: "zombie_horse",
  ZOMBIE_PIGMAN: "zombie_pigman",
  ZOMBIE_VILLAGER: "zombie_villager",
  ZOMBIE_VILLAGER_V2: "zombie_villager_v2"
};

/**
 * @typedef {Object} CategoryType
 * @property {string} Construction
 * @property {string} Items
 * @property {string} Equipments
 * @property {string} Nature
 * @property {string} None
 */

/**
 * @typedef {Object} GroupType
 * @property {string} Planks
 * @property {string} Slabs
 * @property {string} Stairs
 * @property {string} Fences
 * @property {string} FenceGates
 * @property {string} Walls
 */

/**
 * A enum of Category types
 * @enum {CategoryType}
 */
const Categories = {
  Construction: "construction",
  Items: "items",
  Equipments: "Equipments",
  Nature: "nature",
  None: "none"
}
/**
 * A enum of Group types
 * @enum {GroupType}
 */
const Groups = {
  Planks: "itemGroup.planks.name",
  Slabs: "itemGroup.slabs.name",
  Stairs: "itemGroup.stairs.name",
  Fences: "itemGroup.fences.name",
  FenceGates: "itemGroup.fence_gates.name",
  Walls: "itemGroup.walls.name"
}

module.exports = {
  RuntimeIdentifiers,
  RuntimeIDs,
  Categories,
  Groups
}