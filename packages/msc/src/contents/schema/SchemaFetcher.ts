import git from "isomorphic-git";
import ora from "ora";
import { promises as fs } from "fs";
import http from "isomorphic-git/http/node/index.cjs";
import Log from "../../utilities/Log";
import { ObjectStruct, SchemaInfo } from "../../types";


const schemaDir = "./temp";
const schemaTypes: SchemaInfo[] = [
  { folder: "behavior", name: "blocks" },
  { folder: "behavior", name: "entities" },
  { folder: "behavior", name: "items" },
  { folder: "resource", name: "entity" },
];

export async function FetchSchemas() {
  const schemas: ObjectStruct = {};
  const spinner = ora({
     text: "Fetching Schemas...",
     spinner:'bluePulse'
    });
  try {
    spinner.start();
    // Clone the repository
    await git.clone({
      fs,
      http,
      dir: schemaDir,
      url: "https://github.com/Blockception/Minecraft-bedrock-json-schemas",
      singleBranch: true,
      depth: 1
    });
    spinner.succeed("Schemas fetched successfully!");
    // Process schemas
    for (const { folder, name } of schemaTypes) {
      const schemaPath = `${schemaDir}/${folder}/${name}/${name}.json`;
      try {
        const schemaData = JSON.parse(await fs.readFile(schemaPath, "utf-8"));
        schemas[name] = schemaData['definitions'];
        Log.info(`Processing schema: ${folder}/${name}`);
      } catch (error) {
        Log.error(`Error processing schema: ${folder}/${name}`);
      }
    }
    await fs.rm(schemaDir, { recursive: true });
    return schemas;
  } catch (error) {
    spinner.fail("Error fetching JSON:");
    Log.error(error.message);
  } finally {
    spinner.stop();
  }
}
