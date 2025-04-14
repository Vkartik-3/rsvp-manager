// src/demo.ts
import { RsvpService, ConsoleLogger, InMemoryStorage } from './index';

// Create a logger instance
const logger = new ConsoleLogger();

// Create a storage instance (using in-memory for demo)
const storage = new InMemoryStorage();

// Create an RSVP service instance with dependency injection
const rsvpService = new RsvpService(logger, storage);

// Example function to run the demo
async function runDemo() {
  try {
    // Add some example players with RSVPs
    await rsvpService.updateRsvp(
      { id: '1', name: 'John Smith', email: 'john@example.com' },
      'Yes'
    );

    await rsvpService.updateRsvp(
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      'No'
    );

    await rsvpService.updateRsvp(
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
      'Maybe'
    );

    await rsvpService.updateRsvp(
      { id: '4', name: 'Alice Williams', email: 'alice@example.com' },
      'Yes'
    );

    // Get confirmed attendees
    const confirmedAttendees = await rsvpService.getConfirmedAttendees();
    console.log('Confirmed Attendees:');
    confirmedAttendees.forEach(entry => {
      console.log(`- ${entry.player.name} (${entry.player.email})`);
    });

    // Get RSVP counts
    const counts = await rsvpService.countResponses();
    console.log('\nRSVP Counts:');
    console.log(`- Total: ${counts.total}`);
    console.log(`- Confirmed: ${counts.confirmed}`);
    console.log(`- Declined: ${counts.declined}`);
    console.log(`- Maybe: ${counts.maybe}`);

    // Example of deleting an RSVP
    console.log('\nDeleting Bob\'s RSVP...');
    const wasDeleted = await rsvpService.deleteRsvp('3');
    console.log(`Delete operation result: ${wasDeleted ? 'Success' : 'Not found'}`);

    // Get updated counts
    const updatedCounts = await rsvpService.countResponses();
    console.log('\nUpdated RSVP Counts:');
    console.log(`- Total: ${updatedCounts.total}`);
    console.log(`- Confirmed: ${updatedCounts.confirmed}`);
    console.log(`- Declined: ${updatedCounts.declined}`);
    console.log(`- Maybe: ${updatedCounts.maybe}`);

  } catch (error) {
    console.error('Error in demo:', error);
  }
}

// Run the demo
runDemo();