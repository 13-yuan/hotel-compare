import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotelStore } from '../stores/hotelStore';
import { useLocation } from '../hooks/useLocation';
import HotelCard from '../components/hotel/HotelCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import type { Hotel } from '../types/hotel';
import { DEFAULT_CITY } from '../constants';



export default function HomePage() {
  const navigate = useNavigate();
  const { locating, error: locError } = useLocation();
  const { hotels, loading, fetchNearby } = useHotelStore();

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  const handleHotelClick = (hotel: Hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  if (locating || loading) return <LoadingSkeleton />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 顶部栏 */}
      <div style={{ padding: '12px 14px 8px', background: '#fff', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>
          附近酒店
          <span style={{ fontSize: 12, fontWeight: 400, color: '#999', marginLeft: 6 }}>{DEFAULT_CITY}</span>
        </div>
        {locError && <div style={{ fontSize: 11, color: '#faad14', marginTop: 2 }}>{locError}</div>}
      </div>

      {/* 搜索入口 */}
      <div
        onClick={() => navigate('/search')}
        style={{
          margin: '0 14px 10px',
          padding: '10px 14px',
          background: '#f5f5f5',
          borderRadius: 20,
          fontSize: 13,
          color: '#bbb',
          cursor: 'pointer',
        }}
      >
        🔍 搜索酒店名称或地址
      </div>

      {/* 列表 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 80px' }}>
        {hotels.length === 0 ? (
          <EmptyState message="附近暂无酒店" />
        ) : (
          hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} onClick={() => handleHotelClick(hotel)} />)
        )}
      </div>
    </div>
  );
}
