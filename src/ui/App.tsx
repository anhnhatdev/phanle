import React from 'react';
import { useAppStore } from './stores/appStore';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

export const App: React.FC = () => {
  const view = useAppStore((s) => s.view);

  if (view === 'login') {
    return <LoginPage />;
  }

  return <MainPage />;
};

export default App;
