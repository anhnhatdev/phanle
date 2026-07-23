import { ipcMain, app } from 'electron';

export function registerUtilIpc(): void {
  ipcMain.handle('app:get-version', () => {
    return app.getVersion();
  });

  ipcMain.handle('app:get-path', (_event, name: any) => {
    return app.getPath(name);
  });
}
