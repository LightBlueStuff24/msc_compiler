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
const validCategories = new Set(['construction','items','equipments','nature','none'])
const validGroups = new Set([
  "itemGroup.name.anvil",
  "itemGroup.name.arrow",
  "itemGroup.name.axe",
  "itemGroup.name.banner",
  "itemGroup.name.banner_pattern",
  "itemGroup.name.bed",
  "itemGroup.name.boat",
  "itemGroup.name.boots",
  "itemGroup.name.buttons",
  "itemGroup.name.candles",
  "itemGroup.name.chalkboard",
  "itemGroup.name.chemistrytable",
  "itemGroup.name.chest",
  "itemGroup.name.chestboat",
  "itemGroup.name.chestplate",
  "itemGroup.name.concrete",
  "itemGroup.name.concretePowder",
  "itemGroup.name.cookedFood",
  "itemGroup.name.copper",
  "itemGroup.name.coral",
  "itemGroup.name.coral_decorations",
  "itemGroup.name.crop",
  "itemGroup.name.door",
  "itemGroup.name.dye",
  "itemGroup.name.element",
  "itemGroup.name.enchantedBook",
  "itemGroup.name.fence",
  "itemGroup.name.fenceGate",
  "itemGroup.name.firework",
  "itemGroup.name.fireworkStars",
  "itemGroup.name.flower",
  "itemGroup.name.glass",
  "itemGroup.name.glassPane",
  "itemGroup.name.glazedTerracotta",
  "itemGroup.name.goatHorn",
  "itemGroup.name.grass",
  "itemGroup.name.hanging_sign",
  "itemGroup.name.helmet",
  "itemGroup.name.hoe",
  "itemGroup.name.horseArmor",
  "itemGroup.name.leaves",
  "itemGroup.name.leggings",
  "itemGroup.name.lingeringPotion",
  "itemGroup.name.log",
  "itemGroup.name.minecart",
  "itemGroup.name.miscFood",
  "itemGroup.name.mobEgg",
  "itemGroup.name.monsterStoneEgg",
  "itemGroup.name.mushroom",
  "itemGroup.name.netherWartBlock",
  "itemGroup.name.ore",
  "itemGroup.name.permission",
  "itemGroup.name.pickaxe",
  "itemGroup.name.planks",
  "itemGroup.name.potion",
  "itemGroup.name.potterySherds",
  "itemGroup.name.pressurePlate",
  "itemGroup.name.rail",
  "itemGroup.name.rawFood",
  "itemGroup.name.record",
  "itemGroup.name.sandstone",
  "itemGroup.name.sapling",
  "itemGroup.name.sculk",
  "itemGroup.name.seed",
  "itemGroup.name.shovel",
  "itemGroup.name.shulkerBox",
  "itemGroup.name.sign",
  "itemGroup.name.skull",
  "itemGroup.name.slab",
  "itemGroup.name.smithing_templates",
  "itemGroup.name.splashPotion",
  "itemGroup.name.stainedClay",
  "itemGroup.name.stairs",
  "itemGroup.name.stone",
  "itemGroup.name.stoneBrick",
  "itemGroup.name.sword",
  "itemGroup.name.trapdoor",
  "itemGroup.name.walls",
  "itemGroup.name.wood",
  "itemGroup.name.wool",
  "itemGroup.name.woolCarpet"
])

function isValidCategory(category) {
  return category.includes(validCategories) ?? false
}
function isValidGroup(group) {
  return group.includes(validGroups) ?? false
}
module.exports = {
isValidCategory,
isValidGroup,
Groups,
Categories
}
exports.isValidCategory = isValidCategory
exports.isValidGroup = isValidGroup

