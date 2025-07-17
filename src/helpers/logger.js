export class ConsoleLogger {
  log(message, ...optionalParams) {
    process.env.REACT_APP_SHOW_LOGS &&
      console.log('log', message, ...optionalParams);
  }

  warn(message, ...optionalParams) {
    process.env.REACT_APP_SHOW_LOGS && console.warn(message, ...optionalParams);
  }

  error(message, ...optionalParams) {
    process.env.REACT_APP_SHOW_LOGS &&
      console.error(message, ...optionalParams);
  }
}

export const logger = new ConsoleLogger();
