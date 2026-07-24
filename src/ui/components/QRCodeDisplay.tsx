import React from 'react';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, size = 200 }) => {
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl border border-slate-700 bg-white p-3 shadow-lg">
        <img
          src={qrApiUrl}
          alt="QR Code đăng nhập"
          width={size}
          height={size}
          className="block"
          draggable={false}
        />
      </div>
      <p className="text-center text-xs text-slate-400">
        Mở ứng dụng Zalo trên điện thoại và quét mã QR này
      </p>
    </div>
  );
};

export default QRCodeDisplay;
