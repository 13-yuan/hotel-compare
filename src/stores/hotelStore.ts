import { create } from 'zustand';
import type { Hotel, Location } from '../types/hotel';
import { mockHotels } from '../mock/hotels';
import { calcDistance } from '../utils/format';
import { DEFAULT_LOCATION, DEFAULT_CITY } from '../constants';

interface HotelState {
  location: Location;
  cityName: string;
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  setLocation: (loc: Location) => void;
  setCityName: (name: string) => void;
  fetchNearby: () => Promise<void>;
  searchHotels: (keyword: string) => Promise<void>;
}

export const useHotelStore = create<HotelState>((set, get) => ({
  location: DEFAULT_LOCATION,
  cityName: DEFAULT_CITY,
  hotels: [],
  loading: false,
  error: null,

  setLocation: (loc) => set({ location: loc }),
  setCityName: (name) => set({ cityName: name }),

  fetchNearby: async () => {
    set({ loading: true, error: null });
    await new Promise((r) => setTimeout(r, 600));
    const { location, cityName } = get();
    const cityHotels = mockHotels.filter((h) => h.city === cityName);
    const source = cityHotels.length > 0 ? cityHotels : mockHotels;
    const withDistance = source
      .map((h) => ({
        ...h,
        distance: calcDistance(location.latitude, location.longitude, h.latitude, h.longitude),
      }))
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    set({ hotels: withDistance, loading: false });
  },

  searchHotels: async (keyword) => {
    set({ loading: true, error: null });
    await new Promise((r) => setTimeout(r, 400));
    const { location, cityName } = get();
    const kw = keyword.toLowerCase();
    // 搜索时优先搜同城
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
