<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import type { AppTheme } from '@/types/app';

const settingsStore = useSettingsStore();

const options: Array<{ value: AppTheme; label: string }> = [
  { value: 'system', label: '跟随系统' },
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' }
];
</script>

<template>
  <section class="settings-section">
    <div class="section-heading">
      <span class="section-icon">◐</span>
      <h2>主题</h2>
    </div>

    <div class="segmented-control" role="group" aria-label="主题设置">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :class="{ 'is-selected': settingsStore.settings.theme === option.value }"
        @click="settingsStore.setTheme(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </section>
</template>
