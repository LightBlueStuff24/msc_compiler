const {Block} = require('../api/Block')
const {BlockRegistry} = require('../api/Registries/BlockRegistry')
class PalmLog extends Block {
static DisplayName = "Palm Log"
static Texture = "palm_log"
}
    
BlockRegistry.register(PalmLog)