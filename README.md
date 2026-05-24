# Super

Cat Toolbox 是一个基于 Electron + Vue 3 + Vite 的 Windows 桌面工具盒应用骨架。

## 功能

- Electron 桌面壳与 Vue 渲染层
- Ubuntu Dock 风格左侧工具栏
- 动态首页 Logo
- 设置中心：主题、背景、语言、工具显示
- 本地 JSON 配置：`app-data/settings.json`、`app-data/tools.json`
- 配置驱动工具入口
- 示例工具：JSON 格式化
- 预留 AI 服务接口层：`src/services/ai`

## 开发

```bash
npm install
npm run dev
```

如果系统没有全局 npm，可以使用项目内的 portable Node：

```powershell
.\npm.cmd install
.\dev.cmd
```

## 构建

```bash
npm run build
npm run dist:win
```

## 目录

```text
electron/                 Electron 主进程和预加载脚本
app-data/                 本地 JSON 配置
src/components/           通用组件
src/config/               默认配置
src/router/               Vue Router
src/stores/               Pinia 状态
src/views/                页面和工具模块
src/services/ai/          AI 能力预留接口
src/styles/               全局样式
```
