import type { RoomType } from '../../types/hotel';

interface Props {
  room: RoomType;
}

export default function RoomTypeCard({ room }: Props) {
  return (
    <div style={{ display: 'flex', padding: '10px 0', gap: 10, borderBottom: '1px solid #f5f5f5' }}>
      <img
        src={room.image}
        alt={room.name}
        style={{ width: 80, height: 60, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{room.name}</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
          {room.bedType} · {room.area}m² · 最多{room.maxGuests}人
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
          {room.facilities.map((f) => (
            <span key={f} style={{ fontSize: 10, color: '#666', background: '#f5f5f5', padding: '1px 6px', borderRadius: 3 }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
