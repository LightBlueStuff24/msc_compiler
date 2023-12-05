exports.BlockEventTriggerHandler=function(o,d,e){
  if(typeof o != "object") return new Error(`[${this.name}] [component: ${e}]: expected {object} instead found {${typeof o}}`)
  if(d["minecraft:block"]["events"]) d["minecraft:block"]["events"] = {}
  let __ETdata = {}
  if(o["Condition"]) {
    if(typeof o["Condition"] != "string") return new Error(`[${this.name}] [component: ${e}] [child: Condition]: expected type {string} instead found {${typeof o["Condition"]}}`)
    __ETdata["condition"] = o["Condition"];
  }
  if(o["Event"]) {
    if(typeof o["Event"] != "string") return new Error(`[${this.name}] [component: ${e}] [child: Event]: expected type {string} instead found {${typeof o["Event"]}}`)
    __ETdata["event"] = o["Event"];
  }
  if(o["Target"]) {
    if(typeof o["Target"] != "string") return new Error(`[${this.name}] [component: ${e}] [child: Target]: expected type {string} instead found {${typeof o["Target"]}}`)
    if(o["Target"] != ("self" || "other")) return new Error(`[${this.name}] [component: ${e}] [child: Target]: expected type {Targets} instead found {${o["Target"]}}`)
    __ETdata["target"] = o["Target"];
  }
  return __ETdata;
}
exports.BlockComponentHandler=function(_data,...components){
  // add the code from .init() to here
}