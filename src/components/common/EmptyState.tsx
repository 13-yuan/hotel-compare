interface Props {
  message?: string;
}

export default function EmptyState({ message = '暂无数据' }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: '#999' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
      <div style={{ fontSize: 14 }}>{message}</div>
    </div>
  );
}
