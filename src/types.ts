// src/types.ts
export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface Player {
  id: string;
  name: string;
  email?: string;
}

export interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
  updatedAt: Date;
}

export interface RsvpCounts {
  total: number;
  confirmed: number;
  declined: number;
  maybe: number;
}

export interface Logger {
  info(message: string, ...meta: any[]): void;
  error(message: string, error?: Error, ...meta: any[]): void;
  debug(message: string, ...meta: any[]): void;
}

// Storage interface for persistence
export interface RsvpStorage {
  saveRsvp(playerId: string, entry: RsvpEntry): Promise<void>;
  getRsvp(playerId: string): Promise<RsvpEntry | undefined>;
  getAllRsvps(): Promise<RsvpEntry[]>;
  deleteRsvp(playerId: string): Promise<boolean>;
  clear(): Promise<void>;
}

// Custom error classes
export class RsvpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RsvpError';
  }
}

export class InvalidPlayerError extends RsvpError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPlayerError';
  }
}

export class StorageError extends RsvpError {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'StorageError';
  }
}