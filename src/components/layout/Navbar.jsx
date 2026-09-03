// ============================================================
// Navbar — DevOpsX Learning (matches reference design)
// Layout:  [logo] [Home Books Courses Live Classes Resources▾ Blog]
//          ......................... [search] [cart] [Login]
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Bell, Sun, Moon, LogIn, UserPlus, ChevronDown, ChevronRight,
  LogOut, User, BookOpen, Award, Heart, Settings, X, Sparkles, CheckCircle2,
  Download, Folder, Video, ShoppingCart, Home, FileText, Radio, LayoutGrid
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import BrandLogo from '../ui/BrandLogo';
import SearchBar from '../ui/SearchBar';

const dropDownMotion = {
  initial: { opacity: 0, y: 8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.97 },
  transition: { duration: 0.16, ease: 'easeOut' },
};

// Primary nav — labels match the reference exactly.
const navLinks = [
  { label: 'Home',         to: '/',            icon: Home },
  { label: 'Books',        to: '/textbooks',   icon: BookOpen },
  { label: 'Courses',      to: '/courses',     icon: LayoutGrid },
  { label: 'Live Classes', to: '/live-classes', icon: Radio },
  {
    label: 'Resources',
    to: '/resources',
    icon: Folder,
    children: [
      { label: 'Notes & PDFs',       to: '/notes' },
      { label: 'Assignments',        to: '/assignments' },
      { label: 'Practice Questions', to: '/practice' },
      { label: 'Downloads',          to: '/downloads' },
      { label: 'Achievements',       to: '/achievements' },
      { label: 'Certificates',       to: '/certificates' },
    ],
  },
  { label: 'Blog', to: '/resources', icon: FileText },
];

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [openMenu, setOpenMenu] = useState(null);   // 'resources' | 'profile' | 'notif' | null
  const [mobileOpen, setMobileOpen] = useState(false);

  const resourcesRef = useRef(null);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useClickOutside(resourcesRef, () => setOpenMenu((m) => (m === 'resources' ? null : m)));
  useClickOutside(profileRef, () => setOpenMenu((m) => (m === 'profile' ? null : m)));
  useClickOutside(notifRef, () => setOpenMenu((m) => (m === 'notif' ? null : m)));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);

  const cartCount = 0;
  const unreadCount = 3;

  const notifications = [
    { id: 1, text: 'New course "Kubernetes Mastery" is now live!', time: '10 mins ago', unread: true },
    { id: 2, text: 'Live Q&A session starts in 1 hour', time: '1 hour ago', unread: true },
    { id: 3, text: 'You completed Docker Fundamentals assignment', time: '1 day ago', unread: true },
  ];

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/textbooks?q=${encodeURIComponent(q)}`);
  };

  const accent = '#4f46e5';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 40,
          height: 'var(--navbar-height)',
          padding: '0 clamp(8px, 3vw, 32px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 1.5vw, 20px)',
          background: isDark
            ? (scrolled ? 'rgba(6,11,24,0.97)' : 'rgba(6,11,24,0.92)')
            : (scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isDark
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid rgba(15,23,42,0.07)',
          boxShadow: scrolled
            ? (isDark ? '0 8px 32px rgba(0,0,0,.4)' : '0 2px 14px rgba(15,23,42,.06)')
            : 'none',
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Brand ── */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }} className="nav-brand">
          <BrandLogo size="md" />
        </Link>

        {/* Browse Categories Dropdown */}
        <Link
          to="/categories"
          className="nav-browse"
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '6px 12px', borderRadius: '8px',
            color: 'var(--text-secondary)', fontSize: '0.84rem', fontWeight: 600,
            textDecoration: 'none', background: 'rgba(59,130,246,0.06)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          Browse <ChevronDown size={14} />
        </Link>

        {/* ── Primary nav ── */}
        <nav
          className="nav-links"
          style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '12px' }}
        >
          {navLinks.map((item) => {
            const active = isActive(item.to);

            if (item.children) {
              return (
                <div key={item.label} ref={resourcesRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setOpenMenu((m) => (m === 'resources' ? null : 'resources'))}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '0 0 3px',
                      fontSize: '0.86rem',
                      fontWeight: active ? 700 : 600,
                      color: active ? accent : 'var(--text-primary)',
                      borderBottom: `2px solid ${active ? accent : 'transparent'}`,
                      transition: 'color 0.15s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = accent; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      style={{
                        transform: openMenu === 'resources' ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.18s',
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === 'resources' && (
                      <motion.div
                        {...dropDownMotion}
                        style={{
                          position: 'absolute', left: 0, top: 'calc(100% + 14px)',
                          minWidth: '210px', padding: '8px',
                          borderRadius: '14px',
                          background: 'var(--bg-card)',
                          border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(15,23,42,.08)',
                          boxShadow: isDark
                            ? '0 20px 50px rgba(0,0,0,.6)'
                            : '0 16px 40px rgba(15,23,42,.12)',
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={() => setOpenMenu(null)}
                            style={{
                              display: 'block', padding: '9px 12px', borderRadius: '9px',
                              fontSize: '0.825rem', fontWeight: 500,
                              color: 'var(--text-secondary)', textDecoration: 'none',
                              transition: 'all 0.12s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = isDark ? 'rgba(99,102,241,.14)' : 'rgba(79,70,229,.07)';
                              e.currentTarget.style.color = accent;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  padding: '0 0 3px',
                  fontSize: '0.86rem',
                  fontWeight: active ? 700 : 600,
                  color: active ? accent : 'var(--text-primary)',
                  textDecoration: 'none',
                  borderBottom: `2px solid ${active ? accent : 'transparent'}`,
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = accent; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Center: Desktop Search Input Bar */}
        <div className="nav-search" style={{ flex: 1, maxWidth: '320px', margin: '0 12px' }}>
          <SearchBar size="md" className="w-full" placeholder="Search for books, courses..." />
        </div>

        {/* ── Right cluster ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 12px)', marginLeft: 'auto' }}>

          {/* Theme Toggle Pill */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 8px', borderRadius: '999px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(251,191,36,.12), rgba(251,191,36,.06))'
                : 'linear-gradient(135deg, rgba(59,130,246,.12), rgba(6,182,212,.07))',
              border: isDark ? '1px solid rgba(251,191,36,.25)' : '1px solid rgba(59,130,246,.25)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isDark
              ? <><Sun size={14} color="#fbbf24" /><span className="nav-theme-label" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fbbf24' }}>Light</span></>
              : <><Moon size={14} color="#3b82f6" /><span className="nav-theme-label" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b82f6' }}>Dark</span></>}
          </button>

          {/* Cart Icon */}
          <Link
            to="/checkout"
            aria-label="Cart"
            style={{
              position: 'relative', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '10px',
              color: 'var(--text-secondary)', textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            <ShoppingCart size={19} />
            <span
              style={{
                position: 'absolute', top: '1px', right: '1px',
                minWidth: '16px', height: '16px', padding: '0 4px',
                borderRadius: '999px',
                background: '#f59e0b',
                color: '#fff', fontSize: '0.6rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              {cartCount}
            </span>
          </Link>

          {/* User Logged In Menu */}
          {user ? (
            <>
              {/* Notifications Dropdown */}
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setOpenMenu((m) => (m === 'notif' ? null : 'notif'))}
                  style={{
                    position: 'relative', padding: '8px', borderRadius: '10px',
                    background: 'rgba(255,255,255,.05)', border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex',
                  }}
                >
                  <Bell size={17} />
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px',
                      borderRadius: '50%', background: '#ef4444', border: '1.5px solid var(--bg-card)',
                    }} />
                  )}
                </button>

                <AnimatePresence>
                  {openMenu === 'notif' && (
                    <motion.div
                      {...dropDownMotion}
                      style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                        width: '300px', borderRadius: '16px', overflow: 'hidden',
                        background: 'var(--bg-card)', border: '1px solid var(--border-muted)',
                        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,.6)' : '0 12px 36px rgba(59,130,246,.18)',
                      }}
                    >
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Notifications</h4>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: isDark ? 'rgba(59,130,246,.2)' : 'rgba(59,130,246,.12)', color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 700 }}>
                          {unreadCount} unread
                        </span>
                      </div>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          style={{
                            padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)',
                            background: n.unread ? (isDark ? 'rgba(59,130,246,.06)' : 'rgba(59,130,246,.05)') : 'transparent',
                            cursor: 'pointer', transition: 'background 0.15s',
                          }}
                        >
                          <p style={{ color: 'var(--text-primary)', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>{n.text}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: '3px 0 0' }}>{n.time}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div ref={profileRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setOpenMenu((m) => (m === 'profile' ? null : 'profile'))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '4px 8px 4px 4px', borderRadius: '999px',
                    background: isDark ? 'rgba(255,255,255,.05)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(15,23,42,.1)',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span
                    className="nav-username"
                    style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    size={13}
                    style={{
                      color: 'var(--text-muted)',
                      transform: openMenu === 'profile' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                <AnimatePresence>
                  {openMenu === 'profile' && (
                    <motion.div
                      {...dropDownMotion}
                      style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 10px)',
                        width: '212px', borderRadius: '14px', overflow: 'hidden',
                        background: 'var(--bg-card)',
                        border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(15,23,42,.08)',
                        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,.6)' : '0 16px 40px rgba(15,23,42,.12)',
                      }}
                    >
                      <div
                        style={{
                          padding: '14px 16px',
                          borderBottom: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid rgba(15,23,42,.06)',
                        }}
                      >
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.name}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.email}
                        </p>
                      </div>

                      <div style={{ padding: '6px' }}>
                        {[
                          { icon: User,     label: 'Profile',      to: '/profile' },
                          { icon: BookOpen, label: 'My Learning',  to: '/my-learning' },
                          { icon: Video,    label: 'Live Classes', to: '/live-classes' },
                          { icon: Folder,   label: 'Resources',    to: '/resources' },
                          { icon: Download, label: 'Downloads',    to: '/downloads' },
                          { icon: Award,    label: 'Achievements', to: '/achievements' },
                          { icon: Award,    label: 'Certificates', to: '/certificates' },
                          { icon: Heart,    label: 'Wishlist',     to: '/wishlist' },
                          { icon: Settings, label: 'Settings',     to: '/profile' },
                        ].map(({ icon: Icon, label, to }) => (
                          <Link
                            key={label}
                            to={to}
                            onClick={() => setOpenMenu(null)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '8px 10px', borderRadius: '999px',
                              color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500,
                              textDecoration: 'none', transition: 'all 0.12s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = isDark ? 'rgba(99,102,241,.14)' : 'rgba(79,70,229,.07)';
                              e.currentTarget.style.color = accent;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                          >
                            <Icon size={14} color={accent} />
                            {label}
                          </Link>
                        ))}
                      </div>

                      <div
                        style={{
                          borderTop: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid rgba(15,23,42,.06)',
                          padding: '6px',
                        }}
                      >
                        <button
                          onClick={() => { logout(); setOpenMenu(null); navigate('/'); }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '8px 10px', borderRadius: '999px',
                            color: '#ef4444', fontSize: '0.8rem', fontWeight: 600,
                            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,.1)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '8px 22px', borderRadius: '10px',
                fontSize: '0.845rem', fontWeight: 600,
                color: 'var(--text-primary)',
                border: isDark ? '1px solid rgba(255,255,255,.14)' : '1px solid rgba(15,23,42,.14)',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,.14)' : 'rgba(15,23,42,.14)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="nav-mobile-btn"
            aria-label="Menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-secondary)',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(3px)',
                zIndex: 38,
              }}
            />

            {/* Drawer Panel — slides in from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="lg:hidden"
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 'min(320px, 88vw)',
                zIndex: 50,
                background: isDark ? '#0b1220' : '#ffffff',
                borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e5eaf5'}`,
                boxShadow: '-8px 0 40px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* ── Drawer Header ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#eef1f8'}`,
                  flexShrink: 0,
                }}
              >
                <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    DevOpsX
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px', fontWeight: 500 }}>Learn AI. Build Future.</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    background: isDark ? 'rgba(255,255,255,0.07)' : '#f0f4fa',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Search Bar ── */}
              <div style={{ padding: '14px 16px 10px', flexShrink: 0 }}>
                <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                  <Search
                    size={15}
                    style={{
                      position: 'absolute', left: '12px', top: '50%',
                      transform: 'translateY(-50%)', color: 'var(--text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books, courses..."
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '9px 14px 9px 36px',
                      borderRadius: '10px',
                      background: isDark ? 'rgba(255,255,255,0.06)' : '#f4f7fe',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#dde5f5'}`,
                      color: 'var(--text-primary)', fontSize: '0.84rem',
                      outline: 'none', fontFamily: 'inherit',
                    }}
                  />
                </form>
              </div>

              {/* ── Nav Links ── */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '6px 12px 12px' }}>

                {/* Section label */}
                <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 8px 6px', margin: 0 }}>
                  Navigation
                </p>

                {navLinks.map((item) => {
                  const NavIcon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <div key={item.label}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '11px 12px',
                          borderRadius: '12px',
                          marginBottom: '2px',
                          fontSize: '0.9rem',
                          fontWeight: active ? 700 : 500,
                          color: active ? accent : 'var(--text-secondary)',
                          background: active
                            ? (isDark ? 'rgba(79,70,229,0.15)' : 'rgba(79,70,229,0.08)')
                            : 'transparent',
                          textDecoration: 'none',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : '#f4f7fe';
                            e.currentTarget.style.color = accent;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }
                        }}
                      >
                        {/* Icon pill */}
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                          background: active
                            ? 'linear-gradient(135deg, #4f46e5, #6366f1)'
                            : (isDark ? 'rgba(255,255,255,0.07)' : '#eef1f8'),
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {NavIcon && <NavIcon size={15} color={active ? '#fff' : (isDark ? '#94a3b8' : '#64748b')} />}
                        </div>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.children && <ChevronRight size={14} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />}
                      </Link>

                      {/* Resources sub-links — always visible inline */}
                      {item.children && (
                        <div
                          style={{
                            marginLeft: '20px',
                            marginBottom: '6px',
                            paddingLeft: '24px',
                            borderLeft: `2px solid ${isDark ? 'rgba(79,70,229,0.25)' : 'rgba(79,70,229,0.18)'}`,
                          }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.to}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: 'block',
                                padding: '7px 10px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                transition: 'color 0.12s, background 0.12s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = accent;
                                e.currentTarget.style.background = isDark ? 'rgba(79,70,229,0.1)' : 'rgba(79,70,229,0.06)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-muted)';
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── Footer CTA ── */}
              <div
                style={{
                  padding: '14px 16px 20px',
                  borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#eef1f8'}`,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {user ? (
                  <>
                    {/* Logged in — user info + logout */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(79,70,229,0.35)' }} />
                      <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                      style={{
                        width: '100%', padding: '10px', borderRadius: '10px',
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                        color: '#ef4444', fontSize: '0.85rem', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        fontFamily: 'inherit',
                      }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block', textAlign: 'center',
                        padding: '10px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                        color: '#fff', fontSize: '0.88rem', fontWeight: 700,
                        textDecoration: 'none', boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block', textAlign: 'center',
                        padding: '10px', borderRadius: '10px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d5daf0'}`,
                        background: 'transparent',
                        color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
