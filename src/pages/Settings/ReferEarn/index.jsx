// ============================================================
// Refer & Earn Page — 1:1 Pixel-Perfect DITTO UI
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Copy, Users, Gift, Wallet, Link2,
  BookOpen, Video, Award, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Trophy, Bell, MessageCircle
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
  { label: 'Privacy & Data', path: '/settings/privacy' },
  { label: 'Language', path: '/settings/language' },
  { label: 'Refer & Earn', path: '/settings/refer', active: true },
];

const TOP_REFERRERS = [
  { rank: 1, name: 'Rohit Verma', referrals: 128, earnings: '₹8,650', avatar: '👨' },
  { rank: 2, name: 'Priya Sharma', referrals: 98, earnings: '₹6,320', avatar: '👩' },
  { rank: 3, name: 'Ankit Patel', referrals: 72, earnings: '₹4,200', avatar: '👨' },
];

export default function ReferEarn() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const referralLink = 'https://ailearning.com/ref/shailendra25';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const card = {
    background: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/profile" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Settings</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Refer & Earn</span>
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
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Refer & Earn</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Invite your friends and earn exciting rewards when they join AI Learning.</p>
            </div>

            {/* Stats Row */}
            <div style={{ ...card, padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'center' }}>
              {/* Stat 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={22} color="#4f46e5" />
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>24</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '2px' }}>Total Referrals</div>
                  <div style={{ color: '#16a34a', fontSize: '0.7rem', fontWeight: 600 }}>Friends joined</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Gift size={22} color="#16a34a" />
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>₹1,240</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '2px' }}>Total Earnings</div>
                  <div style={{ color: '#16a34a', fontSize: '0.7rem', fontWeight: 600 }}>Lifetime rewards</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Wallet size={22} color="#b45309" />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>₹320</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '2px' }}>Available Balance</div>
                    <button onClick={() => toast.success('Showing earning history...')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', fontSize: '0.7rem', fontWeight: 600, padding: 0 }}>View History →</button>
                  </div>
                </div>
                <button onClick={() => toast.success('Withdrawing ₹320 earnings...')} style={{
                  padding: '9px 16px', borderRadius: '8px',
                  background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff',
                  fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                }}>Withdraw Earnings</button>
              </div>
            </div>

            {/* Referral Link */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Your Referral Link</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 14px' }}>Share your unique link with friends</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: '8px',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#f9fafb',
                }}>
                  <Link2 size={16} color="#667085" />
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{referralLink}</span>
                </div>
                <button onClick={handleCopy} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '10px 18px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  <Copy size={14} />{copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              {/* Share via icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Share via</span>
                {[
                  { label: 'WhatsApp', emoji: '💬', bg: '#25D366' },
                  { label: 'Facebook', emoji: '📘', bg: '#1877F2' },
                  { label: 'Twitter', emoji: '🐦', bg: '#1DA1F2' },
                  { label: 'Telegram', emoji: '✈️', bg: '#229ED9' },
                  { label: 'LinkedIn', emoji: '💼', bg: '#0A66C2' },
                  { label: 'Email', emoji: '📧', bg: '#667085' },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => toast.success(`Sharing via ${s.label}...`)}
                    title={s.label}
                    style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: s.bg, color: '#fff', border: 'none',
                      cursor: 'pointer', fontSize: '0.9rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}>
                    {s.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 18px' }}>How it Works</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
                {[
                  { step: '1', icon: '🔗', title: 'Share Your Link', desc: 'Invite your friends using your unique referral link.' },
                  { step: '2', icon: '👤', title: 'Friend Joins', desc: 'Your friend signs up and purchases any paid course.' },
                  { step: '3', icon: '₹', title: 'You Earn Rewards', desc: 'You earn cashback in your wallet as soon as the purchase is completed.' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: isDark ? 'rgba(79,70,229,0.15)' : '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', position: 'relative' }}>
                      {s.icon}
                      <span style={{
                        position: 'absolute', top: '-4px', right: '-4px',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: '#4f46e5', color: '#fff', fontSize: '0.65rem', fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{s.step}</span>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700, margin: '0 0 4px' }}>{s.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.4, margin: 0 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Rewards You Earn</h3>
                <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#fef3c7', color: '#b45309', fontSize: '0.72rem', fontWeight: 700 }}>Limited Time Offer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ flex: 1, padding: '16px', borderRadius: '12px', background: isDark ? 'rgba(79,70,229,0.1)' : '#f5f3ff', border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#ddd6fe'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Gift size={20} color="#4f46e5" />
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800 }}>Earn up to</div>
                      <div style={{ color: '#4f46e5', fontSize: '1.3rem', fontWeight: 900 }}>10% Cashback</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>On every successful referral</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {['10% cashback on your friend\'s first purchase', 'Rewards added to your wallet instantly', 'No limit on referrals – refer more, earn more!'].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '1rem' }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Referrers */}
            <div style={{ ...card, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Top Referrers</h3>
                <button onClick={() => toast.success('Opening leaderboard...')} style={{
                  padding: '7px 14px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                }}>View Leaderboard</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {TOP_REFERRERS.map((r) => (
                  <div key={r.rank} style={{
                    padding: '14px', borderRadius: '12px', textAlign: 'center',
                    background: isDark ? 'rgba(255,255,255,0.04)' : '#f9fafb',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f2f4f7'}`,
                  }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#667085', marginBottom: '6px' }}>#{r.rank}</div>
                    <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{r.avatar}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-primary)' }}>{r.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{r.referrals} Referrals</div>
                    <div style={{ color: '#16a34a', fontSize: '0.78rem', fontWeight: 700, marginTop: '2px' }}>{r.earnings}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* T&C Footer */}
            <div style={{
              padding: '14px 18px', borderRadius: '10px',
              background: isDark ? 'rgba(79,70,229,0.06)' : '#f8f9ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem' }}>ℹ️</span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Rewards are subject to our Terms & Conditions.</span>
              </div>
              <button onClick={() => toast.success('Opening T&C...')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', fontSize: '0.76rem', fontWeight: 700, whiteSpace: 'nowrap' }}>View T&C →</button>
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
