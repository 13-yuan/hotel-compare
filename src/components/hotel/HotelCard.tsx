import type { Hotel } from '../../types/hotel';
import { PLATFORMS } from '../../constants';
import { formatPrice } from '../../utils/format';
import StarRating from '../common/StarRating';
import DistanceBadge from '../common/DistanceBadge';

interface Props {
  hotel: Hotel;
  onClick: () => void;
}

export default function HotelCard({ hotel, onClick }: Props) {
  const minPrice = hotel.minPrice ?? 0;
  const platformName = hotel.minPricePlatform ? PLATFORMS[hotel.minPricePlatform].name : '';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        padding: '12px 14px',
        background: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        gap: 12,
      }}
    >
      <img
        src={hotel.coverImage}
        alt={hotel.name}
        style={{
          width: 110,
          height: 100,
          borderRadius: 8,
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {hotel.name}
          </div>
          <StarRating count={hotel.starRating} />
          <div style={{ fontSize: 12, color: '#999', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {hotel.address}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#FF4D4F' }}>{formatPrice(minPrice)}</span>
            <span style={{ fontSize: 11, color: '#999', marginLeft: 2 }}>起</span>
            {platformName && (
              <span style={{ fontSize: 10, color: '#1677FF', marginLeft: 4, background: '#E6F4FF', padding: '1px 4px', borderRadius: 3 }}>
                {platformName}
              </span>
            )}
          </div>
          {hotel.distance != null && <DistanceBadge meters={hotel.distance} />}
        </div>
      </div>
    </div>
  );
}
