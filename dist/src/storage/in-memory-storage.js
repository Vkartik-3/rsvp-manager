"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorage = void 0;
// src/storage/in-memory-storage.ts
const types_1 = require("../types");
/**
 * In-memory implementation of the RsvpStorage interface
 */
class InMemoryStorage {
    constructor() {
        this.store = new Map();
    }
    /**
     * Save an RSVP entry to memory
     */
    saveRsvp(playerId, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.store.set(playerId, entry);
            }
            catch (error) {
                throw new types_1.StorageError(`Failed to save RSVP for player ${playerId}`, error);
            }
        });
    }
    /**
     * Get an RSVP entry by player ID
     */
    getRsvp(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.get(playerId);
        });
    }
    /**
     * Get all RSVP entries
     */
    getAllRsvps() {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.store.values());
        });
    }
    /**
     * Delete an RSVP entry
     */
    deleteRsvp(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.delete(playerId);
        });
    }
    /**
     * Clear all RSVP entries
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.clear();
        });
    }
}
exports.InMemoryStorage = InMemoryStorage;
