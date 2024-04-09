import { Block, Entity, ItemStack } from "@minecraft/server";
import { Model } from "./entity/model/Model.ts";

class MSC {
  // Used in triggering advancements and custom events maybe?
  trigger(...args: any[]): void { }

  /**
   * Gets the model of the specified entity.
   * @param {Entity} entity - The entity to get the model of
   * @returns {Model} The model of the entity
   * @throws {Error} If the entity was not made with MSC
   */
  getEntityModel(entity: Entity): Model | undefined {
    const mscMade = entity.getProperty("msc:created");
    if (!mscMade) {
      throw ReferenceError("Entity was not made with MSC");
    }
    // Constructs a model object based off the bone properties in the entity
    const model = new Model(entity);
    return model;
  }

  getComponent(componentName: string, block: Block);
  getComponent(componentName: string, entity: Entity);
  getComponent(componentName: string, item: ItemStack);
  getComponent(componentName: string, object: any) {

  }
}

const msc = new MSC();

export { msc };
