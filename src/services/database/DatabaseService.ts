import BetterSqlite3 from 'better-sqlite3';
import * as path from 'path';

export class DatabaseService {
  private static instance: DatabaseService;
  private db: BetterSqlite3.Database | null = null;
  private initialized = false;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public initialize(dbPath: string): void {
    if (this.initialized) return;

    this.db = new BetterSqlite3(dbPath);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('synchronous = NORMAL');

    this.createTables();
    this.initialized = true;
  }

  private createTables(): void {
    if (!this.db) return;

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        platform TEXT NOT NULL,
        name TEXT NOT NULL,
        avatar TEXT,
        phone TEXT,
        cookie TEXT,
        session_data TEXT,
        proxy_id TEXT,
        status TEXT DEFAULT 'offline',
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        conversation_id TEXT NOT NULL,
        sender_id TEXT NOT NULL,
        content TEXT,
        type TEXT NOT NULL,
        media_url TEXT,
        local_path TEXT,
        is_from_me INTEGER DEFAULT 0,
        status TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        raw_data TEXT,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        platform TEXT NOT NULL,
        name TEXT NOT NULL,
        alias TEXT,
        phone TEXT,
        avatar TEXT,
        gender TEXT,
        birthday TEXT,
        dob INTEGER,
        type TEXT NOT NULL,
        group_id TEXT,
        raw_data TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
  }

  public getDatabase(): BetterSqlite3.Database | null {
    return this.db;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.initialized = false;
    }
  }
}

export default DatabaseService;
