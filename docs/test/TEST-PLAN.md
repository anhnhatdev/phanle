# Test Plan — Phanle

> Phương pháp: Unit Test (Jest) + Manual E2E

---

## Chiến lược test

| Layer | Tool | Phạm vi |
|-------|------|---------|
| Unit test | Jest + ts-jest | Services, utils, helpers |
| Integration | Jest + better-sqlite3 in-memory | DatabaseService |
| Manual E2E | Dev chạy app | Chat, CRM, Workflow UI flows |
| CI | GitHub Actions (test.yml) | Tự động chạy khi PR/push |

---

## Scope unit test (ưu tiên)

### 1. DatabaseService
- [ ] Initialize tạo đúng tables
- [ ] CRUD messages
- [ ] CRUD contacts
- [ ] CRM tags, notes, campaigns
- [ ] Workflow CRUD
- [ ] Employee permissions

### 2. WorkflowEngine
- [ ] Parse nodes/edges JSON
- [ ] Execute trigger conditions
- [ ] Execute actions (mock)
- [ ] Lịch sử chạy được ghi đúng

### 3. Utils
- [ ] Logger
- [ ] WorkspaceManager path resolve
- [ ] Cookie encryption/decryption

### 4. AI Assistant
- [ ] Build request payload đúng format
- [ ] Parse response
- [ ] Error handling (rate limit, timeout)

---

## Test config hiện tại (jest.config.js)

```js
// Cấu hình jest.config.js chuẩn
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: { ... }
}
```

---

## Cấu trúc thư mục test

```
src/
  __tests__/
    database/
      DatabaseService.test.ts
    services/
      WorkflowEngine.test.ts
      AIAssistant.test.ts
    utils/
      WorkspaceManager.test.ts
```

---

## Manual Test Checklist (trước mỗi release)

### Auth
- [ ] Đăng nhập Zalo QR thành công
- [ ] Đăng nhập Facebook cookie thành công
- [ ] Switch tài khoản không bị lỗi

### Chat
- [ ] Gửi văn bản
- [ ] Gửi ảnh, file
- [ ] Nhận tin nhắn realtime
- [ ] Inbox hợp nhất đa tài khoản

### CRM
- [ ] Tạo nhãn, gán cho liên hệ
- [ ] Tạo campaign, chạy thử
- [ ] Lọc liên hệ

### Workflow
- [ ] Tạo workflow đơn giản (trigger → action)
- [ ] Workflow chạy tự động
- [ ] Xem log

### Build
- [ ] `npm run dev` khởi động không lỗi
- [ ] `npm run production` build thành công
- [ ] Installer chạy được trên Windows

---

## CI Test

Chạy tự động khi:
- Push lên `main`
- Tạo PR → `main`

Command: `npm test`
Timeout: 5 phút
