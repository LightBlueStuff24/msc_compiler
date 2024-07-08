import type { IBlockComponents } from "./IBlock";
import type { IEntityComponents } from "./IEntity";
import type { IItemComponents } from "./IItem";

interface IPermutation {
  Condition: string;
  Components: (IBlockComponents | IItemComponents | IEntityComponents)[]
}

export type {
  IPermutation
};