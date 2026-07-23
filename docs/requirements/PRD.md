# Product Requirements Document — Phanle

> **Phiên bản:** 1.0.0-draft | **Ngày:** 2026-07-23 | **Trạng thái:** Draft

---

## 1. Tổng quan sản phẩm

**Phanle** là phần mềm desktop đa nền tảng (Windows / macOS / Linux) giúp đội nhóm bán hàng và chăm sóc khách hàng vận hành tập trung trên **Zalo** và **Facebook** cá nhân đa tài khoản.

Tích hợp đầy đủ: **CRM · ERP · POS · Workflow tự động · AI Assistant**

---

## 2. Mục tiêu sản phẩm

| # | Mục tiêu | Chỉ số đo |
|---|----------|-----------|
| 1 | Quản lý nhiều tài khoản Zalo/FB trong 1 app | ≥5 tài khoản hoạt động đồng thời |
| 2 | Giảm thời gian phản hồi khách hàng | ≤30s với AI gợi ý |
| 3 | Tự động hóa quy trình bán hàng | Workflow chạy 24/7 không cần mở app |
| 4 | Quản lý đội nhóm Boss ↔ Nhân viên | Phân quyền chi tiết theo module |
| 5 | Dữ liệu cục bộ, bảo mật | 100% local-first, không lưu server |

---

## 3. Đối tượng người dùng

- **Shop online** chốt đơn qua Zalo/Facebook
- **Doanh nghiệp SME** nhiều nhân viên xử lý inbox
- **Marketing agency / Freelancer** quản lý nhiều tài khoản
- **Spa / Phòng khám / Giáo dục / F&B** chăm sóc khách định kỳ

---

## 4. Nhóm tính năng chính

### 4.1 Quản lý đa tài khoản & Inbox tập trung
- Đăng nhập Zalo bằng QR Code (không lưu mật khẩu)
- Đăng nhập Facebook bằng tài khoản / cookie
- Dashboard quản lý tài khoản trực quan
- Inbox hợp nhất từ nhiều tài khoản
- Tìm kiếm: tên, biệt danh, số điện thoại
- Lọc: chưa đọc, chưa trả lời, nhãn, trạng thái
- **Proxy per-account**: gán proxy riêng từng tài khoản Zalo

### 4.2 Chat đầy đủ tính năng
- Gửi: văn bản, ảnh, video, file
- Emoji, sticker, reply, tag thành viên
- Poll, ghi chú nhóm, nhắc nhở, danh thiếp
- Quick messages (mẫu tin + từ khóa)
- Ghim tin nhắn, quản lý media/file đính kèm

### 4.3 CRM & Chăm sóc khách hàng
- Đồng bộ bạn bè, thành viên nhóm, hồ sơ liên hệ
- Lưu: SĐT, giới tính, ngày sinh, ghi chú nội bộ
- Nhãn Zalo hai chiều (sync ↔ app)
- Lọc liên hệ đa tiêu chí
- Campaign: gửi tin, kết bạn, mời nhóm (realtime progress)
- Quét thành viên nhóm ẩn, nhóm chưa tham gia

### 4.4 Workflow Tự động hóa
- Kéo-thả Trigger → Node → Action, không cần code
- Trigger: tin nhắn, nhãn, react, cron, sự kiện nhóm
- Action: gửi tin/ảnh/file, quản lý nhóm, mute, forward, recall
- Tích hợp: Google Sheets, Telegram, Discord, Email, HTTP Request, Notion
- AI tạo workflow từ câu lệnh tiếng Việt
- Lịch sử chạy, debug log

### 4.5 Tích hợp POS & Bán hàng
- POS: KiotViet, Haravan, Sapo, Nhanh.vn, Pancake POS
- Vận chuyển: GHN, GHTK
- AI gợi ý trả lời trong hội thoại

### 4.6 Báo cáo, ERP & Nhân viên
- Báo cáo: tin nhắn, liên hệ, campaign, workflow, AI, nhân viên
- ERP nội bộ: Task, Calendar, Notes
- Boss ↔ Nhân viên: kết nối LAN/WAN (Cloudflare Tunnel)
- Phân quyền chi tiết theo module
- Theo dõi hiệu suất từng nhân viên

### 4.7 AI Assistant
- Gợi ý trả lời thông minh (Zalo & Facebook)
- Chat trực tiếp với AI trong khung hội thoại
- Tạo workflow bằng câu lệnh tiếng Việt
- Node AI trong workflow → chatbot 24/7
- Hỗ trợ: OpenAI, Claude, Gemini, 9router (AI gateway)

---

## 5. Yêu cầu phi chức năng

| Yêu cầu | Mô tả |
|---------|-------|
| **Hiệu năng** | App khởi động <5s, switch tài khoản <1s |
| **Bảo mật** | Local-first, cookie mã hóa, không server ngoài |
| **Nền tảng** | Windows 10/11, macOS (Intel + Apple Silicon), Ubuntu 20.04+ |
| **Cài đặt** | Node.js 18+, npm 9+ |
| **Ổn định** | 24/7 khi chạy workflow, reconnect tự động |
| **Workspace** | Đổi thư mục DB không mất dữ liệu |

---

## 6. Kiến trúc hệ thống (tóm tắt)

```
Main Process (Electron/Node.js)
  ├── IPC Handlers (loginIpc, zaloIpc, facebookIpc, crmIpc, ...)
  ├── Services (DatabaseService, WorkflowEngine, AIAssistantService, ...)
  └── Relay Server (HTTP REST + Socket.IO :9900 → Boss ↔ Nhân viên)

Renderer (React + Vite)
  ├── Pages: Dashboard, Chat, CRM, Workflow, POS, ERP, Settings
  └── State: Zustand stores (accountStore, chatStore, crmStore, ...)

Storage
  ├── SQLite local (better-sqlite3)
  ├── FileStorage (media: ảnh/video/file)
  └── electron-store (cookies, tokens, settings)
```

---

## 7. Out of scope (v1.0)

- Mobile app (iOS/Android)
- Web app
- Tích hợp thêm nền tảng chat mới (Viber, WhatsApp...)
- Thanh toán online tích hợp

---

## 8. Open questions

- [ ] Tên chính thức cuối cùng của app (hiển thị trên UI/installer)?
- [ ] Domain website / landing page?
- [ ] GitHub org/username?
- [ ] App ID (com.xxx.app)?
- [ ] Update server URL?
