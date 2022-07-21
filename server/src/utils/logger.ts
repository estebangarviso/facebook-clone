import { blue, green, red, yellow, Color } from 'colors';

export class Logger {
  static log(message: string, color: Color = green) {
    console.log(`${green(`[${new Date().toLocaleTimeString()}]`)} ${color(message)}`);
  }

  static error(message: string) {
    console.error(`${red(`[${new Date().toLocaleTimeString()}]`)} ${red(message)}`);
  }

  static warn(message: string) {
    console.warn(`${yellow(`[${new Date().toLocaleTimeString()}]`)} ${yellow(message)}`);
  }

  static info(message: string) {
    console.info(`${blue(`[${new Date().toLocaleTimeString()}]`)} ${blue(message)}`);
  }
}
