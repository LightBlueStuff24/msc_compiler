import { IBlockData } from './interfaces/IBlock'

class BlockRegistry {
  public static Registries: IBlockData[] = []
  public static Register(block) {
    BlockRegistry.Registries.push(block.init())
  }
}