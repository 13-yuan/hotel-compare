import type { Platform, PlatformInfo } from '../types/hotel';

export const PLATFORMS: Record<Platform, PlatformInfo> = {
  ctrip: {
    key: 'ctrip',
    name: '携程',
    icon: '🏨',
    color: '#1677FF',
    deepLink: (name, city) =>
      `https://m.ctrip.com/webapp/hotel/hotelsearch?city=${encodeURIComponent(city || '')}&keyword=${encodeURIComponent(name)}`,
  },
  meituan: {
    key: 'meituan',
    name: '美团',
    icon: '🛒',
    color: '#FFC300',
    deepLink: (name, city) =>
      `https://i.meituan.com/hotel/search?keyword=${encodeURIComponent(name)}&city=${encodeURIComponent(city || '')}`,
  },
  qunar: {
    key: 'qunar',
    name: '去哪儿',
    icon: '✈️',
    color: '#FF6B35',
    deepLink: (name, city) =>
      `https://touch.qunar.com/hotel/search?q=${encodeURIComponent(name)}&city=${encodeURIComponent(city || '')}`,
  },
  fliggy: {
    key: 'fliggy',
    name: '飞猪',
    icon: '🐷',
    color: '#FF5000',
    deepLink: (name) =>
      `https://h5.fliggy.com/search?keyword=${encodeURIComponent(name)}&type=hotel`,
  },
  tongcheng: {
    key: 'tongcheng',
    name: '同程',
    icon: '🎫',
    color: '#07C160',
    deepLink: (name, city) =>
      `https://m.ly.com/hotel/search?keyword=${encodeURIComponent(name)}&city=${encodeURIComponent(city || '')}`,
  },
};

export const PLATFORM_LIST: PlatformInfo[] = [
  PLATFORMS.ctrip,
  PLATFORMS.meituan,
  PLATFORMS.qunar,
  PLATFORMS.fliggy,
  PLATFORMS.tongcheng,
];

export const DEFAULT_CITY = '广州';
export const DEFAULT_LOCATION = { longitude: 113.2644, latitude: 23.1291 };

export const STORAGE_KEYS = {
  FAVORITES: 'hc_favorites',
  USER: 'hc_user',
  SEARCH_HISTORY: 'hc_search_history',
} as const;
