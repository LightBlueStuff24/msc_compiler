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
      if(typeof this.Tags != ("string"||"boolean"||"number"||"object"||"Function")) {
        this.Tags.forEach((p, i)=>{
          if(typeof p == "string") {
            this.__Data["minecraft:recipe_shaped"]["tags"].push(p);
          }
          else return new Error(`[${this.name}] [propetry: Tags] [index: ${i}]: expected type {string} instead found {${typeof p}}`)
        })
      }
      else return new Error(`[${this.name}] [propetry: Tags]: expected type {string[]} instead found {${typeof this.Tags}}`)
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
    /**
     * @handleKeys
     */
    if(this.Keys) {
      if(typeof this.Keys == "object") {
        for(const [key, value] of Object.entries(this.Keys)) {
          if(typeof key == "string") {
            if(typeof value == "object") {
              if(value["item"]) {
                if(typeof value["item"] == "string") {
                  this.Keys[key] = {
                    "item": value["item"]
                  }
                }
                else return new Error(`[${this.name}] [propetry: Keys] [child: ${key}] [param: item]: expected type {string} instead found {${typeof value["item"]}}`)
              }
              else return new Error(`[${this.name}] [propetry: Keys] [child: ${key}]: expected propetry {item} instead found {object}`)
            }
            else return new Error(`[${this.name}] [propetry: Keys] [child: ${key}]: expected type {object} instead found {${typeof value}}`)
          }
          else return new Error(`[${this.name}] [propetry: Keys] [child: ${key}]: expected type {string} instead found {${typeof key}}`)
        }
      }
      else return new Error(`[${this.name}] [propetry: Keys]: expected type {object} instead found {${typeof this.Keys}}`)
    }
    
    return this.__Data;
  }
}