export interface CRMTag {
  id: string;
  accountId?: string;
  name: string;
  color: string;
  zaloTagId?: string;
  createdAt: number;
}

export interface CRMNote {
  id: string;
  contactId: string;
  accountId?: string;
  content: string;
  createdBy?: string;
  createdAt: number;
  updatedAt: number;
}

export type CampaignStatus = 'draft' | 'running' | 'paused' | 'completed' | 'failed';
export type CampaignType = 'message' | 'friend_request' | 'group_invite';

export interface CRMCampaign {
  id: string;
  accountId?: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  config: string;
  total: number;
  sent: number;
  failed: number;
  createdAt: number;
  updatedAt: number;
}
