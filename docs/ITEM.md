# MSC Compiler
## Item Documentation

- [Item-Component-List:](#components)
  - [Category](#category)
  - [DisplayName](#displayname)
  - [Damage](#damage)
  - [AllowOffHand](#allowoffhand)
  - [BlockPlacer](#blockplacer)
  - [EntityPlacer](#entityplacer)
  - `Digger: object`
  - [Record](#record)
  - [Projectile](#projectile)

## Components:
## Category
  Component: `Category: string`<br/>
  ItemComponent:
  ```json
  "description": {
      "category": "construction"
    },
  ```
  example usage:
  ```javascript
  static Category = "construction"
  ```
  - [back to top](#item-documentation)
## DisplayName
  Component: `DisplayName: string`<br/>
  ItemComponent:
  ```json
  "minecraft:display_name":{
    "value": "My Item Name"
  }
  ```
  example usage:
  ```javascript
  static DisplayName = "My Item Name"
  ```
  - [back to top](#item-documentation)
## Damage
  Component: `Damage: number`<br/>
  ItemComponent:
  ```json
  "minecraft:damage": 5
  ```
  example usage:
  ```javascript
  static Damage = 5
  ```
  - [back to top](#item-documentation)
## AllowOffHand
  Component: `AllowOffHand: boolean`<br/>
  ItemComponent:
  ```json
  "minecraft:allow_off_hand": true
  ```
  example usage:
  ```javascript
  static AllowOffHand = true
  ```
  - [back to top](#item-documentation)
## BlockPlacer
  Component: `BlockPlacer: object`<br/>
  ItemComponent:
  ```json
  "minecraft:block_placer":{
    "block": "seeds",
    "use_on" : ["dirt"]
  }
  ```
  example usage:
  ```javascript
  static BlockPlacer = {
    block: "seeds",
    useOn: ["dirt"]
  }
  ```
  - [back to top](#item-documentation)
## EntityPlacer
  Component: `EntityPlacer: object`<br/>
  ItemComponent:
  ```json
  "minecraft:entity_placer":{
    "entity":"minecraft:spider",
    "dispense_on":["minecraft:web"],
    "use_on" :["minecraft:web"]
  }
  ```
  example usage:
  ```javascript
  static EntityPlacer = {
    entity: "minecraft:spider",
    dispenseOn: ["minecraft:web"]
    useOn: ["minecraft:web"]
  }
  ```
  - [back to top](#item-documentation)
## Digger
  Component: `Digger: object`<br/>
  ItemComponent:
  ```json
  "minecraft:digger": {
		"use_efficiency": true,
		"destroy_speeds": [
			{
				"block": {
					"tags": "q.any_tag('stone', 'metal')"
				},
				"speed": 6,
				"on_dig": {
       "event": "on_dig"
        }
			}
		]
	}
  ```
  example usage:
  ```javascript
  static Digger = {
    onDig: 
    useEfficiency: true,
    destroySpeed: [
    {
      block: {
        tags: "q.any_tag('stone', "metal)"
      },
      speed: 6,
      ondig: {
        Event: "on_dig"
      }
    ]
  }
  ```
  - [back to top](#item-documentation)
## Record
  Component: `Record: object`<br/>
  ItemComponent:
  ```json
  "minecraft:record": {
    "comparator_signal": 1,
    "duration": 5,
    "sound_event": "ambient.tame"
  }
  ```
  example usage:
  ```javascript
  static Record = {
    comparatorSignal: 1,
    duration: 5,
    soundEvent: "ambient.tame"
  }
  ```
  - [back to top](#item-documentation)
## Projectile
  Component: `Projectile: object`<br/>
  ItemComponent:
  ```json
  "minecraft:projectile":{
    "critical_power": 1.25,
    "projectile_entity": "arrow"
  }
  ```
  example usage:
  ```javascript
  static Projectile = {
    criticalPower: 1.25
    projectileEntity: "arrow"
  }
  ```
  - [back to top](#item-documentation)