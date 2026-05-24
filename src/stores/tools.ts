import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { defaultTools } from '@/config/defaultTools';
import { useSettingsStore } from './settings';
import type { ToolConfig } from '@/types/app';

function copyTools(tools: ToolConfig[]): ToolConfig[] {
  return JSON.parse(JSON.stringify(tools)) as ToolConfig[];
}

export const useToolsStore = defineStore('tools', () => {
  const tools = ref<ToolConfig[]>(copyTools(defaultTools));
  const ready = ref(false);

  const visibleTools = computed(() => {
    const settingsStore = useSettingsStore();
    const list = tools.value.filter((tool) => tool.visible);

    if (settingsStore.settings.toolDisplay.sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    }

    return [...list].sort((a, b) => a.order - b.order);
  });

  async function initialize() {
    try {
      tools.value = window.toolboxApi
        ? await window.toolboxApi.readTools()
        : copyTools(defaultTools);
    } catch (error) {
      console.error('Failed to load tools:', error);
      tools.value = copyTools(defaultTools);
    } finally {
      ready.value = true;
    }
  }

  return {
    tools,
    visibleTools,
    ready,
    initialize
  };
});
