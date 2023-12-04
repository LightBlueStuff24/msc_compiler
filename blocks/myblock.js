const {Block} = require("../api/Block")
//const {Categorys, Groups} = require("./api/Type")
const {BlockRegistry} = require("../BlockRegistry")

//Compiler to create addons from js
class BlueBrick extends Block {
  static Category = "construction";
  static Group = "scraft:bricks";
  static DisplayName = "Blue Brick";
  static DestroyTime = 10;
  static ExplosionResistance = 10;
  static Texture = "blue_brick";
  static RenderMethod = "opaque";
  static Geometry = "geometry.default_cube";
}

BlockRegistry.register(BlueBrick)

class BlackBrick extends BlueBrick {
  static DisplayName = 'Black Brick';
  static Texture = 'black_brick';
}

BlockRegistry.register(BlackBrick)