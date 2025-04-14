// src/logger/mock-logger.ts
import { Logger } from '../types';

/**
 * A mock logger implementation for testing
 */
export class MockLogger implements Logger {
  public logs: Array<{
    level: 'info' | 'error' | 'debug';
    message: string;
    error?: Error;
    meta: any[];
  }> = [];

  /**
   * Log an info message
   */
  public info(message: string, ...meta: any[]): void {
    this.logs.push({ level: 'info', message, meta });
  }

  /**
   * Log an error message
   */
  public error(message: string, error?: Error, ...meta: any[]): void {
    this.logs.push({ level: 'error', message, error, meta });
  }

  /**
   * Log a debug message
   */
  public debug(message: string, ...meta: any[]): void {
    this.logs.push({ level: 'debug', message, meta });
  }

  /**
   * Clear all logs
   */
  public clear(): void {
    this.logs = [];
  }

  /**
   * Get all logs of a specific level
   */
  public getLogsByLevel(level: 'info' | 'error' | 'debug'): Array<{
    level: 'info' | 'error' | 'debug';
    message: string;
    error?: Error;
    meta: any[];
  }> {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Check if a specific message was logged
   */
  public hasLoggedMessage(partialMessage: string): boolean {
    return this.logs.some(log => log.message.includes(partialMessage));
  }
}