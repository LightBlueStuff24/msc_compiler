const {ME} = require("./errorHandler")
const config = require("../../msc.config.json")


class ShapedRecipe {
  static __Data = {
    "format_version": config["recipe"]["version"],
    "minecraft:recipe_shaped": {
      "description": {
        "identifier": ""
      },
      "tags": [],
      "pattern": [],
      "keys": {},
    }
  }
  static Group;
  static Tags;
  static Pattern;
  static Keys;
  static Unlocks;
  static Results;
  static Priority = -1;

  /**
   * @CreatesShapedRecipeObject
   */
  static init() {
    this.__Data["minecraft:recipe_shaped"]["description"]["identifier"]=
    `${config.globalNamespace}:${this.name.toLowerCase()}`;
    /**
     * @handleGroup
     */
    if(this.Group) {
      if(typeof this.Group != "string") return ME()
      this.__Data["minecraft:recipe_shaped"].group = this.Group;
    }
    /**
     * @handleTags
     */
    if(this.Tags) {
      if(!Array.isArray(this.Tags)) return ME()
      this.Tags.forEach((p, i)=>{
        if(typeof p != "string") return ME()
        this.__Data["minecraft:recipe_shaped"]["tags"].push(p);
      })
    }
    /**
     * @handlePattern
     */
    if(this.Pattern) {
      if(!Array.isArray(this.Pattern)) return ME()
      this.Pattern.forEach((p, i)=>{
        if(typeof p == "string") return ME()
        this.__Data["minecraft:recipe_shaped"]["pattern"].push(p);
      })
    }
    /**
     * @handdleKeys
     */
    if(this.Keys) {
      if(typeof this.Keys != "object") return ME()
      for(const [key, value] of Object.entries(this.Keys)) {
        if(typeof key != "string") return ME()
        if(typeof value != "object") return ME()
        let k = {}
        if(!value.item) return ME()
        if(typeof value.item != "string") return ME()
        k.item = value.item;
        if(value.data) {
          if(typeof value.data != "number") return ME()
          k.data = value.data;
        }
        if(value.count) {
          if(typeof value.count != "number") return ME()
            k.count = value.count;
        }
        this.__Data["minecraft:recipe_shaped"].keys[key] = k;
      }
    }
    /**
     * @handleUnlocks
     */
    if(this.Unlocks) {
      if(!Array.isArray(this.Unlocks)) return ME()
      for(let [k,v] of Object.entries(this.Unlocks))
      {
        let unlock = {}
        if(typeof k != "string") return ME()
        if(typeof v != "object") return ME()
        if(v.item) {
          if(typeof v.item != "string") return ME()
          unlock.item = v.item;
        }
        if(v.context) {
          if(typeof v.context != "string") return ME()
          if(!v.context.includes(RecipeContexts)) return ME()
          unlock.context = v.context;
        }
        this.__Data["minecraft:recipe_shaped"].Unlocks.push(unlock)
      }
    }
    /**
     * @handleResults
     */
    if(this.Results) {
      if(!Array.isArray(this.Results)) return ME()
      this.__Data["minecraft:recipe_shaped"].results=[]
      this.Results.forEach((u, i)=>{
        if(typeof u != "object") return ME()
        if(typeof u.Item != "string") return ME()
        if(!u.Count) u.Count = 1;
        if(typeof u.Count != "number") return ME() 
        this.__Data["minecraft:recipe_shaped"].results.push({item: u.Item, count: u.Count})
      })
    }
    /**
     * @handlePriority
     */
    if(this.Priority) {
      if(typeof this.Priority != "number") return ME()
      this.__Data["minecraft:recipe_shaped"]["priority"] = this.Priority;
    }
    
    return JSON.stringify(this.__Data);
  }
}

class ShapelessRecipe {}

class FurnaceRecipe {}

class CampfireRecipe {}

class SmokerRecipe {}

class BlastFurnaceRecipe {}

class BrewingRecipe {}


exports.ShapedRecipe = ShapedRecipe;
exports.ShapelessRecipe = ShapelessRecipe;
exports.FurnaceRecipe = FurnaceRecipe;
exports.CampfireRecipe = CampfireRecipe;
exports.SmokerRecipe = SmokerRecipe;
exports.BlastFurnaceRecipe = BlastFurnaceRecipe;
exports.BrewingRecipe = BrewingRecipe;


