// ============================================================
// Language Settings Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Globe, Calendar, Clock,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle, Info
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
  { label: 'Settings', icon: Settings, path: '/profile', active: true },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const SETTINGS_NAV = [
  { label: 'Profile', path: '/profile' },
  { label: 'Security', path: '/settings/security' },
  { label: 'Notifications', path: '/settings/notifications' },
  { label: 'Privacy & Data', path: '/settings/privacy' },
  { label: 'Language', path: '/settings/language', active: true },
  { label: 'Refer & Earn', path: '/settings/refer' },
];

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '999px',
        background: checked ? '#4f46e5' : '#d0d5dd',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
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

function RadioOption({ label, desc, badge, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', padding: '2px 0' }}>
      <div onClick={onChange} style={{
        width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
        border: `2px solid ${checked ? '#4f46e5' : '#d0d5dd'}`,
        background: checked ? '#4f46e5' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s',
      }}>
        {checked && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>{label}</div>
          {desc && <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '1px' }}>{desc}</div>}
        </div>
        {badge && (
          <span style={{ padding: '2px 8px', borderRadius: '999px', background: '#dcfce7', color: '#15803d', fontSize: '0.68rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{badge}</span>
        )}
      </div>
    </label>
  );
}

const APP_LANGUAGES = ['English', 'Hindi (हिन्दी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Marathi (मराठी)', 'Bengali (বাংলা)'];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
const TIME_FORMATS = ['12 Hour (AM/PM)', '24 Hour'];

export default function LanguageSettings() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [appLanguage, setAppLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12 Hour (AM/PM)');
  const [contentLang, setContentLang] = useState('same');
  const [autoTranslate, setAutoTranslate] = useState(true);

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const divider = { borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}` };

  const selectStyle = {
    padding: '9px 14px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none', cursor: 'pointer',
    appearance: 'none', paddingRight: '32px',
  };

  function SelectWrapper({ icon: Icon, iconColor, value, onChange, options }) {
    return (
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '10px', zIndex: 1, display: 'flex' }}>
            <Icon size={15} color={iconColor || '#667085'} />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...selectStyle, paddingLeft: Icon ? '32px' : '14px' }}
        >
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronRight size={14} color="#667085" style={{ position: 'absolute', right: '10px', transform: 'rotate(90deg)', pointerEvents: 'none' }} />
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
          <Link to="/profile" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Language</span>
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
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Language</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Choose your preferred language for the platform.</p>
            </div>

            {/* App Language */}
            <div style={{ ...card, padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center', ...divider, paddingBottom: '24px', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>App Language</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Select the language you want to use.</p>
                </div>
                <div style={{ position: 'relative' }}>
                  <Globe size={16} color="#4f46e5" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <select
                    value={appLanguage}
                    onChange={(e) => setAppLanguage(e.target.value)}
                    style={{ ...selectStyle, width: '100%', paddingLeft: '36px' }}
                  >
                    {APP_LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <ChevronRight size={14} color="#667085" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Date & Time Format */}
              <div style={{ ...divider, paddingBottom: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Date & Time Format</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Choose how dates and times are displayed.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Date Format</label>
                      <div style={{ position: 'relative' }}>
                        <Calendar size={14} color="#4f46e5" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} style={{ ...selectStyle, width: '100%', paddingLeft: '30px' }}>
                          {DATE_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <ChevronRight size={13} color="#667085" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Time Format</label>
                      <div style={{ position: 'relative' }}>
                        <Clock size={14} color="#4f46e5" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        <select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)} style={{ ...selectStyle, width: '100%', paddingLeft: '30px' }}>
                          {TIME_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <ChevronRight size={13} color="#667085" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Language */}
              <div style={{ ...divider, paddingBottom: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Content Language Preference</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Select the language for course content (if available).</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <RadioOption label="Same as app language" checked={contentLang === 'same'} onChange={() => setContentLang('same')} />
                    <RadioOption label="English" checked={contentLang === 'english'} onChange={() => setContentLang('english')} />
                    <RadioOption label="Hindi (हिंदी)" badge="Popular" checked={contentLang === 'hindi'} onChange={() => setContentLang('hindi')} />
                    <RadioOption label="Other Languages" checked={contentLang === 'other'} onChange={() => setContentLang('other')} />
                  </div>
                </div>
              </div>

              {/* Auto Translate */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Auto-Translate (Beta)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Automatically translate content to your preferred language when available.</p>
                </div>
                <Toggle checked={autoTranslate} onChange={setAutoTranslate} />
              </div>
            </div>

            {/* Info note */}
            <div style={{
              padding: '14px 18px', borderRadius: '12px',
              background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
              display: 'flex', alignItems: 'flex-start', gap: '10px',
            }}>
              <Info size={16} color="#4f46e5" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ color: isDark ? '#cbd5e1' : '#374151', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
                Changes will be applied across the platform. Some content may not be available in your selected language.
              </p>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => toast.success('Language preferences saved!')}
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
                  textDecoration: 'none',
                }}>
                  <span>{item.label}</span>
                  <ChevronRight size={14} color={item.active ? '#4f46e5' : '#98a2b3'} />
                </Link>
              ))}
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
