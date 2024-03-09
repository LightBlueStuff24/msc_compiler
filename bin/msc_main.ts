import { Listener } from 'keypress.js';
import Log from "../src/utilities/Log";
import { promises as fsPromise } from 'fs';
import path from 'path';
import { watch } from 'chokidar';
import { v4 as uuid } from 'uuid';
const cwd = process.cwd();

const listener = new Listener();

export async function Build(inputDir: string | undefined = undefined, outputDir: string | undefined = undefined) {

}

async function BuildRegistryFiles() {

}

async function WatchFile(dir = cwd) {
    const globPattern = path.join(dir, '**/*.+(js|ts)');
    const watcher = watch(globPattern,
        {
            persistent: true, depth: 5, interval: 300, usePolling: true,
            awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 250 }
        });
    Log.info('File Watcher Started! Press Shift + X to stop watching');
    listener.simple_combo('shift x', () => {
        Log.info('Stopping Watcher...');
        watcher.close();
        process.exit(0);
    });
    watcher.on('change', (pa, stat) => {

    });
}

async function Init() {

}





/** 

// Cache lib data to reduce start up time
require('v8-compile-cache');
require('keypress')(process.stdin);
const { EntityRegistry, FluidRegistry, ItemRegistry, BlockRegistry } = require('../src/registries/export');
const { walkDirectory, isObjectArray, getFilesInWorkspace, getMinecraftVersion, getSemVer, getConfig } = require('../utilities/exports_util');
const currentDirectory = process.cwd();

async function startBuild(inputDir = undefined, outputDir = undefined) {
    try {
        const config = (await getConfig('../')).mscConfig; // Retrieve msc configuration
        const outputDirectory = outputDir ?? "dist"; // Default name
        const inputDirectory = inputDir ?? config.inputDirectory;
        const skipFilesOrDirs = config?.ignoreFiles ?? [];
        const directoryPath = path.join(currentDirectory, inputDirectory);
        const startTime = performance.now();
        const files = await getFilesInWorkspace(directoryPath, undefined, (file) => file.fileName.endsWith('.js'), skipFilesOrDirs);
        await Promise.all(files.map(file => loadFile(file.filePath)));
        const fileCount = await buildFiles(config, outputDirectory);
        const endTime = performance.now();
        const delta = endTime - startTime;
        const buildTime = (Math.floor(delta) / 1000).toFixed(1);
        BuildLog.info(`Created ${fileCount} files in ${buildTime} seconds`);
    } catch (err) {
        BuildLog.error(`Error in startBuild: ${err}`);
    }
}

async function buildFiles(config, outputDirName = undefined) {
    const promises = [
        fsPromise.mkdir(outputDirName, { recursive: true }),
        fsPromise.mkdir(`${outputDirName}/BP`, { recursive: true }),
        buildRegistryFiles('blocks', BlockRegistry.Registries, outputDirName),
        buildRegistryFiles('items', ItemRegistry.Registries, outputDirName),
        buildRegistryFiles('entities', EntityRegistry.Registries, outputDirName),
        buildManifest(config, outputDirName)
    ];

    await Promise.all(promises);
    let totalCount = 0;
    for (const promise of promises) {
        const result = await promise;
        if (typeof result === 'number') {
            totalCount += result;
        }
    }
    return totalCount;
}

async function buildRegistryFiles(subfolder, registries, outputDirName = undefined) {
    let count = 0;
    if (registries.length > 0) {
        await fsPromise.mkdir(`${outputDirName}/BP/${subfolder}`, { recursive: true });
        const promises = registries.map(async regEntry => {
            const fileName = regEntry.name.toLowerCase();
            await fsPromise.writeFile(
                `${outputDirName}/BP/${subfolder}/${fileName}.json`,
                regEntry.init() // Fixed serialization issue
            );
            count++;
        });
        await Promise.all(promises);
        return count;
    }
}

async function buildFluidFiles() {
    if (FluidRegistry.Registries.length > 0) {
        await fsPromise.mkdir('build/BP/scripts', { recursive: true });
        await Promise.all(FluidRegistry.Registries.map(async (registry) => {
            const filename = registry.name;
            await fsPromise.writeFile(
                `build/BP/scripts/${filename}.js`,
                ""
            );
            BuildLog.info(`Created ${filename}.js`);
        }));
    }
}

async function buildManifest(config, outputDirName = undefined) {
    const outputDir = path.join(currentDirectory, `${outputDirName}/BP/manifest.json`);
    const minecraftVersion = await getMinecraftVersion(true);
    let manifestStructure = {
        "format_version": 2,
        "header": {
            "name": config?.project?.name || "",
            "description": config?.project?.description || "",
            "uuid": uuid(),
            "min_engine_version": config?.minEngineVersion || minecraftVersion,
            "version": [1, 0, 0]
        },
        "modules": [
            {
                "type": "data",
                "uuid": uuid(),
                "version": [1, 0, 0]
            }
        ]
    };

    if (config.scriptModules) {
        for (const module of config.scriptModules) {
            isObjectArray(config.scriptModules);
        }
        // Add script modules to manifest
        if (!manifestStructure['dependencies']) manifestStructure['dependencies'] = [];
        manifestStructure['modules'].push(
            {
                "type": "script",
                "language": "javascript",
                "entry": `scripts/${config.scriptEntry}`,
                "uuid": uuid(),
                "version": [1, 0, 0]
            }
        );

        if (isObjectArray(config.scriptModules)) {
            for (const obj of config.scriptModules) {
                const version = obj.version || await getSemVer(obj.name);
                if (!obj.version) BuildLog.warn(`No version specified for module ${obj.name}. Using current: ${version}`);
                manifestStructure['dependencies'].push(
                    {
                        "module_name": obj.name,
                        "version": `${version}`
                    }
                );
            }
        } else {
            for (const str of config.scriptModules) {
                const version = await getSemVer(str);
                BuildLog.warn(`No version specified for module ${str}. Using current: ${version}`);
                manifestStructure['dependencies'].push(
                    {
                        "module_name": str,
                        "version": `${version}`
                    }
                );
            }
        }
    }

    await fsPromise.writeFile(outputDir, JSON.stringify(manifestStructure, null, 2));
}

function loadFile(filePath) {
    return new Promise((resolve, reject) => {
        if (!filePath) reject();
        const fileName = path.basename(filePath);
        BuildLog.info(`Loading file: ${fileName}`);
        try {
            require(filePath);
            resolve();
        } catch (error) {
            BuildLog.error(`Error loading file ${fileName}:`, error);
            reject(error);
        }
    });
}

// Installs npm package
async function installPackage(packageName, version) {
    const { promisify } = require("util");
    const execFile = promisify(require('child_process').execFile);

    return await execFile('npm', ['i', `${packageName}-${version}`]);
}
*/