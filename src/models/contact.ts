import { PlatformType } from './account';

export type ContactType = 'friend' | 'group_member' | 'page' | 'unknown';

export interface Contact {
  id: string;
  accountId: string;
  platform: PlatformType;
  name: string;
  alias?: string;
  phone?: string;
  avatar?: string;
  gender?: string;
  birthday?: string;
  dob?: number;
  type: ContactType;
  groupId?: string;
  rawData?: string;
  createdAt: number;
  updatedAt: number;
}
