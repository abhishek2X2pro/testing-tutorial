// ============================================================
// Security Settings Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Eye, EyeOff, Shield, Smartphone, Monitor,
  LayoutDashboard, BookOpen, Video, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Award, Trophy, Bell,
  MoreVertical, MessageCircle, AlertCircle
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import PageWrapper from '../../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const SIDEBAR_MENU = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
  { label: 'Live Classes', icon: Video, path: '/live-classes' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Downloads', icon: Download, path: '/downloads' },
  { label: 'Orders', icon: FileText, path: '/orders' },
  { label: 'Notifications', icon: Bell, path: '/settings/notifications', badge: 3 },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/profile', active: true },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const SETTINGS_NAV = [
  { label: 'Profile', path: '/profile' },
  { label: 'Security', path: '/settings/security', active: true },
  { label: 'Notifications', path: '/settings/notifications' },
  { label: 'Privacy & Data', path: '/settings/privacy' },
  { label: 'Language', path: '/settings/language' },
  { label: 'Refer & Earn', path: '/settings/refer' },
];

const ACTIVE_SESSIONS = [
  { device: 'Windows · Chrome', badge: 'This Device', location: 'India · IP 103.21.45.67', time: 'Active now', icon: 'chrome', isActive: true },
  { device: 'Android · Mobile App', badge: null, location: 'India · IP 117.199.32.11', time: 'Yesterday, 08:45 PM', icon: 'mobile', isActive: false },
  { device: 'MacOS · Safari', badge: null, location: 'India · IP 122.160.25.89', time: 'Jul 24, 2024, 11:20 AM', icon: 'desktop', isActive: false },
];

function DeviceIcon({ type, size = 20 }) {
  if (type === 'mobile') return <Smartphone size={size} />;
  return <Monitor size={size} />;
}

