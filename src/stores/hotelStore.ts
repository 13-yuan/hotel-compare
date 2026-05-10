import { create } from 'zustand';
import type { Hotel, Location } from '../types/hotel';
import { mockHotels } from '../mock/hotels';
import { calcDistance } from '../utils/format';
import { DEFAULT_LOCATION } from '../constants';

interface HotelState {
  location: Location;
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  setLocation: (loc: Location) => void;
  fetchNearby: () => Promise<void>;
  searchHotels: (keyword: string) => Promise<void>;
}

export const useHotelStore = create<HotelState>((set, get) => ({
  location: DEFAULT_LOCATION,
  hotels: [],
  loading: false,
  error: null,

  setLocation: (loc) => set({ location: loc }),

  fetchNearby: async () => {
    set({ loading: true, error: null });
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 600));
    const { location } = get();
    const withDistance = mockHotels
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
    const { location } = get();
    const kw = keyword.toLowerCase();
    const results = mockHotels
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
