import type { PlatformInfo } from '../../types/hotel';
import type { PlatformPrice } from '../../types/hotel';
import { PLATFORMS } from '../../constants';

interface Props {
  price: PlatformPrice;
  hotelName: string;
  city?: string;
}

export default function PriceCompareCard({ price, hotelName, city }: Props) {
  const platform: PlatformInfo = PLATFORMS[price.platform];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 14px',
        background: '#fff',
        borderRadius: 10,
        marginBottom: 8,
        border: '1px solid #f0f0f0',
        gap: 12,
      }}
    >
      <span style={{ fontSize: 24, lineHeight: 1 }}>{platform.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{platform.name}</div>
        {price.benefits.length > 0 && (
          <div style={{ display: 'flex', gap: 4, marginTop: 3, flexWrap: 'wrap' }}>
            {price.benefits.map((b) => (
              <span key={b} style={{ fontSize: 10, color: '#52C41A', background: '#F6FFED', padding: '1px 6px', borderRadius: 3 }}>
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#FF4D4F' }}>¥{price.price}</div>
        {price.originalPrice > price.price && (
          <div style={{ fontSize: 11, color: '#bbb', textDecoration: 'line-through' }}>¥{price.originalPrice}</div>
        )}
      </div>
      <a
        href={platform.deepLink(hotelName, city)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '6px 14px',
          background: platform.color,
          color: '#fff',
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 500,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        去预订
      </a>
    </div>
  );
}
