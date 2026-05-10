import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '../stores/favoriteStore';
import { useHotelStore } from '../stores/hotelStore';
import HotelCard from '../components/hotel/HotelCard';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/common/EmptyState';
import type { Hotel } from '../types/hotel';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useFavoriteStore();
  const hotels = useHotelStore((s) => s.hotels);
  const allHotels = useHotelStore.getState().hotels.length > 0
    ? hotels
    : [{ id: '', name: '', address: '', city: '', latitude: 0, longitude: 0, starRating: 0, coverImage: '', images: [], tags: [], minPrice: 0 }] as Hotel[];

  const favHotels = allHotels.filter((h) => favorites.includes(h.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader title="我的收藏" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 80px' }}>
        {favHotels.length === 0 ? (
          <EmptyState message="还没有收藏酒店" />
        ) : (
          favHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onClick={() => navigate(`/hotel/${hotel.id}`)} />
          ))
        )}
      </div>
    </div>
  );
}
