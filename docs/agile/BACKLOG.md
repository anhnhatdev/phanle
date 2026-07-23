# Product Backlog — Phanle

> Cập nhật liên tục. Ưu tiên: P0 > P1 > P2 > P3

---

## 🏗️ Epic 1: Project Setup & DevOps

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-001 | Khởi tạo GitHub repo, cấu trúc thư mục | P0 | 2 | Sprint 0 | 📋 Todo |
| US-002 | Đổi branding (tên app, appId, DB name, URLs) | P0 | 3 | Sprint 0 | 📋 Todo |
| US-003 | Setup GitHub Actions: CI build (Win/Mac/Linux) | P0 | 5 | Sprint 0 | 📋 Todo |
| US-004 | Setup GitHub Actions: test (Jest) | P0 | 3 | Sprint 0 | 📋 Todo |
| US-005 | Branch protection rules, PR template | P0 | 1 | Sprint 0 | 📋 Todo |
| US-006 | Thêm Claude vào contributors | P1 | 1 | Sprint 0 | 📋 Todo |
| US-007 | README.md hoàn chỉnh | P1 | 2 | Sprint 0 | 📋 Todo |

---

## 🔐 Epic 2: Auth & Đa tài khoản

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-010 | Đăng nhập Zalo bằng QR Code | P0 | 5 | Sprint 2 | 📋 Todo |
| US-011 | Đăng nhập Facebook bằng tài khoản / cookie | P0 | 5 | Sprint 2 | 📋 Todo |
| US-012 | Quản lý nhiều tài khoản Zalo đồng thời | P0 | 8 | Sprint 2 | 📋 Todo |
| US-013 | Gán proxy per-account | P1 | 3 | Sprint 2 | 📋 Todo |
| US-014 | Lock screen bảo vệ app | P2 | 3 | Sprint 2 | 📋 Todo |

---

## 💬 Epic 3: Chat & Inbox

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-020 | Inbox hợp nhất đa tài khoản | P0 | 8 | Sprint 3 | 📋 Todo |
| US-021 | Gửi tin nhắn văn bản, ảnh, video, file | P0 | 5 | Sprint 3 | 📋 Todo |
| US-022 | Emoji, sticker, reply, tag | P1 | 3 | Sprint 3 | 📋 Todo |
| US-023 | Quick messages (mẫu tin + từ khóa) | P1 | 3 | Sprint 3 | 📋 Todo |
| US-024 | Lọc: chưa đọc, chưa trả lời, nhãn | P1 | 3 | Sprint 3 | 📋 Todo |
| US-025 | Ghim tin nhắn, quản lý media | P2 | 2 | Sprint 3 | 📋 Todo |
| US-026 | Poll, ghi chú nhóm, nhắc nhở | P2 | 3 | Sprint 3 | 📋 Todo |

---

## 👥 Epic 4: CRM

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-030 | Đồng bộ bạn bè / thành viên nhóm | P0 | 5 | Sprint 4 | 📋 Todo |
| US-031 | Lưu hồ sơ liên hệ (SĐT, ghi chú, sinh nhật) | P0 | 3 | Sprint 4 | 📋 Todo |
| US-032 | Nhãn Zalo hai chiều | P0 | 5 | Sprint 4 | 📋 Todo |
| US-033 | Lọc liên hệ đa tiêu chí | P1 | 3 | Sprint 4 | 📋 Todo |
| US-034 | Campaign gửi tin hàng loạt | P0 | 8 | Sprint 4 | 📋 Todo |
| US-035 | Campaign kết bạn, mời nhóm | P1 | 5 | Sprint 4 | 📋 Todo |
| US-036 | Quét thành viên nhóm ẩn | P2 | 5 | Sprint 4 | 📋 Todo |

---

## ⚙️ Epic 5: Workflow

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-040 | Workflow editor kéo-thả | P0 | 13 | Sprint 5 | 📋 Todo |
| US-041 | Trigger: tin nhắn, nhãn, react, cron | P0 | 8 | Sprint 5 | 📋 Todo |
| US-042 | Action: gửi tin/ảnh/file, quản lý nhóm | P0 | 8 | Sprint 5 | 📋 Todo |
| US-043 | Tích hợp Google Sheets, Telegram, Discord | P1 | 5 | Sprint 5 | 📋 Todo |
| US-044 | Lịch sử chạy, debug log | P1 | 3 | Sprint 5 | 📋 Todo |
| US-045 | HTTP Request action | P1 | 3 | Sprint 5 | 📋 Todo |

---

## 🤖 Epic 6: AI Assistant

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-050 | Gợi ý trả lời trong hội thoại | P0 | 8 | Sprint 6 | 📋 Todo |
| US-051 | Chat trực tiếp với AI | P0 | 5 | Sprint 6 | 📋 Todo |
| US-052 | Tạo workflow bằng câu lệnh tiếng Việt | P1 | 8 | Sprint 6 | 📋 Todo |
| US-053 | Node AI trong workflow (chatbot 24/7) | P0 | 8 | Sprint 6 | 📋 Todo |
| US-054 | Hỗ trợ OpenAI, Claude, Gemini, 9router | P1 | 3 | Sprint 6 | 📋 Todo |

---

## 🏢 Epic 7: ERP & Nhân viên

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-060 | Task management (tạo, giao, theo dõi) | P1 | 5 | Sprint 7 | 📋 Todo |
| US-061 | Calendar sự kiện | P1 | 3 | Sprint 7 | 📋 Todo |
| US-062 | Notes (editor phong phú) | P2 | 3 | Sprint 7 | 📋 Todo |
| US-063 | Quản lý nhân viên, phân quyền module | P0 | 8 | Sprint 7 | 📋 Todo |
| US-064 | Boss ↔ Nhân viên relay (LAN/WAN) | P0 | 13 | Sprint 7 | 📋 Todo |
| US-065 | Theo dõi hiệu suất nhân viên | P1 | 5 | Sprint 7 | 📋 Todo |

---

## 🛒 Epic 8: POS & Tích hợp

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-070 | Tích hợp KiotViet, Haravan, Sapo | P1 | 8 | Sprint 8 | 📋 Todo |
| US-071 | Tích hợp GHN, GHTK | P1 | 5 | Sprint 8 | 📋 Todo |
| US-072 | Tích hợp Email (Nodemailer) | P2 | 3 | Sprint 8 | 📋 Todo |
| US-073 | Tích hợp Notion | P3 | 3 | Sprint 8 | 📋 Todo |

---

## 📊 Epic 9: Báo cáo

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-080 | Báo cáo tin nhắn, liên hệ | P1 | 5 | Sprint 9 | 📋 Todo |
| US-081 | Báo cáo campaign, workflow, AI | P1 | 5 | Sprint 9 | 📋 Todo |
| US-082 | Báo cáo nhân viên | P1 | 5 | Sprint 9 | 📋 Todo |

---

## 🔒 Epic 10: Bảo mật & Workspace

| ID | User Story | Priority | Points | Sprint | Status |
|----|-----------|----------|--------|--------|--------|
| US-090 | Đổi thư mục DB workspace | P0 | 3 | Sprint 1 | 📋 Todo |
| US-091 | Cookie mã hóa electron-store | P0 | 2 | Sprint 1 | 📋 Todo |
| US-092 | E2EE bridge (Zalo) | P1 | 5 | Sprint 1 | 📋 Todo |
