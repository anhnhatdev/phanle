import React, { useEffect } from 'react';
import { useAccountStore } from '../stores/accountStore';
import { useAppStore } from '../stores/appStore';
import { AccountSidebar } from '../components/AccountSidebar';
import LoginPage from './LoginPage';

declare global {
  interface Window {
    electronAPI?: {
      invoke: (channel: string, data?: any) => Promise<any>;
    };
  }
}

export const MainPage: React.FC = () => {
  const { accounts, setAccounts } = useAccountStore();
  const setView = useAppStore((s) => s.setView);

  useEffect(() => {
    window.electronAPI?.invoke('account:list').then((data) => {
      if (data?.length) {
        setAccounts(data);
      }
    });
  }, [setAccounts]);

  const handleAddAccount = () => {
    setView('login');
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100">
      <AccountSidebar onAddAccount={handleAddAccount} />
      <main className="flex flex-1 flex-col items-center justify-center">
        {accounts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-slate-500 text-sm">
              Chưa có tài khoản nào. Nhấn nút + để thêm tài khoản.
            </p>
            <button
              id="btn-main-add-account"
              onClick={handleAddAccount}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Thêm tài khoản Zalo
            </button>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            Chọn tài khoản bên trái để bắt đầu.
          </p>
        )}
      </main>
    </div>
  );
};

export default MainPage;
