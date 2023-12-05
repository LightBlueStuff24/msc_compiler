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
  static Results;
  static Priority = -1;
  /**
   * @CreatesShapedRecipeObject
   */
  static init() {
    this.__Data["minecraft:recipe_shaped"]["description"]["identifier"]=`${config["prefix"]}:${this.name.toLowerCase()}`
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
      if(typeof this.Pattern == ("string"||"boolean"||"number"||"object"||"Function")) return new Error(`[${this.name}] [propetry: Pattern]: expected type {string[]} instead found {${typeof this.Pattern}}`)
      this.Pattern.forEach((p, i)=>{
        if(typeof p == "string") return new Error(`[${this.name}] [propetry: Pattern] [index: ${i}]: expected type {string} instead found {${typeof p}}`)
        this.__Data["minecraft:recipe_shaped"]["pattern"].push(p);
      })
    }
    /**
     * @handleUnlocks
     */
    if(this.Unlocks) {
      if(typeof this.Unlocks == ("string"||"boolean"||"number"||"object"||"Function")) return new Error(`[${this.name}] [propetry: Unlocks]: expected type {string[]} instead found {${typeof this.Unlocks}}`)
      this.__Data["minecraft:recipe_shaped"]["unlocks"]=[]
      this.Unlocks.forEach((u, i)=>{
        if(typeof u != "string") return new Error(`[${this.name}] [propetry: Unlocks] index: ${i}]: expected type {string} instead found {${typeof u}}`)
        this.__Data["minecraft:recipe_shaped"]["unlocks"].push({"item": u})
      })
    }
    /**
     * @handleResults
     */
    if(this.Results) {
      if(typeof this.Results == ("string"||"boolean"||"number"||"object"||"Function")) return new Error(`[${this.name}] [propetry: Results]: expected type {string[]} instead found {${typeof this.Results}}`)
      this.__Data["minecraft:recipe_shaped"]["results"]=[]
      this.Results.forEach((u, i)=>{
        if(typeof u != "object") return new Error(`[${this.name}] [propetry: Results] [[index: ${i}]: expected type {object} instead found {${typeof u}}`)
        if(typeof u["Item"] != "string") return new Error(`[${this.name}] [propetry: Results] [index: ${i}] [child: Item]: expected type {string} instead found {${typeof u["Item"]}}`)
        if(!u["Count"]) u["Count"] = 1;
        if(typeof u["Count"] != "number") return new Error(`[${this.name}] [propetry: Results] [index: ${i}] [child: Count]: expected type {number} instead found {${typeof u["Count"]}}`)
        this.__Data["minecraft:recipe_shaped"]["results"].push({"item": u["Item"], "count": u["Count"]})
      })
    }
    /**
     * @handlePriority
     */
    if(this.Priority) {
      if(typeof this.Priority != "number") return new Error(`[${this.name}] [propetry: Priority]: expected type {number} instead found {${typeof this.Priority}}`)
      this.__Data["minecraft:recipe_shaped"]["priority"] = this.Priority;
    }
    
    return JSON.stringify(this.__Data);
  }
}

exports.ShapedRecipe = ShapedRecipe;