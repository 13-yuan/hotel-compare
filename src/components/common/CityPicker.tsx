import { useState } from 'react';
import type { CityInfo } from '../../constants';
import { HOT_CITIES } from '../../constants';
import { useHotelStore } from '../../stores/hotelStore';

interface Props {
  currentCity: string;
  onClose: () => void;
  onCitySelected: (city: CityInfo) => void;
  onRetryGPS: () => void;
}

export default function CityPicker({ currentCity, onClose, onCitySelected, onRetryGPS }: Props) {
  const setLocation = useHotelStore((s) => s.setLocation);
  const [gpsLoading, setGpsLoading] = useState(false);

  const handleGPS = () => {
    setGpsLoading(true);
    if (!navigator.geolocation) {
      onRetryGPS();
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setGpsLoading(false);
        onClose();
      },
      () => {
        onRetryGPS();
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div
        style={{
          position: 'relative', background: '#fff', borderRadius: '16px 16px 0 0',
          padding: '20px 16px 30px', maxHeight: '60vh', overflowY: 'auto',
        }}
      >
        {/* GPS 定位按钮 */}
        <div
          onClick={gpsLoading ? undefined : handleGPS}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
            background: '#F0F5FF', borderRadius: 12, marginBottom: 16, cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 22 }}>{gpsLoading ? '⏳' : '📍'}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1677FF' }}>
              {gpsLoading ? '定位中...' : 'GPS 自动定位'}
            </div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>当前: {currentCity}</div>
          </div>
        </div>

        {/* 热门城市 */}
        <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>热门城市</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {HOT_CITIES.map((city) => (
            <div
              key={city.name}
              onClick={() => {
                setLocation({ latitude: city.latitude, longitude: city.longitude });
                onCitySelected(city);
              }}
              style={{
                padding: '12px 0', textAlign: 'center', borderRadius: 10,
                background: city.name === currentCity ? '#E6F4FF' : '#f5f5f5',
                color: city.name === currentCity ? '#1677FF' : '#333',
                fontWeight: city.name === currentCity ? 600 : 400,
                fontSize: 14, cursor: 'pointer',
              }}
            >
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
