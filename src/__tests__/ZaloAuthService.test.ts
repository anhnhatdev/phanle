import { ZaloAuthService } from '../services/zalo/ZaloAuthService';
import { DatabaseService } from '../services/database/DatabaseService';
import { Account } from '../models';

describe('ZaloAuthService Unit Specifications', () => {
  let authService: ZaloAuthService;
  let dbService: DatabaseService;

  beforeEach(() => {
    dbService = DatabaseService.getInstance();
    dbService.initialize(':memory:');
    authService = ZaloAuthService.getInstance();
  });

  afterEach(() => {
    dbService.close();
  });

  it('should generate QR login session with expiration timestamp', async () => {
    const session = await authService.generateQRLogin('test_user');
    expect(session.sessionId).toBe('test_user');
    expect(session.qrCodeUrl).toContain('test_user');
    expect(session.expiresAt).toBeGreaterThan(Date.now());
  });

  it('should save account session into database', async () => {
    const account: Account = {
      id: 'zalo_999',
      platform: 'zalo',
      name: 'Nguyen Van A',
      status: 'online',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await authService.saveAccountSession(account);

    const db = dbService.getDatabase();
    const row = db?.prepare('SELECT * FROM accounts WHERE id = ?').get('zalo_999') as any;
    expect(row).toBeDefined();
    expect(row.name).toBe('Nguyen Van A');
  });
});
