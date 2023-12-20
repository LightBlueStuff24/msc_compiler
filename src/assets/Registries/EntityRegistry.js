class EntityRegistry {
    static Registries = [];
    static register(entity) {
      if (typeof entity === 'object') {
        if (Array.isArray(entity)) {
          entity.forEach(entities=> {
            this.Registries.push(entities.init())
          })
        } else {
          this.Registries.push(entity.init())
        }
      }
    }
  }
  
  exports.EntityRegistry = EntityRegistry;