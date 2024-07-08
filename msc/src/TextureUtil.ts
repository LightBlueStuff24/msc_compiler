import { type Colors, FluidImageType } from "./enums/ImageValues";
import Jimp from "jimp";
import path from "path";
import Log, { isInt } from "./utilities";

export namespace TextureUtil {
  export function generateBucketTexture(fromImagePath: string) {}

  export async function generateFluidTexture(
    name: string,
    imageType: FluidImageType,
    color: Colors
  ): Promise<void> {
    try {
      if (!name || typeof name !== "string")
        throw new Error("Invalid name parameter");
      if (!Object.values(FluidImageType).includes(imageType)) {
        Log.error("Invalid imageType parameter");
      }
      if (typeof color !== "number" || !isInt(color)) {
        Log.error(`Invalid color parameter`);
        return;
      }
      const outputPath = path.join(
        process.cwd(),
        `RP/textures/blocks/${name}.png`
      );
      const sourceImgPath =
        imageType === FluidImageType.Flowing
          ? path.join(__dirname, "../assets/fluid/flowing.png")
          : path.join(__dirname, "../assets/fluid/still.png");

      const sourceImg = await Jimp.read(sourceImgPath);
      const { r, g, b } = Jimp.intToRGBA(color);
      //@ts-ignore
      sourceImg.color([{ apply: "red", params: [r] },{ apply: "green", params: [g] },{ apply: "blue", params: [b] }]);
      await sourceImg.writeAsync(outputPath);
      Log.info(`Generated fluid texture at ${outputPath}`);
    } catch (error) {
      Log.error(`Error generating fluid texture: ${error.message}`);
    }
  }
}

