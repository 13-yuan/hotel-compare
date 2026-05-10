import { useState, useEffect } from 'react';
import type { Location } from '../types/hotel';
import { useHotelStore } from '../stores/hotelStore';
import { DEFAULT_LOCATION } from '../constants';

export function useLocation() {
  const setLocation = useHotelStore((s) => s.setLocation);
  const [locating, setLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 安全兜底：15秒后无论如何都结束定位状态
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

  return { locating, error };
}
