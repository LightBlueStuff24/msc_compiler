import type { Block } from './classes/Block'
import type { Advancement } from './classes/Advancement'


class BlockRegistry {
  public static Registries: typeof Block[] = []
  public static Register(block : typeof Block) {
    BlockRegistry.Registries.push(block.init())
  }
}




/**
 * @idea
 * #Testing
 */
class AdvancementRegistry {
  public static Registries: typeof Advancement[] = []
  public static Register(advancement : typeof Advancement) {
    AdvancementRegistry.Registries.push(advancement.init())
  }
}
