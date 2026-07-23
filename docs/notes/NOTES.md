# Ghi chú & Quyết định — Phanle

> Ghi lại những điều quan trọng, gotchas kỹ thuật và các quy trình phát triển phần mềm Phanle.

---

## 📌 Quy tắc phát triển bất biến

1. **KHÔNG commit thẳng vào main** — tất cả tính năng và cập nhật phải thông qua PR.
2. **KHÔNG push code khi chưa được duyệt** — luôn hỏi ý kiến và xác nhận trước khi thực hiện push hay merge.
3. **Phát triển từng phần nhỏ (Atomic Commits)** — viết code mới từng file/module từ đầu, đảm bảo commit sạch và rõ ràng.
4. **Tài liệu phải đi kèm code** — cập nhật `docs/` song song với tiến độ công việc.
5. **Git Flow chuẩn Agile Scrum** — làm việc trên nhánh tính năng (`feat/...`, `fix/...`), tạo PR lên `main`, review và merge.

---

## ⚙️ Cấu hình định danh phần mềm Phanle

| Thông số | Giá trị chuẩn |
|----------|---------------|
| Tên phần mềm | **Phanle** |
| Application ID | `com.phanle.app` |
| Database File | `phanle-tool.db` |
| Config File | `phanle-config.json` |
| Deep Link Protocol | `phanle://` |
| Application UserData | `Phanle` |
| GitHub Repository | `anhnhatdev/phanle` |
| NSIS Installer | `Phanle-Setup-*.exe` |
| DMG Volume Name | `Phanle` |

---

## ⚠️ Gotchas & Lưu ý Kỹ thuật

### 1. E2EE Bridge (Go)
- Chỉ cần biên dịch trên **Linux** (Ubuntu CI/CD).
- Trên Windows/macOS có thể bỏ qua bước này nếu chưa cấu hình Go — ứng dụng vẫn khởi chạy bình thường.
- Script: `npm run build:bridge-e2ee`

### 2. Quản lý Dependencies
- Do một số thư viện có phiên bản peer dependencies chéo nhau, khuyến nghị cài đặt bằng:
  ```bash
  npm install --legacy-peer-deps
  ```

### 3. Native Module `better-sqlite3`
- SQLite native module cần unpack khỏi ASAR khi đóng gói ứng dụng Electron:
  Thêm `node_modules/better-sqlite3/**` vào mục `asarUnpack` trong cấu hình `electron-builder`.

### 4. Cache Secondary Database
- Hỗ trợ cơ chế cache kết nối DB thứ hai trong khoảng 30s khi chuyển đổi Workspace để tối ưu hiệu năng I/O.

### 5. Khởi tạo Workspace Database Path
- `WorkspaceManager` cần khởi tạo trước `DatabaseService` để xác định chính xác đường dẫn SQLite DB chủ động.

### 6. Cloudflare Tunnel & ffmpeg-static
- Binary `cloudflared` và `ffmpeg-static` cần đặt trong `asarUnpack` để Electron có thể thực thi trực tiếp từ hệ thống tệp.

---

## 🏗️ Quyết định Kiến trúc (ADR)

### ADR-001: Local-first SQLite
- **Quyết định:** Sử dụng SQLite (`better-sqlite3`) cục bộ.
- **Lý do:** Đảm bảo tốc độ xử lý cao, bảo mật dữ liệu khách hàng tuyệt đối trên máy local.

### ADR-002: Electron + React + Vite
- **Quyết định:** Xây dựng ứng dụng desktop cross-platform với React 18, Vite 6 và Electron 41.
- **Lý do:** Tận dụng hệ sinh thái phong phú, UI mượt mà, hỗ trợ TypeScript strict mode.

### ADR-003: Realtime Communication với Socket.IO
- **Quyết định:** Sử dụng Socket.IO cho luồng truyền tải dữ liệu thời gian thực Boss ↔ Nhân viên.
- **Lý do:** Tự động khôi phục kết nối, hỗ trợ giao tiếp hai chiều ổn định qua mạng LAN/WAN.
