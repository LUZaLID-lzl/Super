<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import type { ToolDisplaySettings, ToolSortBy } from '@/types/app';

const settingsStore = useSettingsStore();

function updateToolDisplay(patch: Partial<ToolDisplaySettings>) {
  void settingsStore.setToolDisplay({
    ...settingsStore.settings.toolDisplay,
    ...patch
  });
}

const showIcon = computed({
  get: () => settingsStore.settings.toolDisplay.showIcon,
  set: (value: boolean) => updateToolDisplay({ showIcon: value })
});

const showText = computed({
  get: () => settingsStore.settings.toolDisplay.showText,
  set: (value: boolean) => updateToolDisplay({ showText: value })
});

const iconSize = computed({
  get: () => settingsStore.settings.toolDisplay.iconSize,
  set: (value: number) => updateToolDisplay({ iconSize: Number(value) })
});

const sortBy = computed({
  get: () => settingsStore.settings.toolDisplay.sortBy,
  set: (value: ToolSortBy) => updateToolDisplay({ sortBy: value })
});
</script>

<template>
  <section class="settings-section">
    <div class="section-heading">
      <span class="section-icon">☷</span>
      <h2>工具显示</h2>
    </div>

    <label class="toggle-row">
      <input v-model="showIcon" type="checkbox" />
      <span>显示图标</span>
    </label>

    <label class="toggle-row">
      <input v-model="showText" type="checkbox" />
      <span>显示文字</span>
    </label>

    <label class="field-label" for="icon-size">图标大小</label>
    <div class="range-row">
      <input id="icon-size" v-model.number="iconSize" type="range" min="24" max="48" step="2" />
      <output>{{ iconSize }}px</output>
    </div>

    <label class="field-label" for="tool-sort">排序方式</label>
    <select id="tool-sort" v-model="sortBy">
      <option value="manual">手动顺序</option>
      <option value="name">按名称</option>
    </select>
  </section>
</template>
