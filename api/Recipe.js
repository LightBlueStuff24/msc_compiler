const config = reguire("../config.json")

class ShapedRecipe {
  static __Data = {
    "format_version": config["recipe"]["version"],
    "minecraft:recipe_shaped": {
      "description": {
        "identifier": ""
      },
      "pattern": [],
      "keys": {},
    }
  }
  static Pattern;
  static Keys;
  static Unlocks;
  static Result;
  
  static init() {
    
    
    
    
    
    return this.__Data;
  }
}