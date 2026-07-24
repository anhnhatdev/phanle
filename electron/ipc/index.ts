import { registerUtilIpc } from './utilIpc';
import { registerDatabaseIpc } from './databaseIpc';
import { registerLoginIpc } from './loginIpc';
import { registerAccountIpc } from './accountIpc';
import { registerWorkspaceIpc } from './workspaceIpc';

export function registerAllIpcHandlers(): void {
  registerUtilIpc();
  registerDatabaseIpc();
  registerLoginIpc();
  registerAccountIpc();
  registerWorkspaceIpc();
}
