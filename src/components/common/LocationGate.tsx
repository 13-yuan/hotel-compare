interface Props {
  onRequestGPS: () => void;
  locating: boolean;
  error: string | null;
  onOpenCityPicker: () => void;
}

export default function LocationGate({ onRequestGPS, locating, error, onOpenCityPicker }: Props) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100%', padding: '0 40px',
        textAlign: 'center', background: '#fff',
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 24 }}>📍</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
        获取你的位置
      </div>
      <div style={{ fontSize: 14, color: '#999', marginBottom: 32, lineHeight: 1.6 }}>
        开启定位后，我们将为你展示附近的酒店
      </div>

      <button
        onClick={() => onRequestGPS()}
        disabled={locating}
        style={{
          width: '100%', padding: '16px 0', borderRadius: 12,
          background: locating ? '#91caff' : '#1677FF',
          color: '#fff', fontSize: 17, fontWeight: 600,
          border: 'none', cursor: locating ? 'default' : 'pointer',
          marginBottom: 16,
        }}
      >
        {locating ? '正在定位...' : '📍 获取我的位置'}
      </button>

      {error && (
        <div
          style={{
            fontSize: 13, color: '#FF4D4F', marginBottom: 16,
            background: '#FFF2F0', padding: '10px 14px', borderRadius: 8,
            lineHeight: 1.6, textAlign: 'left', width: '100%',
          }}
        >
          {error}
        </div>
      )}

      <div
        onClick={onOpenCityPicker}
        style={{
          fontSize: 14, color: '#999', cursor: 'pointer',
          borderBottom: '1px solid #ddd', paddingBottom: 2,
        }}
      >
        手动选择城市
      </div>
    </div>
  );
}
