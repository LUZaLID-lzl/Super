import type { ToolboxApi } from './app';

declare global {
  interface Window {
    toolboxApi?: ToolboxApi;
  }
}

export {};
