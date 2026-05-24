const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('toolboxApi', {
  readSettings: () => ipcRenderer.invoke('settings:read'),
  writeSettings: (settings) => ipcRenderer.invoke('settings:write', settings),
  readTools: () => ipcRenderer.invoke('tools:read'),
  getSystemTheme: () => ipcRenderer.invoke('theme:system')
});
