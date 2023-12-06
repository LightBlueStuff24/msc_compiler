# msc_compiler
A Minecraft Bedrock Addon writer using classes

Example of Creating a Block and Creating another same type of Block:
```javascript
class Log extends Block {
  static Category = "nature";
  static Group = "itemGroup.logs.name";
  static DisplayName = "Your Block Name";
  static DestoryTime = 5;
  static ExplosionResistance = 7;
  static Texture = "Your texture name";
  static RenderMethod = "opaque";
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
[Blocks Documentation](./docs/BLOCK.md)