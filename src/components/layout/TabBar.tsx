import { useLocation, useNavigate } from 'react-router-dom';

type TabKey = 'home' | 'search' | 'favorites' | 'profile';

const tabs: { key: TabKey; label: string; icon: string; path: string }[] = [
  { key: 'home', label: '首页', icon: '🏠', path: '/home' },
  { key: 'search', label: '搜索', icon: '🔍', path: '/search' },
  { key: 'favorites', label: '收藏', icon: '❤️', path: '/favorites' },
  { key: 'profile', label: '我的', icon: '👤', path: '/profile' },
];

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = (location.pathname.split('/')[1] || 'home') as TabKey;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 56,
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
        paddingBottom: 'env(safe-area-inset-bottom)',
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => navigate(tab.path)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            opacity: current === tab.key ? 1 : 0.45,
            transition: 'opacity 0.15s',
          }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{ fontSize: 10, fontWeight: current === tab.key ? 600 : 400, color: current === tab.key ? '#1677FF' : '#999' }}>
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}
