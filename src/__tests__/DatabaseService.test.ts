import { DatabaseService } from '../services/database/DatabaseService';

describe('DatabaseService In-Memory Verification', () => {
  let dbService: DatabaseService;

  beforeEach(() => {
    dbService = DatabaseService.getInstance();
    dbService.initialize(':memory:');
  });

  afterEach(() => {
    dbService.close();
  });

  it('should initialize SQLite tables in memory mode', () => {
    expect(dbService.isInitialized()).toBe(true);
    const db = dbService.getDatabase();
    expect(db).not.toBeNull();

    const tables = db?.prepare(`
      SELECT name FROM sqlite_master WHERE type='table' AND name IN ('accounts', 'messages', 'contacts')
    `).all();

    expect(tables?.length).toBe(3);
  });
});
