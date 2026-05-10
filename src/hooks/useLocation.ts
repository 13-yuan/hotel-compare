import { useState, useEffect } from 'react';
import type { Location } from '../types/hotel';
import { useHotelStore } from '../stores/hotelStore';
import { DEFAULT_LOCATION } from '../constants';

export function useLocation() {
  const setLocation = useHotelStore((s) => s.setLocation);
  const [locating, setLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 安全兜底：5秒后无论如何都结束定位状态
    const safetyTimer = setTimeout(() => {
      setLocation(DEFAULT_LOCATION);
      setLocating(false);
      setError('定位超时，已使用默认位置（广州）');
    }, 5000);

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
      },
      () => {
        clearTimeout(safetyTimer);
        setLocation(DEFAULT_LOCATION);
        setLocating(false);
        setError('定位权限未开启，已使用默认位置（广州）');
      },
      { enableHighAccuracy: false, timeout: 3000, maximumAge: 300000 },
    );

    return () => clearTimeout(safetyTimer);
  }, [setLocation]);

  return { locating, error };
}
