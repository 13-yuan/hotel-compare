import { create } from 'zustand';
import storage from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

interface FavoriteState {
  favorites: string[];
  add: (hotelId: string) => void;
  remove: (hotelId: string) => void;
  toggle: (hotelId: string) => void;
  isFavorite: (hotelId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: storage.get<string[]>(STORAGE_KEYS.FAVORITES, []),

  add: (hotelId) => {
    const next = [...get().favorites, hotelId];
    storage.set(STORAGE_KEYS.FAVORITES, next);
    set({ favorites: next });
  },

  remove: (hotelId) => {
    const next = get().favorites.filter((id) => id !== hotelId);
    storage.set(STORAGE_KEYS.FAVORITES, next);
    set({ favorites: next });
  },

  toggle: (hotelId) => {
    get().isFavorite(hotelId) ? get().remove(hotelId) : get().add(hotelId);
  },

  isFavorite: (hotelId) => get().favorites.includes(hotelId),
}));
