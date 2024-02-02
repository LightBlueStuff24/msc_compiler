
class BlockRegistry {
  static Registries = [];
  /**
   * 
   * @param {Block | Array<Block> } block 
   */
  static register(block) {
      if (Array.isArray(block)) {
        block.forEach(blocks => {
          this.Registries.push(blocks)
        })
      } else {
        this.Registries.push(block)
      }
  }
}

exports.BlockRegistry = BlockRegistry;