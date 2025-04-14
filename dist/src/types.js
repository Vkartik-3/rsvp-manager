"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageError = exports.InvalidPlayerError = exports.RsvpError = void 0;
// Custom error classes
class RsvpError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RsvpError';
    }
}
exports.RsvpError = RsvpError;
class InvalidPlayerError extends RsvpError {
    constructor(message) {
        super(message);
        this.name = 'InvalidPlayerError';
    }
}
exports.InvalidPlayerError = InvalidPlayerError;
class StorageError extends RsvpError {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'StorageError';
    }
}
exports.StorageError = StorageError;
