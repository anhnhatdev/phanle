import { create } from 'zustand';
import { Account } from '../../models';

interface AccountState {
  accounts: Account[];
  activeAccountId: string | null;
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  removeAccount: (id: string) => void;
  setActiveAccount: (id: string) => void;
  getActiveAccount: () => Account | undefined;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  activeAccountId: null,
  setAccounts: (accounts) =>
    set({ accounts, activeAccountId: accounts[0]?.id ?? null }),
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
      activeAccountId: state.activeAccountId ?? account.id,
    })),
  removeAccount: (id) =>
    set((state) => {
      const remaining = state.accounts.filter((a) => a.id !== id);
      return {
        accounts: remaining,
        activeAccountId:
          state.activeAccountId === id ? (remaining[0]?.id ?? null) : state.activeAccountId,
      };
    }),
  setActiveAccount: (id) => set({ activeAccountId: id }),
  getActiveAccount: () => {
    const { accounts, activeAccountId } = get();
    return accounts.find((a) => a.id === activeAccountId);
  },
}));
