import { formatStars } from '../../utils/format';

interface Props {
  count: number;
}

export default function StarRating({ count }: Props) {
  return (
    <span style={{ color: '#FAAD14', fontSize: 12, letterSpacing: 1 }}>
      {formatStars(count)}
      <span style={{ color: '#999', marginLeft: 4, fontSize: 11 }}>{count}星</span>
    </span>
  );
}
