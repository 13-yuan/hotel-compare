interface Props {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function PageHeader({ title, showBack = false, onBack }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        padding: '0 14px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {showBack && (
        <span onClick={onBack} style={{ fontSize: 18, marginRight: 10, cursor: 'pointer', color: '#1677FF', userSelect: 'none' }}>
          ← 返回
        </span>
      )}
      <span style={{ fontSize: 17, fontWeight: 600, color: '#1a1a1a' }}>{title}</span>
    </div>
  );
}
