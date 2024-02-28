import type { int, float, bool } from '../utilities/typedef'
import { RenderMethods, BlockFaces } from '../utilities/BlockValues'

interface IBlockData {
  format_version: string,
  "minecraft:block": {
    description: { "identifier": string },
    components: IComponents
  }
}

interface IComponents {
  [componentName: string]: IMaterialInstances | IFlammable
}

interface IMaterialInstances {
  [bone: string]: {
    texture: string,
    render_method: RenderMethods,
    face_dimming: bool,
    ambient_occlusion: bool
  }
}

interface IFlammableObject {
  catch_chance_modifier?: int,
  destroy_chance_modifier?: int
}

type IFlammable = IFlammableObject | int[]
interface IStates {
  [name: string]: int[] | bool[] | string[]
}

interface IPermutation {
  condition: string,
  components: IComponents,
}

export type {
  IMaterialInstances,
  IFlammable,
  IBlockData,
  IPermutation,
  IStates
}