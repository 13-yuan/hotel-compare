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
  detail?: string | null;
}

export const HOT_CITIES: CityInfo[] = [
  { name: '广州', longitude: 113.2644, latitude: 23.1291 },
  { name: '深圳', longitude: 114.0579, latitude: 22.5431 },
  { name: '珠海', longitude: 113.5767, latitude: 22.2707 },
  { name: '佛山', longitude: 113.1219, latitude: 23.0215 },
  { name: '东莞', longitude: 113.7519, latitude: 23.0207 },
  { name: '惠州', longitude: 114.4168, latitude: 23.1118 },
  { name: '中山', longitude: 113.3824, latitude: 22.5158 },
  { name: '江门', longitude: 113.0815, latitude: 22.5787 },
  { name: '肇庆', longitude: 112.4651, latitude: 23.0469 },
  { name: '汕头', longitude: 116.6822, latitude: 23.3541 },
  { name: '湛江', longitude: 110.3589, latitude: 21.2712 },
  { name: '茂名', longitude: 110.9255, latitude: 21.6629 },
  { name: '韶关', longitude: 113.5966, latitude: 24.8019 },
  { name: '梅州', longitude: 116.1225, latitude: 24.2886 },
  { name: '汕尾', longitude: 115.3752, latitude: 22.7862 },
  { name: '河源', longitude: 114.7004, latitude: 23.7437 },
  { name: '阳江', longitude: 111.9825, latitude: 21.8579 },
  { name: '清远', longitude: 113.0560, latitude: 23.6818 },
  { name: '潮州', longitude: 116.6227, latitude: 23.6569 },
  { name: '揭阳', longitude: 116.3727, latitude: 23.5497 },
  { name: '云浮', longitude: 112.0445, latitude: 22.9152 },
];

export const STORAGE_KEYS = {
  FAVORITES: 'hc_favorites',
  USER: 'hc_user',
  SEARCH_HISTORY: 'hc_search_history',
  SELECTED_CITY: 'hc_selected_city',
} as const;
