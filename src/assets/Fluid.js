const {Block } = require("./Block.js");
const { BlockRegistry } = require("./Registries/BlockRegistry.js");

class Fluid {
  static #Data = {
    block: "",
    swimSpeed: 1.5,
    fogType: "",
  };

  static Block;
  static FogType;
  static SwimSpeed;


  static createBlock(name){
    new Block({DisplayName:name})
    this.Block = Block
        Fluid.#Data.block =
        JSON.parse(Block.init())["minecraft:block"].description.identifier;
        BlockRegistry.register(Block);
  }
  static init() {
    if (this.Block) {
      const blockSet = new Set(BlockRegistry.Registries);
      const blockArray = Array.from(blockSet);
      const foundBlock = blockArray.find((c) => {
        const parsed = JSON.parse(c);
        return (
          parsed["minecraft:block"].components["minecraft:display_name"]
            .trim()
            .toLowerCase() === this.Block.DisplayName.trim().toLowerCase() ?? "mp"
        );
      });

      if (!foundBlock) {
        throw new Error("Block must be registered in the BlockRegistry");
      } 
      const parsedBlock = JSON.parse(foundBlock)
      Fluid.#Data.block =
        parsedBlock["minecraft:block"].description.identifier;
    } else {
      this.createBlock(this.name)
    }
    
    if (this.FogType) {
      if (typeof this.FogType !== "string") {
        throw new Error("FogType must be a string");
      }
      Fluid.#Data.fogType = this.FogType;
    }

    if (this.SwimSpeed) {
      if (typeof this.SwimSpeed !== "number") {
        throw new Error("SwimSpeed must be a number");
      }
      Fluid.#Data.swimSpeed = this.SwimSpeed;
    }

    return {script: `
import { system, world, Vector, Player } from "@minecraft/server";

const fluids = ["${Fluid.#Data.block ?? "none"}"];

Player.prototype.applyImpulse = function (vector) {
  const horizontal = Math.sqrt(vector.x * vector.x + vector.z * vector.z) * 2.0;
  const vertical = vector.y < 0.0 ? 0.5 * vector.y : vector.y;
  this.applyKnockback(vector.x, vector.z, horizontal, vertical);
};

system.runInterval(() => {
  const players = world.getPlayers();
  const swimSpeed = ${Fluid.#Data.swimSpeed} * 0.1;
  for (const player of players) {
    // Fluid effects
    if (
      fluids.includes(
        world
          .getDimension(player.dimension.id)
          .getBlock({ ...player.location, y: player.location.y + 1 })
          .typeId
      ) ||
      fluids.includes(
        world
          .getDimension(player.dimension.id)
          .getBlock(player.location)
          .typeId
      )
    ) {
      const slowVector = new Vector(-1, 0, -1);
      player.applyImpulse(slowVector);
      player.addEffect("slow_falling", 4, { showParticles: false });
      if (player.isSprinting) {
        const viewDirection = this.entity.getViewDirection();
        const speedImpulse = new Vector(
          viewDirection.x * swimSpeed,
          viewDirection.y * swimSpeed,
          viewDirection.z * swimSpeed
        );
        player.applyImpulse(speedImpulse);
      }
      if (player.isJumping) {
        const impulseVector = new Vector(0, swimSpeed, 0);
        player.applyImpulse(impulseVector);
      }
    }
    // Fluid fog
    if (
      fluids.includes(
        world
          .getDimension(player.dimension.id)
          .getBlock({ ...player.location, y: player.location.y + 1.63 })
          .typeId
      )
    ) {
      player.runCommand(
        \`fog @s push ${Fluid.#Data.fogType ?? "none"} fluid_fog\`
      );
    } else {
      player.runCommand(
        "fog @s remove ${Fluid.#Data.fogType ?? "none"} fluid_fog"
      );
    }
  }
});
`,name:`${this.name.toLowerCase()}_fluid`
  }
}
}

exports.Fluid = Fluid;
