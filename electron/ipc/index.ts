import { registerUtilIpc } from './utilIpc';
import { registerDatabaseIpc } from './databaseIpc';
import { registerLoginIpc } from './loginIpc';
import { registerAccountIpc } from './accountIpc';
import { registerWorkspaceIpc } from './workspaceIpc';
import { registerProxyIpc } from './proxyIpc';
import { registerChatIpc } from './chatIpc';

export function registerAllIpcHandlers(): void {
  registerUtilIpc();
  registerDatabaseIpc();
  registerLoginIpc();
  registerAccountIpc();
  registerWorkspaceIpc();
  registerProxyIpc();
  registerChatIpc();
}
