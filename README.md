# MSC

A Minecraft Bedrock Add-on Creating Api.
It uses the Typescript/JavaScript as it's base language.

## Features

- Shortens the amount of time that you use writing in json.
- Allows you .
- Create upto as many blocks, items, entities etc. as you want in a single file. also you're able to create item, blocks, entities in the same file.
- The config is used to disable/enable certain features of the compiler and describe .
- the manifest will be generated automatically based on the given information in config file.

## Example of a Block

```javascript
import { Block, BlockRegistry } from "msc";

class TestBlock extends Block {
  static DisplayName = "Test Block";
  static DestroyTime = 5; // boolean|number
  static Material = new Material("test_block", "opaque", false, false);
  static ExplosionResistance = 20;
  static Flammable = [20, 40]; //[0] = catch_chance_modifier, [1] = destroy_chance_modifier
}

BlockRegistry.register(TestBlock);
```
