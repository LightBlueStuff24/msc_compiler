/**
 * A enum of Category types
 * @enum {string}
 */
const Categorys = {
  Construction: "construction",
  Items: "items",
  Equipments: "Equipments",
  Nature: "nature",
  None: "none"
}
/**
 * A enum of Group types
 * @enum {string}
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
const validGroups = new Set(['itemGroup.planks.name','itemGroup.slabs.name','itemGroup.stairs.name','itemGroup.fences.name','itemGroup.fence_gates.name','itemGroup.walls.name'])
exports.validCategories = validCategories
exports.validGroups = validGroups
exports.Categorys = Categorys;
exports.Groups = Groups;
