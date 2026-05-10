import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotelStore } from '../stores/hotelStore';
import { useLocation } from '../hooks/useLocation';
import HotelCard from '../components/hotel/HotelCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import CityPicker from '../components/common/CityPicker';
import LocationGate from '../components/common/LocationGate';
import type { Hotel } from '../types/hotel';
import type { CityInfo } from '../constants';

export default function HomePage() {
  const navigate = useNavigate();
  const { locating, error: locError, currentCity, detail, needsUserAction, selectCity, requestGPS } = useLocation();
  const { hotels, loading, fetchNearby } = useHotelStore();
  const [showCityPicker, setShowCityPicker] = useState(false);

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  const handleHotelClick = (hotel: Hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  const handleCitySelected = (city: CityInfo) => {
    selectCity(city);
    setShowCityPicker(false);
  };

  // 首次访问且无缓存 → 显示欢迎页，等用户点击 GPS 按钮
  if (needsUserAction && !locError) {
    return (
      <>
        <LocationGate
          onRequestGPS={requestGPS}
          locating={locating}
          error={locError}
          onOpenCityPicker={() => setShowCityPicker(true)}
        />
        {showCityPicker && (
          <CityPicker
            currentCity={currentCity}
            onClose={() => setShowCityPicker(false)}
            onCitySelected={handleCitySelected}
            onRetryGPS={requestGPS}
          />
        )}
      </>
    );
  }

  if (locating || loading) return <LoadingSkeleton />;

  const displayLocation = detail || currentCity;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 顶部栏 - 美团风格 */}
      <div style={{ padding: '12px 14px 8px', background: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* 城市选择按钮 */}
          <div
            onClick={() => setShowCityPicker(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 2,
              cursor: 'pointer', flexShrink: 0, maxWidth: '45%',
            }}
          >
            <span
              style={{
                fontSize: detail ? 16 : 22, fontWeight: 700, color: '#1a1a1a',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}
            >
              {displayLocation}
            </span>
            <span style={{ fontSize: 12, color: '#999', marginTop: 2, flexShrink: 0 }}>▾</span>
          </div>

          {/* 搜索入口 */}
          <div
            onClick={() => navigate('/search')}
            style={{
              flex: 1, padding: '10px 14px', background: '#f5f5f5',
              borderRadius: 20, fontSize: 13, color: '#bbb', cursor: 'pointer',
            }}
          >
            🔍 搜索酒店名称或地址
          </div>
        </div>
        {locError && (
          <div
            onClick={() => setShowCityPicker(true)}
            style={{ fontSize: 11, color: '#1677FF', marginTop: 4, cursor: 'pointer' }}
          >
            {locError} → 点此手动选城市
          </div>
        )}
      </div>

      {/* 列表 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 80px' }}>
        {hotels.length === 0 ? (
          <EmptyState message="附近暂无酒店" />
        ) : (
          hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} onClick={() => handleHotelClick(hotel)} />)
        )}
      </div>

      {/* 城市选择弹窗 */}
      {showCityPicker && (
        <CityPicker
          currentCity={currentCity}
          onClose={() => setShowCityPicker(false)}
          onCitySelected={handleCitySelected}
          onRetryGPS={requestGPS}
        />
      )}
    </div>
  );
}
