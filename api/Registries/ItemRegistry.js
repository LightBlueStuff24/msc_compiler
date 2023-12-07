class ItemRegistry {
    static Registries = [];
    static register(block) {
      this.Registries.push(block.init())
    }
  }
  
  exports.ItemRegistry = ItemRegistry;