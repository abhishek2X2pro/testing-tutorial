// ============================================================
// Profile Information Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Camera, Upload, Trash2,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle, Lock
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
  { label: 'Notifications', icon: Bell, path: '/settings/notifications', badge: 3 },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/settings', active: true },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const SETTINGS_NAV = [
  { label: 'Profile', path: '/profile', active: true },
  { label: 'Security', path: '/settings/security' },
  { label: 'Notifications', path: '/settings/notifications' },
  { label: 'Privacy & Data', path: '/settings/privacy' },
  { label: 'Language', path: '/settings/language' },
  { label: 'Refer & Earn', path: '/settings/refer' },
];

export default function Profile() {
  const { isDark } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || 'Shailendra Ahirwar',
    email: user?.email || 'shailendra@example.com',
    phone: '+91 98765 43210',
    dob: '1995-08-15',
    gender: 'Male',
    country: 'India',
    bio: 'AI Enthusiast | Lifelong Learner | Passionate about building intelligent solutions and sharing knowledge.',
    profession: 'Software Developer',
    organization: 'Tech Solutions Pvt. Ltd.',
  });

  const [avatarSrc, setAvatarSrc] = useState(user?.avatar || null);
  const bioMax = 200;

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '24px', textAlign: 'center' }}>
        <Lock size={40} color="#4f46e5" />
        <h2 style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Sign in to view your profile</h2>
        <button onClick={() => navigate('/login')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#4f46e5', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Sign In</button>
      </div>
    );
  }

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
    toast.success('Profile photo updated!');
  };

  const handleSave = () => {
    updateProfile?.({ name: form.name, email: form.email });
    toast.success('Profile updated successfully!');
  };

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '10px 14px', borderRadius: '8px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
    color: 'var(--text-primary)', fontSize: '0.86rem',
    outline: 'none', transition: 'border-color 0.15s',
  };

  const labelStyle = {
    fontSize: '0.82rem', fontWeight: 600,
    color: isDark ? '#94a3b8' : '#344054',
    display: 'block', marginBottom: '6px',
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/settings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Profile Information</span>
        </div>

        {/* 3-Column Layout */}
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
                boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
              }}>Upgrade Now</button>
            </div>
          </div>

          {/* CENTER — Main Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div style={{ marginBottom: '16px' }}>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Profile Information</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Update your personal details and profile picture.</p>
            </div>

            <div style={{ ...card, padding: '28px' }}>

              {/* Profile Picture Section */}
              <div style={{
                marginBottom: '28px',
                paddingBottom: '24px',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f2f4f7'}`,
              }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 18px' }}>Profile Picture</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '90px', height: '90px', borderRadius: '50%',
                      border: `3px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#eaecf0'}`,
                      overflow: 'hidden', background: isDark ? '#1e293b' : '#f2f4f7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {avatarSrc ? (
                        <img src={avatarSrc} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#4f46e5' }}>
                          {form.name?.[0]?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    {/* Camera icon overlay */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        position: 'absolute', bottom: '2px', right: '2px',
                        width: '26px', height: '26px', borderRadius: '50%',
                        background: '#4f46e5', color: '#fff', border: '2px solid #fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}>
                      <Camera size={12} />
                    </button>
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                  </div>

                  {/* Upload / Remove buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>JPG, PNG or GIF. Max size of 2MB.</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '8px 16px', borderRadius: '8px',
                          background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                          color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                        }}>
                        <Upload size={14} /> Upload New
                      </button>
                      <button
                        onClick={() => { setAvatarSrc(null); toast.success('Profile photo removed!'); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '8px 16px', borderRadius: '8px',
                          background: 'transparent', border: '1px solid #fca5a5',
                          color: '#ef4444', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                        }}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Row 1: Full Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Shailendra Ahirwar"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="shailendra@example.com"
                      style={{ ...inputStyle, color: isDark ? '#94a3b8' : '#667085' }}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                </div>

                {/* Row 2: Phone + DOB */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Date of Birth</label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => handleChange('dob', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                </div>

                {/* Row 3: Gender + Country */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Gender</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={form.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
                        onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                        onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-Binary</option>
                        <option>Prefer not to say</option>
                      </select>
                      <ChevronRight size={15} color="#667085" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={form.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
                        onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                        onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                      >
                        {['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'UAE'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronRight size={15} color="#667085" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label style={labelStyle}>Bio</label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      value={form.bio}
                      onChange={(e) => {
                        if (e.target.value.length <= bioMax) handleChange('bio', e.target.value);
                      }}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      style={{
                        ...inputStyle,
                        resize: 'vertical', lineHeight: 1.6,
                        minHeight: '100px', fontFamily: 'inherit',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                    <span style={{
                      position: 'absolute', bottom: '10px', right: '12px',
                      fontSize: '0.72rem', color: 'var(--text-muted)',
                    }}>{form.bio.length}/{bioMax}</span>
                  </div>
                </div>

                {/* Row 4: Profession + Organization */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Current Profession</label>
                    <input
                      type="text"
                      value={form.profession}
                      onChange={(e) => handleChange('profession', e.target.value)}
                      placeholder="Software Developer"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Organization (Optional)</label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      placeholder="Company / Institution"
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex', justifyContent: 'flex-end', gap: '12px',
                  paddingTop: '20px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f2f4f7'}`,
                  marginTop: '4px',
                }}>
                  <button
                    onClick={() => {
                      setForm({
                        name: user?.name || 'Shailendra Ahirwar',
                        email: user?.email || 'shailendra@example.com',
                        phone: '+91 98765 43210', dob: '1995-08-15',
                        gender: 'Male', country: 'India',
                        bio: 'AI Enthusiast | Lifelong Learner | Passionate about building intelligent solutions and sharing knowledge.',
                        profession: 'Software Developer', organization: 'Tech Solutions Pvt. Ltd.',
                      });
                      toast('Changes discarded', { icon: '↩️' });
                    }}
                    style={{
                      padding: '10px 24px', borderRadius: '8px',
                      background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                      color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer',
                    }}>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
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
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Settings sub-nav */}
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

            {/* Profile completion */}
            <div style={{ ...card, padding: '16px' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 12px' }}>Profile Completion</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>80% Complete</span>
                <span style={{ fontSize: '0.76rem', color: '#4f46e5', fontWeight: 700 }}>80%</span>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0', overflow: 'hidden' }}>
                <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg,#4f46e5,#6366f1)', borderRadius: '999px' }} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', margin: '10px 0 0', lineHeight: 1.5 }}>Add a bio and organization to complete your profile.</p>
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
