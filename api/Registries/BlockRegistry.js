const { Block } = require("../Block");

class BlockRegistry {
  static Registries = [];
  /**
   * 
   * @param {Block} block 
   */
  static register(block) {
    this.Registries.push(block.init())
  }
}

exports.BlockRegistry = BlockRegistry;