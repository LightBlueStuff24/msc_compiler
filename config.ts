const config = await import("./msc.config.json")
const defaultConfig = await import("./defaultConfig.json")

export default config || defaultConfig;