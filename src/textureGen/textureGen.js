

const Jimp = require('jimp');
const { promisify } = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);

class TextureGenerator {
    constructor(imagePath) {
        this.image = imagePath;
    }

    async genVariation(texturePath, baseColor) {
        const baseImage = await Jimp.read(this.image);
        const height = baseImage.getHeight();
        const halfHeight = Math.floor(height / 2);

        // Apply base color to the upper half
        const upperHalf = baseImage.clone().crop(0, 0, baseImage.getWidth(), halfHeight);
        upperHalf.color([
            { apply: 'red', params: [baseColor[0]] },
            { apply: 'green', params: [baseColor[1]] },
            { apply: 'blue', params: [baseColor[2]] },
        ]);

        const texture = await Jimp.read(texturePath);
        upperHalf.composite(texture, 0, 0, {
            mode: Jimp.BLEND_OVERLAY,
            opacitySource: 1,
            opacityDest: 1,
        });
        baseImage.blit(upperHalf, 0, 0, 0, 0, baseImage.getWidth(), halfHeight);

        return baseImage.getBufferAsync(Jimp.MIME_JPEG);
    }
    async generateFluidBucket(fluidTexture, fillRegion) {
        const bucketImage = await Jimp.read('../assets/textures/bucket_empty.png');
        const fluidImage = await Jimp.read(fluidTexture);
        const fillX = fillRegion[0];
        const fillY = fillRegion[1];
        const fillWidth = fillRegion[2] - fillRegion[0];
        const fillHeight = fillRegion[3] - fillRegion[1];
        const fillArea = bucketImage.clone().crop(fillX, fillY, fillWidth, fillHeight);
        const secondFillArea = bucketImage.clone().crop(3, 4, 10, 1);
        fluidImage.scan(0, 0, fluidImage.getWidth(), fluidImage.getHeight(), function (x, y) {
            const { r, g, b } = Jimp.intToRGBA(this.getPixelColor(x, y));
            const [centerX, centerY] = [fillWidth / 2, fillHeight / 2]
            const distance = Math.sqrt(((x - centerX) ** 2) + ((y - centerY) ** 2))
            const brightness = (distance / Math.max(centerX, centerY)) * 255;
            const alpha = Jimp.intToRGBA(fillArea.getPixelColor(x, y)).a;
            const adjustedAlpha = brightness > 42 ? alpha : 255 - alpha;
            fillArea.setPixelColor(Jimp.rgbaToInt(r, g, b, adjustedAlpha), x, y);
            secondFillArea.setPixelColor(Jimp.rgbaToInt(r, g, b, adjustedAlpha), x, y);
        });
        bucketImage.blit(fillArea, fillX, fillY, 0, 0, fillWidth, fillHeight);
        bucketImage.blit(secondFillArea, 3, 4, 0, 0, 10, 1);
        return await bucketImage.getBufferAsync(Jimp.MIME_PNG);
    }


}

async function generateVariations() {
    const textureGenerator = new TextureGenerator('dow.png');
    const texturePath = 'dow.png';

    for (let i = 0; i < 5; i++) {
        const baseColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
        const resultBuffer = await textureGenerator.genVariation(texturePath, baseColor);
        await writeFileAsync(`${process.cwd()}/variation_${i}.jpg`, resultBuffer);
    }
}

(async () => {
    const textureGenerator = new TextureGenerator();
    const buffer = await textureGenerator.generateFluidBucket('./lava_still.png', [5, 3, 11, 6]);
    await writeFileAsync(`${process.cwd()}/variation_bucket.png`, buffer);
})();

