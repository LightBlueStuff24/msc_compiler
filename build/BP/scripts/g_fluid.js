
import { system, world, Vector, Player } from "@minecraft/server";

const fluids = [""];

Player.prototype.applyImpulse = function (vector) {
  const horizontal = Math.sqrt(vector.x * vector.x + vector.z * vector.z) * 2.0;
  const vertical = vector.y < 0.0 ? 0.5 * vector.y : vector.y;
  this.applyKnockback(vector.x, vector.z, horizontal, vertical);
};

system.runInterval(() => {
  const players = world.getPlayers();
  const swimSpeed = 3 * 0.1;
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
        `fog @s push  fluid_fog`
      );
    } else {
      player.runCommand(
        "fog @s remove  fluid_fog"
      );
    }
  }
});
