import { registerUtilIpc } from './utilIpc';
import { registerDatabaseIpc } from './databaseIpc';
import { registerLoginIpc } from './loginIpc';
import { registerAccountIpc } from './accountIpc';

export function registerAllIpcHandlers(): void {
  registerUtilIpc();
  registerDatabaseIpc();
  registerLoginIpc();
  registerAccountIpc();
}
