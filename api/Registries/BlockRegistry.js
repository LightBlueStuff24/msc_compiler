class BlockRegistry {
  static Registries = [];
  static register(block) {
    this.Registries.push(block.init())
  }
}

exports.BlockRegistry = BlockRegistry;