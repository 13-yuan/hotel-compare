import { formatDistance } from '../../utils/format';

interface Props {
  meters: number;
}

export default function DistanceBadge({ meters }: Props) {
  return (
    <span style={{ fontSize: 11, color: '#1677FF', background: '#E6F4FF', padding: '2px 8px', borderRadius: 10, whiteSpace: 'nowrap' }}>
      {formatDistance(meters)}
    </span>
  );
}
