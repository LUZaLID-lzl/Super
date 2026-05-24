

------

# Electron + Vue Windows 工具盒应用开发文档

## 一、项目目标

本项目计划开发一款基于 **Electron + Vue** 的 Windows 桌面工具盒应用。应用以本地工具集为核心，支持后续持续扩展工具模块，并预留大模型能力接入空间。整体设计需具备良好的模块化、可扩展性和本地化配置能力。

## 二、技术栈

- 桌面框架：Electron
- 前端框架：Vue 3
- 构建工具：Vite
- 状态管理：Pinia
- 路由管理：Vue Router
- 本地存储：JSON 文件
- UI 样式：SCSS / CSS Variables
- 运行平台：Windows

## 三、整体界面结构

应用整体采用「主页展示区 + 左侧工具栏 + 设置中心」的布局结构。

### 1. 主页

主页为应用启动后的默认页面。

页面中间展示当前应用 Logo，Logo 图标以动物形象为主，风格类似 Firefox，但动物设定为「猫咪」。Logo 需要支持动态展示效果，例如轻微呼吸、旋转、漂浮或渐变动画。

Logo 下方预留应用名称、欢迎语或当前状态说明，例如：

```text
Cat Toolbox
一个轻量级 Windows 工具盒
```

主页组件建议结构：

```text
HomeView
├── AppLogo
├── AppTitle
└── AppDescription
```

### 2. 左侧工具栏

应用左侧实现类似 Ubuntu Dock 的侧边栏，用于展示工具入口。

侧边栏固定在窗口左侧，垂直排列工具图标。每个工具由图标、名称、激活状态组成，点击后切换到对应工具页面。

组件结构建议：

```text
Sidebar
├── ToolIconItem
├── ToolIconItem
└── ToolIconItem
```

工具配置示例：

```json
{
  "id": "json-formatter",
  "name": "JSON 格式化",
  "icon": "json.svg",
  "path": "/tools/json-formatter",
  "visible": true
}
```

### 3. 设置界面

设置界面用于管理应用的基础配置和工具显示方式。

需要支持以下配置：

- 主题设置：浅色、深色、跟随系统
- 背景设置：纯色、渐变、图片背景
- 语言设置：中文、英文
- 工具显示设置：是否显示图标、是否显示文字、图标大小、排序方式

设置页组件结构建议：

```text
SettingsView
├── ThemeSettings
├── BackgroundSettings
├── LanguageSettings
└── ToolDisplaySettings
```

样式变量建议提前定义：

```css
:root {
  --app-bg-color: #f5f6fa;
  --sidebar-bg-color: rgba(255, 255, 255, 0.85);
  --text-color: #1f2937;
  --primary-color: #ff7a45;
  --border-radius: 12px;
}
```

## 四、工具模块扩展设计

后续工具会持续增加，因此工具模块需要采用插件化或配置化设计。

推荐目录结构：

```text
src/
├── views/
│   ├── HomeView.vue
│   ├── SettingsView.vue
│   └── tools/
├── components/
│   ├── Sidebar.vue
│   ├── AppLogo.vue
│   └── ToolIconItem.vue
├── stores/
├── router/
├── styles/
└── config/
```

每个工具建议独立成一个模块：

```text
tools/
└── json-formatter/
    ├── index.vue
    ├── config.json
    └── utils.ts
```

## 五、本地存储设计

应用配置和工具配置统一存储在本地工具目录下，采用 JSON 格式。

推荐存储路径：

```text
app-data/
├── settings.json
├── tools.json
└── user-preferences.json
```

`settings.json` 示例：

```json
{
  "theme": "system",
  "language": "zh-CN",
  "background": {
    "type": "gradient",
    "value": "linear-gradient(135deg, #ffecd2, #fcb69f)"
  },
  "toolDisplay": {
    "showIcon": true,
    "showText": true,
    "iconSize": 32
  }
}
```

## 六、大模型接入预留

后续应用可能接入大模型能力，因此需提前预留统一接口层。

建议新增：

```text
src/services/ai/
├── index.ts
├── providers/
└── types.ts
```

未来可支持：

- 本地模型
- OpenAI API
- 其他第三方模型服务
- 工具调用能力
- 对话式工具控制

## 七、开发要求

1. 应用必须支持 Windows 平台打包运行。
2. UI 结构需要模块化，方便后续扩展。
3. 工具入口必须通过配置文件动态加载。
4. 设置项需要持久化到本地 JSON 文件。
5. 主题、语言、背景等配置修改后应即时生效。
6. 后续新增工具时，应尽量不修改主框架代码。
7. 为大模型功能预留服务层和配置入口。

## 八、总结

本项目核心目标是构建一个轻量、可扩展、可配置的 Windows 工具盒应用。前期重点完成基础框架、主页、侧边栏、设置中心和本地 JSON 存储能力；后续在此基础上逐步扩展工具模块，并接入大模型能力。