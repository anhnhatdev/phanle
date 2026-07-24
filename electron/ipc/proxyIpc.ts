import { ipcMain } from 'electron';
import ProxyManager from '../../src/services/network/ProxyManager';
import { ProxyConfig } from '../../src/models';

export function registerProxyIpc(): void {
  ipcMain.handle('proxy:parse', (_event, proxyStr: string) => {
    return ProxyManager.getInstance().parseProxyString(proxyStr);
  });

  ipcMain.handle('proxy:list', () => {
    return ProxyManager.getInstance().getAllProxies();
  });

  ipcMain.handle('proxy:register', (_event, proxy: ProxyConfig) => {
    ProxyManager.getInstance().registerProxy(proxy);
    return true;
  });

  ipcMain.handle('proxy:remove', (_event, id: string) => {
    return ProxyManager.getInstance().removeProxy(id);
  });
}
