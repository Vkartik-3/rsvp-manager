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
// tests/rsvp-service.test.ts
const src_1 = require("../src");
describe('RsvpService', () => {
    let rsvpService;
    let mockLogger;
    let storage;
    beforeEach(() => {
        mockLogger = new src_1.MockLogger();
        storage = new src_1.InMemoryStorage();
        rsvpService = new src_1.RsvpService(mockLogger, storage);
    });
    test('should add a new RSVP entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const player = { id: '1', name: 'Test Player' };
        const status = 'Yes';
        const entry = yield rsvpService.updateRsvp(player, status);
        expect(entry.player).toEqual(player);
        expect(entry.status).toBe(status);
        expect(entry.updatedAt).toBeInstanceOf(Date);
        // Verify it was saved to storage
        const storedEntry = yield storage.getRsvp('1');
        expect(storedEntry).toEqual(entry);
        // Verify it was logged
        expect(mockLogger.hasLoggedMessage('RSVP updated for player Test Player')).toBe(true);
    }));
    test('should update an existing RSVP entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const player = { id: '1', name: 'Test Player' };
        // First set to Yes
        yield rsvpService.updateRsvp(player, 'Yes');
        // Then update to No
        const updatedEntry = yield rsvpService.updateRsvp(player, 'No');
        expect(updatedEntry.status).toBe('No');
        // Verify it was saved to storage
        const storedEntry = yield storage.getRsvp('1');
        expect(storedEntry === null || storedEntry === void 0 ? void 0 : storedEntry.status).toBe('No');
    }));
    test('should throw error for player without ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const player = { id: '', name: 'Test Player' };
        yield expect(rsvpService.updateRsvp(player, 'Yes'))
            .rejects
            .toThrow(src_1.InvalidPlayerError);
        expect(mockLogger.hasLoggedMessage('Cannot update RSVP for player without ID')).toBe(true);
    }));
    test('should throw error for player without name', () => __awaiter(void 0, void 0, void 0, function* () {
        const player = { id: '1', name: '' };
        yield expect(rsvpService.updateRsvp(player, 'Yes'))
            .rejects
            .toThrow(src_1.InvalidPlayerError);
        expect(mockLogger.hasLoggedMessage('Cannot update RSVP for player without name')).toBe(true);
    }));
    test('should get confirmed attendees', () => __awaiter(void 0, void 0, void 0, function* () {
        // Add some test data
        yield rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
        yield rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
        yield rsvpService.updateRsvp({ id: '3', name: 'Player3' }, 'Yes');
        yield rsvpService.updateRsvp({ id: '4', name: 'Player4' }, 'Maybe');
        const confirmedAttendees = yield rsvpService.getConfirmedAttendees();
        expect(confirmedAttendees.length).toBe(2);
        expect(confirmedAttendees.map(entry => entry.player.name)).toContain('Player1');
        expect(confirmedAttendees.map(entry => entry.player.name)).toContain('Player3');
        expect(confirmedAttendees.every(entry => entry.status === 'Yes')).toBe(true);
        expect(mockLogger.hasLoggedMessage('Retrieved 2 confirmed attendees')).toBe(true);
    }));
    test('should count responses correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // Add some test data
        yield rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
        yield rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
        yield rsvpService.updateRsvp({ id: '3', name: 'Player3' }, 'Yes');
        yield rsvpService.updateRsvp({ id: '4', name: 'Player4' }, 'Maybe');
        const counts = yield rsvpService.countResponses();
        expect(counts.total).toBe(4);
        expect(counts.confirmed).toBe(2);
        expect(counts.declined).toBe(1);
        expect(counts.maybe).toBe(1);
    }));
    test('should clear all RSVPs', () => __awaiter(void 0, void 0, void 0, function* () {
        // Add some test data
        yield rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
        yield rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
        yield rsvpService.clearAllRsvps();
        const allRsvps = yield rsvpService.getAllRsvps();
        expect(allRsvps.length).toBe(0);
        expect(mockLogger.hasLoggedMessage('All RSVP entries have been cleared')).toBe(true);
    }));
    test('should delete a specific RSVP', () => __awaiter(void 0, void 0, void 0, function* () {
        // Add some test data
        yield rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
        yield rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
        const result = yield rsvpService.deleteRsvp('1');
        expect(result).toBe(true);
        const allRsvps = yield rsvpService.getAllRsvps();
        expect(allRsvps.length).toBe(1);
        expect(allRsvps[0].player.id).toBe('2');
        // Attempting to delete a non-existent RSVP should return false
        const notFoundResult = yield rsvpService.deleteRsvp('999');
        expect(notFoundResult).toBe(false);
    }));
    test('should throw error when getting RSVP with empty player ID', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(rsvpService.getPlayerRsvp(''))
            .rejects
            .toThrow(src_1.InvalidPlayerError);
        expect(mockLogger.hasLoggedMessage('Cannot get RSVP for empty player ID')).toBe(true);
    }));
    test('should throw error when deleting RSVP with empty player ID', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(rsvpService.deleteRsvp(''))
            .rejects
            .toThrow(src_1.InvalidPlayerError);
        expect(mockLogger.hasLoggedMessage('Cannot delete RSVP for empty player ID')).toBe(true);
    }));
});
