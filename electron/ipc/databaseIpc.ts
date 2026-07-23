import { ipcMain } from 'electron';
import DatabaseService from '../../src/services/database/DatabaseService';

export function registerDatabaseIpc(): void {
  ipcMain.handle('db:query', (_event, sql: string, params: any[] = []) => {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) throw new Error('Database is not initialized');
    return db.prepare(sql).all(...params);
  });

  ipcMain.handle('db:execute', (_event, sql: string, params: any[] = []) => {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) throw new Error('Database is not initialized');
    return db.prepare(sql).run(...params);
  });
}
