# Advancement

```javascript
class NewAdvancement extends Advancement {
  public static Icon = "./path/to/icon"
  public static Name = "New Advancement"
  public static Description = `Something to write in description.`
  public static Rewards = this.shuffle([
    { item: "minecraft:diamond", xp: 5 }
    { item: "minecraft:emerald", xp: 10 }
    { item: "minecraft:iron", xp: 2 }
  ], 2)
  private static shuffle(array: IReward, x: number)
  {
    let res = []
    if(x > array.length) return;
    for(let i = 0; i < x; i++) {
      res.push(array[Math.random()*x+1]) // Something like this
    }
    return res;
  }
}
```
To Register this Advancement
```javascript
AdvancementRegistry.register(NewAdvancement)
```