// src/lib/db.js
import { drizzle } from 'drizzle-orm/sqlite-core';
import { sqlite } from 'sqlite3';

// Initialize SQLite connection
const dbConnection = new sqlite.Database('./path-to-your-database.db');  // Adjust path as necessary

// Create a drizzle instance for interacting with the database
export const db = drizzle(dbConnection);
