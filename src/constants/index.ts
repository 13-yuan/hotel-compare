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

export interface CityInfo {
  name: string;
  longitude: number;
  latitude: number;
}

export const HOT_CITIES: CityInfo[] = [
  { name: '北京', longitude: 116.4074, latitude: 39.9042 },
  { name: '上海', longitude: 121.4737, latitude: 31.2304 },
  { name: '广州', longitude: 113.2644, latitude: 23.1291 },
  { name: '深圳', longitude: 114.0579, latitude: 22.5431 },
  { name: '杭州', longitude: 120.1551, latitude: 30.2741 },
  { name: '成都', longitude: 104.0665, latitude: 30.5728 },
  { name: '重庆', longitude: 106.5516, latitude: 29.5630 },
  { name: '武汉', longitude: 114.3054, latitude: 30.5931 },
  { name: '南京', longitude: 118.7969, latitude: 32.0603 },
  { name: '西安', longitude: 108.9402, latitude: 34.3416 },
  { name: '长沙', longitude: 112.9388, latitude: 28.2278 },
  { name: '天津', longitude: 117.1907, latitude: 39.1252 },
  { name: '苏州', longitude: 120.5853, latitude: 31.2989 },
  { name: '郑州', longitude: 113.6254, latitude: 34.7466 },
  { name: '青岛', longitude: 120.3826, latitude: 36.0671 },
  { name: '厦门', longitude: 118.0894, latitude: 24.4798 },
  { name: '三亚', longitude: 109.5082, latitude: 18.2528 },
  { name: '大连', longitude: 121.6147, latitude: 38.9140 },
  { name: '昆明', longitude: 102.8329, latitude: 24.8801 },
  { name: '香港', longitude: 114.1694, latitude: 22.3193 },
];

export const STORAGE_KEYS = {
  FAVORITES: 'hc_favorites',
  USER: 'hc_user',
  SEARCH_HISTORY: 'hc_search_history',
  SELECTED_CITY: 'hc_selected_city',
} as const;
