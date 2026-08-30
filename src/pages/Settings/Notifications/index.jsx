// ============================================================
// Notification Settings Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Mail, BookOpen, Video, Award, Heart, Download,
  FileText, Settings, HelpCircle, LogOut, Trophy, Bell,
  Shield, MessageCircle, Clock, Sun, Moon
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
  { label: 'Notifications', icon: Bell, path: '/settings/notifications', active: true, badge: 3 },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/profile' },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const SETTINGS_NAV = [
  { label: 'Profile', path: '/profile' },
  { label: 'Security', path: '/settings/security' },
  { label: 'Notifications', path: '/settings/notifications', active: true },
  { label: 'Privacy & Data', path: '/settings/privacy' },
  { label: 'Language', path: '/settings/language' },
  { label: 'Refer & Earn', path: '/settings/refer' },
];

// Toggle switch component
function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '999px',
        background: checked ? '#4f46e5' : '#d0d5dd',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: '3px',
        left: checked ? '23px' : '3px',
        width: '18px', height: '18px',
        borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

const NOTIFICATION_SECTIONS = [
  {
    title: 'Email Notifications',
    desc: 'Receive notifications via email.',
    icon: Mail,
    iconBg: '#e0e7ff',
    iconColor: '#4f46e5',
    key: 'email',
    defaultOn: true,
  },
  {
    title: 'Course Updates',
    desc: 'Get notified about new lessons, modules and course updates.',
    icon: BookOpen,
    iconBg: '#e0f2fe',
    iconColor: '#0369a1',
    key: 'courseUpdates',
    defaultOn: true,
  },
  {
    title: 'Live Class Reminders',
    desc: 'Receive reminders before live classes.',
    icon: Video,
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
    key: 'liveReminders',
    defaultOn: true,
  },
  {
    title: 'New Courses',
    desc: 'Be the first to know about new courses.',
    icon: BookOpen,
    iconBg: '#fef3c7',
    iconColor: '#b45309',
    key: 'newCourses',
    defaultOn: true,
  },
  {
    title: 'Certificates',
    desc: 'Get notified when your certificate is ready.',
    icon: Award,
    iconBg: '#f3e8ff',
    iconColor: '#7e22ce',
    key: 'certificates',
    defaultOn: true,
  },
  {
    title: 'Offers & Discounts',
    desc: 'Receive emails about offers and discounts.',
    icon: Shield,
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    key: 'offers',
    defaultOn: false,
  },
  {
    title: 'Account & Security',
    desc: 'Important updates related to your account and security.',
    icon: Shield,
    iconBg: '#fef2f2',
    iconColor: '#dc2626',
    key: 'accountSecurity',
    defaultOn: true,
  },
];

const PUSH_SECTIONS = [
  {
    title: 'Push Notifications',
    desc: 'Receive notifications on your device.',
    icon: Bell,
    iconBg: '#e0e7ff',
    iconColor: '#4f46e5',
    key: 'push',
    defaultOn: true,
  },
  {
    title: 'Learning Reminders',
    desc: 'Reminder to continue your learning journey.',
    icon: BookOpen,
    iconBg: '#e0f2fe',
    iconColor: '#0369a1',
    key: 'learningReminders',
    defaultOn: true,
  },
  {
    title: 'Achievements',
    desc: 'Get notified about your achievements and milestones.',
    icon: Trophy,
    iconBg: '#fef3c7',
    iconColor: '#b45309',
    key: 'achievements',
    defaultOn: true,
  },
  {
    title: 'Community Updates',
    desc: 'Get updates about discussions and community activities.',
    icon: MessageCircle,
    iconBg: '#f1f5f9',
    iconColor: '#64748b',
    key: 'community',
    defaultOn: false,
  },
];

export default function NotificationSettings() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const initState = (sections) =>
    sections.reduce((acc, s) => ({ ...acc, [s.key]: s.defaultOn }), {});

  const [emailToggles, setEmailToggles] = useState(initState(NOTIFICATION_SECTIONS));
  const [pushToggles, setPushToggles] = useState(initState(PUSH_SECTIONS));
  const [quietFrom, setQuietFrom] = useState('22:00');
  const [quietTo, setQuietTo] = useState('07:00');

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  function NotifRow({ item, toggles, setToggles }) {
    const Icon = item.icon;
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`,
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon size={18} color={item.iconColor} />
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px' }}>{item.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{item.desc}</p>
          </div>
        </div>
        <Toggle checked={toggles[item.key]} onChange={(v) => setToggles((prev) => ({ ...prev, [item.key]: v }))} />
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
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Notification Settings</span>
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
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Notification Settings</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Choose what notifications you want to receive and how.</p>
            </div>

            {/* Email Notifications Card */}
            <div style={{ ...card, padding: '20px 24px' }}>
              {NOTIFICATION_SECTIONS.map((item) => (
                <NotifRow key={item.key} item={item} toggles={emailToggles} setToggles={setEmailToggles} />
              ))}
            </div>

            {/* Push Notifications Card */}
            <div style={{ ...card, padding: '20px 24px' }}>
              {PUSH_SECTIONS.map((item) => (
                <NotifRow key={item.key} item={item} toggles={pushToggles} setToggles={setPushToggles} />
              ))}
            </div>

            {/* Quiet Hours */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={18} color="#4f46e5" />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 3px' }}>Quiet Hours</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Choose when you don't want to receive non-urgent notifications.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>From</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '8px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#fff' }}>
                      <Moon size={15} color="#4f46e5" />
                      <select value={quietFrom} onChange={(e) => setQuietFrom(e.target.value)} style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.84rem', cursor: 'pointer' }}>
                        {['20:00','21:00','22:00','23:00'].map(t => <option key={t} value={t}>{t === '22:00' ? '10:00 PM' : t === '21:00' ? '09:00 PM' : t === '23:00' ? '11:00 PM' : '08:00 PM'}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>To</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '8px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#fff' }}>
                      <Sun size={15} color="#ea580c" />
                      <select value={quietTo} onChange={(e) => setQuietTo(e.target.value)} style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.84rem', cursor: 'pointer' }}>
                        {['06:00','07:00','08:00','09:00'].map(t => <option key={t} value={t}>{t === '07:00' ? '07:00 AM' : t === '06:00' ? '06:00 AM' : t === '08:00' ? '08:00 AM' : '09:00 AM'}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
                background: isDark ? 'rgba(79,70,229,0.08)' : '#f8f9ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#e0e7ff'}`,
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Bell size={14} color="#4f46e5" />
                <span style={{ fontSize: '0.76rem', color: isDark ? '#cbd5e1' : '#374151' }}>You will still receive important account and security notifications during quiet hours.</span>
              </div>
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
