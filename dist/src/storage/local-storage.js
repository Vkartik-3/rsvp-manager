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
exports.LocalStorageAdapter = void 0;
// src/storage/local-storage.ts
const types_1 = require("../types");
/**
 * Browser LocalStorage implementation of the RsvpStorage interface
 */
class LocalStorageAdapter {
    constructor(storageKey = 'rsvp-entries') {
        this.storageKey = storageKey;
    }
    /**
     * Save an RSVP entry to localStorage
     */
    saveRsvp(playerId, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get current entries
                const currentEntriesJson = localStorage.getItem(this.storageKey) || '{}';
                const entries = JSON.parse(currentEntriesJson);
                // Dates are serialized to strings in JSON, so we need to handle that when reading later
                entries[playerId] = entry;
                // Save updated entries
                localStorage.setItem(this.storageKey, JSON.stringify(entries));
            }
            catch (error) {
                throw new types_1.StorageError(`Failed to save RSVP to localStorage for player ${playerId}`, error);
            }
        });
    }
    /**
     * Get an RSVP entry by player ID
     */
    getRsvp(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entriesJson = localStorage.getItem(this.storageKey) || '{}';
                const entries = JSON.parse(entriesJson);
                if (!entries[playerId]) {
                    return undefined;
                }
                // Convert the date string back to a Date object
                const entry = entries[playerId];
                entry.updatedAt = new Date(entry.updatedAt);
                return entry;
            }
            catch (error) {
                throw new types_1.StorageError(`Failed to get RSVP from localStorage for player ${playerId}`, error);
            }
        });
    }
    /**
     * Get all RSVP entries
     */
    getAllRsvps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entriesJson = localStorage.getItem(this.storageKey) || '{}';
                const entries = JSON.parse(entriesJson);
                return Object.values(entries).map((entry) => (Object.assign(Object.assign({}, entry), { updatedAt: new Date(entry.updatedAt) })));
            }
            catch (error) {
                throw new types_1.StorageError('Failed to get all RSVPs from localStorage', error);
            }
        });
    }
    /**
     * Delete an RSVP entry
     */
    deleteRsvp(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entriesJson = localStorage.getItem(this.storageKey) || '{}';
                const entries = JSON.parse(entriesJson);
                if (!entries[playerId]) {
                    return false;
                }
                delete entries[playerId];
                localStorage.setItem(this.storageKey, JSON.stringify(entries));
                return true;
            }
            catch (error) {
                throw new types_1.StorageError(`Failed to delete RSVP from localStorage for player ${playerId}`, error);
            }
        });
    }
    /**
     * Clear all RSVP entries
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                localStorage.setItem(this.storageKey, '{}');
            }
            catch (error) {
                throw new types_1.StorageError('Failed to clear RSVPs from localStorage', error);
            }
        });
    }
}
exports.LocalStorageAdapter = LocalStorageAdapter;
