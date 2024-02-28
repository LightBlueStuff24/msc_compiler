import type { Block } from './classes/Block'
import type { IBlockData } from './interfaces/IBlock'

class BlockRegistry {
  public static Registries: IBlockData[] = []
  public static Register(block : typeof Block) {
    BlockRegistry.Registries.push(block.init())
  }
}