import { ipcMain } from 'electron';
import ZaloAuthService from '../../src/services/zalo/ZaloAuthService';

export function registerLoginIpc(): void {
  ipcMain.handle('login:zalo-qr', async (_event, accountId?: string) => {
    return ZaloAuthService.getInstance().generateQRLogin(accountId);
  });

  ipcMain.handle('login:zalo-check', async (_event, sessionId: string) => {
    return ZaloAuthService.getInstance().checkQRLoginStatus(sessionId);
  });
}
