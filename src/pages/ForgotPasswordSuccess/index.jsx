// ============================================================
// Check Your Email / Reset Link Sent Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Mail, ArrowLeft, Send, CheckCircle2, Lock, Link as LinkIcon,
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
    title: 'Check Your Inbox',
    desc: 'Look for an email from AI Learning with the reset link.',
  },
  {
    icon: LinkIcon,
    title: 'Click the Reset Link',
    desc: 'The link will take you to a page to create a new password.',
  },
  {
    icon: Lock,
    title: 'Create New Password',
    desc: 'Choose a strong password to secure your account.',
  },
];

export default function ForgotPasswordSuccess() {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [email] = useState(user?.email || 'shailendra@example.com');
  const [resending, setResending] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      toast.success('Password reset link resent to your email!');
    }, 1200);
  };

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
              <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.84rem', fontWeight: 800, margin: '0 0 4px' }}>Go Premium, Learn More!</h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>Unlock unlimited access to premium courses, live classes and more.</p>
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
            <span style={{ color: '#4f46e5', fontWeight: 600 }}>Forgot Password</span>
          </div>

          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.02em' }}>Check Your Email</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '0 0 8px' }}>We have sent a password reset link to your email address.</p>

          {/* 2-column inner grid: Reset Link Sent Card | What to do next? */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

            {/* Center Card */}
            <div style={{ ...card, padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

              {/* Envelope + Paper Plane Illustration */}
              <div style={{ position: 'relative', width: '220px', height: '150px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Background Sparkles */}
                <span style={{ position: 'absolute', top: '10px', right: '30px', fontSize: '0.9rem', color: '#818cf8' }}>✦</span>
                <span style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '0.8rem', color: '#c7d2fe' }}>✦</span>
                <span style={{ position: 'absolute', top: '40px', left: '30px', fontSize: '0.65rem', color: '#818cf8' }}>+</span>
                <span style={{ position: 'absolute', bottom: '40px', right: '20px', fontSize: '0.65rem', color: '#c7d2fe' }}>+</span>

                {/* Flying Paper Plane */}
                <div style={{
                  position: 'absolute', top: '0px', left: '35px',
                  transform: 'rotate(-15deg)', zIndex: 3,
                }}>
                  <Send size={24} color="#6366f1" fill="#818cf8" />
                </div>

                {/* Main Envelope Box */}
                <div style={{
                  width: '150px', height: '100px',
                  borderRadius: '16px', background: 'linear-gradient(135deg, #4338ca, #6366f1)',
                  position: 'relative', zIndex: 2,
                  boxShadow: '0 16px 36px rgba(79,70,229,0.3)',
                  display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                }}>
                  {/* Open flap letter */}
                  <div style={{
                    width: '120px', height: '80px', background: '#ffffff',
                    borderRadius: '12px 12px 0 0', marginTop: '-25px',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(79,70,229,0.3)',
                    }}>
                      <CheckCircle2 size={24} color="#ffffff" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Title */}
              <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                Reset Link <span style={{ color: '#4f46e5' }}>Sent!</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.5, margin: '0 0 24px', maxWidth: '420px' }}>
                We've emailed you a link to reset your password.<br />
                Please check your inbox and click on the link to continue.
              </p>

              {/* Email Sent Box */}
              <div style={{
                width: '100%', maxWidth: '460px', padding: '14px 18px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.08)' : '#f5f3ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#ede9fe'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={16} color="#4f46e5" />
                  </div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Email sent to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700,
                    whiteSpace: 'nowrap', padding: 0,
                  }}>
                  Change Email
                </button>
              </div>

              {/* Resend Link Text */}
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 20px' }}>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResend}
                  disabled={resending}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#4f46e5', fontWeight: 700, fontSize: '0.8rem', padding: 0,
                    textDecoration: 'none',
                  }}>
                  {resending ? 'Resending...' : 'Resend Email'}
                </button>
              </p>

              {/* Divider */}
              <div style={{ width: '100%', maxWidth: '460px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
              </div>

              {/* Back to Login Button */}
              <button
                onClick={() => navigate('/login')}
                style={{
                  width: '100%', maxWidth: '460px', padding: '11px', borderRadius: '8px',
                  background: 'transparent',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                <ArrowLeft size={16} /> Back to Login
              </button>

            </div>

            {/* Right — What to do next? Timeline */}
            <div style={{ ...card, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: 0 }}>What to do next?</h3>

              {/* Steps Vertical Timeline */}
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

              {/* Need Help? Box */}
              <div style={{
                padding: '14px 16px', borderRadius: '12px',
                background: isDark ? 'rgba(79,70,229,0.07)' : '#f5f3ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#ddd6fe'}`,
                display: 'flex', flexDirection: 'column', gap: '8px',
                marginTop: '4px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HelpCircle size={16} color="#4f46e5" />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 800, margin: 0 }}>Need Help?</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5, margin: 0 }}>
                  If you face any issues, our support team is here to help you.
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
