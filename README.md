# mcb_compiler
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
```