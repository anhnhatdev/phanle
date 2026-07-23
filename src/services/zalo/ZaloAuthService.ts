import { Account } from '../../models';
import DatabaseService from '../database/DatabaseService';

export interface QRLoginSession {
  sessionId: string;
  qrCodeUrl: string;
  expiresAt: number;
}

export class ZaloAuthService {
  private static instance: ZaloAuthService;
  private activeSessions: Map<string, QRLoginSession> = new Map();

  private constructor() {}

  public static getInstance(): ZaloAuthService {
    if (!ZaloAuthService.instance) {
      ZaloAuthService.instance = new ZaloAuthService();
    }
    return ZaloAuthService.instance;
  }

  public async generateQRLogin(accountId?: string): Promise<QRLoginSession> {
    const sessionId = accountId || `session_${Date.now()}`;
    const session: QRLoginSession = {
      sessionId,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(sessionId)}`,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
    this.activeSessions.set(sessionId, session);
    return session;
  }

  public async checkQRLoginStatus(sessionId: string): Promise<{ success: boolean; account?: Account }> {
    const session = this.activeSessions.get(sessionId);
    if (!session || Date.now() > session.expiresAt) {
      return { success: false };
    }
    return { success: false };
  }

  public async saveAccountSession(account: Account): Promise<void> {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return;

    db.prepare(`
      INSERT INTO accounts (id, platform, name, avatar, phone, cookie, session_data, proxy_id, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        avatar = excluded.avatar,
        phone = excluded.phone,
        cookie = excluded.cookie,
        session_data = excluded.session_data,
        proxy_id = excluded.proxy_id,
        status = excluded.status,
        updated_at = excluded.updated_at
    `).run(
      account.id,
      account.platform,
      account.name,
      account.avatar || null,
      account.phone || null,
      account.cookie || null,
      account.sessionData || null,
      account.proxyId || null,
      account.status,
      account.createdAt,
      account.updatedAt
    );
  }
}

export default ZaloAuthService;
