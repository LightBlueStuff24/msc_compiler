const { validateTypes } = require("../validationList.js")
const { ME } = require("./exports_util.js")
const config = require("../msc.config.json")
// TODO:: UPDATE THIS!!
exports.ItemEventTriggerHandler = function (o, d, e, t) {
  let { Condition, Event, Target } = o
  validateTypes(['string'], [o], [e], t)
  if (!d["minecraft:item"]["events"]) d["minecraft:item"]["events"] = {}
  let __ETdata = {}
  if (Condition) {
    __ETdata.condition = Condition;
  }
  if (Event) {
    __ETdata.event = Event;
  }
  if (Target) {
    if (Target != ("self" || "other")) throw new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {Target} instead found ${Target}`)
    __ETdata.target = Target;
  }
  return __ETdata;
}




exports.BlockEventTriggerHandler = function (o, e, t) {
  if (typeof o !==  'object') throw ME(t,o,[e],'object')
  validateTypes(['string'], [o], [e], t)
  let { Condition, Event, Target } = o
  let d = t.__Data;
  if (!d["minecraft:block"]["events"]) d["minecraft:block"]["events"] = {}
  let __ETdata = {}
  if (Condition) {
    __ETdata.condition = Condition;
  }
  if (Event) {
    __ETdata.event = Event;
  }
  if (Target) {
    if (o.Target != ("self" || "other")) throw new Error(`[${t.name}] [component: ${e}] [child: Target]: expected type {Target} instead found ${o.Tatget}`)
    __ETdata.target = Target;
  }
  if (Action) {
    let __EData = {}
    if (typeof Action == "object") {
      __EData = HandleAction(t, Action, e, Event)
      d["minecraft:block"].events = __EData;
    }
    else if (Array.isArray(Action)) {
      let seq = __EData.sequence = [];
      Action.map((x, i) => {
        seq.push(HandleAction(t, Action, e, Event))
      })
      d["minecraft:block"].events = seq;
    }
    else throw ME(t, Action, [e, "Action"], "object|object[]")
  }
  return __ETdata;
}

exports.HandlePermCondition = function (v, d, t) {
  let res = "";
  let a = v.split(`&`);
  a.forEach(c => {
    let g = c.split("==").map(part => part.trim());
    if (!d["minecraft:block"]["description"]["states"][`test:${g[0]}`]) {
      throw new Error(`[${t.name}] [property: Permutations]: cannot find state ${g[0]}`);
    }
    if (!(res === "")) res += " && ";
    res += `q.block_state('${config.prefix}:${g[0]}')==${g[1]}`;
  });

  return res;
};

exports.HandleAction = function (t, o, e, n) {
  let __data = {}
}

exports.HandleFilter = function (t,o){
  
}