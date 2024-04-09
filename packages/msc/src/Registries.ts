import { Block, Entity, Item } from "./classes/index";

class RegistryBase {
  // Subclasses implement their own registries
  protected static Registries: any[];

  public static Register<T = any>(item: T) {
    this.Registries.push(item);
  }

  public static Get<T = any>(name: string): T | undefined {
    return this.Registries.find((item: any) => item.name === name);
  }
}

class BlockRegistry extends RegistryBase {
  public static Registries: (typeof Block)[] = [];
}

class EntityRegistry extends RegistryBase {
  public static Registries: (typeof Entity)[] = [];
}

class ItemRegistry extends RegistryBase {
  public static Registries: (typeof Item)[] = [];
}

const entity = EntityRegistry.Get<typeof Entity>("Cogwheel");
entity?.toString();

export { BlockRegistry, EntityRegistry, ItemRegistry };
