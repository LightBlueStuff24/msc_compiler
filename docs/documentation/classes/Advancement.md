# Advancement

The `Advancement` class allows you to create advancements for your addon. Advancements are a way to track progress and reward players for completing certain tasks or achieving specific goals in the game.

## Creating Advancements

To create a new advancement, you can extend the `Advancement` class and define its properties:
::: code-group
```js [adv.js]
import {Advancement} from 'msc';

class NewAdvancement extends Advancement {
  static Icon = "./path/to/icon";
  static Name = "New Advancement";
  static Description = `Something to write in description.`;
  static ShowChatMessage = false;
  static Rewards = this.shuffle([
    { item: "minecraft:diamond", xp: 5 },
    { item: "minecraft:emerald", xp: 10 },
    { item: "minecraft:iron", xp: 2 }
  ], 2);

  static shuffle(array, x) {
    let res = [];
    if (x > array.length) return;
    for (let i = 0; i < x; i++) {
      res.push(array[Math.floor(Math.random() * array.length)]);
    }
    return res;
  }
}
```

```ts [adv.ts]
import {Advancement, IReward} from 'msc';

class NewAdvancement extends Advancement {
  static Icon = "./path/to/icon";
  static Name = "New Advancement";
  static Description = `Something to write in description.`;
  static ShowChatMessage = false;
  static Rewards = this.shuffle([
    { item: "minecraft:diamond", xp: 5 },
    { item: "minecraft:emerald", xp: 10 },
    { item: "minecraft:iron", xp: 2 }
  ], 2);

  private static shuffle(array: IReward[], x: number) {
    let res = [];
    if (x > array.length) return;
    for (let i = 0; i < x; i++) {
      res.push(array[Math.floor(Math.random() * array.length)]);
    }
    return res;
  }
}
```
:::

In the example above:

`Icon`:
  Specifies the path to the icon image for the advancement.

`Name`: 
  Specifies the name of the advancement.

`Description`:
  Specifies the description of the advancement.

`ShowChatMessage`: 
  Specifies whether to display a chat message when a player gets this advancement.

`Rewards`:
  Specifies the rewards for completing the advancement. In this example, the method `shuffle` is used to randomly select rewards from an array.


## Registering the Advancement
Once you've defined your advancement, you need to register it using the `AdvancementRegistry`:
```js
AdvancementRegistry.Register(NewAdvancement);
```
This registers the `NewAdvancement` class with the advancement registry.

Next we will learn how to trigger the advancement using Bedrock's Scripting API.