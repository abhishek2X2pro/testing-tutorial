// ============================================================
// Payment Methods Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Plus, MoreVertical, CreditCard, FileText,
  BookOpen, Video, Award, Heart, Download,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle,
  Mail, RefreshCw, Clock, History, MapPin, Info
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
  { label: 'Payment Methods', path: '/settings/payment', active: true },
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

// Visa logo SVG
function VisaLogo() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <rect width="38" height="24" rx="4" fill="#1A1F71" />
      <text x="5" y="17" fill="white" fontFamily="Arial" fontWeight="bold" fontSize="12">VISA</text>
    </svg>
  );
}

// Mastercard logo SVG
function MastercardLogo() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <rect width="38" height="24" rx="4" fill="#252525" />
      <circle cx="15" cy="12" r="7" fill="#EB001B" />
      <circle cx="23" cy="12" r="7" fill="#F79E1B" />
      <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00" />
    </svg>
  );
}

export default function PaymentMethods() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [cards, setCards] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/27', holder: 'Shailendra Ahirwar', primary: true, active: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '09/26', holder: 'Shailendra Ahirwar', primary: false, active: false },
  ]);
  const [openMenu, setOpenMenu] = useState(null);
  const [emailInvoices, setEmailInvoices] = useState(true);
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    name: 'Shailendra Ahirwar',
    street: '123, Green Street',
    city: 'Indore, Madhya Pradesh – 452001',
    country: 'India',
    phone: '+91 91234 56789',
  });

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  const divider = { borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}` };

  const toggleCardActive = (id) => {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  };

  const setCardPrimary = (id) => {
    setCards((prev) => prev.map((c) => ({ ...c, primary: c.id === id })));
    setOpenMenu(null);
    toast.success('Primary card updated!');
  };

  const removeCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setOpenMenu(null);
    toast.success('Card removed!');
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
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Payment Methods</span>
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
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Payment Methods</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Manage your saved payment methods and billing preferences.</p>
            </div>

            {/* ── SAVED PAYMENT METHODS ── */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Saved Payment Methods</h3>
                <button
                  onClick={() => toast.success('Add new card form coming soon!')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 14px', borderRadius: '8px',
                    background: 'transparent', border: `1px solid ${isDark ? 'rgba(79,70,229,0.4)' : '#4f46e5'}`,
                    color: '#4f46e5', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  }}>
                  <Plus size={14} /> Add New Card
                </button>
              </div>

              {/* Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {cards.map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                      padding: '16px 0',
                      ...(i < cards.length - 1 ? divider : {}),
                      position: 'relative',
                    }}
                  >
                    {/* Card Brand Logo */}
                    <div style={{ flexShrink: 0 }}>
                      {c.type === 'visa' ? <VisaLogo /> : <MastercardLogo />}
                    </div>

                    {/* Card Details */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                          {c.type === 'visa' ? 'Visa' : 'Mastercard'} •••• {c.last4}
                        </span>
                        {c.primary && (
                          <span style={{ padding: '2px 8px', borderRadius: '999px', background: '#e0e7ff', color: '#4f46e5', fontSize: '0.68rem', fontWeight: 700 }}>Primary</span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Expires {c.expiry}</span>
                    </div>

                    {/* Holder name */}
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', flexShrink: 0 }}>{c.holder}</span>

                    {/* Toggle */}
                    <Toggle checked={c.active} onChange={() => toggleCardActive(c.id)} />

                    {/* 3-dot menu */}
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', display: 'flex', padding: '4px', borderRadius: '6px' }}>
                        <MoreVertical size={18} />
                      </button>
                      {openMenu === c.id && (
                        <div style={{
                          position: 'absolute', right: 0, top: '110%', zIndex: 10,
                          background: isDark ? '#1e293b' : '#fff',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                          borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          minWidth: '150px', overflow: 'hidden',
                        }}>
                          {!c.primary && (
                            <button onClick={() => setCardPrimary(c.id)} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'none', border: 'none', textAlign: 'left', fontSize: '0.82rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                              Set as Primary
                            </button>
                          )}
                          <button onClick={() => removeCard(c.id)} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'none', border: 'none', textAlign: 'left', fontSize: '0.82rem', color: '#ef4444', cursor: 'pointer', fontWeight: 500 }}>
                            Remove Card
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info note */}
              <div style={{
                marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
                background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Info size={15} color="#4f46e5" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.76rem', color: isDark ? '#cbd5e1' : '#374151' }}>Your primary payment method will be used for all transactions.</span>
              </div>
            </div>

            {/* ── BILLING ADDRESS ── */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Billing Address</h3>
                <button
                  onClick={() => setEditingAddress(!editingAddress)}
                  style={{
                    padding: '7px 16px', borderRadius: '8px',
                    background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                    color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  }}>
                  {editingAddress ? 'Save Address' : 'Edit Address'}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: isDark ? 'rgba(79,70,229,0.12)' : '#f0f4ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <MapPin size={18} color="#4f46e5" />
                </div>

                {editingAddress ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'Full Name' },
                      { key: 'street', label: 'Street Address', placeholder: 'Street Address' },
                      { key: 'city', label: 'City, State – Pincode', placeholder: 'City, State – Pincode' },
                      { key: 'country', label: 'Country', placeholder: 'Country' },
                      { key: 'phone', label: 'Phone', placeholder: '+91 XXXXX XXXXX' },
                    ].map((f) => (
                      <input
                        key={f.key}
                        value={address[f.key]}
                        onChange={(e) => setAddress((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        style={{
                          width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                          background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                          color: 'var(--text-primary)', fontSize: '0.84rem', outline: 'none',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                        onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}
                      />
                    ))}
                    <button onClick={() => { setEditingAddress(false); toast.success('Address updated!'); }} style={{
                      padding: '9px 20px', borderRadius: '8px', alignSelf: 'flex-end',
                      background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                      fontSize: '0.82rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                    }}>Save Address</button>
                  </div>
                ) : (
                  <div style={{ lineHeight: 1.8 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{address.name}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{address.street}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{address.city}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{address.country}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Phone: {address.phone}</div>
                  </div>
                )}
              </div>
            </div>

            {/* ── BILLING PREFERENCES ── */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 16px' }}>Billing Preferences</h3>

              {[
                {
                  icon: Mail, iconBg: '#e0e7ff', iconColor: '#4f46e5',
                  title: 'Email Invoices', desc: 'Receive invoice for every payment via email.',
                  value: emailInvoices, onChange: setEmailInvoices,
                },
                {
                  icon: RefreshCw, iconBg: '#f0fdf4', iconColor: '#16a34a',
                  title: 'Auto Renewal', desc: 'Automatically renew subscriptions and courses.',
                  value: autoRenewal, onChange: setAutoRenewal,
                },
                {
                  icon: Bell, iconBg: '#fef3c7', iconColor: '#b45309',
                  title: 'Payment Reminders', desc: 'Get reminders for upcoming payments.',
                  value: paymentReminders, onChange: setPaymentReminders,
                },
              ].map((item, i, arr) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    padding: '14px 0',
                    ...(i < arr.length - 1 ? divider : {}),
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color={item.iconColor} />
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px' }}>{item.title}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                    <Toggle checked={item.value} onChange={item.onChange} />
                  </div>
                );
              })}
            </div>

            {/* ── VIEW TRANSACTION HISTORY ── */}
            <div style={{
              ...card, padding: '18px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.12)' : '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <History size={20} color="#4f46e5" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px' }}>View Transaction History</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Check your past payments and invoices.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/orders/invoices')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 18px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(79,70,229,0.4)' : '#4f46e5'}`,
                  color: '#4f46e5', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                View History <ChevronRight size={15} />
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

            {/* Accepted payments */}
            <div style={{ ...card, padding: '16px' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, margin: '0 0 12px' }}>We Accept</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                {[
                  { label: 'VISA', bg: '#1A1F71', color: '#fff' },
                  { label: 'MC', bg: '#252525', color: '#F79E1B' },
                  { label: 'RuPay', bg: '#FF6600', color: '#fff' },
                  { label: 'UPI', bg: '#340098', color: '#fff' },
                ].map((p) => (
                  <div key={p.label} style={{
                    padding: '5px 10px', borderRadius: '6px', background: p.bg,
                    color: p.color, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em',
                  }}>{p.label}</div>
                ))}
              </div>
            </div>

            {/* Security badge */}
            <div style={{
              ...card, padding: '14px',
              background: isDark ? 'rgba(16,185,129,0.06)' : '#f0fdf4',
              border: `1px solid ${isDark ? 'rgba(16,185,129,0.15)' : '#bbf7d0'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1rem' }}>🔒</span>
                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: isDark ? '#fff' : '#15803d' }}>Secure Payments</span>
              </div>
              <p style={{ color: isDark ? '#cbd5e1' : '#15803d', fontSize: '0.74rem', lineHeight: 1.5, margin: 0 }}>All transactions are encrypted with 256-bit SSL security.</p>
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
