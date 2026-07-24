export type ProxyProtocol = 'http' | 'https' | 'socks4' | 'socks5';
export type ProxyStatus = 'active' | 'inactive' | 'error' | 'testing';

export interface ProxyConfig {
  id: string;
  name?: string;
  protocol: ProxyProtocol;
  host: string;
  port: number;
  username?: string;
  password?: string;
  status: ProxyStatus;
  lastCheckedAt?: number;
  responseTimeMs?: number;
  createdAt: number;
  updatedAt: number;
}
