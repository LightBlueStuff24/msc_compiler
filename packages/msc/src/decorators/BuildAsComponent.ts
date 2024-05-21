import { Player, ItemStack, Block } from "@minecraft/server";
import { Item } from "../classes/base/Item";

/**
 * Sets the decorated method to be compiled as a custom component
 */
export function BuildAsComponent(
  target: (
    player: Player,
    itemStack: ItemStack,
    block?: Block | undefined
  ) => void,
  context: ClassMethodDecoratorContext<
    typeof Item,
    (player: Player, itemStack: ItemStack, block?: Block | undefined) => void
  > & { name: "OnRightClick"; private: false; static: true }
):
  | void
  | ((
      player: Player,
      itemStack: ItemStack,
      block?: Block | undefined
    ) => void) {
  context.addInitializer(function () {
      //@ts-expect-error
    this.MethodMap[context.name] = {
      callback: target,
      type: "CustomComponent",
    };
  });
}
