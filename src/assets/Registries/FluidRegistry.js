class FluidRegistry {
    static Registries = [];
    static register(fluid) {
      this.Registries.push(fluid.init())
    }
  }
  
  exports.FluidRegistry = FluidRegistry;