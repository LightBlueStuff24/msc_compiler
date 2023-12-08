const config = require("../msc.config.json")

exports.BlockEventTriggerHandler=function(o,d,e,t){
  if(typeof o != "object") return new Error(`[${t.name}] [component: ${e}]: expected {object} instead found {${typeof o}}`)
  if(!d["minecraft:block"]["events"]) d["minecraft:block"]["events"] = {}
  let __ETdata = {}
  if(o["Condition"]) {
    if(typeof o["Condition"] != "string") return new Error(`[${t.name}] [component: ${e}] [child: Condition]: expected type {string} instead found {${typeof o["Condition"]}}`)
    __ETdata["condition"] = o["Condition"];
  }
  if(o["Event"]) {
    if(typeof o["Event"] != "string") return new Error(`[${t.name}] [component: ${e}] [child: Event]: expected type {string} instead found {${typeof o["Event"]}}`)
    __ETdata["event"] = o["Event"];
  }
  if(o["Target"]) {
    if(typeof o["Target"] != "string") return new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {string} instead found {${typeof o["Target"]}}`)
    if(o["Target"] != ("self" || "other")) return new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {Targets} instead found {${o["Target"]}}`)
    __ETdata["target"] = o["Target"];
  }
  if(o.Action) {
    if(typeof o.Action != "object") return new Error(`[${t.name}] [component: ${e}] [child: Action]: expected type {object} instead found {${typeof o.Action}}`)
    if(!d["minecraft:block"]["events"]) d["minecraft:block"]["events"] = {}
    if(o.Action.SetState) {
      if(typeof o.Action.SetState != "object") return new Error()
      
    }
    if(o.Action.SetBlock) {
      if(typeof o.Action.SetBlock != "object") return new Error()
      
    }
    if(o.Action.SetBlockAtPos) {
      if(typeof o.Action.SetBlockAtPos != "object") return new Error()
      
    }
    if(o.Action.RemoveStack) {
      if(typeof o.Action.RemoveStack != "object") return new Error()
      
    }
    if(o.Action.SpawnLoot) {
      if(typeof o.Action.SpawnLoot != "string") return new Error()
      
    }
    if(o.Action.AddEffect) {
      if(typeof o.Action.AddEffect != "object") return new Error()
      
    }
    if(o.Action.RunCommand) {
      if(typeof o.Action.RunCommand != ("object"||"string"||"boolean"||"number"||"Function")) return new Error()
      
    }
  }
  return __ETdata;
}

exports.ItemEventTriggerHandler=function(o,d,e,t){
  if(typeof o != "object") return new Error(`[${t.name}] [component: ${e}]: expected {object} instead found {${typeof o}}`)
  if(!d["minecraft:item"]["events"]) d["minecraft:item"]["events"] = {}
  let __ETdata = {}
  if(o.Condition) {
    if(typeof o.Condition != "string") return new Error(`[${t.name}] [component: ${e}] [child: Condition]: expected type {string} instead found {${typeof o.Condition}}`)
    __ETdata.condition = o.Condition;
  }
  if(o.Event) {
    if(typeof o.Event != "string") return new Error(`[${t.name}] [component: ${e}] [child: Event]: expected type {string} instead found {${typeof o.Event}}`)
    __ETdata.event = o.Event;
  }
  if(o.Target) {
    if(typeof o.Target != "string") return new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {string} instead found {${typeof o.Target}}`)
    if(o.Target != ("self" || "other")) return new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {Targets} instead found {${o.Target}}`)
    __ETdata.target = o.Target;
  }
  return __ETdata;
}

exports.HandlePermCondition=function(v,d,t){
  let res = ""
  let a=v.split(`&`)
  a.forEach(async c=>{
    let g=c.split("==")
    if(!d["minecraft:block"]["description"]["states"][`test:${g[0]}`]) return new Error(`[${t.name}] [property: Permutations]: cannot find state ${g[0]}`)
    if(!(res === "")) res+=" && "
    res+=`q.block_state('${config.prefix}:${g[0]}')==${g[1]}`
  })
  return res;
}