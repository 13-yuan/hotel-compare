import { create } from 'zustand';
import type { Hotel, Location } from '../types/hotel';
import { calcDistance } from '../utils/format';
import { DEFAULT_LOCATION, DEFAULT_CITY } from '../constants';
import { fetchHotelsNearby } from '../services/hotelApi';
import { mockHotels } from '../mock/hotels';

interface HotelState {
  location: Location;
  cityName: string;
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  setLocation: (loc: Location) => void;
  setCityName: (name: string) => void;
  fetchNearby: () => Promise<void>;
  loadMore: () => Promise<void>;
  searchHotels: (keyword: string) => Promise<void>;
}

export const useHotelStore = create<HotelState>((set, get) => ({
  location: DEFAULT_LOCATION,
  cityName: DEFAULT_CITY,
  hotels: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,

  setLocation: (loc) => set({ location: loc }),
  setCityName: (name) => set({ cityName: name }),

  fetchNearby: async () => {
    set({ loading: true, error: null, hotels: [], page: 0, hasMore: true });
    const { location, cityName } = get();
    try {
      const data = await fetchHotelsNearby(location.latitude, location.longitude, 0);
      if (data.length === 0) throw new Error('empty');
      const withDistance = data.map((h) => ({
        ...h,
        distance: calcDistance(location.latitude, location.longitude, h.latitude, h.longitude),
      }));
      set({ hotels: withDistance, loading: false, page: 0, hasMore: data.length >= 20 });
    } catch {
      // 百度API失败时降级用 mock 数据
      const cityHotels = mockHotels.filter((h) => h.city === cityName);
      const source = cityHotels.length > 0 ? cityHotels : mockHotels;
      const withDistance = source
        .map((h) => ({
          ...h,
          distance: calcDistance(location.latitude, location.longitude, h.latitude, h.longitude),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
      set({ hotels: withDistance, loading: false, hasMore: false });
    }
  },

  loadMore: async () => {
    const { location, page, hotels, loading } = get();
    if (loading) return;
    const nextPage = page + 1;
    set({ loading: true });
    try {
      const data = await fetchHotelsNearby(location.latitude, location.longitude, nextPage);
      if (data.length === 0) {
        set({ loading: false, hasMore: false });
        return;
      }
      const withDistance = data.map((h) => ({
        ...h,
        distance: calcDistance(location.latitude, location.longitude, h.latitude, h.longitude),
      }));
      set({
        hotels: [...hotels, ...withDistance],
        loading: false,
        page: nextPage,
        hasMore: data.length >= 20,
      });
    } catch {
      set({ loading: false, hasMore: false });
    }
  },

  searchHotels: async (keyword: string) => {
    set({ loading: true, error: null, hotels: [] });
    const { location, cityName } = get();
    const kw = keyword.toLowerCase();
    // 搜索优先从 mock 数据匹配（百度按关键词搜需要不同接口）
    const cityHotels = mockHotels.filter((h) => h.city === cityName);
    const source = cityHotels.length > 0 ? cityHotels : mockHotels;
    const results = source
      .filter(
        (h) =>
          h.name.toLowerCase().includes(kw) ||
          h.address.toLowerCase().includes(kw) ||
          h.city.toLowerCase().includes(kw),
      )
      .map((h) => ({
        ...h,
        distance: calcDistance(location.latitude, location.longitude, h.latitude, h.longitude),
      }));
    set({ hotels: results, loading: false });
  },
}));
