
class BlockRegistry {
  static Registries = [];
  /**
   * 
   * @param {Block | Array<Block> } block 
   */
  static register(blocks) {
    if (Array.isArray(blocks)) {
      blocks.forEach(block => {
         // Bad Practice:
        global[block.name] = block
        this.Registries.push(block)
      })
    } else {
      // Bad Practice:
      global[blocks.name] = blocks
      this.Registries.push(blocks)
    }
  }
}

exports.BlockRegistry = BlockRegistry;