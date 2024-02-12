import { Player, world } from '@minecraft/server';

const moment = require('moment');
const chalk = require('chalk');
const { grey, blue, green, yellowBright, redBright } = chalk;
const purple = chalk.hex('#800080');

class BuildLog {
  static logMode = 'normal';
  static async log(level, ...args) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const label = `${grey(`[${timestamp}]`)} ${grey('[')}${blue('MSC')}${grey(']')}`;
    const modeLabel = (this.logMode === 'fileWatcher') ? `${grey('[')}${purple('FileWatcher')}${grey(']')} ` : '';

    const logMessage = args.join(' ');
    switch (level) {
      case 'info':
        console.info(`${label} ${modeLabel}${grey('[')}${green('Info')}${grey(']')} ${logMessage}`);
        break;
      case 'warn':
        console.warn(`${label} ${modeLabel}${grey('[')}${yellowBright('Warning')}${grey(']')} ${logMessage}`);
        break;
      case 'error':
        console.error(`${label} ${modeLabel}${grey('[')}${redBright('Error')}${grey(']')} ${logMessage}`);
        break;
      default:
        console.log(`${label} ${modeLabel}${logMessage}`);
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

  static async mode(mode = undefined) {
    if (mode) {
      this.logMode = mode;
    } else {
      return this.logMode;
    }
  }
}

module.exports.BuildLog = BuildLog;

Player.prototype.game
world.gameRules