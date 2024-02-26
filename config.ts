const config = import("../msc.config.json")
const defaultConfig = import("./defaultConfig.json")

export default config || defaultConfig;