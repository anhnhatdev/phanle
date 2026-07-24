import { ipcMain } from 'electron';
import ChatService from '../../src/services/chat/ChatService';
import { Message } from '../../src/models';

export function registerChatIpc(): void {
  ipcMain.handle('chat:save-message', async (_event, msg: Message) => {
    await ChatService.getInstance().saveMessage(msg);
    return true;
  });

  ipcMain.handle(
    'chat:get-messages',
    (_event, conversationId: string, limit?: number, offset?: number) => {
      return ChatService.getInstance().getMessages(conversationId, limit, offset);
    }
  );

  ipcMain.handle('chat:get-conversations', (_event, accountId: string) => {
    return ChatService.getInstance().getConversations(accountId);
  });
}
