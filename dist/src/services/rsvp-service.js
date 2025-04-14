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
exports.RsvpService = void 0;
// src/services/rsvp-service.ts
const types_1 = require("../types");
const in_memory_storage_1 = require("../storage/in-memory-storage");
class RsvpService {
    /**
     * Create a new RSVP Service
     * @param logger The logger to use
     * @param storage Optional storage implementation (defaults to in-memory)
     */
    constructor(logger, storage) {
        this.logger = logger;
        this.storage = storage || new in_memory_storage_1.InMemoryStorage();
    }
    /**
     * Add or update a player's RSVP status
     * @param player The player to update
     * @param status The RSVP status
     * @returns The updated RSVP entry
     */
    updateRsvp(player, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!player.id) {
                this.logger.error('Cannot update RSVP for player without ID');
                throw new types_1.InvalidPlayerError('Player ID is required');
            }
            if (!player.name || player.name.trim() === '') {
                this.logger.error('Cannot update RSVP for player without name');
                throw new types_1.InvalidPlayerError('Player name is required');
            }
            const rsvpEntry = {
                player,
                status,
                updatedAt: new Date()
            };
            try {
                yield this.storage.saveRsvp(player.id, rsvpEntry);
                this.logger.info(`RSVP updated for player ${player.name} (${player.id}): ${status}`);
                return rsvpEntry;
            }
            catch (error) {
                this.logger.error(`Failed to update RSVP for player ${player.id}`, error);
                throw error;
            }
        });
    }
    /**
     * Get a list of all confirmed attendees (status = "Yes")
     * @returns Array of RSVP entries for confirmed attendees
     */
    getConfirmedAttendees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allEntries = yield this.storage.getAllRsvps();
                const confirmedEntries = allEntries.filter(entry => entry.status === 'Yes');
                this.logger.debug(`Retrieved ${confirmedEntries.length} confirmed attendees`);
                return confirmedEntries;
            }
            catch (error) {
                this.logger.error('Failed to get confirmed attendees', error);
                throw error;
            }
        });
    }
    /**
     * Count RSVP responses by status
     * @returns An object containing counts for total, confirmed, declined, and maybe responses
     */
    countResponses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entries = yield this.storage.getAllRsvps();
                const counts = {
                    total: entries.length,
                    confirmed: entries.filter(entry => entry.status === 'Yes').length,
                    declined: entries.filter(entry => entry.status === 'No').length,
                    maybe: entries.filter(entry => entry.status === 'Maybe').length
                };
                this.logger.debug(`RSVP counts: ${JSON.stringify(counts)}`);
                return counts;
            }
            catch (error) {
                this.logger.error('Failed to count responses', error);
                throw error;
            }
        });
    }
    /**
     * Get all RSVP entries
     * @returns Array of all RSVP entries
     */
    getAllRsvps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.storage.getAllRsvps();
            }
            catch (error) {
                this.logger.error('Failed to get all RSVPs', error);
                throw error;
            }
        });
    }
    /**
     * Get a specific player's RSVP entry
     * @param playerId The ID of the player
     * @returns The RSVP entry for the player or undefined if not found
     */
    getPlayerRsvp(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!playerId) {
                this.logger.error('Cannot get RSVP for empty player ID');
                throw new types_1.InvalidPlayerError('Player ID is required');
            }
            try {
                return yield this.storage.getRsvp(playerId);
            }
            catch (error) {
                this.logger.error(`Failed to get RSVP for player ${playerId}`, error);
                throw error;
            }
        });
    }
    /**
     * Clear all RSVP entries
     */
    clearAllRsvps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.storage.clear();
                this.logger.info('All RSVP entries have been cleared');
            }
            catch (error) {
                this.logger.error('Failed to clear all RSVPs', error);
                throw error;
            }
        });
    }
    /**
     * Delete a player's RSVP
     * @param playerId The ID of the player
     * @returns True if the RSVP was deleted, false if it didn't exist
     */
    deleteRsvp(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!playerId) {
                this.logger.error('Cannot delete RSVP for empty player ID');
                throw new types_1.InvalidPlayerError('Player ID is required');
            }
            try {
                const wasDeleted = yield this.storage.deleteRsvp(playerId);
                if (wasDeleted) {
                    this.logger.info(`RSVP deleted for player ${playerId}`);
                }
                else {
                    this.logger.debug(`No RSVP found to delete for player ${playerId}`);
                }
                return wasDeleted;
            }
            catch (error) {
                this.logger.error(`Failed to delete RSVP for player ${playerId}`, error);
                throw error;
            }
        });
    }
}
exports.RsvpService = RsvpService;
