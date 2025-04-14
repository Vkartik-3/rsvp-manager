// src/storage/local-storage.ts
import { RsvpEntry, RsvpStorage, StorageError } from '../types';

/**
 * Browser LocalStorage implementation of the RsvpStorage interface
 */
export class LocalStorageAdapter implements RsvpStorage {
  private readonly storageKey: string;

  constructor(storageKey: string = 'rsvp-entries') {
    this.storageKey = storageKey;
  }

  /**
   * Save an RSVP entry to localStorage
   */
  async saveRsvp(playerId: string, entry: RsvpEntry): Promise<void> {
    try {
      // Get current entries
      const currentEntriesJson = localStorage.getItem(this.storageKey) || '{}';
      const entries = JSON.parse(currentEntriesJson);
      
      // Dates are serialized to strings in JSON, so we need to handle that when reading later
      entries[playerId] = entry;
      
      // Save updated entries
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
    } catch (error) {
      throw new StorageError(`Failed to save RSVP to localStorage for player ${playerId}`, error as Error);
    }
  }

  /**
   * Get an RSVP entry by player ID
   */
  async getRsvp(playerId: string): Promise<RsvpEntry | undefined> {
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
    } catch (error) {
      throw new StorageError(`Failed to get RSVP from localStorage for player ${playerId}`, error as Error);
    }
  }

  /**
   * Get all RSVP entries
   */
  async getAllRsvps(): Promise<RsvpEntry[]> {
    try {
      const entriesJson = localStorage.getItem(this.storageKey) || '{}';
      const entries = JSON.parse(entriesJson);
      
      return Object.values(entries).map((entry: any) => ({
        ...entry,
        updatedAt: new Date(entry.updatedAt)
      }));
    } catch (error) {
      throw new StorageError('Failed to get all RSVPs from localStorage', error as Error);
    }
  }

  /**
   * Delete an RSVP entry
   */
  async deleteRsvp(playerId: string): Promise<boolean> {
    try {
      const entriesJson = localStorage.getItem(this.storageKey) || '{}';
      const entries = JSON.parse(entriesJson);
      
      if (!entries[playerId]) {
        return false;
      }
      
      delete entries[playerId];
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
      
      return true;
    } catch (error) {
      throw new StorageError(`Failed to delete RSVP from localStorage for player ${playerId}`, error as Error);
    }
  }

  /**
   * Clear all RSVP entries
   */
  async clear(): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, '{}');
    } catch (error) {
      throw new StorageError('Failed to clear RSVPs from localStorage', error as Error);
    }
  }
}