import { DatabaseService } from '../services/database/DatabaseService';
import { Account } from '../models';

describe('Account IPC Data Layer', () => {
  let db: DatabaseService;

  beforeEach(() => {
    db = DatabaseService.getInstance();
    db.initialize(':memory:');
  });

  afterEach(() => {
    db.close();
  });

  const seedAccount = (): Account => {
    const account: Account = {
      id: 'acc_test_01',
      platform: 'zalo',
      name: 'Test Account',
      status: 'online',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.getDatabase()!.prepare(`
      INSERT INTO accounts (id, platform, name, avatar, phone, cookie, session_data, proxy_id, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(account.id, account.platform, account.name, null, null, null, null, null, account.status, account.createdAt, account.updatedAt);
    return account;
  };

  it('should list all accounts from database', () => {
    seedAccount();
    const rows = db.getDatabase()!.prepare('SELECT * FROM accounts').all();
    expect(rows.length).toBe(1);
  });

  it('should delete an account by id', () => {
    seedAccount();
    db.getDatabase()!.prepare('DELETE FROM accounts WHERE id = ?').run('acc_test_01');
    const rows = db.getDatabase()!.prepare('SELECT * FROM accounts').all();
    expect(rows.length).toBe(0);
  });

  it('should update account status', () => {
    seedAccount();
    db.getDatabase()!.prepare('UPDATE accounts SET status = ? WHERE id = ?').run('offline', 'acc_test_01');
    const row = db.getDatabase()!.prepare('SELECT status FROM accounts WHERE id = ?').get('acc_test_01') as any;
    expect(row.status).toBe('offline');
  });
});
