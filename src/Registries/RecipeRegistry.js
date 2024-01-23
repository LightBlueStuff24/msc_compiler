class RecipeRegistry {
    static Registries = [];
    static register(recipe) {
      this.Registries.push(recipe)
    }
  }
  
  exports.RecipeRegistry = RecipeRegistry;