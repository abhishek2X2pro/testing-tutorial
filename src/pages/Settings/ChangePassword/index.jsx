// ============================================================
// Change Password Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Eye, EyeOff, ShieldCheck,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import PageWrapper from '../../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const SIDEBAR_MENU = [
  { label: 'Overview', icon: BookOpen, path: '/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
  { label: 'Live Classes', icon: Video, path: '/live-classes' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Downloads', icon: Download, path: '/downloads' },
  { label: 'Orders', icon: FileText, path: '/orders' },
  { label: 'Notifications', icon: Bell, path: '/settings/notifications', badge: 3 },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/settings', active: true },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

function getStrength(pwd) {
  if (!pwd) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
  if (score === 2) return { level: 2, label: 'Fair', color: '#f59e0b' };
  if (score === 3) return { level: 3, label: 'Good', color: '#3b82f6' };
  return { level: 4, label: 'Strong', color: '#16a34a' };
}

export default function ChangePassword() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getStrength(newPwd);

  const handleUpdate = () => {
    if (!current) { toast.error('Enter your current password'); return; }
    if (newPwd.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (newPwd !== confirm) { toast.error('Passwords do not match'); return; }
    toast.success('Password updated successfully!');
    setCurrent(''); setNewPwd(''); setConfirm('');
  };

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const inputWrap = {
    position: 'relative', display: 'flex', alignItems: 'center',
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 44px 12px 16px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none',
    letterSpacing: '0.1em',
    transition: 'border-color 0.15s',
  };

  const eyeBtn = {
    position: 'absolute', right: '14px',
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#94a3b8', display: 'flex', padding: '4px',
  };

  const labelStyle = {
    fontSize: '0.9rem', fontWeight: 700,
    color: 'var(--text-primary)', display: 'block', marginBottom: '10px',
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/settings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Change Password</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ ...card, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {SIDEBAR_MENU.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} to={item.path} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem',
                    fontWeight: item.active ? 700 : 500,
                    color: item.active ? '#4f46e5' : (isDark ? '#cbd5e1' : '#475467'),
                    background: item.active ? (isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff') : 'transparent',
                    textDecoration: 'none', transition: 'all 0.15s ease',
                  }}>
                    <Icon size={16} color={item.active ? '#4f46e5' : (isDark ? '#94a3b8' : '#667085')} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', fontSize: '0.62rem', fontWeight: 700, borderRadius: '999px', padding: '1px 5px' }}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
              <button onClick={() => { logout(); navigate('/login'); }} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px',
                fontSize: '0.82rem', fontWeight: 500, color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <LogOut size={16} /><span>Logout</span>
              </button>
            </div>

            {/* Go Premium */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '14px', padding: '18px 14px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={22} color="#4f46e5" />
              </div>
              <div>
                <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>Go Premium!</h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>Unlock unlimited access to all courses, live classes and premium resources.</p>
              </div>
              <button onClick={() => navigate('/subscription')} style={{
                width: '100%', padding: '9px 14px', borderRadius: '8px',
                background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
              }}>Upgrade Now</button>
            </div>
          </div>

          {/* CENTER — Change Password Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Change Password</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Update your account password to keep it secure.</p>
            </div>

            <div style={{ ...card, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Current Password */}
              <div>
                <label style={labelStyle}>Current Password</label>
                <div style={inputWrap}>
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="••••••••••••"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                  />
                  <button style={eyeBtn} onClick={() => setShowCurrent(!showCurrent)} type="button">
                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: '6px 0 0' }}>Enter your current password</p>
              </div>

              {/* New Password */}
              <div>
                <label style={labelStyle}>New Password</label>
                <div style={inputWrap}>
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="••••••••••••"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                  />
                  <button style={eyeBtn} onClick={() => setShowNew(!showNew)} type="button">
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Helper + Strength */}
                <p style={{ color: '#16a34a', fontSize: '0.76rem', margin: '6px 0 0', fontWeight: 500 }}>
                  Password must be at least 8 characters long
                </p>

                {newPwd.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ fontSize: '0.78rem', margin: '0 0 8px', color: 'var(--text-muted)' }}>
                      Password Strength:{' '}
                      <span style={{ fontWeight: 700, color: strength.color }}>{strength.label}</span>
                    </p>
                    {/* Strength bars */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          style={{
                            flex: 1, height: '6px', borderRadius: '999px',
                            background: bar <= strength.level ? strength.color : (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'),
                            transition: 'background 0.3s',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label style={labelStyle}>Confirm New Password</label>
                <div style={inputWrap}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      ...inputStyle,
                      borderColor: confirm && newPwd && confirm !== newPwd ? '#ef4444' : (isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'),
                    }}
                    onFocus={(e) => e.target.style.borderColor = confirm !== newPwd ? '#ef4444' : '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = confirm && newPwd && confirm !== newPwd ? '#ef4444' : (isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd')}
                  />
                  <button style={eyeBtn} onClick={() => setShowConfirm(!showConfirm)} type="button">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p style={{
                  fontSize: '0.76rem', margin: '6px 0 0',
                  color: confirm && newPwd && confirm !== newPwd ? '#ef4444' : 'var(--text-muted)',
                }}>
                  {confirm && newPwd && confirm !== newPwd ? 'Passwords do not match' : 'Re-enter your new password'}
                </p>
              </div>

              {/* Security tip */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                padding: '16px 20px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={18} color="#4f46e5" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 3px' }}>Keep your account secure</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>Use a strong password with a mix of letters, numbers and symbols.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '4px' }}>
                <button
                  onClick={() => { setCurrent(''); setNewPwd(''); setConfirm(''); navigate('/settings/security'); }}
                  style={{
                    padding: '10px 28px', borderRadius: '8px',
                    background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                    color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer',
                  }}>
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  style={{
                    padding: '10px 28px', borderRadius: '8px',
                    background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                    fontSize: '0.86rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                  }}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating chat */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
          <button onClick={() => toast.success('Chat assistant coming soon!')} style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
            border: 'none', boxShadow: '0 6px 20px rgba(79,70,229,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <MessageCircle size={22} />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
