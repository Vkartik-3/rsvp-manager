// src/utils/rsvp-utils.ts
import { RsvpEntry, Player, RsvpStatus } from '../types';

/**
 * Pure function to filter RSVP entries by status
 * @param entries Array of RSVP entries
 * @param status Status to filter by
 * @returns Filtered array of RSVP entries
 */
export const filterRsvpsByStatus = (
  entries: RsvpEntry[], 
  status: RsvpStatus
): RsvpEntry[] => {
  return entries.filter(entry => entry.status === status);
};

/**
 * Pure function to sort RSVP entries by update time
 * @param entries Array of RSVP entries
 * @param ascending Sort in ascending order if true, descending if false
 * @returns Sorted array of RSVP entries
 */
export const sortRsvpsByUpdateTime = (
  entries: RsvpEntry[], 
  ascending: boolean = true
): RsvpEntry[] => {
  return [...entries].sort((a, b) => {
    const comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
    return ascending ? comparison : -comparison;
  });
};

/**
 * Pure function to extract player information from RSVP entries
 * @param entries Array of RSVP entries
 * @returns Array of players
 */
export const extractPlayers = (entries: RsvpEntry[]): Player[] => {
  return entries.map(entry => entry.player);
};