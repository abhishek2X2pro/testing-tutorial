// ============================================================
// Download Settings Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, HardDrive, Wifi, Bell, Trash2,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, MessageCircle, Info, FolderOpen
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
  { label: 'Download Settings', path: '/settings/downloads', active: true },
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

function RadioOption({ label, desc, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', padding: '4px 0' }}>
      <div
        onClick={onChange}
        style={{
          width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
          border: `2px solid ${checked ? '#4f46e5' : '#d0d5dd'}`,
          background: checked ? '#4f46e5' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.15s',
        }}
      >
        {checked && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '1px' }}>{desc}</div>}
      </div>
    </label>
  );
}

export default function DownloadSettings() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [quality, setQuality] = useState('auto');
  const [wifiOnly, setWifiOnly] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [simultaneous, setSimultaneous] = useState('2 Downloads');
  const [location, setLocation] = useState('Internal Storage');
  const [autoDelete, setAutoDelete] = useState('Never');

  const usedGB = 12.45;
  const totalGB = 64;
  const usedPercent = (usedGB / totalGB) * 100;

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const divider = { borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}` };

  const selectStyle = {
    padding: '9px 36px 9px 14px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.84rem', outline: 'none',
    cursor: 'pointer', appearance: 'none', minWidth: '160px',
  };

  function Row({ children, noBorder }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: '32px', padding: '22px 0',
        ...(noBorder ? {} : divider),
      }}>
        {children}
      </div>
    );
  }

  function RowLabel({ title, desc }) {
    return (
      <div style={{ flex: '0 0 260px' }}>
        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 4px' }}>{title}</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{desc}</p>
      </div>
    );
  }

  function SelectWrapper({ value, onChange, options, icon: Icon }) {
    return (
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        {Icon && (
          <Icon size={15} color="#667085" style={{ position: 'absolute', left: '10px', pointerEvents: 'none', zIndex: 1 }} />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...selectStyle, paddingLeft: Icon ? '32px' : '14px' }}
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
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
          <Link to="/settings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Download Settings</span>
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

          {/* CENTER CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Download Settings</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Customize your download preferences for content.</p>
            </div>

            {/* Main Settings Card */}
            <div style={{ ...card, padding: '8px 24px' }}>

              {/* Download Quality */}
              <Row>
                <RowLabel
                  title="Download Quality"
                  desc="Choose the default quality for video downloads."
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '2px' }}>
                  <RadioOption
                    label="Auto (Recommended)"
                    desc="Automatically adjust quality based on your device and storage."
                    checked={quality === 'auto'}
                    onChange={() => setQuality('auto')}
                  />
                  <RadioOption
                    label="High"
                    desc="Best quality, larger file size."
                    checked={quality === 'high'}
                    onChange={() => setQuality('high')}
                  />
                  <RadioOption
                    label="Medium"
                    desc="Good quality, moderate file size."
                    checked={quality === 'medium'}
                    onChange={() => setQuality('medium')}
                  />
                  <RadioOption
                    label="Low"
                    desc="Lower quality, smaller file size."
                    checked={quality === 'low'}
                    onChange={() => setQuality('low')}
                  />
                </div>
              </Row>

              {/* Download Over Wi-Fi Only */}
              <Row>
                <RowLabel
                  title="Download Over Wi-Fi Only"
                  desc="Downloads will only start when connected to a Wi-Fi network."
                />
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '4px' }}>
                  <Toggle checked={wifiOnly} onChange={setWifiOnly} />
                </div>
              </Row>

              {/* Download Notifications */}
              <Row>
                <RowLabel
                  title="Download Notifications"
                  desc="Get notified when downloads are completed."
                />
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '4px' }}>
                  <Toggle checked={notifications} onChange={setNotifications} />
                </div>
              </Row>

              {/* Simultaneous Downloads */}
              <Row>
                <RowLabel
                  title="Simultaneous Downloads"
                  desc="Choose how many downloads can run at the same time."
                />
                <SelectWrapper
                  value={simultaneous}
                  onChange={setSimultaneous}
                  options={['1 Download', '2 Downloads', '3 Downloads', '4 Downloads', '5 Downloads']}
                />
              </Row>

              {/* Download Location */}
              <Row>
                <RowLabel
                  title="Download Location"
                  desc="Choose where downloaded content is saved on your device."
                />
                <SelectWrapper
                  value={location}
                  onChange={setLocation}
                  options={['Internal Storage', 'SD Card', 'Custom Path']}
                  icon={FolderOpen}
                />
              </Row>

              {/* Auto Delete Downloads */}
              <Row>
                <RowLabel
                  title="Auto Delete Downloads"
                  desc="Automatically delete completed downloads after a certain period to save space."
                />
                <SelectWrapper
                  value={autoDelete}
                  onChange={setAutoDelete}
                  options={['Never', 'After 7 Days', 'After 14 Days', 'After 30 Days', 'After 90 Days']}
                />
              </Row>

              {/* Storage Used */}
              <Row noBorder>
                <RowLabel
                  title="Storage Used"
                  desc="Manage your downloaded content."
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
                  {/* Storage label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4f46e5' }}>{usedGB} GB used</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>of {totalGB} GB</span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{
                      width: `${usedPercent}%`, height: '100%',
                      background: 'linear-gradient(90deg,#4f46e5,#6366f1)',
                      borderRadius: '999px',
                    }} />
                  </div>

                  {/* Clear All button */}
                  <button
                    onClick={() => toast.success('Clearing all downloads...')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '9px 16px', borderRadius: '8px',
                      background: 'transparent', border: `1px solid ${isDark ? 'rgba(79,70,229,0.4)' : '#4f46e5'}`,
                      color: '#4f46e5', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                    }}>
                    <Trash2 size={14} /> Clear All Downloads
                  </button>
                </div>
              </Row>
            </div>

            {/* Info Note */}
            <div style={{
              padding: '14px 18px', borderRadius: '12px',
              background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <Info size={16} color="#4f46e5" style={{ flexShrink: 0 }} />
              <p style={{ color: isDark ? '#cbd5e1' : '#374151', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
                Downloads are saved securely on your device and can be accessed anytime in the Downloads section.
              </p>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => toast.success('Download preferences saved!')}
                style={{
                  padding: '10px 28px', borderRadius: '8px',
                  background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                  fontSize: '0.86rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                }}>
                Save Preferences
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

            {/* Storage widget */}
            <div style={{ ...card, padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <HardDrive size={16} color="#4f46e5" />
                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700, margin: 0 }}>Storage</h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{usedGB} GB used</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{totalGB} GB total</span>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0', overflow: 'hidden' }}>
                <div style={{ width: `${usedPercent}%`, height: '100%', background: 'linear-gradient(90deg,#4f46e5,#6366f1)', borderRadius: '999px' }} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '8px 0 0' }}>
                {(totalGB - usedGB).toFixed(2)} GB available
              </p>
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
