const moment = require('moment')();
const {grey,blue,green,yellowBright,redBright} = require('chalk');

class BuildLog {
  static async log(level, ...args) {
    const timestamp = moment.format('YYYY-MM-DD HH:mm:ss');
    const label = `${grey(`[${timestamp}]`)} ${grey('[')}${blue('MSC')}${grey(']')}`;
    const logMessage = args.join(' ');
    
    switch (level) {
      case 'info':
        console.info(`${label} ${grey('[')}${green('Info')}${grey(']')} ${logMessage}`);
        break;
      case 'warn':
        console.warn(`${label} ${grey('[')}${yellowBright('Warning')}${grey(']')} ${logMessage}`);
        break;
      case 'error':
        console.error(`${label} ${grey('[')}${redBright('Error')}${grey(']')} ${logMessage}`);
        break;
      default:
        console.log(`${label} ${logMessage}`);
    }
  }

  static async info(...args) {
    await this.log('info', ...args);
  }

  static async warn(...args) {
    await this.log('warn', ...args);
  }

  static async error(...args) {
    await this.log('error', ...args);
  }
}

module.exports.BuildLog = BuildLog