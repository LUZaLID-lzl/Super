<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import type { BackgroundType } from '@/types/app';

const settingsStore = useSettingsStore();

const typeOptions: Array<{ value: BackgroundType; label: string }> = [
  { value: 'gradient', label: '渐变' },
  { value: 'solid', label: '纯色' },
  { value: 'image', label: '图片' }
];

const backgroundType = computed({
  get: () => settingsStore.settings.background.type,
  set: (type: BackgroundType) => {
    const fallback = type === 'solid'
      ? '#f5f6fa'
      : type === 'image'
        ? ''
        : 'linear-gradient(135deg, #fff7ed 0%, #dff7f3 52%, #eef2ff 100%)';
    void settingsStore.setBackground({ type, value: fallback });
  }
});

const backgroundValue = computed({
  get: () => settingsStore.settings.background.value,
  set: (value: string) => {
    void settingsStore.setBackground({
      ...settingsStore.settings.background,
      value
    });
  }
});
</script>

<template>
  <section class="settings-section">
    <div class="section-heading">
      <span class="section-icon">▧</span>
      <h2>背景</h2>
    </div>

    <label class="field-label" for="background-type">类型</label>
    <select id="background-type" v-model="backgroundType">
      <option v-for="option in typeOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <label class="field-label" for="background-value">值</label>
    <input
      id="background-value"
      v-model="backgroundValue"
      type="text"
      :placeholder="backgroundType === 'image' ? 'C:/images/background.png' : '#f5f6fa'"
    />
  </section>
</template>
