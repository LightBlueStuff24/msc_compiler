# msc_compiler
A Minecraft Bedrock Addon writer using classes

Example of Creating Block:
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
BlockRegistry.register(Log)

```

## Features
- Write less code and do more!
- Clone same type of Block, Item, Entity, etc. just by extending it using another class and only modifying the code that is needed.
- Write more than 1 block a file upto as much as you need.
- set your pack name and details only once in `msc.config.js`. Dont't have to write `manifest.json` twice.
- Specify your pack type e.g. only `behavior pack` or only `Resource pack` in `pack_type: "your_pack_type"` in `msc.config.js`