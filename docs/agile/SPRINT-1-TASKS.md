# Sprint 1 — Tasks

**Goal:** App chạy được với branding Phanle, repo GitHub, CI/CD xanh
**Repo:** https://github.com/anhnhatdev/phanle.git
**Bắt đầu:** 2026-07-23

---

## Tasks

- [ ] Copy toàn bộ source từ PM cũ → PM mới
- [ ] Đổi branding: package.json (name, appId, description, URLs)
- [ ] Đổi branding: electron/main.ts (DB name, config name, scheme)
- [ ] Đổi branding: GitHub Actions workflows (repo name, app name)
- [ ] Đổi branding: README.md mới (clean, không lộ PM cũ)
- [ ] Tìm & thay tất cả string "deplao" / "Deplao" còn sót
- [ ] Git init + remote add origin
- [ ] .gitignore đúng
- [ ] npm install --legacy-peer-deps → thành công
- [ ] npm run dev → chạy được (verify)
- [ ] Tạo branch `feat/sprint1-branding` 
- [ ] Commit code lên branch
- [ ] **[Hỏi bạn]** tạo PR → main trên GitHub
- [ ] Setup GitHub Actions: test.yml
- [ ] Setup GitHub Actions: build-all.yml (đổi repo name)
- [ ] PR template + Issue templates
- [ ] **[Hỏi bạn]** merge PR + push main

---

## Branding thay thế

| Cũ | Mới |
|----|-----|
| `Deplao` | `Phanle` |
| `deplao` | `phanle` |
| `com.Deplao.app` | `com.phanle.app` |
| `deplao-tool.db` | `phanle-tool.db` |
| `deplao-config.json` | `phanle-config.json` |
| `deplao://` (scheme) | `phanle://` |
| `babyvibe/deplao-builder` | `anhnhatdev/phanle` |
| `deplaoapp.com` | `[remove/placeholder]` |
| `babyvibe@users.noreply.github.com` | `anhnhatdev@users.noreply.github.com` |
