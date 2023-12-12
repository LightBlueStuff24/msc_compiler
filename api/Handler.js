const config = require("../msc.config.json")

exports.BlockEventTriggerHandler=function(o,d,e,t){
  if(typeof o != "object") return new Error(`[${t.name}] [component: ${e}]: expected {object} instead found {${typeof o}}`)
  if(!d["minecraft:block"]["events"]) d["minecraft:block"]["events"] = {}
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
  if(o.Action) {
    if(typeof o.Action != "object") return new Error(`[${t.name}] [component: ${e}] [child: Action]: expected type {object} instead found {${typeof o.Action}}`)
    let __events = d["minecraft:block"]["events"][o.Event] =  {}
    if(o.Action.Sequence) {
      if(!Array.isArray(o.Action.Sequence)) return new Error(`[${t.name}] [component: ${e}] [child: Action] [subChild: Sequence]: expected type {object[]} instead found `)
      let __sequence = __events[o.Event].sequence = []
      // TODO: ADD ERROR
      if(__sequence.length == 0) return new Error()
      o.Action.Sequence.forEach((seq, si)=>{
        let __seq = handleAction(seq, e, si, t)
        __sequence.push(__seq);
      })
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

exports.HandlePermCondition = function (v, d, t) {
  let res = "";
  let a = v.split(`&`);
  a.forEach(c => {
    let g = c.split("==").map(part=>part.trim());
    if (!d["minecraft:block"]["description"]["states"][`test:${g[0]}`]) {
      return new Error(`[${t.name}] [property: Permutations]: cannot find state ${g[0]}`);
    }
    if (!(res === "")) res += " && ";
    res += `q.block_state('${config.prefix}:${g[0]}')==${g[1]}`;
  });

  return res;
};

exports.handleAction=function(o,e,i,t){
  let __data = {}

  if(o.SetState) {
    // TODO: ADD ERROR
    if(typeof o.SetState != "object") return new Error()
    
  }
  if(o.SetBlock) {
    // TODO: ADD ERROR
    if(typeof o.SetBlock != "object") return new Error()
    __data.set_block = {}
    if(!o.SetBlock.BlockType) return new Error(`[${t.name}] [component: ${e}] [child: Action] [subChild: Sequence] [index: ${i}] [prop: SetBlock]: missing property {BlockType}`)
    // TODO: ADD ERROR
    if(typeof o.SetBlock.BlockType != ("string"||"object")) return new Error()
    if(typeof o.SetBlock.BlockType == "string") {
      __data.set_block.block_type = o.SetBlock.BlockType;
    }
    if(typeof o.SetBlock.BlockType == "object") {
      // TODO: ADD ERROR
      if(!o.SetBlock.BlockType.Name) return new Error()
      // TODO: ADD ERROR
      if(!o.SetBlock.BlockType.States) return new Error()
      // TODO: ADD ERROR
      if(typeof o.SetBlock.BlockType.States != "object") return new Error()
      for(let [stn, stv] of Object.entries(o.SetBlock.BlockType.States)) {
        // TODO: ADD ERROR
        if(typeof stn != "string") return new Error()
        // TODO: ADD ERROR
        if(typeof stv != ("string"||"boolean"||"number")) return new Error()
        __data.set_block.block_type.name = o.SetBlock.BlockType.Name,
        __data.set_block.block_type.states = {}
        __data.set_block.block_type.states[stn] = stv;
      }
    }
    
  }
  if(o.SetBlockAtPos) {
    if(typeof o.SetBlockAtPos != "object") return new Error()
    
  }
  if(o.RemoveStack) {
    if(typeof o.RemoveStack != "object") return new Error()
    
  }
  if(o.SpawnLoot) {
    if(typeof o.SpawnLoot != "string") return new Error(`[${t.name}] [component: Action] [child: SpawnLoot]: expected type {string} instead found {${typeof o.Action.SpawnLoot}}`)
     __data.spawn_loot={table: o.SpawnLoot}
  }
  if(o.PlayEffect) {
    if(typeof o.AddEffect != "object") return new Error()
    
  }
  if(o.RemoveMobEffect) {

  }
  if(o.RunCommand) {
    if(!Array.isArray(o.RunCommand)) return new Error()
    
  }
  if(o.Damage) {

  }
  if(o.Die) {

  }
  if(o.Swing) {

  }
  if(o.Teleport) {

  }
  if(o.TransformItem) {

  }
  if(o.Trigger) {

  }
  if(o.PlaySound) {

  }
}