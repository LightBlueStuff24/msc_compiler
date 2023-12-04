const config = reguire("../config.json")

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
  static Pattern;
  static Keys;
  static Unlocks;
  static Result;
  /**
   * @CreatesShapedRecipeObject
   */
  static init() {
    this.__Data["minecraft:recipe_shaped"]["description"]["identifier"]=`${this.name.toLowerCase()}`
    /**
     * @handlePattern
     */
    if(this.Pattern) {
      if(typeof this.Pattern != ("string"||"boolean"||"number"||"object"||"Function")) {
        this.Pattern.forEach((p, i)=>{
          if(typeof p == "string") {
            this.__Data["minecraft:recipe_shaped"]["pattern"].push(p);
          }
          else return new Error(`[${this.name}] [propetry: Pattern] [index: ${i}]: expected type {string} instead found {${typeof p}}`)
        })
      }
      else return new Error(`[${this.name}] [propetry: Pattern]: expected type {string[]} instead found {${typeof this.Pattern}}`)
    }
    
    return this.__Data;
  }
}