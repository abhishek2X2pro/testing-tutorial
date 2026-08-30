// ============================================================
// Privacy & Data Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Shield, PenLine, Trash2, Download,
  BookOpen, Video, Award, Heart, FileText,
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
  { label: 'Privacy & Data', path: '/settings/privacy', active: true },
  { label: 'Language', path: '/settings/language' },
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

function RadioOption({ label, desc, checked, onChange }) {
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
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '1px' }}>{desc}</div>}
      </div>
    </label>
  );
}

export default function PrivacyData() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState('everyone');
  const [showActivity, setShowActivity] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const divider = { borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}` };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/profile" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Privacy & Data</span>
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
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Privacy & Data</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Manage your privacy settings and control your personal data.</p>
            </div>

            {/* Profile Visibility */}
            <div style={{ ...card, padding: '24px' }}>
              <div style={{ ...divider, paddingBottom: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Profile Visibility</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Choose who can see your profile information.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <RadioOption
                      label="Everyone"
                      desc="Anyone on AI Learning can view your profile."
                      checked={visibility === 'everyone'}
                      onChange={() => setVisibility('everyone')}
                    />
                    <RadioOption
                      label="Learners Only"
                      desc="Only registered learners can view your profile."
                      checked={visibility === 'learners'}
                      onChange={() => setVisibility('learners')}
                    />
                    <RadioOption
                      label="Only Me"
                      desc="Only you can view your profile."
                      checked={visibility === 'me'}
                      onChange={() => setVisibility('me')}
                    />
                  </div>
                </div>
              </div>

              {/* Toggle rows */}
              {[
                { label: 'Show Activity', desc: 'Allow others to see your learning activity and achievements.', value: showActivity, onChange: setShowActivity },
                { label: 'Personalized Recommendations', desc: 'Allow us to use your activity to recommend courses and content.', value: personalizedRecs, onChange: setPersonalizedRecs },
                { label: 'Marketing Communications', desc: 'Receive emails about new courses, offers and updates.', value: marketing, onChange: setMarketing },
                { label: 'Data Collection', desc: 'Allow us to collect data to improve your learning experience.', value: dataCollection, onChange: setDataCollection },
              ].map((item, i, arr) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 0', gap: '24px',
                  ...(i < arr.length - 1 ? divider : {}),
                }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px' }}>{item.label}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{item.desc}</p>
                  </div>
                  <Toggle checked={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>

            {/* Data Actions */}
            <div style={{ ...card, padding: '8px 24px' }}>
              {[
                { icon: Download, iconBg: '#e0e7ff', iconColor: '#4f46e5', label: 'Download My Data', desc: 'Get a copy of all your data stored with us.', action: () => toast.success('Preparing your data download...') },
                { icon: PenLine, iconBg: '#dcfce7', iconColor: '#16a34a', label: 'Manage Consent', desc: 'View and manage your data consent preferences.', action: () => toast.success('Opening consent manager...') },
                { icon: Trash2, iconBg: '#fef2f2', iconColor: '#dc2626', label: 'Delete Account', desc: 'Permanently delete your account and all your data.', action: () => toast.error('Contact support to delete your account.') },
              ].map((item, i, arr) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} onClick={item.action} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    padding: '18px 0', cursor: 'pointer',
                    ...(i < arr.length - 1 ? divider : {}),
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color={item.iconColor} />
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px' }}>{item.label}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} color="#98a2b3" />
                  </div>
                );
              })}
            </div>

            {/* Privacy note */}
            <div style={{
              padding: '14px 18px', borderRadius: '12px',
              background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
              display: 'flex', alignItems: 'flex-start', gap: '10px',
            }}>
              <Info size={16} color="#4f46e5" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ color: isDark ? '#cbd5e1' : '#374151', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
                <strong>We care about your privacy.</strong> Your data is safe with us. Read our{' '}
                <button onClick={() => toast.success('Opening Privacy Policy...')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', fontWeight: 700, padding: 0, fontSize: '0.78rem' }}>Privacy Policy</button>
                {' '}to learn more.
              </p>
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

            {/* Privacy tip */}
            <div style={{
              ...card, padding: '16px',
              background: isDark ? 'rgba(16,185,129,0.06)' : '#f0fdf4',
              border: `1px solid ${isDark ? 'rgba(16,185,129,0.15)' : '#bbf7d0'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Shield size={16} color="#16a34a" />
                <span style={{ fontWeight: 700, fontSize: '0.84rem', color: isDark ? '#fff' : '#15803d' }}>Your Data is Safe</span>
              </div>
              <p style={{ color: isDark ? '#cbd5e1' : '#15803d', fontSize: '0.76rem', lineHeight: 1.5, margin: 0 }}>We use industry-standard encryption to protect your personal information.</p>
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
