const {Block} = require('../api/Block')
const {Item} = require('../api/Item')
const {BlockRegistry} = require('../api/Registries/BlockRegistry');
const {ItemRegistry} = require('../api/Registries/ItemRegistry')
const {Permutation} = require('../api/Permutation')
class DestroyTime extends Permutation {
    static Transformation = {
        Rotation:[0,0,0]
    }
}
class PalmLog extends Block {
    static States = {
        "prop":[1,2,3]
    }
static DisplayName = "Palm Log"
static Texture = "palm_log"
static Category = "construction"
static Permutations = {
    "prop==1": DestroyTime.init() 
    }
  }

class GlassBottle extends Item {
    static DisplayName = "Glass Bottle"
    static Category = "construction"
}
ItemRegistry.register(GlassBottle)
BlockRegistry.register(PalmLog)
