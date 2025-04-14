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
// src/demo.ts
const index_1 = require("./index");
// Create a logger instance
const logger = new index_1.ConsoleLogger();
// Create a storage instance (using in-memory for demo)
const storage = new index_1.InMemoryStorage();
// Create an RSVP service instance with dependency injection
const rsvpService = new index_1.RsvpService(logger, storage);
// Example function to run the demo
function runDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Add some example players with RSVPs
            yield rsvpService.updateRsvp({ id: '1', name: 'John Smith', email: 'john@example.com' }, 'Yes');
            yield rsvpService.updateRsvp({ id: '2', name: 'Jane Doe', email: 'jane@example.com' }, 'No');
            yield rsvpService.updateRsvp({ id: '3', name: 'Bob Johnson', email: 'bob@example.com' }, 'Maybe');
            yield rsvpService.updateRsvp({ id: '4', name: 'Alice Williams', email: 'alice@example.com' }, 'Yes');
            // Get confirmed attendees
            const confirmedAttendees = yield rsvpService.getConfirmedAttendees();
            console.log('Confirmed Attendees:');
            confirmedAttendees.forEach(entry => {
                console.log(`- ${entry.player.name} (${entry.player.email})`);
            });
            // Get RSVP counts
            const counts = yield rsvpService.countResponses();
            console.log('\nRSVP Counts:');
            console.log(`- Total: ${counts.total}`);
            console.log(`- Confirmed: ${counts.confirmed}`);
            console.log(`- Declined: ${counts.declined}`);
            console.log(`- Maybe: ${counts.maybe}`);
            // Example of deleting an RSVP
            console.log('\nDeleting Bob\'s RSVP...');
            const wasDeleted = yield rsvpService.deleteRsvp('3');
            console.log(`Delete operation result: ${wasDeleted ? 'Success' : 'Not found'}`);
            // Get updated counts
            const updatedCounts = yield rsvpService.countResponses();
            console.log('\nUpdated RSVP Counts:');
            console.log(`- Total: ${updatedCounts.total}`);
            console.log(`- Confirmed: ${updatedCounts.confirmed}`);
            console.log(`- Declined: ${updatedCounts.declined}`);
            console.log(`- Maybe: ${updatedCounts.maybe}`);
        }
        catch (error) {
            console.error('Error in demo:', error);
        }
    });
}
// Run the demo
runDemo();
