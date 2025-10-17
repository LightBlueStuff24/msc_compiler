import chalk from "chalk";
const { redBright, grey, green, yellowBright, blueBright } = chalk;

namespace Log {
  const label = `${grey("[")}${blueBright("MSC")}${grey("]")}`;
  export function info(msg: string) {
    console.info(`${label} ${grey("[")}${green("Info")}${grey("]")} ${msg}`);
  }
  export function error(msg: string) {
    const stackTrace = new Error().stack;
    if (!stackTrace) return console.error("cannot get new Error().stack");
    const lines = stackTrace.split("\n");
    if (!(lines.length >= 3))
      return console.error("cannot run. reason: stackTrace::lines::length < 3");
    const errorLine = lines[2];
    const match = /(?:\s+at\s+)(?:.*?\()?([^:\s]+):(\d+):(\d+)/.exec(errorLine);
    if (!match) return console.error("cannot execute match:(lines[2]");
    console.error(
      `${label} ${grey("[")}${redBright("Error")}${grey("]")} ${msg} | ${grey(
        `${match[3]}:${match[2]}`
      )} | ${grey(`${match[1].match(/([^/\\]+)\.[^/\\]+$/)![0]}`)}`
    );
  }
  export function warn(msg: string) {
    console.warn(
      `${label} ${grey("[")}${yellowBright("Warning")}${grey("]")} ${msg}`
    );
  }

  export function highlight(msg: string, hex: string = "#800080") {
    let color = chalk.hex(hex);
    return `${grey("[")}${color(msg)}${grey("]")}`;
  }
}

export default Log;
