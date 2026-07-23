# Ghi chú & Quyết định — Phanle

> Ghi lại những điều quan trọng, gotchas, quyết định thiết kế để không mắc lại

---

## 📌 Quy tắc bất biến

1. **KHÔNG commit thẳng vào main** — mọi thứ qua PR
2. **KHÔNG push code khi chưa có sự đồng ý** — luôn hỏi trước
3. **Tài liệu phải cập nhật cùng với code** — không để tài liệu lạc hậu
4. **Branding PM cũ không được lộ ra ngoài** — xóa sạch trước khi commit
5. **🚨 TUYỆT ĐỐI KHÔNG COPY Y CHANG PM CŨ** — phải viết lại từng file từ đầu
   - Mục tiêu: 100+ commits thật, history tự nhiên như dự án mới hoàn toàn
   - Mỗi commit = một đơn vị nhỏ logic (1 file / 1 chức năng nhỏ)
   - Trải dài nhiều ngày, không làm ào ào 1 lúc
   - Lý do: git history phải thuyết phục, không ai nghi ngờ là copy
   - Feature branch → PR → merge, không skip bước nào

3. **Tài liệu phải cập nhật cùng với code** — không để tài liệu lạc hậu
4. **Branding PM cũ không được lộ ra ngoài** — xóa sạch trước khi commit

---

## 🔄 Branding cần thay đổi (PM cũ → PM mới)

| Thứ cần đổi | PM cũ (Deplao) | PM mới (Phanle) |
|-------------|---------------|----------------|
| Tên app | Deplao | Phanle |
| appId | com.Deplao.app | com.Phanle.app |
| DB file | deplao-tool.db | phanle-tool.db |
| Config file | deplao-config.json | phanle-config.json |
| Protocol scheme | deplao:// | phanle:// |
| userData folder | Deplao | Phanle |
| GitHub repo | babyvibe/deplao-builder | [TBD] |
| Website | deplaoapp.com | [TBD] |
| Deep link scheme | deplao | phanle |
| NSIS artifact | Deplao-Setup-*.exe | Phanle-Setup-*.exe |
| DMG title | Deplao | Phanle |

> **TBD** = cần bạn xác nhận

---

## ⚠️ Gotchas kỹ thuật từ PM cũ

### 1. E2EE Bridge (Go)
- Chỉ cần build trên **Linux** (Ubuntu CI)
- Windows/macOS bỏ qua bước này — app vẫn chạy nhưng không có E2EE Zalo
- Script: `npm run build:bridge-e2ee`

### 2. npm install phải dùng `--legacy-peer-deps`
- Nhiều deps conflict peer dependencies
- Bắt buộc: `npm ci --legacy-peer-deps`

### 3. better-sqlite3 — native module
- Cần rebuild cho đúng Electron version
- Script `postinstall` xử lý tự động
- `asarUnpack` trong electron-builder để không bị nén

### 4. Database secondary cache
- Có cơ chế cache 30s cho secondary DB (workspace switching)
- Auto-close để tránh memory leak

### 5. Workspace DB path
- WorkspaceManager phải init TRƯỚC DatabaseService
- Fallback: đọc `phanle-config.json` trong userData
- Nếu không có → dùng mặc định userData

### 6. Cloudflare Tunnel
- Dùng cho Boss ↔ Nhân viên qua WAN
- Binary `cloudflared` đi kèm trong `asarUnpack`
- Cần unpack ra ngoài asar mới chạy được

### 7. ffmpeg-static
- Cũng cần `asarUnpack`
- Dùng cho xử lý video trong FileStorage

### 8. Socket.IO vs SSE
- v26.7.3: đã migrate từ SSE sang Socket.IO cho relay
- Socket.IO ổn định hơn với reconnect

### 9. DataAccessor routing
- Standalone/Boss mode → IPC trực tiếp
- Employee mode → RestQueryService → HTTP → Boss
- Logic này trong `DataAccessor.ts`

### 10. vite-plugin-javascript-obfuscator
- Code obfuscation khi production build
- Có thể gây chậm build — cân nhắc disable khi dev

---

## 🏗️ Kiến trúc quyết định

### ADR-001: Local-first SQLite
- **Quyết định:** Dùng SQLite thay vì server DB
- **Lý do:** Bảo mật, offline-first, người dùng kiểm soát data
- **Hệ quả:** Không có multi-device sync real-time (trừ Boss↔Employee relay)

### ADR-002: Electron + React
- **Quyết định:** Desktop app dùng Electron + React + Vite
- **Lý do:** Cross-platform, web tech quen thuộc, ecosystem phong phú
- **Hệ quả:** Bundle lớn (~150-200MB), nhưng phù hợp use case

### ADR-003: Socket.IO cho relay
- **Quyết định:** Dùng Socket.IO thay SSE cho Boss↔Employee
- **Lý do:** Reconnect tự động, bi-directional, ổn định hơn
- **Hệ quả:** Cần cấu hình CORS và auth token

---

## 📝 Ghi chú Sprint

### Sprint 0 (2026-07-23 → TBD)
- Bắt đầu dự án
- Tạo tài liệu nền
- Chờ xác nhận: tên chính thức, GitHub repo, domain

---

## ❓ Cần xác nhận từ bạn

- [ ] Tên chính thức app (hiển thị UI/installer) là **Phanle** hay khác?
- [ ] GitHub username/org cho repo PM mới?
- [ ] Domain / website landing page?
- [ ] App ID cuối cùng (com.xxx.app)?
- [ ] Claude contributor: email/username GitHub của Claude để add vào?
