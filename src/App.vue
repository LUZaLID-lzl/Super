<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import { useSettingsStore } from './stores/settings';
import { useToolsStore } from './stores/tools';

const settingsStore = useSettingsStore();
const toolsStore = useToolsStore();

const shellStyle = computed(() => ({
  background: settingsStore.appBackground
}));

onMounted(async () => {
  await Promise.all([
    settingsStore.initialize(),
    toolsStore.initialize()
  ]);
});
</script>

<template>
  <div class="app-shell" :style="shellStyle">
    <Sidebar />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>
