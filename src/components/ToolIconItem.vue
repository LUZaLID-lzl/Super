<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type { ToolConfig } from '@/types/app';

const props = defineProps<{
  tool: ToolConfig;
  showIcon: boolean;
  showText: boolean;
  iconSize: number;
}>();

const route = useRoute();
const isActive = computed(() => route.path === props.tool.path);
const iconStyle = computed(() => ({
  width: `${props.iconSize}px`,
  height: `${props.iconSize}px`,
  fontSize: `${Math.max(12, props.iconSize * 0.42)}px`
}));
</script>

<template>
  <RouterLink
    class="tool-icon-item"
    :class="{ 'is-active': isActive }"
    :to="tool.path"
    :title="tool.name"
  >
    <span v-if="showIcon" class="tool-icon" :style="iconStyle">{{ tool.icon }}</span>
    <span v-if="showText" class="tool-name">{{ tool.name }}</span>
  </RouterLink>
</template>
