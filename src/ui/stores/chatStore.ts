import { create } from 'zustand';
import { Message } from '../../models';

export interface Conversation {
  conversationId: string;
  accountId: string;
  lastMessage?: string;
  lastMessageTime?: number;
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Message[];
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (activeConversationId) => set({ activeConversationId }),
  setMessages: (messages) => set({ messages }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
}));
