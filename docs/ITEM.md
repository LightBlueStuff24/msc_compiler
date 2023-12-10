# MSC Compiler
## Item-Components-List:

- [Components:](#components)
  - [DisplayName](#displayname)
  - [Damage](#damage)

## Components:
## DisplayName
  Component: `DisplayName: string`<br/>
  BlockComponent:
  ```json
  "minecraft:display_name":{
    "value": "My Item Name"
  }
  ```
  example usage:
  ```javascript
  static DisplayName = "My Item Name"
  ```
  - [back to top](#item-components-list)
## Damage
  Component: `Damage: number`<br/>
  BlockComponent:
  ```json
  "minecraft:damage": 5
  ```
  example usage:
  ```javascript
  static Damage = 5
  ```
  - [back to top](#item-components-list)