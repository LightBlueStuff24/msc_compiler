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

generateVariations()
    .then(() => {
        console.log('Variations generated and saved successfully.');
    })
    .catch(error => {
        console.error('Error:', error);
    });
