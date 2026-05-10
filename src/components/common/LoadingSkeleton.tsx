export default function LoadingSkeleton() {
  return (
    <div style={{ padding: '0 14px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: 'flex', padding: '12px 0', gap: 12, borderBottom: '1px solid #f5f5f5' }}>
          <div style={{ width: 110, height: 100, borderRadius: 8, background: '#f0f0f0' }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 16, width: '70%', background: '#f0f0f0', borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 12, width: '40%', background: '#f0f0f0', borderRadius: 4, marginBottom: 20 }} />
            <div style={{ height: 20, width: '30%', background: '#f0f0f0', borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
