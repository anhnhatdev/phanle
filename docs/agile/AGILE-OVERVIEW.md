# Agile Scrum — Tổng quan

> **Team:** 2 người — Dev chính (bạn) + AI Dev (claude)
> **Mô hình:** Scrum rút gọn phù hợp team nhỏ

---

## Roles

| Role | Người |
|------|-------|
| Product Owner | Dev chính |
| Scrum Master | Dev chính |
| Dev (chính) | Dev chính |
| Dev (AI pair) | Claude (contributor trên GitHub) |

---

## Ceremonies

| Ceremony | Tần suất | Ghi chú |
|----------|----------|---------|
| Sprint Planning | Đầu mỗi sprint | Thống nhất sprint goal & chọn backlog items |
| Daily Standup | Mỗi phiên làm việc | 3 câu: đã làm / sẽ làm / blockers |
| Sprint Review | Cuối sprint | Demo tính năng, review kết quả |
| Sprint Retro | Cuối sprint | What went well / improve / action |

---

## Sprint Setup

- **Sprint length:** 2 tuần
- **Capacity:** ~20 story points / sprint (team nhỏ, part-time)
- **Story point scale:** 1, 2, 3, 5, 8, 13

---

## Definition of Done (DoD)

Một task được xem là **DONE** khi:
- [ ] Code hoàn thành, chạy đúng
- [ ] Unit test pass (nếu có logic phức tạp)
- [ ] Không có console.error không mong muốn
- [ ] PR được tạo từ feature branch → main
- [ ] PR được review (tự review hoặc AI review)
- [ ] PR merged vào main
- [ ] Tài liệu liên quan được cập nhật

---

## Git Workflow

```
main (protected)
  └── feature/xxx   ← mọi code đều làm ở đây
  └── fix/xxx
  └── chore/xxx
```

**Quy tắc:**
1. KHÔNG commit thẳng vào `main`
2. Mọi thay đổi → tạo branch → PR → review → merge
3. Branch naming: `feature/ten-tinh-nang`, `fix/ten-bug`, `chore/ten-viec`
4. Commit message: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
5. PR phải có description mô tả thay đổi

---

## Backlog Priority

```
P0 - Critical (Must have này sprint)
P1 - High (Nên có này sprint)  
P2 - Medium (Sprint sau)
P3 - Low (Backlog xa)
```

---

## Sprints

| Sprint | Mục tiêu | Trạng thái |
|--------|----------|------------|
| Sprint 0 | Setup project, CI/CD, tài liệu | 🔄 In Progress |
| Sprint 1 | Branding + Cấu trúc cơ bản | 📋 Planned |
| Sprint 2 | Core: Login + Đa tài khoản | 📋 Planned |
| Sprint 3 | Chat + Inbox | 📋 Planned |
| Sprint 4 | CRM | 📋 Planned |
| Sprint 5 | Workflow | 📋 Planned |
| Sprint 6 | AI Assistant | 📋 Planned |
| Sprint 7 | ERP + Nhân viên | 📋 Planned |
| Sprint 8 | POS + Tích hợp | 📋 Planned |
| Sprint 9 | Báo cáo + Polish | 📋 Planned |
| Sprint 10 | Test + CI/CD + Release v1.0 | 📋 Planned |

---

## Sprint 0 — Chi tiết (Current)

**Goal:** Nền móng — không có feature, chỉ cần project chạy được và đúng quy trình

### Tasks Sprint 0

- [x] Tạo GitHub repo `phanle` (chính)
- [x] Setup nhánh main + branch protection
- [x] Khởi tạo cấu trúc project và thiết lập kiến trúc cơ bản
- [x] Thiết lập cấu hình ứng dụng: tên app, appId, URLs, tên DB file
- [x] Setup GitHub Actions: build-all.yml
- [x] Setup GitHub Actions: test.yml (jest)
- [x] Thêm Claude bot vào contributors
- [x] Viết đầy đủ tài liệu hệ thống trong docs/
- [x] README.md chính thức của Phanle

**Done khi:** CI/CD xanh, `npm run dev` chạy được, tất cả tài liệu có bản đầu
