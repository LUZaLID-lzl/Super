const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');

const isDev = !app.isPackaged;
const appDataDir = isDev
  ? path.join(__dirname, '..', 'app-data')
  : path.join(app.getPath('userData'), 'app-data');
const appIconPath = isDev
  ? path.join(__dirname, '..', 'build', 'icon.ico')
  : path.join(process.resourcesPath, 'icon.ico');

const defaultSettings = {
  theme: 'system',
  language: 'zh-CN',
  background: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #fff7ed 0%, #dff7f3 52%, #eef2ff 100%)'
  },
  toolDisplay: {
    showIcon: true,
    showText: true,
    iconSize: 32,
    sortBy: 'manual'
  }
};

const defaultTools = [
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    icon: '{}',
    path: '/tools/json-formatter',
    visible: true,
    order: 10,
    description: '格式化、压缩并校验 JSON 内容'
  }
];

async function ensureFile(fileName, fallback) {
  await fs.mkdir(appDataDir, { recursive: true });
  const filePath = path.join(appDataDir, fileName);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`Resetting invalid ${fileName}:`, error);
    }
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

async function writeJson(fileName, data) {
  await fs.mkdir(appDataDir, { recursive: true });
  const filePath = path.join(appDataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 920,
    minHeight: 620,
    backgroundColor: '#f5f6fa',
    title: 'Cat Toolbox',
    icon: appIconPath,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    win.loadURL('http://127.0.0.1:5173');
    if (process.env.OPEN_DEVTOOLS === '1') {
      win.webContents.openDevTools({ mode: 'detach' });
    }
    return;
  }

  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

app.whenReady().then(async () => {
  app.setAppUserModelId('com.super.toolbox');

  await ensureFile('settings.json', defaultSettings);
  await ensureFile('tools.json', defaultTools);

  ipcMain.handle('settings:read', () => ensureFile('settings.json', defaultSettings));
  ipcMain.handle('settings:write', (_event, settings) => writeJson('settings.json', settings));
  ipcMain.handle('tools:read', () => ensureFile('tools.json', defaultTools));
  ipcMain.handle('theme:system', () => nativeTheme.shouldUseDarkColors ? 'dark' : 'light');

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
