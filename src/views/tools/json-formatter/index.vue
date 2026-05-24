<script setup lang="ts">
import { computed, ref } from 'vue';
import { compactJson, formatJson } from './utils';

const sample = '{\n  "name": "Cat Toolbox",\n  "tools": ["json-formatter"]\n}';
const input = ref(sample);
const output = ref('');
const error = ref('');
const copied = ref(false);

const outputText = computed(() => output.value || '');

function applyFormat() {
  const result = formatJson(input.value);
  output.value = result.value;
  error.value = result.error;
  copied.value = false;
}

function applyCompact() {
  const result = compactJson(input.value);
  output.value = result.value;
  error.value = result.error;
  copied.value = false;
}

async function copyOutput() {
  if (!output.value) {
    return;
  }

  await navigator.clipboard.writeText(output.value);
  copied.value = true;
}

function clearAll() {
  input.value = '';
  output.value = '';
  error.value = '';
  copied.value = false;
}

applyFormat();
</script>

<template>
  <section class="tool-view json-tool">
    <header class="view-header tool-header">
      <div>
        <h1>JSON 格式化</h1>
        <p>校验、格式化和压缩 JSON 文本。</p>
      </div>

      <div class="tool-actions" aria-label="JSON 操作">
        <button type="button" class="primary-action" @click="applyFormat">
          <span class="button-icon">{ }</span>
          <span>格式化</span>
        </button>
        <button type="button" @click="applyCompact">
          <span class="button-icon">≡</span>
          <span>压缩</span>
        </button>
        <button type="button" :disabled="!output" @click="copyOutput">
          <span class="button-icon">⧉</span>
          <span>{{ copied ? '已复制' : '复制' }}</span>
        </button>
        <button type="button" @click="clearAll">
          <span class="button-icon">×</span>
          <span>清空</span>
        </button>
      </div>
    </header>

    <div class="json-workbench">
      <label class="editor-pane">
        <span>输入</span>
        <textarea v-model="input" spellcheck="false" @input="copied = false"></textarea>
      </label>

      <label class="editor-pane">
        <span>输出</span>
        <textarea :value="outputText" spellcheck="false" readonly></textarea>
      </label>
    </div>

    <p v-if="error" class="tool-error" role="alert">{{ error }}</p>
  </section>
</template>
