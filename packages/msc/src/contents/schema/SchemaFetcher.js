import { promises as fsPromise } from "fs";
import simpleGit from "simple-git";

const git = simpleGit(process.cwd());

export async function FetchSchemas() {
  try {

    // Create directory
    await fsPromise.mkdir(`./tmpe`, { recursive: true });

    // Clone repository
    git.clone(
      "https://github.com/Blockception/Minecraft-bedrock-json-schemas",
      `./tmpe`
    );

    console.log("Repository cloned successfully!");
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

FetchSchemas()