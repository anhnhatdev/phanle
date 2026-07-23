# Roadmap — Phanle

> Phát hành theo sprint 2 tuần/sprint | Bắt đầu: 2026-07-23

---

## Tầm nhìn

**v1.0.0** — Đầy đủ tính năng tương đương PM cũ (Deplao), branding mới hoàn toàn sạch.

---

## Milestones

```
Sprint 0  ─── [2026-07] Setup & Docs
Sprint 1  ─── [2026-08] Branding + Cấu trúc cơ bản
Sprint 2  ─── [2026-08] Auth & Đa tài khoản  ───► Alpha Internal
Sprint 3  ─── [2026-08] Chat & Inbox
Sprint 4  ─── [2026-09] CRM
Sprint 5  ─── [2026-09] Workflow                ───► Beta
Sprint 6  ─── [2026-09] AI Assistant
Sprint 7  ─── [2026-10] ERP & Nhân viên
Sprint 8  ─── [2026-10] POS & Tích hợp
Sprint 9  ─── [2026-10] Báo cáo & Polish
Sprint 10 ─── [2026-11] Test + Release          ───► v1.0.0
```

---

## Chi tiết từng milestone

### 🔴 Sprint 0 — Setup (Current)
**Goal:** Nền móng project
- Tạo repo, cấu trúc, tài liệu
- CI/CD pipeline
- Không có feature

### 🟡 Sprint 1 — Branding
**Goal:** App chạy được, đúng brand
- Copy source PM cũ, đổi toàn bộ branding
- `npm run dev` thành công
- CI/CD xanh
- README mới

### 🟡 Sprint 2 — Auth Alpha
**Goal:** Đăng nhập Zalo/FB + quản lý tài khoản
- Deliverable: `alpha-internal` build cho dev test

### 🟡 Sprint 3 — Chat
**Goal:** Chat đầy đủ tính năng

### 🟡 Sprint 4 — CRM
**Goal:** CRM cơ bản + Campaign

### 🟡 Sprint 5 — Workflow + Beta
**Goal:** Workflow editor hoàn chỉnh
- Deliverable: `beta` build

### 🟡 Sprint 6 — AI
**Goal:** AI Assistant đầy đủ

### 🟡 Sprint 7 — ERP
**Goal:** Task, Calendar, Notes, Nhân viên, Boss↔Employee

### 🟡 Sprint 8 — Integrations
**Goal:** POS, Vận chuyển, Email

### 🟡 Sprint 9 — Polish
**Goal:** Báo cáo, UX, bug fixes

### 🟢 Sprint 10 — Release v1.0.0
**Goal:** Test đầy đủ, release chính thức
- Tất cả CI/CD xanh
- Manual test pass
- GitHub Release v1.0.0

---

## Versioning

Format: `YY.M.PATCH` (theo PM cũ)
- `26.7.x` → July 2026
- Patch tăng theo số fix/release nhỏ

---

## Release Types

| Type | Nhánh | Điều kiện |
|------|-------|----------|
| Alpha | feature/... | Dev internal test |
| Beta | main | Feature complete, cần user test |
| RC | main + tag | Bug fixes only |
| Stable | main + tag | Stable release |
