// ============================================================
// Settings Page — 1:1 Pixel-Perfect DITTO UI (Tabbed Layout)
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Globe, Moon, Sun, Monitor, Video, Download,
  Clock, Mail, PlaySquare, Bell as BellIcon, Minus, Plus,
  BookOpen, Award, Heart, FileText,
  Settings, HelpCircle, LogOut, Trophy, MessageCircle,
  User, Shield, CreditCard, Lock, SlidersHorizontal, Receipt,
  LayoutDashboard, ShoppingBag
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const SIDEBAR_MENU = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
  { label: 'Live Classes', icon: Video, path: '/live-classes' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Orders', icon: ShoppingBag, path: '/orders' },
  { label: 'Invoices', icon: Receipt, path: '/orders/invoices' },
  { label: 'Resources', icon: FileText, path: '/resources' },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Downloads', icon: Download, path: '/downloads' },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/settings', active: true },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const TABS = [
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  { id: 'account', label: 'Account', icon: Lock, path: '/settings/security' },
  { id: 'security', label: 'Security', icon: Shield, path: '/settings/security' },
  { id: 'notifications', label: 'Notifications', icon: BellIcon, path: '/settings/notifications' },
  { id: 'privacy', label: 'Privacy', icon: Lock, path: '/settings/privacy' },
  { id: 'billing', label: 'Billing', icon: CreditCard, path: '/settings/payment' },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal, path: '/settings', active: true },
];

