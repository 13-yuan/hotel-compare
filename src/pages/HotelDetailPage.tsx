import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockHotelDetails } from '../mock/hotels';
import { useHotelStore } from '../stores/hotelStore';
import { useFavoriteStore } from '../stores/favoriteStore';
import HotelInfoHeader from '../components/hotel/HotelInfoHeader';
import PriceCompareCard from '../components/hotel/PriceCompareCard';
import RoomTypeCard from '../components/hotel/RoomTypeCard';
import PageHeader from '../components/layout/PageHeader';
import { PLATFORMS, PLATFORM_LIST } from '../constants';
import { calcDistance } from '../utils/format';

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useHotelStore((s) => s.location);
  const { isFavorite, toggle } = useFavoriteStore();

  const hotel = id ? mockHotelDetails[id] : undefined;

  const fav = id ? isFavorite(id) : false;

  // 如果没有详情数据，自动生成
  const hotelData = useCallback(() => {
    if (hotel) return hotel;
    // 从列表数据中找
    const basicHotels = useHotelStore.getState().hotels;
    const basic = basicHotels.find((h) => h.id === id);
    if (!basic) return null;
    return {
      ...basic,
      description: '',
      facilities: basic.tags,
      roomTypes: [],
      platformPrices: [],
      checkInTime: '14:00',
      checkOutTime: '12:00',
      distance: basic.distance ?? calcDistance(location.latitude, location.longitude, basic.latitude, basic.longitude),
    };
  }, [hotel, id, location]);

  const data = hotelData();
  if (!data) {
    return (
      <div style={{ height: '100%' }}>
        <PageHeader title="酒店详情" showBack onBack={() => navigate(-1)} />
        <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>酒店不存在</div>
      </div>
    );
  }

  const cheapestPrice = [...data.platformPrices].sort((a, b) => a.price - b.price)[0];
  const platformPrices = data.platformPrices.length > 0
    ? data.platformPrices.sort((a, b) => a.price - b.price)
    : PLATFORM_LIST.map((p) => ({
        platform: p.key,
        platformName: p.name,
        price: 0,
        originalPrice: 0,
        roomTypeId: '',
        bookingUrl: p.deepLink(data.name, data.city),
        benefits: [] as string[],
      }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f8f8f8' }}>
      <PageHeader title="酒店详情" showBack onBack={() => navigate(-1)} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <HotelInfoHeader hotel={data} />

        {/* 比价区 */}
        <div style={{ padding: '16px 14px' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>
            💰 多平台比价
            {cheapestPrice && (
              <span style={{ fontSize: 12, fontWeight: 400, color: '#FF4D4F', marginLeft: 8 }}>
                最低 {PLATFORMS[cheapestPrice.platform]?.name ?? ''} ¥{cheapestPrice.price}
              </span>
            )}
          </div>
          {platformPrices.map((price) => (
            <PriceCompareCard
              key={price.platform}
              price={price}
              hotelName={data.name}
              city={data.city}
            />
          ))}
        </div>

        {/* 房型 */}
        {data.roomTypes.length > 0 && (
          <div style={{ padding: '16px 14px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>🛏️ 房型介绍</div>
            {data.roomTypes.map((room) => (
              <RoomTypeCard key={room.id} room={room} />
            ))}
          </div>
        )}

        {/* 设施 */}
        <div style={{ padding: '16px 14px', background: '#fff', borderTop: '1px solid #f0f0f0', marginTop: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>🏗️ 酒店设施</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {data.facilities.map((f) => (
              <span key={f} style={{ fontSize: 12, color: '#555', background: '#f5f5f5', padding: '4px 10px', borderRadius: 14 }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 底部收藏栏 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          gap: 8,
          cursor: 'pointer',
          flexShrink: 0,
        }}
        onClick={() => id && toggle(id)}
      >
        <span style={{ fontSize: 20 }}>{fav ? '❤️' : '🤍'}</span>
        <span style={{ fontSize: 14, color: fav ? '#FF4D4F' : '#666' }}>
          {fav ? '已收藏' : '收藏酒店'}
        </span>
      </div>
    </div>
  );
}
