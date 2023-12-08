class EntityRegistry {
    static Registries = [];
    static register(entity) {
      this.Registries.push(entity.init())
    }
  }
  
  exports.EntityRegistry = EntityRegistry;