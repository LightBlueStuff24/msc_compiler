class EntityRegistry {
  static Registries = [];
  static register(entity) {
    if (typeof entity === 'object') {
      if (Array.isArray(entity)) {
        entity.forEach(entities => {
          this.Registries.push(entities.init())
        })
      } else {
        this.Registries.push(entity.init())
      }
    }
  }

  /**
 * 
 * @param {Entity | string} entity
 */
  static hasEntry(entity) {
    return typeof entity === 'string' ? this.Registries.map(entities => entities.Identifier.clean()).includes(entity) : !!this.Registries.find(entities => entities == entity)
  }
}

exports.EntityRegistry = EntityRegistry;