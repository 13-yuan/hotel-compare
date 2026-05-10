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

export function useLocation() {
  const setLocation = useHotelStore((s) => s.setLocation);
  const [locating, setLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);

  useEffect(() => {
    const saved = getSavedCity();
    if (saved) {
      setLocation({ latitude: saved.latitude, longitude: saved.longitude });
      setCurrentCity(saved.name);
      setLocating(false);
      return;
    }

    const safetyTimer = setTimeout(() => {
      setLocation(DEFAULT_LOCATION);
      setLocating(false);
      setError('定位超时，已使用默认位置（广州）');
    }, 15000);

    if (!navigator.geolocation) {
      clearTimeout(safetyTimer);
      setLocation(DEFAULT_LOCATION);
      setLocating(false);
      setError('浏览器不支持定位，已使用默认位置');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(safetyTimer);
        const loc: Location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setLocation(loc);
        setLocating(false);
        // 尝试匹配最近的城市
        const nearest = findNearestCity(loc);
        setCurrentCity(nearest.name);
      },
      (err) => {
        clearTimeout(safetyTimer);
        setLocation(DEFAULT_LOCATION);
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('定位权限未开启，已使用默认位置（广州）');
        } else if (err.code === err.TIMEOUT) {
          setError('定位超时，已使用默认位置（广州）');
        } else {
          setError('定位失败，已使用默认位置（广州）');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );

    return () => clearTimeout(safetyTimer);
  }, [setLocation]);

  const selectCity = useCallback((city: CityInfo) => {
    setLocation({ latitude: city.latitude, longitude: city.longitude });
    setCurrentCity(city.name);
    setError(null);
    saveCity(city);
  }, [setLocation]);

  const retryGPS = useCallback(() => {
    setLocating(true);
    setError(null);
    const safetyTimer = setTimeout(() => {
      setLocation(DEFAULT_LOCATION);
      setLocating(false);
      setError('定位超时，已使用默认位置（广州）');
    }, 15000);

    if (!navigator.geolocation) {
      clearTimeout(safetyTimer);
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(safetyTimer);
        const loc: Location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        setLocation(loc);
        setLocating(false);
        const nearest = findNearestCity(loc);
        setCurrentCity(nearest.name);
        // 清除手动选择，使用GPS定位
        localStorage.removeItem(STORAGE_KEYS.SELECTED_CITY);
      },
      (err) => {
        clearTimeout(safetyTimer);
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('定位权限未开启，请手动选择城市');
        } else {
          setError('定位失败，请手动选择城市');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, [setLocation]);

  return { locating, error, currentCity, selectCity, retryGPS };
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
