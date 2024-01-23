class EntityRegistry {
  static Registries = [];
  static register(entity) {
      if (Array.isArray(entity)) {
        entity.forEach(entities => {
          this.Registries.push(entities)
        })
      } else {
        this.Registries.push(entity)
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