const QUICK_HELP = [
  { q: 'How to change language?', sub: 'Step-by-step guide' },
  { q: 'How does video quality work?', sub: 'Understand video settings' },
  { q: 'What are learning reminders?', sub: 'Know how reminders help' },
  { q: 'How to set weekly goals?', sub: 'Learn to stay consistent' },
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

function PrefRow({ icon: Icon, iconBg, iconColor, title, desc, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '16px', padding: '14px 0',
      borderBottom: '1px solid var(--border-row)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={18} color={iconColor} />
        </div>
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px' }}>{title}</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0 }}>{desc}</p>
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );
}

const TIMEZONES = ['(GMT+05:30) Asia/Kolkata', '(GMT+00:00) UTC', '(GMT-05:00) US/Eastern', '(GMT+01:00) Europe/London', '(GMT+08:00) Asia/Singapore'];
const VIDEO_QUALITIES = ['Auto (Recommended)', 'High', 'Medium', 'Low'];
const DL_QUALITIES = ['High', 'Auto (Recommended)', 'Medium', 'Low'];
const LANGUAGES = ['English (US)', 'Hindi (हिन्दी)', 'Tamil', 'Telugu', 'Marathi'];

export default function SettingsPage() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('preferences');
  const [language, setLanguage] = useState('English (US)');
  const [theme, setTheme] = useState('light');
  const [videoQuality, setVideoQuality] = useState('Auto (Recommended)');
  const [dlQuality, setDlQuality] = useState('High');
  const [timezone, setTimezone] = useState('(GMT+05:30) Asia/Kolkata');
  const [emailDigest, setEmailDigest] = useState(true);
  const [continueWatching, setContinueWatching] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState(5);

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const selectStyle = {
    padding: '8px 32px 8px 12px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.84rem', outline: 'none',
    cursor: 'pointer', appearance: 'none', minWidth: '180px',
  };

  function SelectBox({ value, onChange, options }) {
    return (
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronRight size={14} color="#667085" style={{ position: 'absolute', right: '10px', transform: 'rotate(90deg)', pointerEvents: 'none' }} />
      </div>
    );
  }

  // CSS var hack for divider
  const style = `
    :root { --border-row: ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}; }
  `;

  return (
    <PageWrapper>
      <style>{style}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', gap: '24px', alignItems: 'start' }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {SIDEBAR_MENU.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} to={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '10px', fontSize: '0.82rem',
                  fontWeight: item.active ? 700 : 500,
                  color: item.active ? '#4f46e5' : (isDark ? '#cbd5e1' : '#475467'),
                  background: item.active ? (isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff') : 'transparent',
                  textDecoration: 'none', transition: 'all 0.15s ease',
                }}>
                  <Icon size={16} color={item.active ? '#4f46e5' : (isDark ? '#94a3b8' : '#667085')} />
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
          </div>

          {/* Customize widget */}
          <div style={{
            marginTop: '20px',
            background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
            borderRadius: '14px', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
          }}>
            {/* Illustration */}
            <div style={{ fontSize: '2.4rem' }}>⚙️</div>
            <div>
              <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.82rem', fontWeight: 800, margin: '0 0 4px' }}>Customize your experience</h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>Update your preferences and learn in the way you like.</p>
            </div>
            <button onClick={() => toast.success('Explore preferences!')} style={{
              width: '100%', padding: '8px 14px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
              fontSize: '0.76rem', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}>Explore Now</button>
          </div>
        </div>

        {/* CENTER + RIGHT */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', alignItems: 'start' }}>

          {/* CENTER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Page heading */}
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Settings</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Manage your account, preferences and security settings.</p>
            </div>

            {/* Tab Bar */}
            <div style={{
              display: 'flex', gap: '0', overflowX: 'auto',
              borderBottom: `2px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eaecf0'}`,
            }}>
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id !== 'preferences') navigate(tab.path);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '10px 16px', background: 'none', border: 'none',
                      borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
                      marginBottom: '-2px',
                      color: isActive ? '#4f46e5' : 'var(--text-muted)',
                      fontSize: '0.82rem', fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                    }}>
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Preferences Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* ── General Preferences ── */}
              <div>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: '0 0 4px' }}>General Preferences</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 12px' }}>Customize your learning experience and platform settings.</p>

                <div style={{ ...card, padding: '4px 20px' }}>

                  {/* Language */}
                  <PrefRow
                    icon={Globe} iconBg="#e0e7ff" iconColor="#4f46e5"
                    title="Language" desc="Choose your preferred language."
                    right={<SelectBox value={language} onChange={setLanguage} options={LANGUAGES} />}
                  />

                  {/* Theme */}
                  <PrefRow
                    icon={Moon} iconBg="#f0f4ff" iconColor="#6366f1"
                    title="Theme" desc="Select your preferred theme."
                    right={
                      <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}` }}>
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
                                display: 'flex', alignItems: 'center', gap: '5px',
                                padding: '8px 14px', fontSize: '0.78rem', fontWeight: isActive ? 700 : 500,
                                background: isActive ? '#4f46e5' : 'transparent',
                                color: isActive ? '#fff' : 'var(--text-muted)',
                                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                              }}>
                              <TIcon size={13} />{t.label}
                            </button>
                          );
                        })}
                      </div>
                    }
                  />

                  {/* Video Quality */}
                  <PrefRow
                    icon={Video} iconBg="#f0fdf4" iconColor="#16a34a"
                    title="Video Quality" desc="Set default video quality for classes."
                    right={<SelectBox value={videoQuality} onChange={setVideoQuality} options={VIDEO_QUALITIES} />}
                  />

                  {/* Download Quality */}
                  <PrefRow
                    icon={Download} iconBg="#fef3c7" iconColor="#b45309"
                    title="Download Quality" desc="Set default quality for downloads."
                    right={<SelectBox value={dlQuality} onChange={setDlQuality} options={DL_QUALITIES} />}
                  />

                  {/* Time Zone */}
                  <PrefRow
                    icon={Clock} iconBg="#e0f2fe" iconColor="#0369a1"
                    title="Time Zone" desc="Choose your current time zone."
                    right={<SelectBox value={timezone} onChange={setTimezone} options={TIMEZONES} />}
                  />

                  {/* Email Digest */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '14px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Mail size={18} color="#e11d48" />
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px' }}>Email Digest</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0 }}>Get a summary of your activity via email.</p>
                      </div>
                    </div>
                    <Toggle checked={emailDigest} onChange={setEmailDigest} />
                  </div>
                </div>
              </div>

              {/* ── Learning Preferences ── */}
              <div>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: '0 0 4px' }}>Learning Preferences</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 12px' }}>Personalize how you learn and track progress.</p>

                <div style={{ ...card, padding: '4px 20px' }}>

                  {/* Continue Watching */}
                  <PrefRow
                    icon={PlaySquare} iconBg="#e0e7ff" iconColor="#4f46e5"
                    title="Continue Watching" desc="Automatically resume where you left off."
                    right={<Toggle checked={continueWatching} onChange={setContinueWatching} />}
                  />

                  {/* Show Learning Reminders */}
                  <PrefRow
                    icon={BellIcon} iconBg="#f0fdf4" iconColor="#16a34a"
                    title="Show Learning Reminders" desc="Receive reminders to keep your learning on track."
                    right={<Toggle checked={reminders} onChange={setReminders} />}
                  />

                  {/* Weekly Goal */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '14px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Trophy size={18} color="#b45309" />
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px' }}>Weekly Goal</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0 }}>Set your weekly learning goal (in hours).</p>
                      </div>
                    </div>

                    {/* Counter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <button
                        onClick={() => setWeeklyGoal((v) => Math.max(1, v - 1))}
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                          background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                          color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700,
                        }}>
                        <Minus size={16} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', minWidth: '20px', textAlign: 'center' }}>{weeklyGoal}</span>
                      <button
                        onClick={() => setWeeklyGoal((v) => Math.min(40, v + 1))}
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                          background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                          color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700,
                        }}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div>
                <button
                  onClick={() => toast.success('Preferences saved successfully!')}
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
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Make It Yours card */}
            <div style={{
              ...card, padding: '20px',
              background: isDark ? 'linear-gradient(135deg,#1e1b4b,#2e1065)' : '#f9f5ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#ddd6fe'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px',
            }}>
              <div style={{ fontSize: '3rem' }}>⚙️</div>
              <div>
                <h3 style={{ color: isDark ? '#fff' : '#4f46e5', fontSize: '0.95rem', fontWeight: 800, margin: '0 0 6px' }}>Make It Yours</h3>
                <p style={{ color: isDark ? '#cbd5e1' : '#6d28d9', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>Adjust your preferences to get a personalized and comfortable learning experience.</p>
              </div>
            </div>

            {/* Quick Help */}
            <div style={{ ...card, padding: '18px' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 14px' }}>Quick Help</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {QUICK_HELP.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toast.success(`Opening: ${item.q}`)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                      padding: '11px 10px', borderRadius: '8px', background: 'transparent', border: 'none',
                      cursor: 'pointer', width: '100%', textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : '#f5f3ff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <HelpCircle size={14} color="#4f46e5" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{item.q}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} color="#98a2b3" style={{ flexShrink: 0 }} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/contact')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  width: '100%', marginTop: '12px', padding: '10px', borderRadius: '10px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                }}>
                <HelpCircle size={15} /> Visit Help Center
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
    </PageWrapper>
  );
}
