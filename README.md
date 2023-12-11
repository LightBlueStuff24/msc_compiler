# msc_compiler
A Minecraft Bedrock Addon writer using classes

Example of Creating a Block and Creating another same type of Block:
```javascript
const {BlockRegistry} = require("./msc_compiler/BlockRegistry")
const {Block} = require("./msc_compiler/api/Block")

class LogRotation0 extends Permutations {
  static Transformation = {
    Rotation: [0, 0, 0]
  }
}
class LogRotation1 extends Permutations {
  static Transformation = {
    Rotation: [90, 0, 0]
  }
}
class LogRotation2 extends Permutations {
  static Transformation = {
    Rotation: [0, 90, 0]
  }
}

/**
 * @class Log
 * @template Log
 */
class Log extends Block {
  static Category = "construction";
  static Group = "itemGroup.name.logs";
  static DisplayName = "Log";
  static DestroyTime = 6;
  static ExplosionResistance = 5;
  static Flammable = {
    CatchChanceModifier: 20,
    DestroyChanceModifier: 40
  }
  static Material = {
    Texture: "log",
    RenderMethod: "opaque",
    FaceDimming: false,
    AmbientOcclusion: false
  }
  static OnPlayerPlacing = {
    Event: "rotate",
    Target: "self",
    Action: {
      SetBlockState: {
        "rotation": "Math.floor(q.cardinal_face/2)"
      }
    }
  }
  static States = {
    "rotation": [0,1,2]
  }
  static Permutations = {
    "rotation == 0": LogRotation0.init(),
    "rotation == 1": LogRotation1.init(),
    "rotation == 2": LogRotation2.init()
  }
}
BlockRegistry.register(Log)

class NewLog extends Log {
  static DisplayName = "New Log"
}
BlockRegistry.register(NewLog)

```

## Features
- Write less code and do more!

- Clone same type of Block, Item, Entity, etc. just by extending it using another class and only modifying the code that is needed.

- Write more than 1 block a file upto as much as you need.

- set your pack name and details only once in `msc.config.json`. Don't have to write `manifest.json` twice for `BehaviorPack` and `ResourcePack`.

- Specify your pack type e.g. only `behavior pack` or only `Resource pack` or Both by setting it's value to true in `behavior_pack: boolean (default: true)` and `resource_pack: boolean (default: true)` in `msc.config.js`
## Documentations
- [Blocks Documentation](./docs/BLOCK.md)
- [Items Documentation](./docs/ITEM.md)