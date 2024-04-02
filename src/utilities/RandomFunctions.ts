import Jimp from "jimp";

async function OBJtoJson(objFileContent: string, texturePath: string, modelId: string, scale: number = 1): Promise<any | null> {
    let positions: number[][] = [];
    let normals: number[][] = [];
    let uvs: number[][] = [];
    let polys: number[][][] = [];
    const bones: any[] = [];

    try {
        const image = await getImage(texturePath);
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        objFileContent.split(/\r\n|\n/g).forEach((line) => {
            const [defType, data] = line.trim().split(/\s(.+)/);
            switch (defType) {
                case "v":
                    positions.push(
                        data.split(" ").map((str, i) => (i === 0 ? -scale : scale) * Number(str))
                    );
                    break;
                case "vn":
                    normals.push(
                        data.split(" ").map((str, i) => (i === 0 ? -1 : 1) * Number(str))
                    );
                    break;
                case "vt":
                    uvs.push(data.split(" ").map(Number));
                    break;
                case "f":
                    const face = data
                        .split(" ")
                        .map((index) => {
                            const [v, vt, vn] = index.split("/").map(Number);
                            return [v - 1, vn - 1, vt - 1];
                        });
                    while (face.length <= 3) face.push(face[0]);
                    while (face.length > 4) face.pop();
                    polys.push(face);
                    break;
            }
        });

        if (polys.length > 0) {
            bones.push({
                name: "body",
                poly_mesh: {
                    normalized_uvs: true,
                    positions,
                    normals,
                    uvs,
                    polys,
                },
            });
        }
        return {
            format_version: "1.12.0",
            "minecraft:geometry": [
                {
                    description: {
                        identifier: modelId,
                        texture_width: width,
                        texture_height: height,
                    },
                    bones,
                },
            ],
        };
    } catch (error) {
        console.error("Error processing texture:", error);
        return null;
    }
}

function getImage(filePath: string): Promise<Jimp> {
    return Jimp.read(filePath);
}

function computeLevenshteinDistance(str1: string, str2: string) {
    // Create a matrix to store the distances
    const matrix: any[] = [];

    // Initialize the matrix
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the matrix
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2[i - 1] === str1[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    // Return the bottom-right element of the matrix
    return matrix[str2.length][str1.length];
}

export {
    OBJtoJson,
    computeLevenshteinDistance
}