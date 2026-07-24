import { ProxyConfig, ProxyStatus } from '../../models';

export class ProxyManager {
  private static instance: ProxyManager;
  private proxies: Map<string, ProxyConfig> = new Map();

  private constructor() {}

  public static getInstance(): ProxyManager {
    if (!ProxyManager.instance) {
      ProxyManager.instance = new ProxyManager();
    }
    return ProxyManager.instance;
  }

  public formatProxyUrl(config: ProxyConfig): string {
    const auth = config.username && config.password ? `${config.username}:${config.password}@` : '';
    return `${config.protocol}://${auth}${config.host}:${config.port}`;
  }

  public parseProxyString(proxyStr: string): Partial<ProxyConfig> | null {
    try {
      // Format: host:port or host:port:user:pass or protocol://user:pass@host:port
      if (proxyStr.includes('://')) {
        const url = new URL(proxyStr);
        return {
          protocol: (url.protocol.replace(':', '') as any) || 'http',
          host: url.hostname,
          port: parseInt(url.port, 10),
          username: url.username || undefined,
          password: url.password || undefined,
        };
      }

      const parts = proxyStr.trim().split(':');
      if (parts.length === 2) {
        return { protocol: 'http', host: parts[0], port: parseInt(parts[1], 10) };
      }
      if (parts.length === 4) {
        return {
          protocol: 'http',
          host: parts[0],
          port: parseInt(parts[1], 10),
          username: parts[2],
          password: parts[3],
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  public registerProxy(proxy: ProxyConfig): void {
    this.proxies.set(proxy.id, proxy);
  }

  public getProxy(id: string): ProxyConfig | undefined {
    return this.proxies.get(id);
  }

  public getAllProxies(): ProxyConfig[] {
    return Array.from(this.proxies.values());
  }

  public removeProxy(id: string): boolean {
    return this.proxies.delete(id);
  }
}

export default ProxyManager;
