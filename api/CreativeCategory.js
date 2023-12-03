
class Category {
  static Construction = "construction";
  static Items = "items";
  static Equipments = "Equipments";
  static Nature = "nature";
  static None = "none";
}

class Group {
  static Planks = "itemGroup.planks.name";
  static Slabs = "itemGroup.slabs.name";
  static Stairs = "itemGroup.stairs.name";
  static Fences = "itemGroup.fences.name";
  static FenceGates = "itemGroup.fence_gates.name";
  static Walls = "itemGroup.walls.name";
}

const validCategories = new Set(['construction','items','equipments','nature','none'])
const validGroups = new Set(['itemGroup.planks.name','itemGroup.slabs.name','itemGroup.stairs.name','itemGroup.fences.name','itemGroup.fence_gates.name','itemGroup.walls.name'])
exports.validCategories = validCategories
exports.validGroups = validGroups
exports.Category = Category;
exports.Group = Group;