// ============================================================
// Appearance Settings Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Sun, Moon, Monitor, LayoutGrid, TrendingUp, Clock, Sparkles,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle, Home
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

const SETTINGS_NAV = [
  { label: 'Profile', path: '/profile' },
  { label: 'Security', path: '/settings/security' },
  { label: 'Notifications', path: '/settings/notifications' },
  { label: 'Privacy & Data', path: '/settings/privacy' },
  { label: 'Language', path: '/settings/language' },
  { label: 'Refer & Earn', path: '/settings/refer' },
  { label: 'Payment Methods', path: '/settings/payment' },
  { label: 'Download Settings', path: '/settings/downloads' },
  { label: 'Appearance', path: '/settings/appearance', active: true },
];

const COLOR_OPTIONS = [
  { id: 'purple', color: '#4f46e5', label: 'Purple' },
  { id: 'blue', color: '#2563eb', label: 'Blue' },
  { id: 'green', color: '#16a34a', label: 'Green' },
  { id: 'orange', color: '#ea580c', label: 'Orange' },
  { id: 'red', color: '#dc2626', label: 'Red' },
  { id: 'pink', color: '#db2777', label: 'Pink' },
  { id: 'teal', color: '#0d9488', label: 'Teal' },
];

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '999px',
        background: checked ? '#4f46e5' : '#d0d5dd',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: '3px',
        left: checked ? '23px' : '3px',
        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s',
      }} />
    </div>
  );
}

