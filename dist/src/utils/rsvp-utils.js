"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPlayers = exports.sortRsvpsByUpdateTime = exports.filterRsvpsByStatus = void 0;
/**
 * Pure function to filter RSVP entries by status
 * @param entries Array of RSVP entries
 * @param status Status to filter by
 * @returns Filtered array of RSVP entries
 */
const filterRsvpsByStatus = (entries, status) => {
    return entries.filter(entry => entry.status === status);
};
exports.filterRsvpsByStatus = filterRsvpsByStatus;
/**
 * Pure function to sort RSVP entries by update time
 * @param entries Array of RSVP entries
 * @param ascending Sort in ascending order if true, descending if false
 * @returns Sorted array of RSVP entries
 */
const sortRsvpsByUpdateTime = (entries, ascending = true) => {
    return [...entries].sort((a, b) => {
        const comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
        return ascending ? comparison : -comparison;
    });
};
exports.sortRsvpsByUpdateTime = sortRsvpsByUpdateTime;
/**
 * Pure function to extract player information from RSVP entries
 * @param entries Array of RSVP entries
 * @returns Array of players
 */
const extractPlayers = (entries) => {
    return entries.map(entry => entry.player);
};
exports.extractPlayers = extractPlayers;
