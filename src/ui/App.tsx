import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex flex-col items-center space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl font-bold text-white shadow-lg shadow-indigo-500/30">
          P
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Phanle Desktop</h1>
        <p className="max-w-md text-center text-sm text-slate-400">
          Phần mềm quản lý Zalo & Facebook cá nhân Đa tài khoản tích hợp CRM, ERP, POS, Workflow và AI Assistant.
        </p>
        <div className="flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Sprint 1 — Core Skeleton Ready</span>
        </div>
      </div>
    </div>
  );
};

export default App;
