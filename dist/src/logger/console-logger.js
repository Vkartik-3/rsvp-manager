"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor(prefix = 'RSVP Service') {
        this.prefix = prefix;
    }
    info(message, ...meta) {
        console.log(`[${this.prefix}] INFO: ${message}`, ...meta);
    }
    error(message, error, ...meta) {
        console.error(`[${this.prefix}] ERROR: ${message}`, error || '', ...meta);
    }
    debug(message, ...meta) {
        console.debug(`[${this.prefix}] DEBUG: ${message}`, ...meta);
    }
}
exports.ConsoleLogger = ConsoleLogger;
