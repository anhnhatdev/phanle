# Tech Stack — Phanle

> Kiến trúc và công nghệ hiện đại cho phần mềm desktop Phanle.

## Core

| Layer | Tech | Version |
|-------|------|---------|
| Desktop runtime | Electron | 41.x |
| UI framework | React | 18.x |
| Language | TypeScript | 5.x |
| Bundler | Vite | 6.x |
| Styling | Tailwind CSS | 3.x |
| State management | Zustand | 5.x |
| Database | SQLite (better-sqlite3) | 12.x |
| Router | React Router | 6.x |

## Electron / Node.js Layer

| Thư viện | Mục đích |
|----------|---------|
| zca-js | Zalo protocol client |
| fbchat-v2 | Facebook chat client |
| socket.io | Relay server realtime |
| cloudflared | Tunnel WAN cho boss↔employee |
| ffmpeg-static | Xử lý video/media |
| bcryptjs | Hash mật khẩu nhân viên |
| jsonwebtoken | Auth token |
| electron-updater | Auto update |
| electron-store | Lưu settings/cookies |
| node-cron | Cron trigger workflow |
| axios | HTTP client |
| sharp | Resize ảnh |
| xlsx | Import/export Excel |
| mqtt | MQTT broker |
| localtunnel | Tunnel phụ |

## UI Libraries

| Thư viện | Mục đích |
|----------|---------|
| reactflow | Workflow editor kéo-thả |
| recharts | Báo cáo, biểu đồ |
| react-quill-new | Rich text editor |
| react-zoom-pan-pinch | Zoom ảnh |

## External Integrations

| Dịch vụ | Mục đích |
|---------|---------|
| OpenAI / Claude / Gemini | AI Assistant |
| 9router | AI gateway |
| Google Sheets API | Workflow action |
| Telegram Bot API | Workflow notification |
| Discord.js | Workflow notification |
| KiotViet / Haravan / Sapo / Nhanh.vn / Pancake | POS |
| GHN / GHTK | Vận chuyển |
| Nodemailer | Email action |

## Dev Tools

| Tool | Mục đích |
|------|---------|
| Jest + ts-jest | Unit test |
| ESLint / TypeScript strict | Lint |
| electron-builder | Đóng gói app |
| GitHub Actions | CI/CD |
| concurrently | Dev server |

## Build Output

```
Windows  → .exe (NSIS installer) + dir (portable)
macOS    → .dmg (arm64 + x64)
Linux    → .AppImage + .deb
```

## Môi trường phát triển yêu cầu

- Node.js 18+ (khuyến nghị 22.x)
- npm 9+
- Go (chỉ cần cho Ubuntu build bridge E2EE)
