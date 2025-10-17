//@ts-nocheck

import ora from "ora";
import Log from "../Log";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit();
const schemaTypes: SchemaInfo[] = [
  { folder: "behavior", name: "blocks" },
  { folder: "behavior", name: "entities" },
  { folder: "behavior", name: "items" },
  { folder: "resource", name: "entity" },
];

export async function FetchSchemas() {
  const schemas = {};
  const spinner = ora({
      text: "Fetching Schemas...",
      spinner: "bluePulse",
  });

  try {
      spinner.start();
      const requests = schemaTypes.map(async ({ folder, name }) => {
          const path = `${folder}/${name}/${name}.json`;
          try {
              const { data } = await octokit.rest.repos.getContent({
                  owner: "Blockception",
                  repo: "Minecraft-bedrock-json-schemas",
                  path,
              });
              if (data && data.content) {
                  const schemaContent = Buffer.from(data.content, 'base64').toString('utf-8')
                  schemas[name] = JSON.parse(schemaContent)["definitions"];
              }
          } catch (error) {
              Log.error(`Error processing schema: ${folder}/${name}`);
          }
      });
      await Promise.all(requests);
      spinner.succeed("Schemas fetched successfully!");
      return schemas;

  } catch (error) {
      spinner.fail(`Error fetching JSON: ${error.message}`);
  } finally {
      spinner.stop();
  }
}

interface SchemaInfo {
  folder: string;
  name: string;
}
