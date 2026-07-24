import { ProxyManager } from '../services/network/ProxyManager';
import { ProxyConfig } from '../models';

describe('ProxyManager Unit Specifications', () => {
  let manager: ProxyManager;

  beforeEach(() => {
    (ProxyManager as any).instance = undefined;
    manager = ProxyManager.getInstance();
  });

  it('should parse host:port format correctly', () => {
    const parsed = manager.parseProxyString('192.168.1.100:8080');
    expect(parsed).toEqual({
      protocol: 'http',
      host: '192.168.1.100',
      port: 8080,
    });
  });

  it('should parse host:port:user:pass format correctly', () => {
    const parsed = manager.parseProxyString('10.0.0.1:3128:admin:secret123');
    expect(parsed).toEqual({
      protocol: 'http',
      host: '10.0.0.1',
      port: 3128,
      username: 'admin',
      password: 'secret123',
    });
  });

  it('should parse protocol URL format correctly', () => {
    const parsed = manager.parseProxyString('socks5://user:pass@proxy.example.com:1080');
    expect(parsed).toEqual({
      protocol: 'socks5',
      host: 'proxy.example.com',
      port: 1080,
      username: 'user',
      password: 'pass',
    });
  });

  it('should format proxy URL correctly', () => {
    const config: ProxyConfig = {
      id: 'proxy_1',
      protocol: 'http',
      host: '1.2.3.4',
      port: 8080,
      username: 'usr',
      password: 'pwd',
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const formatted = manager.formatProxyUrl(config);
    expect(formatted).toBe('http://usr:pwd@1.2.3.4:8080');
  });

  it('should register, retrieve and remove proxies', () => {
    const proxy: ProxyConfig = {
      id: 'px_001',
      protocol: 'http',
      host: '127.0.0.1',
      port: 8888,
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    manager.registerProxy(proxy);
    expect(manager.getProxy('px_001')).toBeDefined();
    expect(manager.getAllProxies().length).toBe(1);

    const removed = manager.removeProxy('px_001');
    expect(removed).toBe(true);
    expect(manager.getAllProxies().length).toBe(0);
  });
});
