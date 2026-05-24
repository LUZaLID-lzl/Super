export type AppTheme = 'light' | 'dark' | 'system';
export type AppLanguage = 'zh-CN' | 'en-US';
export type BackgroundType = 'solid' | 'gradient' | 'image';
export type ToolSortBy = 'manual' | 'name';

export interface BackgroundSettings {
  type: BackgroundType;
  value: string;
}

export interface ToolDisplaySettings {
  showIcon: boolean;
  showText: boolean;
  iconSize: number;
  sortBy: ToolSortBy;
}

export interface AppSettings {
  theme: AppTheme;
  language: AppLanguage;
  background: BackgroundSettings;
  toolDisplay: ToolDisplaySettings;
}

export interface ToolConfig {
  id: string;
  name: string;
  icon: string;
  path: string;
  visible: boolean;
  order: number;
  description?: string;
}

export interface ToolboxApi {
  readSettings: () => Promise<AppSettings>;
  writeSettings: (settings: AppSettings) => Promise<AppSettings>;
  readTools: () => Promise<ToolConfig[]>;
  getSystemTheme: () => Promise<'light' | 'dark'>;
}
