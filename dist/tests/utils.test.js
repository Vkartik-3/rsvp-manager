"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tests/utils.test.ts
const rsvp_utils_1 = require("../src/utils/rsvp-utils");
describe('RSVP Utilities', () => {
    const testPlayers = [
        { id: '1', name: 'Player1' },
        { id: '2', name: 'Player2' },
        { id: '3', name: 'Player3' },
        { id: '4', name: 'Player4' }
    ];
    const testEntries = [
        { player: testPlayers[0], status: 'Yes', updatedAt: new Date('2023-01-01') },
        { player: testPlayers[1], status: 'No', updatedAt: new Date('2023-01-02') },
        { player: testPlayers[2], status: 'Yes', updatedAt: new Date('2023-01-03') },
        { player: testPlayers[3], status: 'Maybe', updatedAt: new Date('2023-01-04') }
    ];
    test('filterRsvpsByStatus should filter entries correctly', () => {
        const yesEntries = (0, rsvp_utils_1.filterRsvpsByStatus)(testEntries, 'Yes');
        expect(yesEntries.length).toBe(2);
        expect(yesEntries[0].player.id).toBe('1');
        expect(yesEntries[1].player.id).toBe('3');
        const noEntries = (0, rsvp_utils_1.filterRsvpsByStatus)(testEntries, 'No');
        expect(noEntries.length).toBe(1);
        expect(noEntries[0].player.id).toBe('2');
        const maybeEntries = (0, rsvp_utils_1.filterRsvpsByStatus)(testEntries, 'Maybe');
        expect(maybeEntries.length).toBe(1);
        expect(maybeEntries[0].player.id).toBe('4');
    });
    test('sortRsvpsByUpdateTime should sort entries correctly', () => {
        // Ascending order (oldest first)
        const ascendingEntries = (0, rsvp_utils_1.sortRsvpsByUpdateTime)(testEntries, true);
        expect(ascendingEntries[0].player.id).toBe('1');
        expect(ascendingEntries[3].player.id).toBe('4');
        // Descending order (newest first)
        const descendingEntries = (0, rsvp_utils_1.sortRsvpsByUpdateTime)(testEntries, false);
        expect(descendingEntries[0].player.id).toBe('4');
        expect(descendingEntries[3].player.id).toBe('1');
    });
    test('extractPlayers should extract player information', () => {
        const players = (0, rsvp_utils_1.extractPlayers)(testEntries);
        expect(players.length).toBe(4);
        expect(players[0].id).toBe('1');
        expect(players[1].id).toBe('2');
        expect(players[2].id).toBe('3');
        expect(players[3].id).toBe('4');
    });
});
