# MSC Compiler
## Block-Components-List:

- [Components:](#components)
  - [Category](#category)
  - [Group](#group)
  - [DisplayName](#displayname)
  - [DestroyTime](#destroytime)
  - [ExplosionResistance](#explosionresistance)
  - [Friction](#friction)
  - [Flammable](#flammable)
  - [Material](#material)
  - [LightEmmision](#lightemmision)
  - [LightDampening](#lightdampening)
  - [Geometry](#geometry)
  - [BoneVisibility](#bonevisibility)

## Components:
## Category
  Component: `Category: string|CategoryEnum`
  [see enum](./ENUM.md#categorysenum)
  BlockComponent:
  ```json
  "menu_category": {
    "category": "construction"
  }
  ```
  example usage:
  ```javascript
  static Category = "construction"
  ```
  - [back to top](#block-components-list)
## Group
  Component: `Group: string|GroupEnum`
  [see enum](./ENUM.md#groupsenum)
  BlockComponent:
  ```json
  "menu_category": {
    "group": "itemGroup.planks.name"
  }
  ```
  example usage:
  ```javascript
  static Group = "itemGroup.planks.name"
  ```
  - [back to top](#block-components-list)
## DisplayName
  Component: `DisplayName: string`<br/>
  BlockComponent:
  ```json
  "minecraft:display_name": "My Block Name"
  ```
  example usage:
  ```javascript
  static DisplayName = "My Block Name"
  ```
  - [back to top](#block-components-list)
## DestroyTime
  Component: `DestroyTime: boolean|number`<br/>
  BlockComponent:
  ```json
  "minecraft:destructible_by_mining": false
  ```
  ```json
  "minecraft:destructible_by_mining": {
    "seconds_to_destroy": 5
  }
  ```
  example usage:
  ```javascript
  static DestroyTime = false
  ```
  ```javascript
  static DestroyTime = 5
  ```
  - [back to top](#block-components-list)

## ExplosionResistance
  Component: `ExplosionResistance: boolean|number`<br/>
  BlockComponent:
  ```json
  "minecraft:destructible_by_explosion": false
  ```
  ```json
  "minecraft:destructible_by_explosion": {
    "explosion_resistance": 20
  }
  ```
  example usage:
  ```javascript
  static ExplosionResistance = false
  ```
  ```javascript
  static ExplosionResistance = 20
  ```
  - [back to top](#block-components-list)
## Friction
  Component: `Friction: float (0.1-1.0)`<br/>
  BlockComponent:
  ```json
  "minecraft:friction": 0.4
  ```
  example usage:
  ```javascript
  static Friction = 0.4
  ```
  - [back to top](#block-components-list)
## Flammable
  Component: `Flammable: FlammableComponent`
  [see type](./TYPEDEF.md#flammablecomponent)
  BlockComponent:
  ```json
  "minecraft:flammable": {
    "catch_chance_modifier": 5,
    "destroy_chance_modifier": 20
  }
  ```
  example usage:
  ```javascript
  static Flammable = {
    CatchChanceModifier = 5,
    DestroyChanceModifier = 20
  }
  ```
  - [back to top](#block-components-list)
## Material
  Compoenent: `Material: MaterialInstancesComponent`
[see type](./TYPEDEF.md#materialinstances)<br/>
  BlockComponent:
  ```json
  "minecraft:material_instances": {
    "*": {
      "texture": "your_texture",
      "render_method": "opaque",
      "face_dimming": false,
      "ambient_occlusion": false
    }
  }
  ```
  - `[Bone: string]: Materal`
     [See type](./TYPEDEF.md)
  - `Texture: String`
  - `RenderMethod: RenderMethodEnum`
     [See enum](./ENUM.md#rendermethodenum)
  - `FaceDimming: boolean`
  - `AmbientOcclusion: boolean`
  example usage:
  ```javascript
  static Material = {
    "*": {
      Texture: "your_texture",
      RenderMethod: "opaque",
      FaceDimming: false,
      AmbientOcclusion: false
    }
  }
  ```
  - [back to top](#block-components-list)
## LightEmmision
  Component: `LightEmmision: number`<br/>
  BlockComponent:
  ```json
  "minecraft:light_emission": 10
  ```
  example usage:
  ```javascript
  static LightEmmision = 10
  ```
  - [back to top](#block-components-list)
## LightDampening
  Component: `LightDampening: number`<br/>
  BlockComponent:
  ```json
  "minecraft:light_dampening": 7
  ```
  example usage:
  ```javascript
  static LightDampening = 7
  ```
  - [back to top](#block-components-list)
## Geometry
  Component: `Geometry: string`<br/>
  BlockComponent:
  ```json
  "minecraft:geometry": {
    "identifier": "geometry.my_geometry"
  }
  ```
  example usage:
  ```javascript
  static Geometry = "geometry.my_geometry"
  ```
  - [back to top](#block-components-list)
## BoneVisibility
  Component: `BoneVisibility: object`
  BlockComponent:
  ```json
  "minecraft:geometry": {
  "identifier": "geometry.my_geometry",
  "bone_visibility": {
    "my_bone": true
    }
  }
  ```
  example usage:
  ```javascript
  static BoneVisibility = {
    MyBone: true
  }
  ```
  - [back to top](#block-components-list)