import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { defaultSettings } from '@/config/defaultSettings';
import type { AppLanguage, AppSettings, AppTheme, BackgroundSettings, ToolDisplaySettings } from '@/types/app';

const storageKey = 'cat-toolbox-settings';

function copySettings(settings: AppSettings): AppSettings {
  return JSON.parse(JSON.stringify(settings)) as AppSettings;
}

function readLocalSettings(): AppSettings {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return copySettings(defaultSettings);
  }

  return {
    ...copySettings(defaultSettings),
    ...JSON.parse(raw)
  };
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AppSettings>(copySettings(defaultSettings));
  const ready = ref(false);
  const systemTheme = ref<'light' | 'dark'>('light');

  const effectiveTheme = computed(() => (
    settings.value.theme === 'system' ? systemTheme.value : settings.value.theme
  ));

  const appBackground = computed(() => {
    const background = settings.value.background;
    if (background.type === 'image') {
      return background.value
        ? `url("${background.value}") center / cover no-repeat`
        : defaultSettings.background.value;
    }

    return background.value || defaultSettings.background.value;
  });

  async function initialize() {
    try {
      if (window.toolboxApi) {
        const [remoteSettings, remoteSystemTheme] = await Promise.all([
          window.toolboxApi.readSettings(),
          window.toolboxApi.getSystemTheme()
        ]);
        settings.value = {
          ...copySettings(defaultSettings),
          ...remoteSettings,
          background: {
            ...copySettings(defaultSettings).background,
            ...remoteSettings.background
          },
          toolDisplay: {
            ...copySettings(defaultSettings).toolDisplay,
            ...remoteSettings.toolDisplay
          }
        };
        systemTheme.value = remoteSystemTheme;
      } else {
        settings.value = readLocalSettings();
        systemTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      settings.value = copySettings(defaultSettings);
    } finally {
      ready.value = true;
      applyAppearance();
    }
  }

  async function persist() {
    applyAppearance();

    if (window.toolboxApi) {
      await window.toolboxApi.writeSettings(settings.value);
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(settings.value));
  }

  function applyAppearance() {
    document.documentElement.dataset.theme = effectiveTheme.value;
    document.documentElement.dataset.language = settings.value.language;
  }

  async function setTheme(theme: AppTheme) {
    settings.value.theme = theme;
    await persist();
  }

  async function setLanguage(language: AppLanguage) {
    settings.value.language = language;
    await persist();
  }

  async function setBackground(background: BackgroundSettings) {
    settings.value.background = { ...background };
    await persist();
  }

  async function setToolDisplay(toolDisplay: ToolDisplaySettings) {
    settings.value.toolDisplay = { ...toolDisplay };
    await persist();
  }

  return {
    settings,
    ready,
    effectiveTheme,
    appBackground,
    initialize,
    setTheme,
    setLanguage,
    setBackground,
    setToolDisplay
  };
});
