

class ItemRegistry {
    static Registries = [];
    static register(item) {
      this.Registries.push(item.init())
    }

    /**
 * Unregisters a item from the registry
 * @param {Item} item
 */
    static unRegister(fluid){
      this.Registries = this.Registries.filter(fluid=>{
        fluid !== fluid.init()
      })
      }
  /**
   * Clears all entries in the registry
   */
      static clearRegistry(){
        this.Registries = []
      }
  
      /**
       * Returns the fluids registered. 
       * This only returns the json code of the fluid
       * @returns {string}
       */
      static getFluidsRegistered(){
        return this.Registries
      }
  }
  
  exports.ItemRegistry = ItemRegistry;