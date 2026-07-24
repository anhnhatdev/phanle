import React from 'react';
import { Account } from '../../models';
import { useAccountStore } from '../stores/accountStore';

interface AccountAvatarProps {
  account: Account;
  isActive: boolean;
  onClick: () => void;
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({ account, isActive, onClick }) => {
  const initial = account.name?.charAt(0)?.toUpperCase() || '?';
  const statusColor =
    account.status === 'online'
      ? 'bg-emerald-500'
      : account.status === 'error'
      ? 'bg-red-500'
      : 'bg-slate-500';

  return (
    <button
      id={`account-avatar-${account.id}`}
      onClick={onClick}
      title={account.name}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white transition-all ${
        isActive
          ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950'
          : 'opacity-60 hover:opacity-100'
      } ${account.avatar ? '' : 'bg-gradient-to-br from-indigo-500 to-violet-600'}`}
    >
      {account.avatar ? (
        <img src={account.avatar} alt={account.name} className="h-full w-full rounded-full object-cover" />
      ) : (
        initial
      )}
      <span
        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${statusColor}`}
      />
    </button>
  );
};

interface AccountSidebarProps {
  onAddAccount: () => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({ onAddAccount }) => {
  const { accounts, activeAccountId, setActiveAccount } = useAccountStore();

  return (
    <aside className="flex h-full w-16 flex-col items-center gap-3 border-r border-slate-800 bg-slate-950 py-4">
      <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
        P
      </div>

      <div className="h-px w-8 bg-slate-800" />

      <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto">
        {accounts.map((account) => (
          <AccountAvatar
            key={account.id}
            account={account}
            isActive={account.id === activeAccountId}
            onClick={() => setActiveAccount(account.id)}
          />
        ))}
      </div>

      <button
        id="btn-add-account"
        onClick={onAddAccount}
        title="Thêm tài khoản"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-slate-700 text-slate-500 transition hover:border-indigo-500 hover:text-indigo-400"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
};

export default AccountSidebar;
