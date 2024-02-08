
(async () => {
    const FastNoise = (await import('fastnoise-lite')).default;
    const fs = await import('fs')
    // Terrain parameters
    const width = 10;
    const height = 10;
    const depth = 1000;
    const scale = 9;

    // Initialize FastNoise
    const noise = new FastNoise();

    // Set noise parameters
    noise.SetNoiseType(FastNoise.NoiseType.OpenSimplex2);
    noise.SetFrequency(0.1);

    // Generate terrain values
    const generateTerrain = () => {
        const terrain = Array.from({ length: depth }, (_, z) =>
            Array.from({ length: height }, (_, y) =>
                Array.from({ length: width }, (_, x) =>
                    noise.GetNoise(x * scale, y * scale, z * scale)
                )
            )
        );
        return terrain;
    };

    // Print terrain array
    const printTerrain = (terrain) => {
        console.log("Terrain Generated:");
        fs.writeFileSync('d.js',JSON.stringify(terrain))
        console.log(terrain);
    };

    // Example: Print the terrain array
    const terrain = generateTerrain();
    printTerrain(terrain);
})();
