export type PlatformType = 'zalo' | 'facebook';
export type AccountStatus = 'online' | 'offline' | 'error' | 'syncing';

export interface Account {
  id: string;
  platform: PlatformType;
  name: string;
  avatar?: string;
  phone?: string;
  cookie?: string;
  sessionData?: string;
  proxyId?: string;
  status: AccountStatus;
  createdAt: number;
  updatedAt: number;
}
