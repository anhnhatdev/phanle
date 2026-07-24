import { Message } from '../../models';
import DatabaseService from '../database/DatabaseService';

export interface ConversationSummary {
  conversationId: string;
  accountId: string;
  lastMessage?: string;
  lastMessageTime?: number;
  unreadCount: number;
}

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  public async saveMessage(msg: Message): Promise<void> {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return;

    db.prepare(`
      INSERT INTO messages (
        id, account_id, conversation_id, sender_id, content, type,
        media_url, local_path, is_from_me, status, timestamp, raw_data, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        status = excluded.status,
        media_url = excluded.media_url,
        local_path = excluded.local_path
    `).run(
      msg.id,
      msg.accountId,
      msg.conversationId,
      msg.senderId,
      msg.content,
      msg.type,
      msg.mediaUrl || null,
      msg.localPath || null,
      msg.isFromMe ? 1 : 0,
      msg.status,
      msg.timestamp,
      msg.rawData || null,
      msg.createdAt
    );
  }

  public getMessages(conversationId: string, limit = 50, offset = 0): Message[] {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return [];

    const rows = db
      .prepare(
        `SELECT * FROM messages WHERE conversation_id = ? ORDER BY timestamp ASC LIMIT ? OFFSET ?`
      )
      .all(conversationId, limit, offset) as any[];

    return rows.map((r) => ({
      id: r.id,
      accountId: r.account_id,
      conversationId: r.conversation_id,
      senderId: r.sender_id,
      content: r.content,
      type: r.type,
      mediaUrl: r.media_url,
      localPath: r.local_path,
      isFromMe: Boolean(r.is_from_me),
      status: r.status,
      timestamp: r.timestamp,
      rawData: r.raw_data,
      createdAt: r.created_at,
    }));
  }

  public getConversations(accountId: string): ConversationSummary[] {
    const db = DatabaseService.getInstance().getDatabase();
    if (!db) return [];

    const rows = db
      .prepare(
        `SELECT conversation_id, account_id, content as last_message, timestamp as last_time
         FROM messages
         WHERE account_id = ?
         GROUP BY conversation_id
         ORDER BY timestamp DESC`
      )
      .all(accountId) as any[];

    return rows.map((r) => ({
      conversationId: r.conversation_id,
      accountId: r.account_id,
      lastMessage: r.last_message,
      lastMessageTime: r.last_time,
      unreadCount: 0,
    }));
  }
}

export default ChatService;
