import React, { useState, useEffect, useCallback } from 'react';
import QRCodeDisplay from '../components/QRCodeDisplay';

type LoginStep = 'idle' | 'qr' | 'checking' | 'success' | 'error';

declare global {
  interface Window {
    electronAPI?: {
      invoke: (channel: string, data?: any) => Promise<any>;
    };
  }
}

export const LoginPage: React.FC = () => {
  const [step, setStep] = useState<LoginStep>('idle');
  const [qrUrl, setQrUrl] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const startQRLogin = useCallback(async () => {
    setStep('qr');
    setErrorMessage('');
    try {
      const session = await window.electronAPI?.invoke('login:zalo-qr');
      if (session?.qrCodeUrl) {
        setQrUrl(session.qrCodeUrl);
        setSessionId(session.sessionId);
      } else {
        setErrorMessage('Không thể tạo phiên đăng nhập. Vui lòng thử lại.');
        setStep('error');
      }
    } catch {
      setErrorMessage('Đã xảy ra lỗi kết nối. Vui lòng thử lại.');
      setStep('error');
    }
  }, []);

  useEffect(() => {
    if (step !== 'qr' || !sessionId) return;

    const interval = setInterval(async () => {
      const result = await window.electronAPI?.invoke('login:zalo-check', sessionId);
      if (result?.success) {
        setStep('success');
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [step, sessionId]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
            P
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Đăng nhập Phanle</h1>
          <p className="text-sm text-slate-400">Kết nối tài khoản Zalo của bạn</p>
        </div>

        {step === 'idle' && (
          <button
            id="btn-zalo-login"
            onClick={startQRLogin}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
          >
            Đăng nhập bằng Zalo QR Code
          </button>
        )}

        {step === 'qr' && qrUrl && (
          <div className="flex flex-col items-center gap-4">
            <QRCodeDisplay url={qrUrl} size={220} />
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              Đang chờ quét mã…
            </div>
            <button
              onClick={() => setStep('idle')}
              className="text-xs text-slate-500 underline hover:text-slate-300"
            >
              Huỷ
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <span className="text-4xl">✓</span>
            <p className="text-sm font-medium text-emerald-400">Đăng nhập thành công!</p>
          </div>
        )}

        {step === 'error' && (
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm text-red-400">{errorMessage}</p>
            <button
              onClick={() => setStep('idle')}
              className="w-full rounded-xl border border-slate-700 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Thử lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
