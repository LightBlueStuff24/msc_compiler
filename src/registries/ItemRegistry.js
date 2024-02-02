const { StringMixin } = require("../../utilities/classMixins");
Object.assign(String.prototype, StringMixin)
class ItemRegistry {
  static Registries = [];
  static register(item) {
    this.Registries.push(item.init())
  }

  /**
* Unregisters a item from the registry
* @param {Item} item
*/
  static Unregister(item) {
    this.Registries = this.Registries.filter(items => {
      items !== item
    })
  }
  /**
   * Clears all entries in the registry
   */
  static clearRegistry() {
    this.Registries = []
  }

  /**
   * Returns the items registered. 
   * This only returns the json code of the fluid
   * @returns {string}
   */
  static getItemsRegistered() {
    return this.Registries
  }
  /**
   * 
   * @param {Item | string} item 
   */
  static hasEntry(item) {
    return typeof item === 'string' ? this.Registries.map(items => items.Identifier.clean()).includes(item) : !!this.Registries.find(items=>items == item)
      }
}

exports.ItemRegistry = ItemRegistry;