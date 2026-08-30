// ============================================================
// Reset Password / Create New Password Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Eye, EyeOff, Lock, ArrowLeft,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle,
  CheckCircle2, Circle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const SIDEBAR_MENU = [
  { label: 'Overview', icon: BookOpen, path: '/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
  { label: 'Live Classes', icon: Video, path: '/live-classes' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Downloads', icon: Download, path: '/downloads' },
  { label: 'Orders', icon: FileText, path: '/orders' },
  { label: 'Notifications', icon: Bell, path: '/settings/notifications' },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const TIPS = [
  {
    badge: 'Aa',
    badgeBg: '#e0e7ff', badgeColor: '#4f46e5',
    title: 'Use a mix of letters',
    desc: 'Combine uppercase and lowercase letters.',
  },
  {
    badge: '123',
    badgeBg: '#dbeafe', badgeColor: '#1d4ed8',
    title: 'Add numbers',
    desc: 'Include at least one number in your password.',
  },
  {
    badge: '@#',
    badgeBg: '#fce7f3', badgeColor: '#9d174d',
    title: 'Use special characters',
    desc: 'Add symbols like @, #, !, % etc. for better security.',
  },
  {
    badge: '🔑',
    badgeBg: '#f0fdf4', badgeColor: '#15803d',
    title: 'Avoid common passwords',
    desc: "Don't use easily guessable information.",
  },
];

function getStrength(pwd) {
  if (!pwd) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
  if (score === 2) return { level: 2, label: 'Fair', color: '#f59e0b' };
  if (score === 3) return { level: 3, label: 'Good', color: '#3b82f6' };
  return { level: 4, label: 'Strong', color: '#16a34a' };
}

export default function ResetPassword() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getStrength(newPwd);

  const checks = [
    { label: 'At least 8 characters long', pass: newPwd.length >= 8 },
    { label: 'Contains uppercase and lowercase letters', pass: /[A-Z]/.test(newPwd) && /[a-z]/.test(newPwd) },
    { label: 'Includes a number', pass: /[0-9]/.test(newPwd) },
    { label: 'Includes a special character', pass: /[^A-Za-z0-9]/.test(newPwd) },
  ];

  const handleReset = () => {
    if (newPwd.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (newPwd !== confirm) { toast.error('Passwords do not match'); return; }
    toast.success('Password reset successfully!');
    navigate('/login');
  };

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 44px 11px 40px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.92rem',
    outline: 'none', letterSpacing: '0.08em', transition: 'border-color 0.15s',
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', gap: '24px', alignItems: 'start' }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width: '200px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {SIDEBAR_MENU.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 500,
                color: isDark ? '#cbd5e1' : '#475467',
                background: 'transparent',
                textDecoration: 'none', transition: 'all 0.15s ease',
              }}>
                <Icon size={16} color={isDark ? '#94a3b8' : '#667085'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button onClick={() => { logout(); navigate('/login'); }} style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px',
            fontSize: '0.82rem', fontWeight: 500, color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
          }}>
            <LogOut size={16} /><span>Logout</span>
          </button>

          {/* Unlock Premium widget */}
          <div style={{
            marginTop: '16px',
            background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
            borderRadius: '14px', padding: '18px 14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
          }}>
            <div style={{ fontSize: '2rem' }}>💎</div>
            <div>
              <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.84rem', fontWeight: 800, margin: '0 0 4px' }}>Unlock Premium</h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>Get unlimited access to all courses, live classes and exclusive features.</p>
            </div>
            <button onClick={() => navigate('/subscription')} style={{
              width: '100%', padding: '9px 14px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
              fontSize: '0.76rem', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}>Upgrade Now</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} color="#98a2b3" />
            <span style={{ color: '#4f46e5', fontWeight: 600 }}>Reset Password</span>
          </div>

          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.02em' }}>Create New Password</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '0 0 8px' }}>Enter your new password below to secure your account.</p>

          {/* 3-column inner grid: Form | Illustration | Tips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 260px', gap: '24px', alignItems: 'start' }}>

            {/* Form */}
            <div style={{ ...card, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* New Password */}
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>New Password</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={15} color="#667085" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="••••••••••••••"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                  />
                  <button onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: '4px' }}>
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Strength */}
                {newPwd.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
                      {[1, 2, 3, 4].map((bar) => (
                        <div key={bar} style={{
                          flex: 1, height: '5px', borderRadius: '999px',
                          background: bar <= strength.level ? strength.color : (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'),
                          transition: 'background 0.3s',
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Password Strength: <strong style={{ color: strength.color }}>{strength.label}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Password Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {checks.map((c) => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {c.pass
                      ? <CheckCircle2 size={16} color="#16a34a" />
                      : <Circle size={16} color="#d0d5dd" />
                    }
                    <span style={{ fontSize: '0.78rem', color: c.pass ? '#16a34a' : 'var(--text-muted)', fontWeight: c.pass ? 600 : 400 }}>{c.label}</span>
                  </div>
                ))}
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Confirm New Password</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={15} color="#667085" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••••••••"
                    style={{
                      ...inputStyle,
                      borderColor: confirm && newPwd && confirm !== newPwd ? '#ef4444' : (isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'),
                    }}
                    onFocus={(e) => e.target.style.borderColor = confirm !== newPwd ? '#ef4444' : '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = confirm && confirm !== newPwd ? '#ef4444' : (isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd')}
                  />
                  <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: '4px' }}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirm && newPwd && confirm !== newPwd && (
                  <p style={{ color: '#ef4444', fontSize: '0.74rem', marginTop: '4px' }}>Passwords do not match</p>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px',
                  background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                  fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
                }}>
                Reset Password
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
              </div>

              {/* Back to Login */}
              <button
                onClick={() => navigate('/login')}
                style={{
                  width: '100%', padding: '11px', borderRadius: '8px',
                  background: 'transparent',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                <ArrowLeft size={16} /> Back to Login
              </button>
            </div>

            {/* Center Illustration */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px 0',
            }}>
              <div style={{ position: 'relative', width: '180px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Background glow */}
                <div style={{
                  position: 'absolute', width: '160px', height: '160px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(79,70,229,0.12), transparent 70%)',
                }} />

                {/* Shield */}
                <div style={{
                  width: '110px', height: '120px',
                  background: 'linear-gradient(160deg, #4f46e5, #6366f1)',
                  borderRadius: '50% 50% 45% 45% / 40% 40% 60% 60%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 16px 40px rgba(79,70,229,0.35)',
                  position: 'relative', zIndex: 2,
                }}>
                  <Lock size={40} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
                </div>

                {/* Stars rating bubble */}
                <div style={{
                  position: 'absolute', bottom: '16px', right: '-10px', zIndex: 3,
                  background: '#fff', borderRadius: '20px', padding: '6px 12px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} style={{ color: '#f59e0b', fontSize: '0.75rem' }}>★</span>
                  ))}
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '0.55rem' }}>✓</span>
                  </div>
                </div>

                {/* Plant decoration */}
                <div style={{ position: 'absolute', bottom: '0', left: '10px', fontSize: '2rem', zIndex: 1 }}>🌿</div>
              </div>
            </div>

            {/* Right — Tips Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Tips for a Strong Password</h3>

              {TIPS.map((tip, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: tip.badgeBg, color: tip.badgeColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 800, flexShrink: 0, letterSpacing: '-0.02em',
                  }}>
                    {tip.badge}
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 2px' }}>{tip.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', lineHeight: 1.4, margin: 0 }}>{tip.desc}</p>
                  </div>
                </div>
              ))}

              {/* Need Help */}
              <div style={{
                marginTop: '4px', padding: '14px 16px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.07)' : '#f5f3ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#ddd6fe'}`,
              }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 800, margin: '0 0 4px' }}>Need Help?</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5, margin: '0 0 10px' }}>If you face any issues, our support team is here to help you.</p>
                <button onClick={() => navigate('/contact')} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, padding: 0,
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  Contact Support <ChevronRight size={13} />
                </button>
              </div>
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
    </PageWrapper>
  );
}
