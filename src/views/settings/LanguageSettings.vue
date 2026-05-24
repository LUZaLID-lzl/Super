<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import type { AppLanguage } from '@/types/app';

const settingsStore = useSettingsStore();

const language = computed({
  get: () => settingsStore.settings.language,
  set: (value: AppLanguage) => {
    void settingsStore.setLanguage(value);
  }
});
</script>

<template>
  <section class="settings-section">
    <div class="section-heading">
      <span class="section-icon">文</span>
      <h2>语言</h2>
    </div>

    <select v-model="language" aria-label="语言设置">
      <option value="zh-CN">中文</option>
      <option value="en-US">English</option>
    </select>
  </section>
</template>
