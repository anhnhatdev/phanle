import * as fs from 'fs';
import * as path from 'path';

const CONFIG_FILENAME = 'phanle-config.json';
const DB_FILENAME = 'phanle-tool.db';

interface WorkspaceConfig {
  workspacePath: string;
  lastOpenedAt: number;
}

export class WorkspaceManager {
  private static instance: WorkspaceManager;
  private configPath: string;
  private config: WorkspaceConfig | null = null;
  private defaultDataPath: string;

  private constructor(userDataPath: string) {
    this.defaultDataPath = userDataPath;
    this.configPath = path.join(userDataPath, CONFIG_FILENAME);
  }

  public static getInstance(userDataPath?: string): WorkspaceManager {
    if (!WorkspaceManager.instance) {
      if (!userDataPath) throw new Error('WorkspaceManager requires userDataPath on first init');
      WorkspaceManager.instance = new WorkspaceManager(userDataPath);
    }
    return WorkspaceManager.instance;
  }

  public load(): void {
    if (!fs.existsSync(this.configPath)) return;
    try {
      const raw = fs.readFileSync(this.configPath, 'utf-8');
      this.config = JSON.parse(raw) as WorkspaceConfig;
    } catch {
      this.config = null;
    }
  }

  public getDbPath(): string {
    const workspace = this.config?.workspacePath;
    if (workspace && fs.existsSync(workspace)) {
      return path.join(workspace, DB_FILENAME);
    }
    return path.join(this.defaultDataPath, DB_FILENAME);
  }

  public setWorkspacePath(newPath: string): void {
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath, { recursive: true });
    }
    this.config = { workspacePath: newPath, lastOpenedAt: Date.now() };
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
  }

  public getCurrentWorkspace(): string {
    return this.config?.workspacePath || this.defaultDataPath;
  }

  public resetToDefault(): void {
    this.config = null;
    if (fs.existsSync(this.configPath)) {
      fs.unlinkSync(this.configPath);
    }
  }
}

export default WorkspaceManager;
