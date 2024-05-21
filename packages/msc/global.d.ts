import configFile from '../../config'
declare global {
  const config: typeof configFile
}

