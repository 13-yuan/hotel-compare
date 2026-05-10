import { useState, useEffect, useCallback } from 'react';
import type { Location } from '../types/hotel';
import type { CityInfo } from '../constants';
import { useHotelStore } from '../stores/hotelStore';
import { DEFAULT_LOCATION, DEFAULT_CITY, HOT_CITIES, STORAGE_KEYS } from '../constants';

function getSavedCity(): CityInfo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
    if (raw) return JSON.parse(raw) as CityInfo;
  } catch { /* noop */ }
  return null;
}

function saveCity(city: CityInfo) {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, JSON.stringify(city));
  } catch { /* noop */ }
}

function getPermissionHint(): string {
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    return '请在 设置 > Safari > 位置 中选择"允许"';
  }
  if (/Android/.test(navigator.userAgent)) {
    return '请点击浏览器地址栏左侧的锁图标，开启位置权限';
  }
  return '请在浏览器设置中允许定位权限';
}

interface GeoResult {
  city: string;
  detail: string | null;
}

async function reverseGeocode(lat: number, lng: number): Promise<GeoResult | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&accept-language=zh`,
      { signal: controller.signal },
    );
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const a = data.address || {};
    // 从返回数据中提取城市名（优先级：city > town > county > state_district）
    const city = a.city || a.town || a.county || a.state_district || a.state || null;
    if (!city) return null;
    // 去掉"市"后缀，统一格式
    const cityName = city.replace(/[市地区]$/, '');
    // 街道/区信息
    const detail = a.road || a.suburb || a.district || a.city_district || null;
    return { city: cityName, detail };
  } catch {
    return null;
  }
}

export function useLocation() {
  const setLocation = useHotelStore((s) => s.setLocation);
  const [locating, setLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [detail, setDetail] = useState<string | null>(null);
  const [needsUserAction, setNeedsUserAction] = useState(false);

  useEffect(() => {
    const saved = getSavedCity();
    if (saved) {
      setLocation({ latitude: saved.latitude, longitude: saved.longitude });
      setCurrentCity(saved.name);
      setDetail(saved.detail ?? null);
      setLocating(false);
      return;
    }
    // 没有缓存城市：用默认位置，不自动调 GPS（手机浏览器会拦截），等用户点击按钮触发
    setLocation(DEFAULT_LOCATION);
    setCurrentCity(DEFAULT_CITY);
    setDetail(null);
    setLocating(false);
    setNeedsUserAction(true);
  }, [setLocation]);

  const requestGPS = useCallback((onSuccess?: () => void, onError?: () => void) => {
    setLocating(true);
    setError(null);

    if (!navigator.geolocation) {
      setLocating(false);
      setError('浏览器不支持定位，请手动选择城市');
      onError?.();
      return;
    }

    const safetyTimer = setTimeout(() => {
      setLocating(false);
      setError('定位超时，请检查网络后重试');
      onError?.();
    }, 8000);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(safetyTimer);
        const loc: Location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        setLocation(loc);
        setLocating(false);
        setNeedsUserAction(false);
        // 逆地理编码获取真实城市名
        const geo = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        if (geo) {
          setCurrentCity(geo.city);
          setDetail(geo.detail);
          saveCity({ name: geo.city, latitude: loc.latitude, longitude: loc.longitude, detail: geo.detail });
        } else {
          // 逆地理编码失败，回退到 HOT_CITIES 匹配
          const nearest = findNearestCity(loc);
          setCurrentCity(nearest.name);
          setDetail(null);
          saveCity(nearest);
        }
        onSuccess?.();
      },
      (err) => {
        clearTimeout(safetyTimer);
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(`定位权限未开启。${getPermissionHint()}`);
        } else if (err.code === err.TIMEOUT) {
          setError('定位超时，请确保网络畅通后重试');
        } else {
          setError('定位失败，请手动选择城市');
        }
        onError?.();
      },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 120000 },
    );
  }, [setLocation]);

  const selectCity = useCallback((city: CityInfo) => {
    setLocation({ latitude: city.latitude, longitude: city.longitude });
    setCurrentCity(city.name);
    setDetail(null);
    setError(null);
    setNeedsUserAction(false);
    saveCity(city);
  }, [setLocation]);

  return { locating, error, currentCity, detail, needsUserAction, selectCity, requestGPS };
}

function findNearestCity(loc: Location): CityInfo {
  let minDist = Infinity;
  let nearest = HOT_CITIES[0];
  for (const city of HOT_CITIES) {
    const d = (city.latitude - loc.latitude) ** 2 + (city.longitude - loc.longitude) ** 2;
    if (d < minDist) { minDist = d; nearest = city; }
  }
  return nearest;
}
