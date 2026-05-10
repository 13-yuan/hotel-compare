import { create } from 'zustand';
import storage from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

interface AuthState {
  isLogin: boolean;
  phone: string;
  nickname: string;
  avatar: string;
  login: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
  sendSms: (phone: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: !!storage.get(STORAGE_KEYS.USER, null),
  phone: storage.get(STORAGE_KEYS.USER, { phone: '', nickname: '' }).phone,
  nickname: storage.get(STORAGE_KEYS.USER, { phone: '', nickname: '' }).nickname || '用户',
  avatar: '',

  sendSms: async () => {
    // MVP: 模拟发送验证码，总是成功
    await new Promise((r) => setTimeout(r, 300));
  },

  login: async (phone, code) => {
    await new Promise((r) => setTimeout(r, 500));
    // MVP: 验证码固定 "123456" 可通过
    if (code !== '123456') return false;
    const user = { phone, nickname: phone.slice(0, 3) + '****' + phone.slice(-4) };
    storage.set(STORAGE_KEYS.USER, user);
    set({ isLogin: true, phone, nickname: user.nickname });
    return true;
  },

  logout: () => {
    storage.remove(STORAGE_KEYS.USER);
    set({ isLogin: false, phone: '', nickname: '', avatar: '' });
  },
}));
