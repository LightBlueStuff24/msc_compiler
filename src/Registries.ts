import { Block } from './classes/Block';
import { Entity } from './classes/Entity';

class RegistryBase {
  // Subclasses implement their own registries
  protected static Registries : any[];

  public static Register<T>(item: T) {
    this.Registries.push(item);
  }

  public static Get<T>(name: string): T | undefined {
    return this.Registries.find((item: any) => item.name === name);
  }
}

class BlockRegistry extends RegistryBase {
  public static Registries: typeof Block[] = [];
}

class EntityRegistry extends RegistryBase {
  public static Registries: [] = [];
}

const entity = EntityRegistry.Get<typeof Entity>('Cogwheel');

EntityRegistry.Register<typeof Entity>(Entity)