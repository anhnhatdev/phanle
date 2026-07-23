# Database Schema — Phanle

> SQLite (better-sqlite3) | WAL mode | Local-first

---

## Tổng quan

Tên file DB: `phanle-tool.db` (thay vì `deplao-tool.db`)
Vị trí mặc định: `%APPDATA%/Phanle/` (Windows), `~/Library/Application Support/Phanle/` (macOS)
Workspace: người dùng có thể đổi thư mục lưu trữ

---

## Core Tables

### accounts
```sql
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,             -- Zalo UID / FB UID
  platform TEXT NOT NULL,          -- 'zalo' | 'facebook'
  name TEXT,
  avatar TEXT,
  phone TEXT,
  cookie TEXT,                     -- encrypted via safeStorage
  session_data TEXT,               -- JSON session
  proxy_id TEXT,
  status TEXT DEFAULT 'offline',   -- 'online' | 'offline' | 'error'
  created_at INTEGER,
  updated_at INTEGER
);
```

### messages
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  sender_id TEXT,
  content TEXT,
  type TEXT,                       -- 'text' | 'image' | 'video' | 'file' | 'sticker'
  media_url TEXT,
  local_path TEXT,
  is_from_me INTEGER DEFAULT 0,
  status TEXT,                     -- 'sent' | 'delivered' | 'read' | 'error'
  timestamp INTEGER,
  raw_data TEXT,                   -- JSON raw from protocol
  created_at INTEGER
);
```

### contacts
```sql
CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  platform TEXT,
  name TEXT,
  alias TEXT,
  phone TEXT,
  avatar TEXT,
  gender TEXT,
  birthday TEXT,
  dob INTEGER,
  type TEXT,                       -- 'friend' | 'group_member' | 'page'
  group_id TEXT,
  raw_data TEXT,
  updated_at INTEGER,
  created_at INTEGER
);
```

---

## CRM Tables

### crm_tags
```sql
CREATE TABLE crm_tags (
  id TEXT PRIMARY KEY,
  account_id TEXT,
  name TEXT NOT NULL,
  color TEXT,
  zalo_tag_id TEXT,               -- sync với Zalo
  created_at INTEGER
);
```

### crm_contact_tags
```sql
CREATE TABLE crm_contact_tags (
  contact_id TEXT,
  tag_id TEXT,
  account_id TEXT,
  PRIMARY KEY (contact_id, tag_id)
);
```

### crm_notes
```sql
CREATE TABLE crm_notes (
  id TEXT PRIMARY KEY,
  contact_id TEXT NOT NULL,
  account_id TEXT,
  content TEXT,
  created_by TEXT,
  created_at INTEGER,
  updated_at INTEGER
);
```

### crm_campaigns
```sql
CREATE TABLE crm_campaigns (
  id TEXT PRIMARY KEY,
  account_id TEXT,
  name TEXT,
  type TEXT,                       -- 'message' | 'friend_request' | 'invite_group'
  status TEXT,                     -- 'draft' | 'running' | 'paused' | 'done' | 'error'
  config TEXT,                     -- JSON
  total INTEGER DEFAULT 0,
  sent INTEGER DEFAULT 0,
  failed INTEGER DEFAULT 0,
  created_at INTEGER,
  updated_at INTEGER
);
```

### crm_campaign_contacts
```sql
CREATE TABLE crm_campaign_contacts (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  contact_id TEXT,
  status TEXT,                     -- 'pending' | 'sent' | 'failed' | 'skip'
  error TEXT,
  sent_at INTEGER
);
```

---

## Workflow Tables

### workflows
```sql
CREATE TABLE workflows (
  id TEXT PRIMARY KEY,
  account_id TEXT,
  name TEXT,
  description TEXT,
  enabled INTEGER DEFAULT 0,
  nodes TEXT,                      -- JSON ReactFlow nodes
  edges TEXT,                      -- JSON ReactFlow edges
  trigger_config TEXT,             -- JSON
  created_at INTEGER,
  updated_at INTEGER
);
```

### workflow_run_logs
```sql
CREATE TABLE workflow_run_logs (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  status TEXT,                     -- 'success' | 'error' | 'running'
  trigger_data TEXT,               -- JSON
  result TEXT,                     -- JSON
  error TEXT,
  started_at INTEGER,
  finished_at INTEGER
);
```

---

## AI Tables

### ai_assistants
```sql
CREATE TABLE ai_assistants (
  id TEXT PRIMARY KEY,
  name TEXT,
  platform TEXT,                   -- 'openai' | 'claude' | 'gemini' | '9router'
  model TEXT,
  system_prompt TEXT,
  config TEXT,                     -- JSON (api_key, base_url, ...)
  created_at INTEGER
);
```

### ai_usage_logs
```sql
CREATE TABLE ai_usage_logs (
  id TEXT PRIMARY KEY,
  assistant_id TEXT,
  account_id TEXT,
  tokens_input INTEGER,
  tokens_output INTEGER,
  cost REAL,
  created_at INTEGER
);
```

---

## Employee Tables

### employees
```sql
CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT,                       -- 'admin' | 'employee'
  status TEXT DEFAULT 'active',
  created_at INTEGER,
  updated_at INTEGER
);
```

### employee_permissions
```sql
CREATE TABLE employee_permissions (
  employee_id TEXT NOT NULL,
  module TEXT NOT NULL,            -- 'chat' | 'crm' | 'workflow' | 'erp' | ...
  can_read INTEGER DEFAULT 1,
  can_write INTEGER DEFAULT 0,
  PRIMARY KEY (employee_id, module)
);
```

### employee_account_access
```sql
CREATE TABLE employee_account_access (
  employee_id TEXT NOT NULL,
  account_id TEXT NOT NULL,        -- Zalo/FB account được phân quyền
  PRIMARY KEY (employee_id, account_id)
);
```

---

## ERP Tables

### erp_tasks
```sql
CREATE TABLE erp_tasks (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT,                     -- 'todo' | 'in_progress' | 'done'
  priority TEXT,
  assignee_id TEXT,
  due_date INTEGER,
  created_by TEXT,
  created_at INTEGER,
  updated_at INTEGER
);
```

### erp_calendar_events
```sql
CREATE TABLE erp_calendar_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time INTEGER,
  end_time INTEGER,
  attendees TEXT,                  -- JSON
  reminder_minutes INTEGER,
  created_by TEXT,
  created_at INTEGER
);
```

### erp_notes
```sql
CREATE TABLE erp_notes (
  id TEXT PRIMARY KEY,
  folder_id TEXT,
  title TEXT,
  content TEXT,                    -- Rich text (Quill delta JSON)
  tags TEXT,                       -- JSON array
  created_by TEXT,
  created_at INTEGER,
  updated_at INTEGER
);
```

---

## Facebook Tables

### fb_accounts
```sql
CREATE TABLE fb_accounts (
  id TEXT PRIMARY KEY,
  name TEXT,
  avatar TEXT,
  cookie TEXT,                     -- encrypted
  status TEXT,
  e2ee_enabled INTEGER DEFAULT 0,
  session_data TEXT,               -- JSON
  created_at INTEGER
);
```

### fb_threads
```sql
CREATE TABLE fb_threads (
  id TEXT PRIMARY KEY,
  fb_account_id TEXT NOT NULL,
  type TEXT,                       -- 'USER' | 'GROUP' | 'PAGE'
  name TEXT,
  avatar TEXT,
  last_message TEXT,
  last_message_time INTEGER,
  unread_count INTEGER DEFAULT 0,
  updated_at INTEGER
);
```

---

## Proxy Table

### proxies
```sql
CREATE TABLE proxies (
  id TEXT PRIMARY KEY,
  name TEXT,
  type TEXT,                       -- 'http' | 'socks5'
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT,
  password TEXT,
  account_id TEXT,                 -- null = chưa gán
  created_at INTEGER
);
```

---

## Settings

- `electron-store`: cookies, tokens, app settings (JSON, encrypted)
- `phanle-config.json`: custom dbFolder path (trong userData)

---

## Migration Strategy

- Schema được khởi tạo trong `DatabaseService.initialize()`
- Dùng `IF NOT EXISTS` + `ALTER TABLE` để migrate thêm column
- Không xóa column cũ để backward compat
- Version schema lưu trong `PRAGMA user_version`
