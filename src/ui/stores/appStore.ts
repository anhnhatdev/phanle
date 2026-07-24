import { create } from 'zustand';

export type AppView = 'login' | 'main';

interface AppState {
  view: AppView;
  accounts: any[];
  setView: (view: AppView) => void;
  setAccounts: (accounts: any[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: 'login',
  accounts: [],
  setView: (view) => set({ view }),
  setAccounts: (accounts) => set({ accounts }),
}));
