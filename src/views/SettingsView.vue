<script setup lang="ts">
import BackgroundSettings from './settings/BackgroundSettings.vue';
import LanguageSettings from './settings/LanguageSettings.vue';
import ThemeSettings from './settings/ThemeSettings.vue';
import ToolDisplaySettings from './settings/ToolDisplaySettings.vue';
</script>

<template>
  <section class="settings-view">
    <header class="view-header">
      <h1>设置中心</h1>
      <p>偏好会保存到本地 JSON 配置。</p>
    </header>

    <div class="settings-grid">
      <ThemeSettings />
      <BackgroundSettings />
      <LanguageSettings />
      <ToolDisplaySettings />
    </div>
  </section>
</template>
