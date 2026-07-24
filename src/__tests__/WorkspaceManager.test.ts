import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { WorkspaceManager } from '../services/workspace/WorkspaceManager';

describe('WorkspaceManager', () => {
  let tmpDir: string;
  let manager: WorkspaceManager;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'phanle-test-'));
    // Reset singleton for each test
    (WorkspaceManager as any).instance = undefined;
    manager = WorkspaceManager.getInstance(tmpDir);
    manager.load();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    (WorkspaceManager as any).instance = undefined;
  });

  it('should return default DB path when no workspace configured', () => {
    const dbPath = manager.getDbPath();
    expect(dbPath).toContain('phanle-tool.db');
    expect(dbPath).toContain(tmpDir);
  });

  it('should set and persist a custom workspace path', () => {
    const customPath = path.join(tmpDir, 'custom-workspace');
    manager.setWorkspacePath(customPath);

    expect(manager.getCurrentWorkspace()).toBe(customPath);
    expect(manager.getDbPath()).toBe(path.join(customPath, 'phanle-tool.db'));

    const configFile = path.join(tmpDir, 'phanle-config.json');
    expect(fs.existsSync(configFile)).toBe(true);
  });

  it('should reset workspace to default', () => {
    const customPath = path.join(tmpDir, 'custom-workspace');
    manager.setWorkspacePath(customPath);
    manager.resetToDefault();

    expect(manager.getCurrentWorkspace()).toBe(tmpDir);
  });
});
