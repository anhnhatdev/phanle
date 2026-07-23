import { Account, Message, Contact } from '../models';

describe('Data Models Specifications', () => {
  it('should construct a valid Account object', () => {
    const account: Account = {
      id: 'zalo_12345',
      platform: 'zalo',
      name: 'Phanle User',
      status: 'online',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    expect(account.id).toBe('zalo_12345');
    expect(account.platform).toBe('zalo');
  });

  it('should construct a valid Message object', () => {
    const message: Message = {
      id: 'msg_001',
      accountId: 'zalo_12345',
      conversationId: 'conv_999',
      senderId: 'user_1',
      content: 'Xin chào từ Phanle!',
      type: 'text',
      isFromMe: true,
      status: 'sent',
      timestamp: Date.now(),
      createdAt: Date.now(),
    };
    expect(message.content).toBe('Xin chào từ Phanle!');
    expect(message.isFromMe).toBe(true);
  });
});
