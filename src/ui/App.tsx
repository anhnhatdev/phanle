import React from 'react';
import { useAppStore } from './stores/appStore';
import LoginPage from './pages/LoginPage';

export const App: React.FC = () => {
  const view = useAppStore((s) => s.view);

  if (view === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100">
      <p className="text-slate-500 text-sm">Đang tải ứng dụng…</p>
    </div>
  );
};

export default App;
