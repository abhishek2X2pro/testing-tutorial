// ============================================================
// Password Reset Successful Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Check, ShieldCheck, ArrowRight, Home,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle,
  Bookmark
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

const WHATS_NEXT = [
  {
    icon: BookOpen,
    iconBg: '#f0f4ff', iconColor: '#4f46e5',
    title: 'Explore Courses',
    desc: 'Discover trending courses and start learning something new.',
    path: '/courses',
  },
  {
    icon: Video,
    iconBg: '#f0fdf4', iconColor: '#16a34a',
    title: 'Join Live Classes',
    desc: 'Attend live sessions and learn directly from experts.',
    path: '/live-classes',
  },
  {
    icon: Award,
    iconBg: '#fef3c7', iconColor: '#b45309',
    title: 'Earn Certificates',
    desc: 'Complete courses and earn recognized certificates.',
    path: '/certificates',
  },
  {
    icon: Bookmark,
    iconBg: '#f3e8ff', iconColor: '#7e22ce',
    title: 'Save Your Progress',
    desc: 'Bookmark your favorite courses and continue learning anytime.',
    path: '/wishlist',
  },
];

export default function ResetPasswordSuccess() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
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

          {/* Go Premium widget */}
          <div style={{
            marginTop: '16px',
            background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
            borderRadius: '14px', padding: '18px 14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
          }}>
            <div style={{ fontSize: '2rem' }}>👑</div>
            <div>
              <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.84rem', fontWeight: 800, margin: '0 0 4px' }}>Go Premium!</h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>Unlock exclusive courses, live classes and premium resources.</p>
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

          {/* 2-column inner grid: Success Card | What's Next? */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

            {/* Center Success Card */}
            <div style={{ ...card, padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

              {/* Big Purple Checkmark Badge with sparkles */}
              <div style={{ position: 'relative', margin: '0 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute', width: '130px', height: '130px', borderRadius: '50%',
                  background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff',
                  filter: 'blur(10px)',
                }} />
                
                {/* Outer animated ring */}
                <div style={{
                  width: '96px', height: '96px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 12px 32px rgba(79,70,229,0.4)',
                  position: 'relative', zIndex: 2,
                }}>
                  <Check size={48} color="#ffffff" strokeWidth={3} />
                </div>

                {/* Decorative Sparkles */}
                <span style={{ position: 'absolute', top: '-6px', right: '-4px', fontSize: '1rem', color: '#4f46e5' }}>✦</span>
                <span style={{ position: 'absolute', bottom: '-4px', left: '-6px', fontSize: '0.9rem', color: '#818cf8' }}>✦</span>
                <span style={{ position: 'absolute', top: '10px', left: '-12px', fontSize: '0.7rem', color: '#4f46e5' }}>+</span>
                <span style={{ position: 'absolute', bottom: '12px', right: '-12px', fontSize: '0.7rem', color: '#818cf8' }}>+</span>
              </div>

              {/* Title */}
              <h2 style={{ color: 'var(--text-primary)', fontSize: '1.7rem', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                Password Reset <span style={{ color: '#4f46e5' }}>Successful!</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 28px', maxWidth: '400px' }}>
                Your password has been reset successfully.<br />
                You can now login with your new password.
              </p>

              {/* Your account is secure box */}
              <div style={{
                width: '100%', maxWidth: '460px', padding: '16px 20px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
                display: 'flex', alignItems: 'flex-start', gap: '14px', textAlign: 'left',
                marginBottom: '28px',
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={18} color="#4f46e5" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, margin: '0 0 3px' }}>Your account is secure</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0, lineHeight: 1.4 }}>
                    We recommend keeping your password private and updating it regularly for better security.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '8px',
                    background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                    fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
                  }}>
                  Go to Login <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate('/')}
                  style={{
                    width: '100%', padding: '11px', borderRadius: '8px',
                    background: 'transparent',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                    color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}>
                  <Home size={16} /> Back to Home
                </button>
              </div>

            </div>

            {/* Right — What's Next? Card */}
            <div style={{ ...card, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: 0 }}>What's Next?</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {WHATS_NEXT.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      onClick={() => navigate(item.path)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '2px',
                      }}>
                        <Icon size={18} color={item.iconColor} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, margin: '0 0 2px' }}>{item.title}</h4>
                          <ArrowRight size={14} color="#98a2b3" />
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', lineHeight: 1.4, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Need Help? Box */}
              <div style={{
                padding: '14px 16px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.07)' : '#f5f3ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#ddd6fe'}`,
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HelpCircle size={16} color="#4f46e5" />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 800, margin: 0 }}>Need Help?</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', lineHeight: 1.5, margin: 0 }}>
                  Our support team is here to help you 24/7 for any assistance.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, padding: 0,
                    display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px',
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