export default function SecuritySettings() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPw, setCurrentPw] = useState('••••••••••');
  const [newPw, setNewPw] = useState('••••••••••');
  const [confirmPw, setConfirmPw] = useState('••••••••••');

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/profile" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Security</span>
        </div>

        {/* 3-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '24px', alignItems: 'start' }}>

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
                    position: 'relative',
                  }}>
                    <Icon size={16} color={item.active ? '#4f46e5' : (isDark ? '#94a3b8' : '#667085')} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        marginLeft: 'auto', background: '#ef4444', color: '#fff',
                        fontSize: '0.62rem', fontWeight: 700, borderRadius: '999px',
                        padding: '1px 5px', minWidth: '16px', textAlign: 'center',
                      }}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
              <button onClick={() => { logout(); navigate('/login'); }} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                fontSize: '0.82rem', fontWeight: 500,
                color: '#ef4444', background: 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>

            {/* Go Premium */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '14px', padding: '18px 14px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
                boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
              }}>Upgrade Now</button>
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Security</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Manage your account security and keep your data safe.</p>
            </div>

            {/* Change Password */}
            <div style={{ ...card, padding: '24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px' }}>
              <div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px' }}>Change Password</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>Choose a strong password to keep your account secure.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Current Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 40px 10px 14px', borderRadius: '8px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                        background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                        color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <button onClick={() => setShowCurrent(!showCurrent)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 40px 10px 14px', borderRadius: '8px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                        background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                        color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <button onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Use 8 or more characters with a mix of letters, numbers & symbols.</span>
                </div>

                {/* Confirm Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Confirm New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 40px 10px 14px', borderRadius: '8px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                        background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                        color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => toast.success('Password updated successfully!')}
                    style={{
                      padding: '10px 20px', borderRadius: '8px',
                      background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                      fontSize: '0.84rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                    }}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* 2FA Card */}
            <div style={{ ...card, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={22} color="#4f46e5" />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Two-Factor Authentication (2FA)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 4px' }}>Add an extra layer of security to your account by enabling 2FA.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>2FA is currently</span>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 700 }}>Enabled</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: '4px 0 0' }}>You will be asked for a verification code in addition to your password when logging in.</p>
                </div>
              </div>
              <button onClick={() => toast.success('2FA management panel opening...')} style={{
                padding: '9px 18px', borderRadius: '8px',
                background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>Manage 2FA</button>
            </div>

            {/* Active Sessions */}
            <div style={{ ...card, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px' }}>Active Sessions</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Manage your active sessions on other devices.</p>
                </div>
                <button onClick={() => toast.success('Viewing all sessions...')} style={{
                  padding: '7px 14px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                }}>View All Sessions</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {ACTIVE_SESSIONS.map((session, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: i < ACTIVE_SESSIONS.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}` : 'none',
                    gap: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: isDark ? 'rgba(255,255,255,0.06)' : '#f2f4f7',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <DeviceIcon type={session.icon} size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>{session.device}</span>
                          {session.badge && (
                            <span style={{ padding: '2px 8px', borderRadius: '999px', background: '#dbeafe', color: '#1d4ed8', fontSize: '0.68rem', fontWeight: 700 }}>{session.badge}</span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{session.location}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.76rem', color: session.isActive ? '#16a34a' : 'var(--text-muted)', fontWeight: session.isActive ? 700 : 400 }}>{session.time}</span>
                      {!session.isActive && (
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', display: 'flex', padding: '4px' }}>
                          <MoreVertical size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Account Activity */}
            <div style={{ ...card, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.12)' : '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertCircle size={20} color="#4f46e5" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px' }}>Recent Account Activity</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Review your recent account activity and security events.</p>
                </div>
              </div>
              <button onClick={() => toast.success('Opening account activity log...')} style={{
                padding: '7px 14px', borderRadius: '8px',
                background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>View Activity</button>
            </div>

            {/* Delete Account */}
            <div style={{ ...card, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <LogOut size={20} color="#ef4444" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px' }}>Delete Account</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Permanently delete your account and all your data.</p>
                </div>
              </div>
              <button onClick={() => toast.error('This action is irreversible. Contact support to proceed.')} style={{
                padding: '7px 14px', borderRadius: '8px',
                background: 'transparent', border: '1px solid #ef4444',
                color: '#ef4444', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>Delete My Account</button>
            </div>

            {/* Security tip */}
            <div style={{
              background: isDark ? 'rgba(79,70,229,0.08)' : '#f8f9ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#e0e7ff'}`,
              borderRadius: '12px', padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <AlertCircle size={16} color="#4f46e5" />
              <span style={{ fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#374151' }}>
                <strong>Secure Your Account:</strong> Never share your password with anyone. AI Learning will never ask for your password.
              </span>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Settings Sub-nav */}
            <div style={{ ...card, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px 2px' }}>SETTINGS</h4>
              {SETTINGS_NAV.map((item) => (
                <Link key={item.path} to={item.path} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 12px', borderRadius: '8px', fontSize: '0.83rem',
                  fontWeight: item.active ? 700 : 500,
                  color: item.active ? '#4f46e5' : (isDark ? '#cbd5e1' : '#475467'),
                  background: item.active ? (isDark ? 'rgba(79,70,229,0.12)' : '#f5f3ff') : 'transparent',
                  textDecoration: 'none', transition: 'all 0.15s',
                }}>
                  <span>{item.label}</span>
                  <ChevronRight size={14} color={item.active ? '#4f46e5' : '#98a2b3'} />
                </Link>
              ))}
            </div>

            {/* Security Score */}
            <div style={{
              ...card, padding: '18px',
              background: isDark ? 'linear-gradient(135deg,#1e1b4b,#1e3a5f)' : 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
              border: `1px solid ${isDark ? 'rgba(16,185,129,0.2)' : '#bbf7d0'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Shield size={20} color="#16a34a" />
                <h4 style={{ color: isDark ? '#fff' : '#15803d', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>Security Score</h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ flex: 1, height: '8px', borderRadius: '999px', background: isDark ? 'rgba(255,255,255,0.1)' : '#bbf7d0', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: '#16a34a', borderRadius: '999px' }} />
                </div>
                <strong style={{ color: isDark ? '#fff' : '#15803d', fontSize: '1rem', fontWeight: 800 }}>80%</strong>
              </div>
              <p style={{ color: isDark ? '#cbd5e1' : '#15803d', fontSize: '0.76rem', margin: 0 }}>Good! Enable 2FA and set a strong password to reach 100%.</p>
            </div>
          </div>
        </div>

        {/* Floating chat */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
          <button
            onClick={() => toast.success('Chat assistant coming soon!')}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
              border: 'none', boxShadow: '0 6px 20px rgba(79,70,229,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
            <MessageCircle size={22} />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
