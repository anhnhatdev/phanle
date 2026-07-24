import { ipcMain } from 'electron';
import DatabaseService from '../../src/services/database/DatabaseService';
import { Account } from '../../src/models';

export function registerAccountIpc(): void {
  ipcMain.handle('account:list', () => {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return [];
    const rows = db.prepare('SELECT * FROM accounts ORDER BY created_at ASC').all() as any[];
    return rows.map((r) => ({
      id: r.id,
      platform: r.platform,
      name: r.name,
      avatar: r.avatar,
      phone: r.phone,
      cookie: r.cookie,
      sessionData: r.session_data,
      proxyId: r.proxy_id,
      status: r.status,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    } as Account));
  });

  ipcMain.handle('account:remove', (_event, id: string) => {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return;
    db.prepare('DELETE FROM accounts WHERE id = ?').run(id);
  });

  ipcMain.handle('account:update-status', (_event, id: string, status: string) => {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return;
    db.prepare('UPDATE accounts SET status = ?, updated_at = ? WHERE id = ?').run(
      status,
      Date.now(),
      id
    );
  });
}
