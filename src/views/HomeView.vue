<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import { useToolsStore } from '@/stores/tools';

const toolsStore = useToolsStore();
</script>

<template>
  <section class="home-view">
    <AppLogo />
    <h1>Cat Toolbox</h1>
    <p>一个轻量级 Windows 工具盒</p>

    <div class="home-status" aria-label="应用状态">
      <span>{{ toolsStore.visibleTools.length }}</span>
      <small>已启用工具</small>
    </div>
  </section>
</template>
