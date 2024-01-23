const config = require("../../msc.config.json")
// TODO:: UPDATE THIS!!
exports.ItemEventTriggerHandler = function (o, d, e, t) {
  const { validateTypes } = require("../validationList.js")
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
  const { ME } = require("./helpers.js")
  if (typeof o !== 'object') throw ME(t, o, [e], 'object')
  const { validateTypes } = require("../validationList.js")
  validateTypes(['string'], [o], [e], t)
  let { Condition, Event, Target,Action } = o
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

 function HandleAction (t, o, e, n) {
  let __data = {}
}

exports
function HandleFilter(t, o, c) {
  const { validateKeys } = require("../validationList.js")
  let __data = {}
  validateKeys(['AnyOf', 'AllOf', 'NoneOf', 'TestSubject', 'OperatorSign', 'TestCondition', 'Domain'], o, t, c)
  const { AnyOf, AllOf, NoneOf, TestSubject, OperatorSign, TestCondition, Domain } = o;

  if (AnyOf) {
    if (!Array.isArray(AnyOf)) throw new Error(`[${t.name}] ${com} [property:AnyOf]: Expected object[] instead found ${typeof AnyOf}`);
    __data['any_of'] = AnyOf.map(obj => HandleFilter(t, obj, c))
  }

  if (AllOf) {
    if (!Array.isArray(AllOf)) throw new Error(`[${t.name}] ${com} [property:AllOf]: Expected object[] instead found ${typeof AllOf}`);
    __data['all_of'] = AllOf.map(obj => HandleFilter(t, obj, c))
  }

  if (NoneOf) {
    if (!Array.isArray(NoneOf)) throw new Error(`[${t.name}] ${com} [property:NoneOf]: Expected object[] instead found ${typeof NoneOf}`);
    __data['none_of'] = NoneOf.map(obj => HandleFilter(t, obj, c))
  }

}
