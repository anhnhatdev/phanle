export type MessageType = 'text' | 'image' | 'video' | 'file' | 'sticker' | 'system';
export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: string;
  accountId: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageType;
  mediaUrl?: string;
  localPath?: string;
  isFromMe: boolean;
  status: MessageStatus;
  timestamp: number;
  rawData?: string;
  createdAt: number;
}

export interface MessageDraft {
  conversationId: string;
  content: string;
  type: MessageType;
  attachments?: string[];
}