export default function Appearance() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const [color, setColor] = useState('purple');
  const [fontSize, setFontSize] = useState('medium');
  const [compact, setCompact] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [animations, setAnimations] = useState(true);

  const accentColor = COLOR_OPTIONS.find((c) => c.id === color)?.color || '#4f46e5';

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const divider = `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`;

  // Row layout helper
  function SectionRow({ title, desc, children, noBorder }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: '32px', padding: '24px 0',
        borderBottom: noBorder ? 'none' : divider,
      }}>
        <div style={{ flex: '0 0 240px' }}>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 4px' }}>{title}</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5, margin: 0 }}>{desc}</p>
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/settings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Appearance</span>
        </div>

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

          {/* CENTER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Appearance</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Customize your theme and appearance.</p>
            </div>

            <div style={{ ...card, padding: '0 28px' }}>

              {/* ── Theme ── */}
              <SectionRow title="Theme" desc="Choose your preferred theme for the application.">
                <div style={{ display: 'flex', gap: '14px' }}>
                  {[
                    { id: 'light', icon: Sun, label: 'Light' },
                    { id: 'dark', icon: Moon, label: 'Dark' },
                    { id: 'system', icon: Monitor, label: 'System' },
                  ].map((t) => {
                    const TIcon = t.icon;
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                          padding: '16px 24px', borderRadius: '12px',
                          border: `2px solid ${isActive ? '#4f46e5' : (isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0')}`,
                          background: isActive ? (isDark ? 'rgba(79,70,229,0.1)' : '#f5f3ff') : (isDark ? 'rgba(255,255,255,0.03)' : '#fafafa'),
                          cursor: 'pointer', transition: 'all 0.15s',
                          minWidth: '90px',
                        }}>
                        <TIcon size={24} color={isActive ? '#4f46e5' : (isDark ? '#94a3b8' : '#667085')} />
                        <span style={{ fontSize: '0.8rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#4f46e5' : 'var(--text-muted)' }}>{t.label}</span>
                        {/* Radio dot */}
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '50%',
                          border: `2px solid ${isActive ? '#4f46e5' : '#d0d5dd'}`,
                          background: isActive ? '#4f46e5' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </SectionRow>

              {/* ── Color Scheme ── */}
              <SectionRow title="Color Scheme" desc="Choose the primary color scheme for your experience.">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  {COLOR_OPTIONS.map((c) => {
                    const isActive = color === c.id;
                    return (
                      <div key={c.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => setColor(c.id)}
                          style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: c.color,
                            border: `3px solid ${isActive ? c.color : 'transparent'}`,
                            outline: isActive ? `3px solid ${c.color}40` : 'none',
                            outlineOffset: '2px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.15s', boxShadow: isActive ? `0 0 0 2px #fff, 0 0 0 4px ${c.color}` : 'none',
                          }}>
                          {isActive && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>
              </SectionRow>

              {/* ── Font Size ── */}
              <SectionRow title="Font Size" desc="Adjust the font size for better readability.">
                <div style={{
                  display: 'flex', borderRadius: '8px', overflow: 'hidden',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                  width: 'fit-content',
                }}>
                  {['Small', 'Medium', 'Large'].map((size) => {
                    const isActive = fontSize === size.toLowerCase();
                    return (
                      <button
                        key={size}
                        onClick={() => setFontSize(size.toLowerCase())}
                        style={{
                          padding: '10px 28px', background: isActive ? '#4f46e5' : 'transparent',
                          color: isActive ? '#fff' : 'var(--text-muted)',
                          border: 'none', cursor: 'pointer',
                          fontSize: '0.84rem', fontWeight: isActive ? 700 : 500,
                          transition: 'all 0.15s',
                        }}>
                        {size}
                      </button>
                    );
                  })}
                </div>
              </SectionRow>

              {/* ── Other Display Options ── */}
              <SectionRow title="Other Display Options" desc="Customize additional display preferences.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { icon: LayoutGrid, iconBg: '#f3e8ff', iconColor: '#7e22ce', label: 'Compact Mode', desc: 'Reduce spacing and use a compact layout.', value: compact, onChange: setCompact },
                    { icon: TrendingUp, iconBg: '#e0e7ff', iconColor: '#4f46e5', label: 'Show Course Progress on Dashboard', desc: 'Display your course progress widget.', value: showProgress, onChange: setShowProgress },
                    { icon: Clock, iconBg: '#f0fdf4', iconColor: '#16a34a', label: 'Show Recent Activity', desc: 'Display your recent activities on dashboard.', value: showActivity, onChange: setShowActivity },
                    { icon: Sparkles, iconBg: '#fef3c7', iconColor: '#b45309', label: 'Animations', desc: 'Enable smooth animations throughout the app.', value: animations, onChange: setAnimations },
                  ].map((item, i, arr) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                        padding: '14px 0',
                        borderBottom: i < arr.length - 1 ? divider : 'none',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={16} color={item.iconColor} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>{item.label}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '1px' }}>{item.desc}</div>
                          </div>
                        </div>
                        <Toggle checked={item.value} onChange={item.onChange} />
                      </div>
                    );
                  })}
                </div>
              </SectionRow>

              {/* ── Preview ── */}
              <SectionRow title="Preview" desc="See how your preferences look." noBorder>
                {/* Mini Preview Card */}
                <div style={{
                  borderRadius: '12px', overflow: 'hidden',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                  {/* Preview header */}
                  <div style={{
                    padding: '10px 14px',
                    background: accentColor,
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={10} color="#fff" />
                    </div>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.78rem' }}>AI Learning</span>
                  </div>

                  {/* Preview body */}
                  <div style={{ display: 'flex', background: '#fff' }}>
                    {/* Mini sidebar */}
                    <div style={{ width: '60px', background: '#f9fafb', borderRight: '1px solid #eaecf0', padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[Home, BookOpen, Video, Settings].map((Icon, i) => (
                        <div key={i} style={{
                          width: '28px', height: '28px', borderRadius: '8px',
                          background: i === 0 ? `${accentColor}20` : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Icon size={13} color={i === 0 ? accentColor : '#94a3b8'} />
                        </div>
                      ))}
                    </div>

                    {/* Preview main */}
                    <div style={{ flex: 1, padding: '12px 14px' }}>
                      <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: '0 0 4px' }}>Semester Preview</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e293b' }}>Welcome back, Shailendra! 👋</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>My Progress</div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#1e293b' }}>75%</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: '0 0 6px' }}>Continue your learning journey</p>
                      {/* Progress bar */}
                      <div style={{ width: '60%', height: '6px', borderRadius: '999px', background: '#e2e8f0', overflow: 'hidden' }}>
                        <div style={{ width: '75%', height: '100%', background: accentColor, borderRadius: '999px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </SectionRow>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => {
                  setTheme('light'); setColor('purple'); setFontSize('medium');
                  setCompact(false); setShowProgress(true); setShowActivity(true); setAnimations(true);
                  toast('Reset to default settings', { icon: '↩️' });
                }}
                style={{
                  padding: '10px 22px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer',
                }}>
                Reset to Default
              </button>
              <button
                onClick={() => toast.success('Appearance settings saved!')}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                  fontSize: '0.86rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                }}>
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

            {/* Color preview widget */}
            <div style={{ ...card, padding: '16px' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, margin: '0 0 10px' }}>Selected Theme</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: accentColor }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)', textTransform: 'capitalize' }}>{color}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{theme} mode</div>
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
      </div>
    </PageWrapper>
  );
}
