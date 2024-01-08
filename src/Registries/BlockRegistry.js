const { Block } = require("../Block");

class BlockRegistry {
  static Registries = [];
  /**
   * 
   * @param {Block | Array<Block> } block 
   */
  static register(block) {
    if (typeof block === 'object') {
      if (Array.isArray(block)) {
        block.forEach(blocks => {
          this.Registries.push(blocks.init())
        })
      } else {
        this.Registries.push(block.init())
      }
    }
  }
}

exports.BlockRegistry = BlockRegistry;