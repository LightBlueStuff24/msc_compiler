import { Entity } from "@minecraft/server";
import { ModelBone } from "./ModelBone";

class Model {
  #entity: Entity;
  #bones: Map<string, ModelBone>;

  constructor(entity: Entity) {
    this.#entity = entity;
    this.#bones = new Map();
    this.initializeBones();
  }

  private initializeBones(): void {
    // Change later
    const dynamicPropertyIds: string[] = this.#entity.getDynamicPropertyIds();
    for (const id of dynamicPropertyIds) {
      const bone: ModelBone = this.createModelBone(id);
      this.#bones.set(id, bone);
    }
  }

  private createModelBone(id: string): ModelBone {
    return new ModelBone(this.#entity, id);
  }

  getBone(name: string): ModelBone | undefined {
    return this.#bones.get(name);
  }
}

export { Model };
