const { Block } = require("../Block");

class BlockRegistry {
  static Registries = [];
  /**
   * 
   * @param {Block} block 
   */
  static register(block) {
    console.warn(block.init())
    this.Registries.push(block.init())
  }
}

exports.BlockRegistry = BlockRegistry;