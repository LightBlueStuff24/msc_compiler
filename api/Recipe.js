const config = require("../config.json")

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
  static Tags;
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
     * @handleTags
     */
    if(this.Tags) {
      if(typeof this.Tags == ("string"||"boolean"||"number"||"object"||"Function")) return new Error(`[${this.name}] [propetry: Tags]: expected type {string[]} instead found {${typeof this.Tags}}`)
      this.Tags.forEach((p, i)=>{
        if(typeof p != "string") return new Error(`[${this.name}] [propetry: Tags] [index: ${i}]: expected type {string} instead found {${typeof p}}`)
        this.__Data["minecraft:recipe_shaped"]["tags"].push(p);
      })
    }
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
    
    
    return JSON.stringify(this.__Data);
  }
}

exports.ShapedRecipe = ShapedRecipe;