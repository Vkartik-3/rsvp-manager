# 🏟️ Team RSVP Manager

[![TypeScript](https://img.shields.io/badge/language-typescript-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A TypeScript service to manage RSVP responses for team events. Built as part of the **Gametime Hero Coding Challenge**, this project demonstrates clean architecture, modular design, and testable logic using modern TypeScript development practices.

Whether you're organizing a soccer match, hackathon, or team lunch — this service helps track who's attending, who's not, and who's still thinking.

## ✨ Features

- ✅ Add or update player RSVP (Yes/No/Maybe)
- 📋 List confirmed attendees
- 📊 Count RSVP statuses (total, confirmed, declined, maybe)
- 💾 Storage adapters (In-Memory, LocalStorage)
- 🧱 Modular architecture for easy extension
- 🔍 Mockable logger for clean testing
- ⚠️ Custom error classes for better DX
- 🧪 Full test suite with Jest & coverage

## 🧪 Demo Output

> Run with `npm run dev`

```
[RSVP Service] INFO: RSVP updated for player John Smith (1): Yes
[RSVP Service] INFO: RSVP updated for player Jane Doe (2): No
[RSVP Service] INFO: RSVP updated for player Bob Johnson (3): Maybe
[RSVP Service] INFO: RSVP updated for player Alice Williams (4): Yes
[RSVP Service] DEBUG: Retrieved 2 confirmed attendees

Confirmed Attendees:
- John Smith (john@example.com)
- Alice Williams (alice@example.com)

[RSVP Service] DEBUG: RSVP counts: {"total":4,"confirmed":2,"declined":1,"maybe":1}

RSVP Counts:
- Total: 4
- Confirmed: 2
- Declined: 1
- Maybe: 1

Deleting Bob's RSVP...
[RSVP Service] INFO: RSVP deleted for player 3
Delete operation result: Success

[RSVP Service] DEBUG: RSVP counts: {"total":3,"confirmed":2,"declined":1,"maybe":0}

Updated RSVP Counts:
- Total: 3
- Confirmed: 2
- Declined: 1
- Maybe: 0
```

## 🧱 Project Structure

```
rsvp-manager/
├── src/
│   ├── index.ts                 # Main exports
│   ├── demo.ts                  # Console demo output
│   ├── types.ts                 # All TypeScript interfaces & error classes
│   ├── services/
│   │   └── rsvp-service.ts      # Core business logic
│   ├── storage/
│   │   ├── in-memory-storage.ts # Volatile memory store
│   │   └── local-storage.ts     # LocalStorage adapter (browser)
│   ├── logger/
│   │   ├── console-logger.ts    # Standard logger
│   │   └── mock-logger.ts       # Used in unit testing
│   └── utils/
│       └── rsvp-utils.ts        # Pure utility functions
├── tests/
│   ├── rsvp-service.test.ts     # Unit tests for core service
│   └── utils.test.ts            # Utility tests
├── jest.config.js               # Jest configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Scripts & metadata
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Install

```bash
npm install
```

### Run Demo

```bash
npm run dev
```

## 🧪 Testing

Run all tests:

```bash
npm test
```

With coverage report:

```bash
npm run test:coverage
```

Watch mode (live feedback):

```bash
npm run test:watch
```

## 📋 Usage Example

```typescript
import { RsvpService, ConsoleLogger, InMemoryStorage } from './index';

const logger = new ConsoleLogger();
const storage = new InMemoryStorage();
const rsvpService = new RsvpService(logger, storage);

await rsvpService.updateRsvp({ id: '7', name: 'Kartik Dev' }, 'Yes');

const confirmed = await rsvpService.getConfirmedAttendees();
const counts = await rsvpService.countResponses();
```

## 💡 Key Design Principles

| Principle | Applied? | Example |
|-----------|----------|---------|
| ✅ Pure Functions | Yes | filterRsvpsByStatus, sortRsvpsByUpdateTime |
| ✅ TypeScript Interfaces | Yes | Player, RsvpEntry, Logger, Storage |
| ✅ Dependency Injection | Yes | Injected Logger and RsvpStorage |
| ✅ Single Responsibility | Yes | Modular code per concern (service, logger, etc) |
| ✅ Clean Architecture | Yes | Easy to test, scale, extend |
| ✅ Custom Errors | Yes | InvalidPlayerError, StorageError |
| ✅ Full Test Coverage | Yes | All logic covered in Jest |

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run dev` | Build and run the demo |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Show test coverage report |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint for code quality |
| `npm run clean` | Remove build artifacts (/dist) |

## 👤 Author

**Kartik Vadhawana**

## 📄 License

MIT License © 2025 Kartik Vadhawana

## 🙏 Acknowledgments

This project was created as part of the Gametime Hero Coding Challenge.
Thanks to the team for encouraging clean, testable software design!
