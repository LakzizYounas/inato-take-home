import { Logger } from './logger.interface';

export class SpyLogger implements Logger {
  public logs: string[] = [];

  public log = (message: string): void => {
    this.logs.push(message);
  };
}
