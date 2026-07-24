import { ChatService } from '../services/chat/ChatService';
import { DatabaseService } from '../services/database/DatabaseService';
import { Message } from '../models';

describe('ChatService Unit Specifications', () => {
  let chatService: ChatService;
  let dbService: DatabaseService;

  beforeEach(() => {
    dbService = DatabaseService.getInstance();
    dbService.initialize(':memory:');
    chatService = ChatService.getInstance();
  });

  afterEach(() => {
    dbService.close();
  });

  it('should save and retrieve conversation messages', async () => {
    const msg: Message = {
      id: 'msg_101',
      accountId: 'zalo_acc_1',
      conversationId: 'conv_group_1',
      senderId: 'user_sender_1',
      content: 'Chào buổi sáng!',
      type: 'text',
      isFromMe: false,
      status: 'delivered',
      timestamp: Date.now(),
      createdAt: Date.now(),
    };

    await chatService.saveMessage(msg);

    const messages = chatService.getMessages('conv_group_1');
    expect(messages.length).toBe(1);
    expect(messages[0].content).toBe('Chào buổi sáng!');
    expect(messages[0].isFromMe).toBe(false);
  });

  it('should query active conversation summaries for an account', async () => {
    const msg1: Message = {
      id: 'msg_201',
      accountId: 'zalo_acc_1',
      conversationId: 'conv_a',
      senderId: 'user_sender_1',
      content: 'Tin nhắn hội thoại A',
      type: 'text',
      isFromMe: true,
      status: 'sent',
      timestamp: 1000,
      createdAt: 1000,
    };

    const msg2: Message = {
      id: 'msg_202',
      accountId: 'zalo_acc_1',
      conversationId: 'conv_b',
      senderId: 'user_sender_2',
      content: 'Tin nhắn hội thoại B',
      type: 'text',
      isFromMe: false,
      status: 'delivered',
      timestamp: 2000,
      createdAt: 2000,
    };

    await chatService.saveMessage(msg1);
    await chatService.saveMessage(msg2);

    const convs = chatService.getConversations('zalo_acc_1');
    expect(convs.length).toBe(2);
  });
});
