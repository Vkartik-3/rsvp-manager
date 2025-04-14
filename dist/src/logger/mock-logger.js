"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLogger = void 0;
/**
 * A mock logger implementation for testing
 */
class MockLogger {
    constructor() {
        this.logs = [];
    }
    /**
     * Log an info message
     */
    info(message, ...meta) {
        this.logs.push({ level: 'info', message, meta });
    }
    /**
     * Log an error message
     */
    error(message, error, ...meta) {
        this.logs.push({ level: 'error', message, error, meta });
    }
    /**
     * Log a debug message
     */
    debug(message, ...meta) {
        this.logs.push({ level: 'debug', message, meta });
    }
    /**
     * Clear all logs
     */
    clear() {
        this.logs = [];
    }
    /**
     * Get all logs of a specific level
     */
    getLogsByLevel(level) {
        return this.logs.filter(log => log.level === level);
    }
    /**
     * Check if a specific message was logged
     */
    hasLoggedMessage(partialMessage) {
        return this.logs.some(log => log.message.includes(partialMessage));
    }
}
exports.MockLogger = MockLogger;
