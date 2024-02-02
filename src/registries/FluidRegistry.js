

/**
 * Provides and manages registration of fluids
 */
class FluidRegistry {
    static Registries = [];
    /**
     * Registers a fluid to the registry
     * @param {Fluid} fluid 
     */
    static register(fluid) {
      if (typeof fluid === 'object') {
        if (Array.isArray(fluid)) {
          fluid.forEach(fluids => {
            this.Registries.push(fluids)
          })
        } else {
          this.Registries.push(fluid)
        }
      }
    }
/**
 * Unregisters a fluid from the registry
 * @param {Fluid} fluid 
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
  
  exports.FluidRegistry = FluidRegistry;