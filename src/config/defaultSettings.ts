import type { AppSettings } from '@/types/app';

export const defaultSettings: AppSettings = {
  theme: 'system',
  language: 'zh-CN',
  background: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #fff7ed 0%, #dff7f3 52%, #eef2ff 100%)'
  },
  toolDisplay: {
    showIcon: true,
    showText: true,
    iconSize: 32,
    sortBy: 'manual'
  }
};
