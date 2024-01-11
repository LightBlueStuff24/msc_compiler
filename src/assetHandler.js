const config = require("../msc.config.json")
const { ME } = require("./errorHandler.js")

exports.BlockEventTriggerHandler=function(o,e,t){
  if(typeof o != "object") return new ME(this, o, [e], "object")
  let d = t.__Data;
  if(!d["minecraft:block"]["events"]) d["minecraft:block"]["events"] = {}
  let __ETdata = {}
  if(o.Condition) {
    if(typeof o.Condition != "string") return new ME(t, o.Condition, [e, "Condition"], "string")
    __ETdata.condition = o.Condition;
  }
  if(o.Event) {
    if(typeof o.Event != "string") return new ME(t, o.Event, [e, "Event"], "string")
    __ETdata.event = o.Event;
  }
  if(o.Target) {
    if(typeof o.Target != "string") return new ME(t, o.Target, [e, "Target"], "string")
    if(o.Target != ("self" || "other")) return new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {Target} instead found ${o.Tatget}`)
    __ETdata.target = o.Target;
  }
  if(o.Action) {
    let __EData = {}
    if(typeof o.Action == "object") {
      __EData = HandleAction(t, o.Action, e, o.Event)
      d["minecraft:block"].events = __EData;
    }
    else if(Array.isArray(o.Action)) {
      let seq = __EData.sequence = [];
      o.Action.map((x,i)=>{
        seq.push(HandleAction(t, o.Action, e, o.Event))
      })
      d["minecraft:block"].events = seq;
    }
    else return ME(t, o.Action, [e, "Action"], "object|object[]")
  }
  return __ETdata;
}

exports.HandlePermCondition = function (v, d, t) {
  let res = "";
  let a = v.split(`&`);
  a.forEach(c => {
    let g = c.split("==").map(part=>part.trim());
    if (!d["minecraft:block"]["description"]["states"][`test:${g[0]}`]) {
      return new ME(`[${t.name}] [property: Permutations]: cannot find state ${g[0]}`);
    }
    if (!(res === "")) res += " && ";
    res += `q.block_state('${config.prefix}:${g[0]}')==${g[1]}`;
  });

  return res;
};

exports.HandleAction = function(t,o,e,n){
  let __data = {}
}





// TODO:: UPDATE THIS!!
exports.ItemEventTriggerHandler=function(o,d,e,t){
  if(typeof o != "object") return new ME(`[${t.name}] [component: ${e}]: expected {object} instead found {${typeof o}}`)
  if(!d["minecraft:item"]["events"]) d["minecraft:item"]["events"] = {}
  let __ETdata = {}
  if(o.Condition) {
    if(typeof o.Condition != "string") return new ME(`[${t.name}] [component: ${e}] [child: Condition]: expected type {string} instead found {${typeof o.Condition}}`)
    __ETdata.condition = o.Condition;
  }
  if(o.Event) {
    if(typeof o.Event != "string") return new ME(`[${t.name}] [component: ${e}] [child: Event]: expected type {string} instead found {${typeof o.Event}}`)
    __ETdata.event = o.Event;
  }
  if(o.Target) {
    if(typeof o.Target != "string") return new ME(`[${t.name}] [component: ${e}] [child: Target]: expected type {string} instead found {${typeof o.Target}}`)
    if(o.Target != ("self" || "other")) return new ME(`[${t.name}] [component: ${e}] [child: Target]: expected type {Targets} instead found {${o.Target}}`)
    __ETdata.target = o.Target;
  }
  return __ETdata;
}