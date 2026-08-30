// ============================================================
// Login Page — Ultra-Professional DITTO UI (No Emojis, Sleek Mockup)
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, User, Eye, EyeOff, GraduationCap, Video,
  Award, BookOpen, Heart, Download, FileText, Settings,
  HelpCircle, LogOut, Trophy, Bell, MessageCircle, ShoppingBag,
  Sparkles, Play, CheckCircle2, TrendingUp, Lock
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

function GoogleSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

function FacebookSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function AppleSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.19.67-2.88 1.48-.61.71-1.15 1.87-.99 3 1.12.09 2.23-.55 2.88-1.36z"/>
    </svg>
  );
}

export default function Login() {
  const { isDark } = useTheme();
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 40px 11px 40px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none',
    transition: 'border-color 0.15s',
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

          {/* Access Your Learning widget */}
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
              <ShoppingBag size={20} color="#4f46e5" />
            </div>
            <div>
              <h4 style={{ color: isDark ? '#fff' : '#1e1b4b', fontSize: '0.84rem', fontWeight: 800, margin: '0 0 4px' }}>Access Your Learning</h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>
                Login to continue your learning journey and unlock amazing features.
              </p>
            </div>
            <button onClick={() => navigate('/login')} style={{
              width: '100%', padding: '9px 14px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
              fontSize: '0.76rem', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}>Login Now</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} color="#98a2b3" />
            <span style={{ color: '#4f46e5', fontWeight: 600 }}>Login</span>
          </div>

          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.02em' }}>Welcome Back!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '0 0 8px' }}>Login to your account and continue your learning journey.</p>

          {/* Main Card (Split 2 Columns) */}
          <div style={{ ...card, padding: '0', display: 'grid', gridTemplateColumns: '1fr 400px', overflow: 'hidden' }}>

            {/* Left Column — Learn Smarter + Professional Mockup */}
            <div style={{
              padding: '36px 32px',
              background: isDark ? 'rgba(79,70,229,0.04)' : '#f8f9ff',
              borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eaecf0'}`,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              gap: '24px',
            }}>
              <div>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.45rem', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                  Learn Smarter with<br />
                  <span style={{ color: '#4f46e5' }}>AI Learning</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5, margin: '0 0 24px', maxWidth: '380px' }}>
                  Access unlimited courses, live classes, certificates and resources to accelerate your career with AI.
                </p>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {[
                    { icon: GraduationCap, title: 'Expert-Led Courses', desc: 'Learn from industry experts', bg: '#e0e7ff', color: '#4f46e5' },
                    { icon: Video, title: 'Live Interactive Classes', desc: 'Engage in real-time learning', bg: '#f0fdf4', color: '#16a34a' },
                    { icon: Award, title: 'Certificates & More', desc: 'Earn certificates and boost your profile', bg: '#fef3c7', color: '#b45309' },
                  ].map((f, i) => {
                    const FIcon = f.icon;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FIcon size={18} color={f.color} />
                        </div>
                        <div>
                          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700, margin: '0 0 2px' }}>{f.title}</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ultra-Sleek Professional Dashboard Preview Box */}
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                background: isDark ? '#1e293b' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                boxShadow: '0 12px 36px rgba(79,70,229,0.12)',
              }}>
                {/* Window top bar */}
                <div style={{
                  padding: '10px 14px',
                  background: isDark ? '#0f172a' : '#f1f5f9',
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={11} color="#4f46e5" /> AI Portal Preview
                  </span>
                </div>

                {/* Inner Preview Content */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Learner Welcome Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Hello, Learner!
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        What do you want to learn today?
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 10px', borderRadius: '999px',
                      background: 'rgba(79,70,229,0.1)', color: '#4f46e5',
                      fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      <TrendingUp size={11} /> 75% Done
                    </div>
                  </div>

                  {/* Course Cards Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { name: 'Python for AI', prog: 85, color: '#4f46e5', active: true },
                      { name: 'Machine Learning', prog: 60, color: '#0284c7', active: false },
                      { name: 'Deep Learning', prog: 40, color: '#16a34a', active: false },
                    ].map((c, i) => (
                      <div key={i} style={{
                        padding: '10px', borderRadius: '10px',
                        background: c.active ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : (isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc'),
                        border: `1px solid ${c.active ? 'transparent' : (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0')}`,
                        color: c.active ? '#ffffff' : 'var(--text-primary)',
                        display: 'flex', flexDirection: 'column', gap: '6px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                          {c.active ? <Play size={10} fill="#fff" color="#fff" /> : <CheckCircle2 size={10} color="#94a3b8" />}
                        </div>
                        {/* Progress Bar */}
                        <div style={{ width: '100%', height: '4px', borderRadius: '999px', background: c.active ? 'rgba(255,255,255,0.3)' : '#e2e8f0', overflow: 'hidden' }}>
                          <div style={{ width: `${c.prog}%`, height: '100%', borderRadius: '999px', background: c.active ? '#ffffff' : c.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column — Login Form */}
            <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Login to Your Account</h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Email Address */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={16} color="#667085" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="Enter your email address"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>Password</label>
                    <Link to="/forgot-password" style={{ color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>Forgot Password?</Link>
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock size={16} color="#667085" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                      placeholder="Enter your password"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: '4px' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#4f46e5', cursor: 'pointer' }}
                  />
                  <label htmlFor="rememberMe" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Remember me</label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '8px',
                    background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                    fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(79,70,229,0.35)', marginTop: '4px',
                  }}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>or continue with</span>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0' }} />
              </div>

              {/* Social Login Buttons (SVG icons) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {[
                  { name: 'Google', icon: <GoogleSvg /> },
                  { name: 'Facebook', icon: <FacebookSvg /> },
                  { name: 'Apple', icon: <AppleSvg /> },
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={() => toast.success(`Logging in with ${s.name}...`)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '9px 8px', borderRadius: '8px',
                      background: 'transparent',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                      color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer', transition: 'background 0.15s',
                    }}>
                    {s.icon} <span>{s.name}</span>
                  </button>
                ))}
              </div>

              {/* Footer text */}
              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
              </p>
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
