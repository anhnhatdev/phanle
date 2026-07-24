import React, { useState } from 'react';
import { useChatStore } from '../stores/chatStore';

export const ChatWindow: React.FC = () => {
  const { activeConversationId, messages, addMessage } = useChatStore();
  const [inputText, setInputText] = useState('');

  if (!activeConversationId) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-950 text-xs text-slate-500">
        Chọn một hội thoại để xem tin nhắn
      </div>
    );
  }

  const handleSend = () => {
    if (!inputText.trim()) return;

    addMessage({
      id: `msg_${Date.now()}`,
      accountId: 'local_acc',
      conversationId: activeConversationId,
      senderId: 'me',
      content: inputText.trim(),
      type: 'text',
      isFromMe: true,
      status: 'sent',
      timestamp: Date.now(),
      createdAt: Date.now(),
    });

    setInputText('');
  };

  return (
    <div className="flex flex-1 flex-col bg-slate-950">
      <div className="border-b border-slate-800 p-3">
        <h3 className="text-xs font-semibold text-white">{activeConversationId}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[70%] text-xs ${
              msg.isFromMe ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div
              className={`rounded-xl px-3 py-2 ${
                msg.isFromMe ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              {msg.content}
            </div>
            <span className="mt-1 text-[10px] text-slate-500">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 p-3 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Nhập tin nhắn..."
          className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSend}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-500"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
