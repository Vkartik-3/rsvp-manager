// src/services/rsvp-service.ts
import { 
    Player, 
    RsvpEntry, 
    RsvpStatus, 
    RsvpCounts, 
    Logger, 
    RsvpStorage,
    InvalidPlayerError,
    StorageError
  } from '../types';
  import { InMemoryStorage } from '../storage/in-memory-storage';
  
  export class RsvpService {
    private storage: RsvpStorage;
    private logger: Logger;
  
    /**
     * Create a new RSVP Service
     * @param logger The logger to use
     * @param storage Optional storage implementation (defaults to in-memory)
     */
    constructor(logger: Logger, storage?: RsvpStorage) {
      this.logger = logger;
      this.storage = storage || new InMemoryStorage();
    }
  
    /**
     * Add or update a player's RSVP status
     * @param player The player to update
     * @param status The RSVP status
     * @returns The updated RSVP entry
     */
    public async updateRsvp(player: Player, status: RsvpStatus): Promise<RsvpEntry> {
      if (!player.id) {
        this.logger.error('Cannot update RSVP for player without ID');
        throw new InvalidPlayerError('Player ID is required');
      }
  
      if (!player.name || player.name.trim() === '') {
        this.logger.error('Cannot update RSVP for player without name');
        throw new InvalidPlayerError('Player name is required');
      }
  
      const rsvpEntry: RsvpEntry = {
        player,
        status,
        updatedAt: new Date()
      };
  
      try {
        await this.storage.saveRsvp(player.id, rsvpEntry);
        this.logger.info(`RSVP updated for player ${player.name} (${player.id}): ${status}`);
        return rsvpEntry;
      } catch (error) {
        this.logger.error(`Failed to update RSVP for player ${player.id}`, error as Error);
        throw error;
      }
    }
  
    /**
     * Get a list of all confirmed attendees (status = "Yes")
     * @returns Array of RSVP entries for confirmed attendees
     */
    public async getConfirmedAttendees(): Promise<RsvpEntry[]> {
      try {
        const allEntries = await this.storage.getAllRsvps();
        const confirmedEntries = allEntries.filter(entry => entry.status === 'Yes');
        
        this.logger.debug(`Retrieved ${confirmedEntries.length} confirmed attendees`);
        return confirmedEntries;
      } catch (error) {
        this.logger.error('Failed to get confirmed attendees', error as Error);
        throw error;
      }
    }
  
    /**
     * Count RSVP responses by status
     * @returns An object containing counts for total, confirmed, declined, and maybe responses
     */
    public async countResponses(): Promise<RsvpCounts> {
      try {
        const entries = await this.storage.getAllRsvps();
        
        const counts: RsvpCounts = {
          total: entries.length,
          confirmed: entries.filter(entry => entry.status === 'Yes').length,
          declined: entries.filter(entry => entry.status === 'No').length,
          maybe: entries.filter(entry => entry.status === 'Maybe').length
        };
        
        this.logger.debug(`RSVP counts: ${JSON.stringify(counts)}`);
        return counts;
      } catch (error) {
        this.logger.error('Failed to count responses', error as Error);
        throw error;
      }
    }
  
    /**
     * Get all RSVP entries
     * @returns Array of all RSVP entries
     */
    public async getAllRsvps(): Promise<RsvpEntry[]> {
      try {
        return await this.storage.getAllRsvps();
      } catch (error) {
        this.logger.error('Failed to get all RSVPs', error as Error);
        throw error;
      }
    }
  
    /**
     * Get a specific player's RSVP entry
     * @param playerId The ID of the player
     * @returns The RSVP entry for the player or undefined if not found
     */
    public async getPlayerRsvp(playerId: string): Promise<RsvpEntry | undefined> {
      if (!playerId) {
        this.logger.error('Cannot get RSVP for empty player ID');
        throw new InvalidPlayerError('Player ID is required');
      }
      
      try {
        return await this.storage.getRsvp(playerId);
      } catch (error) {
        this.logger.error(`Failed to get RSVP for player ${playerId}`, error as Error);
        throw error;
      }
    }
  
    /**
     * Clear all RSVP entries
     */
    public async clearAllRsvps(): Promise<void> {
      try {
        await this.storage.clear();
        this.logger.info('All RSVP entries have been cleared');
      } catch (error) {
        this.logger.error('Failed to clear all RSVPs', error as Error);
        throw error;
      }
    }
  
    /**
     * Delete a player's RSVP
     * @param playerId The ID of the player
     * @returns True if the RSVP was deleted, false if it didn't exist
     */
    public async deleteRsvp(playerId: string): Promise<boolean> {
      if (!playerId) {
        this.logger.error('Cannot delete RSVP for empty player ID');
        throw new InvalidPlayerError('Player ID is required');
      }
      
      try {
        const wasDeleted = await this.storage.deleteRsvp(playerId);
        if (wasDeleted) {
          this.logger.info(`RSVP deleted for player ${playerId}`);
        } else {
          this.logger.debug(`No RSVP found to delete for player ${playerId}`);
        }
        return wasDeleted;
      } catch (error) {
        this.logger.error(`Failed to delete RSVP for player ${playerId}`, error as Error);
        throw error;
      }
    }
  }