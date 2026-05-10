import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, sendSms } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendSms = async () => {
    if (phone.length !== 11 || !/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的手机号');
      return;
    }
    setError('');
    await sendSms(phone);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleLogin = async () => {
    if (!phone || !code) return;
    setLoading(true);
    setError('');
    const ok = await login(phone, code);
    setLoading(false);
    if (ok) {
      navigate('/home', { replace: true });
    } else {
      setError('验证码错误（测试验证码：123456）');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: 40, background: '#fff' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🏨</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>酒店比价</div>
      <div style={{ fontSize: 13, color: '#999', marginBottom: 32 }}>多平台比价，省钱住好房</div>

      {/* 手机号 */}
      <div style={{ width: '100%', maxWidth: 320, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>手机号</div>
        <input
          type="tel"
          maxLength={11}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          placeholder="请输入手机号"
          style={{
            width: '100%',
            padding: '12px 14px',
            fontSize: 16,
            border: '1px solid #e0e0e0',
            borderRadius: 10,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* 验证码 */}
      <div style={{ width: '100%', maxWidth: 320, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>验证码</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="请输入验证码"
            style={{
              flex: 1,
              padding: '12px 14px',
              fontSize: 16,
              border: '1px solid #e0e0e0',
              borderRadius: 10,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleSendSms}
            disabled={countdown > 0}
            style={{
              width: 110,
              fontSize: 13,
              border: '1px solid #1677FF',
              borderRadius: 10,
              background: countdown > 0 ? '#f5f5f5' : '#fff',
              color: countdown > 0 ? '#bbb' : '#1677FF',
              cursor: countdown > 0 ? 'not-allowed' : 'pointer',
              flexShrink: 0,
            }}
          >
            {countdown > 0 ? `${countdown}s` : '发送验证码'}
          </button>
        </div>
      </div>

      {error && <div style={{ width: '100%', maxWidth: 320, fontSize: 12, color: '#FF4D4F', marginBottom: 12 }}>{error}</div>}

      <button
        onClick={handleLogin}
        disabled={loading || !phone || !code}
        style={{
          width: '100%',
          maxWidth: 320,
          padding: '14px',
          fontSize: 16,
          fontWeight: 600,
          color: '#fff',
          background: phone && code ? '#1677FF' : '#c0d8f0',
          border: 'none',
          borderRadius: 10,
          cursor: phone && code ? 'pointer' : 'not-allowed',
          marginBottom: 16,
        }}
      >
        {loading ? '登录中...' : '登录 / 注册'}
      </button>

      <div style={{ fontSize: 11, color: '#bbb' }}>登录即同意《用户协议》和《隐私政策》</div>
    </div>
  );
}
