// tests/rsvp-service.test.ts
import { 
    RsvpService, 
    InMemoryStorage, 
    MockLogger, 
    InvalidPlayerError 
  } from '../src';
  
  describe('RsvpService', () => {
    let rsvpService: RsvpService;
    let mockLogger: MockLogger;
    let storage: InMemoryStorage;
  
    beforeEach(() => {
      mockLogger = new MockLogger();
      storage = new InMemoryStorage();
      rsvpService = new RsvpService(mockLogger, storage);
    });
  
    test('should add a new RSVP entry', async () => {
      const player = { id: '1', name: 'Test Player' };
      const status = 'Yes';
      
      const entry = await rsvpService.updateRsvp(player, status);
      
      expect(entry.player).toEqual(player);
      expect(entry.status).toBe(status);
      expect(entry.updatedAt).toBeInstanceOf(Date);
      
      // Verify it was saved to storage
      const storedEntry = await storage.getRsvp('1');
      expect(storedEntry).toEqual(entry);
      
      // Verify it was logged
      expect(mockLogger.hasLoggedMessage('RSVP updated for player Test Player')).toBe(true);
    });
  
    test('should update an existing RSVP entry', async () => {
      const player = { id: '1', name: 'Test Player' };
      
      // First set to Yes
      await rsvpService.updateRsvp(player, 'Yes');
      
      // Then update to No
      const updatedEntry = await rsvpService.updateRsvp(player, 'No');
      
      expect(updatedEntry.status).toBe('No');
      
      // Verify it was saved to storage
      const storedEntry = await storage.getRsvp('1');
      expect(storedEntry?.status).toBe('No');
    });
  
    test('should throw error for player without ID', async () => {
      const player = { id: '', name: 'Test Player' };
      
      await expect(rsvpService.updateRsvp(player, 'Yes'))
        .rejects
        .toThrow(InvalidPlayerError);
      
      expect(mockLogger.hasLoggedMessage('Cannot update RSVP for player without ID')).toBe(true);
    });
  
    test('should throw error for player without name', async () => {
      const player = { id: '1', name: '' };
      
      await expect(rsvpService.updateRsvp(player, 'Yes'))
        .rejects
        .toThrow(InvalidPlayerError);
      
      expect(mockLogger.hasLoggedMessage('Cannot update RSVP for player without name')).toBe(true);
    });
  
    test('should get confirmed attendees', async () => {
      // Add some test data
      await rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
      await rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
      await rsvpService.updateRsvp({ id: '3', name: 'Player3' }, 'Yes');
      await rsvpService.updateRsvp({ id: '4', name: 'Player4' }, 'Maybe');
      
      const confirmedAttendees = await rsvpService.getConfirmedAttendees();
      
      expect(confirmedAttendees.length).toBe(2);
      expect(confirmedAttendees.map(entry => entry.player.name)).toContain('Player1');
      expect(confirmedAttendees.map(entry => entry.player.name)).toContain('Player3');
      expect(confirmedAttendees.every(entry => entry.status === 'Yes')).toBe(true);
      
      expect(mockLogger.hasLoggedMessage('Retrieved 2 confirmed attendees')).toBe(true);
    });
  
    test('should count responses correctly', async () => {
      // Add some test data
      await rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
      await rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
      await rsvpService.updateRsvp({ id: '3', name: 'Player3' }, 'Yes');
      await rsvpService.updateRsvp({ id: '4', name: 'Player4' }, 'Maybe');
      
      const counts = await rsvpService.countResponses();
      
      expect(counts.total).toBe(4);
      expect(counts.confirmed).toBe(2);
      expect(counts.declined).toBe(1);
      expect(counts.maybe).toBe(1);
    });
  
    test('should clear all RSVPs', async () => {
      // Add some test data
      await rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
      await rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
      
      await rsvpService.clearAllRsvps();
      
      const allRsvps = await rsvpService.getAllRsvps();
      expect(allRsvps.length).toBe(0);
      
      expect(mockLogger.hasLoggedMessage('All RSVP entries have been cleared')).toBe(true);
    });
  
    test('should delete a specific RSVP', async () => {
      // Add some test data
      await rsvpService.updateRsvp({ id: '1', name: 'Player1' }, 'Yes');
      await rsvpService.updateRsvp({ id: '2', name: 'Player2' }, 'No');
      
      const result = await rsvpService.deleteRsvp('1');
      expect(result).toBe(true);
      
      const allRsvps = await rsvpService.getAllRsvps();
      expect(allRsvps.length).toBe(1);
      expect(allRsvps[0].player.id).toBe('2');
      
      // Attempting to delete a non-existent RSVP should return false
      const notFoundResult = await rsvpService.deleteRsvp('999');
      expect(notFoundResult).toBe(false);
    });
  
    test('should throw error when getting RSVP with empty player ID', async () => {
      await expect(rsvpService.getPlayerRsvp(''))
        .rejects
        .toThrow(InvalidPlayerError);
      
      expect(mockLogger.hasLoggedMessage('Cannot get RSVP for empty player ID')).toBe(true);
    });
  
    test('should throw error when deleting RSVP with empty player ID', async () => {
      await expect(rsvpService.deleteRsvp(''))
        .rejects
        .toThrow(InvalidPlayerError);
      
      expect(mockLogger.hasLoggedMessage('Cannot delete RSVP for empty player ID')).toBe(true);
    });
  });