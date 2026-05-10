import type { HotelDetail } from '../../types/hotel';
import StarRating from '../common/StarRating';
import DistanceBadge from '../common/DistanceBadge';

interface Props {
  hotel: HotelDetail;
}

export default function HotelInfoHeader({ hotel }: Props) {
  return (
    <div style={{ padding: '0 14px' }}>
      <img
        src={hotel.coverImage}
        alt={hotel.name}
        style={{ width: '100%', height: 200, borderRadius: 12, objectFit: 'cover', marginBottom: 12 }}
      />
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', margin: 0, lineHeight: 1.3 }}>{hotel.name}</h2>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <StarRating count={hotel.starRating} />
        {hotel.distance != null && <DistanceBadge meters={hotel.distance} />}
      </div>
      <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>📍 {hotel.address}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {hotel.tags.map((tag) => (
          <span key={tag} style={{ fontSize: 11, color: '#1677FF', background: '#E6F4FF', padding: '2px 8px', borderRadius: 10 }}>
            {tag}
          </span>
        ))}
      </div>
      <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
        入住 {hotel.checkInTime} · 退房 {hotel.checkOutTime}
      </div>
      {hotel.description && (
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginTop: 10 }}>{hotel.description}</p>
      )}
    </div>
  );
}
