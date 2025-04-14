// src/storage/in-memory-storage.ts
import { RsvpEntry, RsvpStorage, StorageError } from '../types';

/**
 * In-memory implementation of the RsvpStorage interface
 */
export class InMemoryStorage implements RsvpStorage {
  private store: Map<string, RsvpEntry> = new Map();

  /**
   * Save an RSVP entry to memory
   */
  async saveRsvp(playerId: string, entry: RsvpEntry): Promise<void> {
    try {
      this.store.set(playerId, entry);
    } catch (error) {
      throw new StorageError(`Failed to save RSVP for player ${playerId}`, error as Error);
    }
  }

  /**
   * Get an RSVP entry by player ID
   */
  async getRsvp(playerId: string): Promise<RsvpEntry | undefined> {
    return this.store.get(playerId);
  }

  /**
   * Get all RSVP entries
   */
  async getAllRsvps(): Promise<RsvpEntry[]> {
    return Array.from(this.store.values());
  }

  /**
   * Delete an RSVP entry
   */
  async deleteRsvp(playerId: string): Promise<boolean> {
    return this.store.delete(playerId);
  }

  /**
   * Clear all RSVP entries
   */
  async clear(): Promise<void> {
    this.store.clear();
  }
}