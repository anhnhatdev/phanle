# Roadmap — Phanle

> Kế hoạch phát triển theo Agile Scrum (2 tuần / Sprint) | Ngày bắt đầu: 2026-07-23

---

## Tầm nhìn sản phẩm

Phát triển thành công giải pháp **Phanle v1.0.0** — Hệ thống desktop quản lý Zalo & Facebook cá nhân đa tài khoản tích hợp CRM, ERP, POS, Workflow và AI Assistant chuyên nghiệp.

---

## Các mốc phát triển chính (Milestones)

```
Sprint 0  ─── [2026-07] Khởi tạo dự án & Kiến trúc tài liệu
Sprint 1  ─── [2026-08] Khởi tạo Cấu trúc & Nền móng Ứng dụng
Sprint 2  ─── [2026-08] Quản lý Tài khoản & Đăng nhập Zalo/FB  ───► Alpha Internal
Sprint 3  ─── [2026-08] Trung tâm Chat & Hộp thư Gộp
Sprint 4  ─── [2026-09] Quản lý Khách hàng CRM & Chiến dịch
Sprint 5  ─── [2026-09] Engine Workflow Tự động hóa         ───► Beta Release
Sprint 6  ─── [2026-09] Tích hợp AI Assistant Smart Reply
Sprint 7  ─── [2026-10] Phân hệ ERP & Mô hình Boss ↔ Nhân viên
Sprint 8  ─── [2026-10] Kết nối POS & Đối tác Vận chuyển
Sprint 9  ─── [2026-10] Hệ thống Báo cáo & Tối ưu UX/UI
Sprint 10 ─── [2026-11] Kiểm thử Toàn diện & Phát hành v1.0.0 ───► Production Release
```

---

## Chi tiết kế hoạch các Sprint

### 🟢 Sprint 0 — Project Setup & Architecture
**Mục tiêu:** Xây dựng tài liệu PRD, Tech Stack, DB Schema, CI/CD và quy trình Agile.

### 🟡 Sprint 1 — App Core Skeleton
**Mục tiêu:** Cấu hình hệ thống build, Tailwind CSS, Vite, Electron Main Process, SQLite connection.
- Cấu hình package scripts và dev environment.
- CI/CD tự động chạy Jest tests & build artifact.

### 🟡 Sprint 2 — Auth & Multi-Account
**Mục tiêu:** Quản lý phiên đăng nhập QR Code Zalo, cookie Facebook và Proxy per-account.
- *Bàn giao:* Bản build `alpha-internal` cho kiểm thử nội bộ.

### 🟡 Sprint 3 — Unified Chat
**Mục tiêu:** Giao diện hộp thư gộp, gửi nhận tin nhắn văn bản, media, emoji, quick messages.

### 🟡 Sprint 4 — CRM & Campaigns
**Mục tiêu:** Quản lý liên hệ, gắn nhãn Zalo hai chiều, campaign gửi tin hàng loạt.

### 🟡 Sprint 5 — Workflow Engine & Beta
**Mục tiêu:** Trình thiết kế quy trình kéo-thả, hỗ trợ Trigger và Action cơ bản.
- *Bàn giao:* Bản build `beta` công khai.

### 🟡 Sprint 6 — AI Assistant
**Mục tiêu:** AI gợi ý câu trả lời, chatbot tự động 24/7 với OpenAI/Claude/Gemini.

### 🟡 Sprint 7 — ERP & Staff Management
**Mục tiêu:** Phân hệ Task, Notes, Calendar và mô hình giao tiếp Boss ↔ Nhân viên qua LAN/WAN.

### 🟡 Sprint 8 — POS & Integrations
**Mục tiêu:** Kết nối KiotViet, Haravan, Sapo, GHN, GHTK.

### 🟡 Sprint 9 — Reporting & Optimization
**Mục tiêu:** Biểu đồ báo cáo hiệu suất, tối ưu bộ nhớ và tốc độ phản hồi.

### 🟢 Sprint 10 — Release v1.0.0
**Mục tiêu:** Đóng gói hoàn chỉnh bản thương mại cho Windows, macOS và Linux.

---

## Định danh Phiên bản (Versioning)

Sử dụng định dạng Semantic Versioning: `vMAJOR.MINOR.PATCH` (Ví dụ: `v1.0.0`, `v1.1.0`).

---

## Phân loại bản phát hành

| Loại | Nhánh Git | Điều kiện nghiệm thu |
|------|-----------|----------------------|
| Alpha | `feat/...` | Kiểm thử tính năng mới nội bộ |
| Beta | `main` | Đã ghép nối các module, sẵn sàng test diện rộng |
| RC | `main` | Đã sửa toàn bộ lỗi critical |
| Stable | `main` (Tag `v1.0.0`) | Sẵn sàng phát hành |
