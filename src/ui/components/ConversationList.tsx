import React from 'react';
import { useChatStore } from '../stores/chatStore';

export const ConversationList: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversation } = useChatStore();

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hội thoại</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-500">Chưa có hội thoại nào</div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.conversationId === activeConversationId;
            return (
              <button
                key={conv.conversationId}
                onClick={() => setActiveConversation(conv.conversationId)}
                className={`flex w-full flex-col gap-1 border-b border-slate-800/50 p-3 text-left transition ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-medium">{conv.conversationId}</span>
                  {conv.lastMessageTime && (
                    <span className="text-[10px] text-slate-500">
                      {new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                {conv.lastMessage && (
                  <p className="line-clamp-1 text-xs text-slate-400">{conv.lastMessage}</p>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
