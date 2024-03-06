import type { Block } from './classes/Block'

class BlockRegistry {
  public static Registries: typeof Block[] = []
  public static Register(block : typeof Block) {
    BlockRegistry.Registries.push(block)
  }

  
}