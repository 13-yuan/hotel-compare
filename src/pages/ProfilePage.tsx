import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isLogin, phone, nickname, logout } = useAuthStore();

  if (!isLogin) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '12px 14px', fontSize: 17, fontWeight: 600, color: '#1a1a1a', background: '#fff' }}>我的</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 48 }}>👤</div>
          <div style={{ fontSize: 14, color: '#999' }}>登录后可查看收藏和订单</div>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 40px',
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              background: '#1677FF',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
            }}
          >
            去登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '12px 14px', fontSize: 17, fontWeight: 600, color: '#1a1a1a', background: '#fff' }}>我的</div>

      {/* 用户信息卡 */}
      <div style={{ padding: '20px 14px', background: '#1677FF', color: '#fff', margin: '0 14px', borderRadius: 12, marginTop: 12 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>👤</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{nickname}</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{phone}</div>
      </div>

      {/* 菜单列表 */}
      <div style={{ margin: '20px 14px 0', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        {[
          { label: '❤️ 我的收藏', onClick: () => navigate('/favorites') },
          { label: '📋 关于我们', onClick: () => {} },
        ].map((item) => (
          <div
            key={item.label}
            onClick={item.onClick}
            style={{
              padding: '14px 16px',
              fontSize: 14,
              color: '#333',
              borderBottom: '1px solid #f5f5f5',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{item.label}</span>
            <span style={{ color: '#ccc' }}>›</span>
          </div>
        ))}
      </div>

      {/* 退出登录 */}
      <div style={{ margin: '20px 14px' }}>
        <button
          onClick={() => { logout(); navigate('/home'); }}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: 14,
            color: '#FF4D4F',
            background: '#fff',
            border: '1px solid #FF4D4F',
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >
          退出登录
        </button>
      </div>
    </div>
  );
}
