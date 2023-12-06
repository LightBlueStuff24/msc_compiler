# MSC Compiler
### Block Components:

- [Category](#Category)
- `Group: string`
- `DisplayName: string`
- `DestroyTime: boolean|number`
- `ExplosionResistance: boolean|number`
- `Friction: float (0.1-1.0)`
- `CatchChanceModifier: number`
- `DestroyChanceModifier: number`
- `Texture: string`
- `RenderMethod: string`
- `FaceDimming: boolean`
- `AmbientOcclusion: boolean`
- `LightEmmision: number`
- `LightAbsorption: number`
- `Geometry: string`
- `BoneVisibility: object`
- `Loot: string`
- `MapColor: string|number[]`
- `PlacementFilter: object`
- `Transformation: object`
- `CollisionBox: object`
- `SelectionBox: object`

- `OnStepOn: object`
- `OnStepOff: object`
- `OnFallOn: object`
- `OnInteract: object`
- `OnPlaced: object`
- `OnPlayerPlacing: object`
- `OnPlayerDestroyed: object`
- `QueuedTicking: object`
- `RandomTicking: object`

# Components:
* ## Category
  `Block.Category: string`
  example
  ```javascript
  static Category = "construction"
  ```