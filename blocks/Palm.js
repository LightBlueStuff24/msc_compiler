const {Block} = require('../api/Block')
const {Item} = require('../api/Item')
const {BlockRegistry} = require('../api/Registries/BlockRegistry');
const {ItemRegistry} = require('../api/Registries/ItemRegistry')

class PalmLog extends Block {
static DisplayName = "Palm Log"
static Texture = "palm_log"
static Category = "construction"
static Group = "plank"
}
class GlassBottle extends Item {
    static DisplayName = "Glass Bottle"
    static Category = "construction"
}
ItemRegistry.register(GlassBottle)
BlockRegistry.register(PalmLog)
