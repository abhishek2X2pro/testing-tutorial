// ============================================================
// Forgot Password Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Mail, ArrowLeft, Send, Lock, Link as LinkIcon, ShieldCheck,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle
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

const STEPS = [
  {
    icon: Mail,
    title: 'Check Your Email',
    desc: "We'll send a password reset link to your email address.",
  },
  {
    icon: LinkIcon,
    title: 'Click the Reset Link',
    desc: 'Open the email and click on the reset link provided.',
  },
  {
    icon: Lock,
    title: 'Create New Password',
    desc: 'Enter a new password and confirm to secure your account.',
  },
];

export default function ForgotPassword() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!email) {
      toast.error('Please enter your registered email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Reset link sent to your email!');
      navigate('/check-email');
    }, 1000);
  };

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 16px 11px 40px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.15s',
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

          {/* Learn Without Limits widget */}
          <div style={{
            marginTop: '16px',
            background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
            borderRadius: '14px', padding: '18px 14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79,70,229,0.15)',
            }}>
              <ShieldCheck size={20} color="#4f46e5" />
            </div>
            <div>
              <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.84rem', fontWeight: 800, margin: '0 0 4px' }}>Learn Without Limits</h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>
                Access unlimited courses and resources with AI Learning Premium.
              </p>
            </div>
            <button onClick={() => navigate('/subscription')} style={{
              width: '100%', padding: '9px 14px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
              fontSize: '0.76rem', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}>Go Premium</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} color="#98a2b3" />
            <span style={{ color: '#4f46e5', fontWeight: 600 }}>Forgot Password</span>
          </div>

          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.02em' }}>Forgot Password?</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '0 0 8px' }}>No worries! Enter your email address and we'll send you a link to reset your password.</p>

          {/* 3-column inner grid: Form | Illustration | What happens next? */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px 280px', gap: '24px', alignItems: 'start' }}>

            {/* Form Card */}
            <div style={{ ...card, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>

              {/* Mail Icon Circle */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: isDark ? 'rgba(79,70,229,0.15)' : '#f0f4ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 0 4px',
              }}>
                <Mail size={22} color="#4f46e5" />
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px' }}>Reset Your Password</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0, maxWidth: '320px' }}>
                  Enter the email address associated with your account and we'll send you instructions to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginTop: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail size={15} color="#667085" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email address"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '8px',
                    background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                    fontSize: '0.88rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(79,70,229,0.35)', opacity: loading ? 0.7 : 1,
                  }}>
                  {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>
              </form>

              {/* Divider */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
              </div>

              {/* Back to Login Button */}
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
              padding: '20px 0',
            }}>
              <div style={{ position: 'relative', width: '200px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Background Sparkles */}
                <span style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '0.9rem', color: '#818cf8' }}>✦</span>
                <span style={{ position: 'absolute', bottom: '30px', left: '10px', fontSize: '0.75rem', color: '#c7d2fe' }}>✦</span>
                <span style={{ position: 'absolute', top: '50px', left: '20px', fontSize: '0.65rem', color: '#818cf8' }}>+</span>

                {/* Flying Paper Plane */}
                <div style={{
                  position: 'absolute', top: '20px', left: '10px',
                  transform: 'rotate(-20deg)', zIndex: 3,
                }}>
                  <Send size={28} color="#4f46e5" fill="#6366f1" />
                </div>

                {/* Main Envelope Box */}
                <div style={{
                  width: '150px', height: '100px',
                  borderRadius: '16px', background: 'linear-gradient(145deg, #4338ca, #6366f1)',
                  position: 'relative', zIndex: 2,
                  boxShadow: '0 16px 36px rgba(79,70,229,0.3)',
                  display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                }}>
                  {/* Lock paper card inside envelope */}
                  <div style={{
                    width: '115px', height: '85px', background: '#ffffff',
                    borderRadius: '12px 12px 0 0', marginTop: '-30px',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    padding: '8px',
                  }}>
                    <div style={{ width: '32px', height: '1px', background: '#e2e8f0' }} />
                    <div style={{ width: '24px', height: '1px', background: '#e2e8f0' }} />
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '4px',
                    }}>
                      <Lock size={16} color="#ffffff" />
                    </div>
                  </div>
                </div>

                {/* Potted Plant */}
                <div style={{ position: 'absolute', bottom: '20px', right: '-10px', fontSize: '2.4rem', zIndex: 3 }}>🪴</div>

              </div>
            </div>

            {/* Right — What happens next? Timeline */}
            <div style={{ ...card, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: 0 }}>What happens next?</h3>

              {/* Vertical Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === STEPS.length - 1;
                  return (
                    <div key={index} style={{ display: 'flex', gap: '14px', position: 'relative', paddingBottom: isLast ? '0' : '24px' }}>
                      {/* Vertical line connecting nodes */}
                      {!isLast && (
                        <div style={{
                          position: 'absolute', left: '17px', top: '36px', bottom: '0',
                          width: '2px', background: isDark ? 'rgba(255,255,255,0.1)' : '#e0e7ff',
                        }} />
                      )}

                      {/* Timeline Icon Node */}
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, zIndex: 2,
                        boxShadow: '0 4px 10px rgba(79,70,229,0.3)',
                      }}>
                        <Icon size={18} color="#ffffff" />
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, paddingTop: '2px' }}>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700, margin: '0 0 3px' }}>{step.title}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.4, margin: 0 }}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Still having trouble? Box */}
              <div style={{
                padding: '14px 16px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.07)' : '#f5f3ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#ddd6fe'}`,
                display: 'flex', flexDirection: 'column', gap: '8px',
                marginTop: '4px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={16} color="#4f46e5" />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 800, margin: 0 }}>Still having trouble?</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5, margin: 0 }}>
                  Contact our support team, we're here to help you!
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
