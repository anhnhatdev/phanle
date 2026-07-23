import { registerUtilIpc } from './utilIpc';
import { registerDatabaseIpc } from './databaseIpc';
import { registerLoginIpc } from './loginIpc';

export function registerAllIpcHandlers(): void {
  registerUtilIpc();
  registerDatabaseIpc();
  registerLoginIpc();
}
