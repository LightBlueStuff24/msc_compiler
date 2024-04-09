import { Entity, Vector2, Vector3, world } from "@minecraft/server";

class ModelBone {
  #entity: Entity;
  #id: string;
  position: Vector3;
  rotation: Vector2;

  constructor(entity: Entity, id: string) {
    this.#entity = entity;
    this.#id = id;
    this.getProperties();
  }

  private getProperties(): void {
    this.position = this.getPosition();
    this.rotation = this.getRotation();
  }

  private getProperty(propName: string): number {
    return this.#entity.getProperty(`bone_${this.#id}_${propName}`) as number;
  }

  private setProperty(propName: string, value: number): void {
    this.#entity.setProperty(`bone_${this.#id}_${propName}`, value);
  }

  private getPosition(): Vector3 {
    return {
      x: this.getProperty("position_x"),
      y: this.getProperty("position_y"),
      z: this.getProperty("position_z"),
    };
  }

  private getRotation(): Vector2 {
    return {
      x: this.getProperty("rotation_x"),
      y: this.getProperty("rotation_y"),
    };
  }

  setPosition(position: Vector3): void {
    Object.entries(position).forEach(([axis, value]) => {
      if (value !== this.position[axis]) {
        this.setProperty(`position_${axis}`, value);
        this.position[axis] = value;
      }
    });
  }

  setRotation(rotation: Vector2): void {
    Object.entries(rotation).forEach(([axis, value]) => {
      if (value !== this.rotation[axis]) {
        this.setProperty(`rotation_${axis}`, value);
        this.rotation[axis] = value;
      }
    });
  }
}

export { ModelBone };

