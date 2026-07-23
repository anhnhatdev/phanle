import { registerUtilIpc } from './utilIpc';
import { registerDatabaseIpc } from './databaseIpc';

export function registerAllIpcHandlers(): void {
  registerUtilIpc();
  registerDatabaseIpc();
}
