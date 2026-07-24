import { ipcMain, app, dialog } from 'electron';
import WorkspaceManager from '../../src/services/workspace/WorkspaceManager';
import DatabaseService from '../../src/services/database/DatabaseService';

export function registerWorkspaceIpc(): void {
  ipcMain.handle('workspace:get-path', () => {
    return WorkspaceManager.getInstance().getCurrentWorkspace();
  });

  ipcMain.handle('workspace:choose', async (event) => {
    const win = require('electron').BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(win!, {
      title: 'Chọn thư mục lưu trữ dữ liệu',
      properties: ['openDirectory', 'createDirectory'],
    });

    if (result.canceled || !result.filePaths[0]) return null;

    const chosenPath = result.filePaths[0];
    WorkspaceManager.getInstance().setWorkspacePath(chosenPath);

    // Re-initialize DB at new location
    DatabaseService.getInstance().close();
    DatabaseService.getInstance().initialize(WorkspaceManager.getInstance().getDbPath());

    return chosenPath;
  });

  ipcMain.handle('workspace:reset', () => {
    WorkspaceManager.getInstance().resetToDefault();
    DatabaseService.getInstance().close();
    DatabaseService.getInstance().initialize(
      WorkspaceManager.getInstance(app.getPath('userData')).getDbPath()
    );
  });
}
