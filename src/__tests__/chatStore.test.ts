import { useChatStore } from '../ui/stores/chatStore';
import { Message } from '../models';

describe('ChatStore Specifications', () => {
  beforeEach(() => {
    useChatStore.setState({
      conversations: [],
      activeConversationId: null,
      messages: [],
    });
  });

  it('should update active conversation ID', () => {
    useChatStore.getState().setActiveConversation('conv_001');
    expect(useChatStore.getState().activeConversationId).toBe('conv_001');
  });

  it('should append new messages to thread', () => {
    const msg: Message = {
      id: 'm1',
      accountId: 'acc1',
      conversationId: 'conv_001',
      senderId: 'user1',
      content: 'Hello World',
      type: 'text',
      isFromMe: true,
      status: 'sent',
      timestamp: Date.now(),
      createdAt: Date.now(),
    };

    useChatStore.getState().addMessage(msg);
    expect(useChatStore.getState().messages.length).toBe(1);
    expect(useChatStore.getState().messages[0].content).toBe('Hello World');
  });
});
