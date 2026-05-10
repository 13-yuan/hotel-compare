import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotelStore } from '../stores/hotelStore';
import HotelCard from '../components/hotel/HotelCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import type { Hotel } from '../types/hotel';
import { STORAGE_KEYS } from '../constants';
import storage from '../utils/storage';

export default function SearchPage() {
  const navigate = useNavigate();
  const { hotels, loading, searchHotels, fetchNearby } = useHotelStore();
  const [keyword, setKeyword] = useState('');
  const [history, setHistory] = useState<string[]>(
    storage.get<string[]>(STORAGE_KEYS.SEARCH_HISTORY, [])
  );
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    const next = [keyword, ...history.filter((h) => h !== keyword)].slice(0, 10);
    setHistory(next);
    storage.set(STORAGE_KEYS.SEARCH_HISTORY, next);
    searchHotels(keyword.trim());
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleHotelClick = (hotel: Hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 搜索栏 */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', background: '#fff', gap: 8, flexShrink: 0 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: 20, padding: '8px 14px', gap: 6 }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索酒店名称、地址"
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              color: '#333',
              minWidth: 0,
            }}
          />
          {keyword && (
            <span onClick={() => { setKeyword(''); setSearched(false); fetchNearby(); }} style={{ fontSize: 14, color: '#bbb', cursor: 'pointer' }}>
              ✕
            </span>
          )}
        </div>
        <span onClick={() => navigate(-1)} style={{ fontSize: 13, color: '#1677FF', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          取消
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 80px' }}>
        {loading ? (
          <LoadingSkeleton />
        ) : searched ? (
          hotels.length === 0 ? (
            <EmptyState message="未找到相关酒店" />
          ) : (
            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} onClick={() => handleHotelClick(hotel)} />)
          )
        ) : (
          <div>
            {history.length > 0 && (
              <div style={{ paddingTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8 }}>最近搜索</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {history.map((h) => (
                    <span
                      key={h}
                      onClick={() => { setKeyword(h); }}
                      style={{ fontSize: 12, color: '#555', background: '#f0f0f0', padding: '4px 12px', borderRadius: 14, cursor: 'pointer' }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
