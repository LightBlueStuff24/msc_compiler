class RecipeRegistry {
    static Registries = [];
    static register(recipe) {
      this.Registries.push(recipe.init())
    }
  }
  
  exports.RecipeRegistry = RecipeRegistry;