

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
        const maskImage = await Jimp.read('../assets/textures/bucket_mask.png')
        const fluidImage = await Jimp.read(fluidTexture);
        fluidImage.mask(maskImage,0,0)
        const fillX = fillRegion[0];
        const fillY = fillRegion[1];
        const fillWidth = fillRegion[2] - fillRegion[0];
        const fillHeight = fillRegion[3] - fillRegion[1];
        bucketImage.blit(fluidImage, fillX, fillY,0,0,);
        bucketImage.write('./e.png')
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
const textureGenerator = new TextureGenerator();
textureGenerator.generateFluidBucket('./water_still.png',[5,3,11,6])