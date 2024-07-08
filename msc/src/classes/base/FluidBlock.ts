import { world } from "@minecraft/server";
import { IBlockComponents, IGeometry, IStates } from "../../interfaces/IBlock";
import { IPermutation } from "../../interfaces/IPermutation";
import { Block } from "./Block";

class FluidBlockState1 extends IBlockComponents {
  static Geometry: string | IGeometry = {
    BoneVisibility: {},
    Identifier: "",
  };
}

class FluidBlock extends Block {
  /**
   * @private
   * @protected
   * */
  static override States: IStates = {
    "msc:fluid_stage": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };
  /**@private */
  static override Permutations: IPermutation[] = [
    {
      Condition: "msc:fluid_stage == 1",
      Components: [FluidBlockState1],
    },
  ];

  static override async init(): Promise<any> {
    const blockData = await super.init();
  }
}
