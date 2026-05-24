<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ToolIconItem from './ToolIconItem.vue';
import { useSettingsStore } from '@/stores/settings';
import { useToolsStore } from '@/stores/tools';

const settingsStore = useSettingsStore();
const toolsStore = useToolsStore();
const route = useRoute();

const toolDisplay = computed(() => settingsStore.settings.toolDisplay);
</script>

<template>
  <aside class="sidebar" aria-label="工具导航">
    <RouterLink
      class="dock-button"
      :class="{ 'is-active': route.path === '/' }"
      to="/"
      title="主页"
    >
      <span class="dock-icon">⌂</span>
    </RouterLink>

    <nav class="tool-list" aria-label="工具列表">
      <ToolIconItem
        v-for="tool in toolsStore.visibleTools"
        :key="tool.id"
        :tool="tool"
        :show-icon="toolDisplay.showIcon"
        :show-text="toolDisplay.showText"
        :icon-size="toolDisplay.iconSize"
      />
    </nav>

    <RouterLink
      class="dock-button sidebar-settings"
      :class="{ 'is-active': route.path === '/settings' }"
      to="/settings"
      title="设置"
    >
      <span class="dock-icon">⚙</span>
    </RouterLink>
  </aside>
</template>
