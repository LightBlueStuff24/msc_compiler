import chalk from "chalk";
const { redBright, grey, green, yellowBright, blueBright } = chalk;

export default class Log {
  private static label = `${grey("[")}${blueBright("MSC")}${grey("]")}`;
  public static info(msg: string) {
    console.info(
      `${this.label} ${grey("[")}${green("Info")}${grey("]")} ${msg}`
    );
  }
  public static error(msg: string) {
    const stackTrace = new Error().stack;
    if (!stackTrace) return console.error("cannot get new Error().stack");
    const lines = stackTrace.split("\n");
    if (!(lines.length >= 3))
      return console.error("cannot run. reason: stackTrace::lines::length < 3");
    const errorLine = lines[2];
    const match = /(?:\s+at\s+)(?:.*?\()?([^:\s]+):(\d+):(\d+)/.exec(errorLine);
    if (!match) return console.error("cannot execute match:(lines[2]");
    console.error(
      `${this.label} ${grey("[")}${redBright("Error")}${grey(
        "]"
      )} ${msg} | ${grey(`${match[3]}:${match[2]}`)} | ${grey(
        `${match[1].match(/([^/\\]+)\.[^/\\]+$/)![0]}`
      )}`
    );
  }
  public static warn(msg: string) {
    console.warn(
      `${this.label} ${grey("[")}${yellowBright("Warning")}${grey("]")} ${msg}`
    );
  }

  public static highlight(msg: string, hex: string = "#800080") {
    let color = chalk.hex(hex);
    return `${grey("[")}${color(msg)}${grey("]")}`;
  }
}
