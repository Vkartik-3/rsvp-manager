// src/logger/console-logger.ts
import { Logger } from '../types';

export class ConsoleLogger implements Logger {
  private prefix: string;

  constructor(prefix: string = 'RSVP Service') {
    this.prefix = prefix;
  }

  public info(message: string, ...meta: any[]): void {
    console.log(`[${this.prefix}] INFO: ${message}`, ...meta);
  }

  public error(message: string, error?: Error, ...meta: any[]): void {
    console.error(`[${this.prefix}] ERROR: ${message}`, error || '', ...meta);
  }

  public debug(message: string, ...meta: any[]): void {
    console.debug(`[${this.prefix}] DEBUG: ${message}`, ...meta);
  }
}