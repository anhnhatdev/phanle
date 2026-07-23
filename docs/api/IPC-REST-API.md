# API Contract — IPC & REST Relay

> Tài liệu nội bộ: IPC channels giữa Renderer ↔ Main Process
> và REST API Boss ↔ Nhân viên

---

## 1. IPC Channels (Renderer → Main)

### Login / Auth

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `login:zalo-qr` | `{ accountId? }` | QR image base64 | loginIpc.ts |
| `login:zalo-check` | `{ accountId }` | `{ success, account }` | loginIpc.ts |
| `login:facebook` | `{ username, password }` | `{ success, account }` | loginIpc.ts |
| `login:facebook-cookie` | `{ cookie }` | `{ success, account }` | loginIpc.ts |
| `login:logout` | `{ accountId }` | `{ success }` | loginIpc.ts |

### Zalo

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `zalo:send-message` | `{ accountId, threadId, content, type }` | `{ msgId }` | workspaceIpc.ts |
| `zalo:get-conversations` | `{ accountId, limit, offset }` | `Conversation[]` | workspaceIpc.ts |
| `zalo:get-messages` | `{ accountId, threadId, limit }` | `Message[]` | workspaceIpc.ts |
| `zalo:send-image` | `{ accountId, threadId, imagePath }` | `{ success }` | workspaceIpc.ts |
| `zalo:send-file` | `{ accountId, threadId, filePath }` | `{ success }` | workspaceIpc.ts |

### Facebook

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `fb:get-threads` | `{ accountId }` | `FBThread[]` | facebookIpc.ts |
| `fb:send-message` | `{ accountId, threadId, content }` | `{ success }` | facebookIpc.ts |
| `fb:get-messages` | `{ accountId, threadId }` | `FBMessage[]` | facebookIpc.ts |

### CRM

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `crm:get-contacts` | `{ filter? }` | `Contact[]` | crmIpc.ts |
| `crm:add-note` | `{ contactId, content }` | `{ noteId }` | crmIpc.ts |
| `crm:create-campaign` | `CampaignConfig` | `{ campaignId }` | crmIpc.ts |
| `crm:start-campaign` | `{ campaignId }` | `{ success }` | crmIpc.ts |
| `crm:get-tags` | `{ accountId }` | `CRMTag[]` | crmIpc.ts |
| `crm:assign-tag` | `{ contactId, tagId }` | `{ success }` | crmIpc.ts |

### Database

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `db:query` | `{ sql, params }` | `rows[]` | databaseIpc.ts |
| `db:run` | `{ sql, params }` | `{ changes }` | databaseIpc.ts |
| `db:get-messages` | `{ threadId, limit }` | `Message[]` | databaseIpc.ts |
| `db:get-contacts` | `{ filter }` | `Contact[]` | databaseIpc.ts |

### Workflow

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `workflow:list` | `{}` | `Workflow[]` | workflowIpc.ts |
| `workflow:save` | `WorkflowData` | `{ id }` | workflowIpc.ts |
| `workflow:toggle` | `{ id, enabled }` | `{ success }` | workflowIpc.ts |
| `workflow:run-logs` | `{ workflowId }` | `RunLog[]` | workflowIpc.ts |

### Employee

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `employee:list` | `{}` | `Employee[]` | employeeIpc.ts |
| `employee:create` | `EmployeeData` | `{ id }` | employeeIpc.ts |
| `employee:set-permissions` | `{ empId, permissions }` | `{ success }` | employeeIpc.ts |
| `employee:login` | `{ username, password }` | `{ token }` | lockScreenIpc.ts |

### AI Assistant

| Channel | Input | Output | File |
|---------|-------|--------|------|
| `ai:chat` | `{ assistantId, messages }` | `{ reply }` | aiAssistantIpc.ts |
| `ai:suggest-reply` | `{ threadId, lastMessages }` | `{ suggestions[] }` | aiAssistantIpc.ts |
| `ai:create-workflow` | `{ prompt }` | `WorkflowDraft` | aiAssistantIpc.ts |

---

## 2. REST API — Boss ↔ Nhân viên

Base URL: `http://<boss-ip>:9900`

### Auth

| Method | Path | Body | Response |
|--------|------|------|---------|
| POST | `/api/auth/login` | `{ username, password }` | `{ token }` |

### Query (Employee đọc dữ liệu từ Boss)

| Method | Path | Body | Response |
|--------|------|------|---------|
| POST | `/api/query` | `{ sql, params, dbPath? }` | `{ rows[] }` |
| POST | `/api/command` | `{ channel, args }` | IPC result |

### Library

| Method | Path | Response |
|--------|------|---------|
| GET | `/api/library/quick-messages` | `QuickMessage[]` |
| GET | `/api/library/templates` | `Template[]` |

### Media

| Method | Path | Response |
|--------|------|---------|
| GET | `/api/media/:path` | File stream |

### Events (Socket.IO)

| Event | Direction | Payload |
|-------|-----------|---------|
| `new-message` | Boss → Employee | `{ accountId, message }` |
| `account-status` | Boss → Employee | `{ accountId, status }` |
| `workflow-log` | Boss → Employee | `WorkflowRunLog` |

---

## 3. IPC Events (Main → Renderer)

| Event | Payload | Mô tả |
|-------|---------|-------|
| `zalo:new-message` | `{ accountId, message }` | Tin nhắn Zalo mới |
| `fb:new-message` | `{ accountId, message }` | Tin nhắn FB mới |
| `account:status-change` | `{ accountId, status }` | Account online/offline |
| `workflow:log` | `WorkflowRunLog` | Workflow chạy xong |
| `update:available` | `{ version }` | Có phiên bản mới |
