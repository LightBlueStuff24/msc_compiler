class ItemRegistry {
    static Registries = [];
    static register(item) {
      this.Registries.push(item.init())
    }
  }
  
  exports.ItemRegistry = ItemRegistry;