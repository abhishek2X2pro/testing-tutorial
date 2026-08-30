// ============================================================
// Sidebar Component — DevOpsX (Ultra User-Friendly & Sleek)
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, GraduationCap, Code2, FileText,
  Users, Settings, ChevronDown, Server, Cloud,
  Cpu, ChevronRight,
  BookMarked, ClipboardList, FileQuestion, Video, Heart, Award,
  UserCircle, X, CheckCircle2, ChevronUp, Brain,
} from 'lucide-react';
import { bookCategories, categoryIcons } from '../../data/books';
import { useSidebar } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';
import BrandLogo from '../ui/BrandLogo';

// Grade features data (same as GradeSelect)
const gradeData = {
  'grade-5-8': {
    label: 'Class 5 – 8',
    accent: '#34d399',
    features: [
      'Ebooks & Study Material', 'Video Courses', 'Assignments & Quizzes',
      'AI Art Gallery', 'Artscane Projects', 'AI Agent Comparison',
      'AI Agent Projects', 'AI Chatbots Practice', 'AI Automation Basics',
      'Prompt Libraries', 'Learning Support',
    ],
  },
  'grade-9-12': {
    label: 'Class 9 – 12',
    accent: '#60a5fa',
    features: [
      'Ebooks & Courses', 'Assignments & Syllabus', 'Video Courses',
      'AI Tool Access', 'Learning Kit', 'Prompt Libraries',
      'AI Chatbots', 'AI Automation', 'Peer Learning Tool', 'Learning Support',
    ],
  },
  'college': {
    label: 'College / Graduate',
    accent: '#a78bfa',
    features: [
      'Ebooks & Courses', 'Video Lectures', 'Masters Programs',
      'Learning Kit', 'Advanced AI Projects', 'Machine Learning',
      'ULMs & LLM Projects', 'Python Language Models',
      'AI Automation', 'Project Portfolio',
    ],
  },
};

// Grade Features Panel component — reacts to localStorage changes
function GradeFeaturePanel({ collapsed }) {
  const [open, setOpen] = useState(true);
  const { isDark } = useTheme();
  const [gradeKey, setGradeKey] = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem('devopsx_grade') : null)
  );

  useEffect(() => {
    // Listen for storage changes from other tabs
    const onStorage = (e) => {
      if (e.key === 'devopsx_grade') setGradeKey(e.newValue);
    };
    // Listen for custom event fired from GradeSelect in same tab
    const onGradeChange = (e) => setGradeKey(e.detail);

    window.addEventListener('storage', onStorage);
    window.addEventListener('gradechange', onGradeChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('gradechange', onGradeChange);
    };
  }, []);

  const grade = gradeData[gradeKey] || null;
  if (!grade || collapsed) return null;

  return (
    <div style={{
      margin: '0 10px 14px', borderRadius: '14px', overflow: 'hidden',
      border: isDark ? `1px solid ${grade.accent}35` : `1px solid ${grade.accent}45`,
      background: isDark
        ? `linear-gradient(145deg, ${grade.accent}10, rgba(9,15,40,.85))`
        : `linear-gradient(145deg, ${grade.accent}12, #ffffff)`,
      boxShadow: isDark ? `0 4px 20px ${grade.accent}15` : `0 4px 16px ${grade.accent}20`,
    }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 13px', background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: open ? (isDark ? `1px solid ${grade.accent}20` : `1px solid ${grade.accent}25`) : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: grade.accent, boxShadow: `0 0 6px ${grade.accent}` }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? grade.accent : '#1d4ed8' }}>
            {grade.label}
          </span>
        </div>
        {open
          ? <ChevronUp size={12} style={{ color: isDark ? grade.accent : '#1d4ed8' }} />
          : <ChevronDown size={12} style={{ color: isDark ? grade.accent : '#1d4ed8' }} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden', padding: '8px 10px 10px' }}
          >
            {grade.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '4px 3px', borderRadius: '6px' }}>
                <CheckCircle2 size={10} style={{ color: grade.accent, flexShrink: 0 }} />
                <span style={{ color: isDark ? 'rgba(203,213,225,.8)' : 'var(--text-secondary)', fontSize: '0.71rem', fontWeight: 500, lineHeight: 1.3 }}>{f}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Books Categories Panel (shows only on /textbooks) ────────
function BooksCategoriesPanel({ collapsed }) {
  const [open, setOpen] = useState(true);
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All Categories';

  // Only show on /textbooks route
  if (location.pathname !== '/textbooks' || collapsed) return null;

  const handleCategory = (cat) => {
    const params = new URLSearchParams();
    if (cat !== 'All Categories') params.set('category', cat);
    navigate(`/textbooks${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div
      style={{
        margin: '0 10px 14px',
        borderRadius: '14px',
        overflow: 'hidden',
        border: isDark ? '1px solid rgba(99,102,241,.25)' : '1px solid rgba(99,102,241,.2)',
        background: isDark
          ? 'linear-gradient(145deg, rgba(99,102,241,.1), rgba(9,15,40,.85))'
          : 'linear-gradient(145deg, rgba(99,102,241,.07), #ffffff)',
        boxShadow: isDark ? '0 4px 20px rgba(99,102,241,.12)' : '0 4px 16px rgba(99,102,241,.1)',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 13px', background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: open ? (isDark ? '1px solid rgba(99,102,241,.18)' : '1px solid rgba(99,102,241,.15)') : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 6px #6366f1' }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? '#a5b4fc' : '#4f46e5' }}>
            Book Categories
          </span>
        </div>
        {open
          ? <ChevronUp size={12} style={{ color: isDark ? '#a5b4fc' : '#4f46e5' }} />
          : <ChevronDown size={12} style={{ color: isDark ? '#a5b4fc' : '#4f46e5' }} />}
      </button>

      {/* Category List */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden', padding: '6px 8px 8px' }}
          >
            {bookCategories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '5px 6px', borderRadius: '7px', border: 'none',
                    background: active ? (isDark ? 'rgba(99,102,241,.22)' : 'rgba(99,102,241,.12)') : 'transparent',
                    color: active ? '#6366f1' : (isDark ? 'rgba(203,213,225,.8)' : 'var(--text-secondary)'),
                    fontSize: '0.73rem', fontWeight: active ? 700 : 500,
                    cursor: 'pointer', textAlign: 'left', transition: 'all .12s',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.06)' : 'rgba(99,102,241,.07)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: '0.8rem', lineHeight: 1, flexShrink: 0 }}>{categoryIcons[cat]}</span>
                  <span style={{ flex: 1, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat}</span>
                  {active && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Clean, organized menu structure
const menuSections = [
  {
    label: 'MAIN',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',   to: '/dashboard' },
      { icon: BookOpen,        label: 'All Courses', to: '/courses' },
      { icon: BookMarked,      label: 'My Learning', to: '/my-learning' },
      { icon: Video,           label: 'Curriculum',  to: '/curriculum' },
    ],
  },
  {
    label: 'ACADEMICS & DEGREE',
    icon: GraduationCap,
    items: [
      { icon: Code2,     label: 'Computer Science', to: '/courses?category=Computer+Science' },
      { icon: Cpu,       label: 'Engineering',      to: '/courses?category=Engineering' },
      { icon: BookMarked,label: 'School (Class 9-12)', to: '/courses?category=School' },
    ],
  },
  {
    label: 'TECH & CLOUD',
    icon: Server,
    items: [
      { icon: Cloud,     label: 'Cloud (AWS/Azure)',to: '/courses?category=Cloud+Computing' },
      { icon: Brain,     label: 'AI & Machine Learning', to: '/courses?category=AI+%26+Machine+Learning' },
      /*
      { icon: Server,    label: 'DevOps & Docker',  to: '/courses?category=DevOps' },
      { icon: Globe,     label: 'Web Development', to: '/courses?category=Web+Development' },
      { icon: Terminal,  label: 'Linux & SysAdmin',  to: '/courses?category=Linux' },
      { icon: Shield,    label: 'Cyber Security',   to: '/courses?category=Cyber+Security' },
      */
    ],
  },
  {
    label: 'STUDENT RESOURCES',
    icon: FileText,
    items: [
      { icon: BookOpen,       label: 'TextBooks',         to: '/textbooks' },
      { icon: FileText,       label: 'Notes & PDFs',      to: '/notes' },
      { icon: Video,          label: 'Recorded Classes',  to: '/courses' },
      { icon: ClipboardList,  label: 'Assignments',       to: '/assignments' },
      { icon: FileQuestion,   label: 'Practice Questions',to: '/practice' },
    ],
  },
  {
    label: 'ACCOUNT',
    icon: Users,
    items: [
      { icon: Award,      label: 'Certificates', to: '/certificates' },
      { icon: Heart,      label: 'Wishlist',     to: '/wishlist' },
      { icon: UserCircle, label: 'Profile',      to: '/profile' },
      { icon: Settings,   label: 'Settings',     to: '/profile' },
    ],
  },
];

// Single Item Component
function SidebarItem({ item, collapsed, active }) {
  const { closeMobile } = useSidebar();
  const { isDark } = useTheme();

  return (
    <Link
      to={item.to}
      onClick={closeMobile}
      title={collapsed ? item.label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: collapsed ? '10px' : '8px 12px',
        borderRadius: '10px',
        fontSize: '0.825rem',
        fontWeight: active ? 700 : 500,
        textDecoration: 'none',
        color: active
          ? (isDark ? '#60a5fa' : '#1d4ed8')
          : 'var(--text-secondary)',
        background: active
          ? (isDark
              ? 'linear-gradient(135deg, rgba(59,130,246,.18), rgba(6,182,212,.1))'
              : 'linear-gradient(135deg, rgba(59,130,246,.12), rgba(6,182,212,.07))')
          : 'transparent',
        border: active
          ? (isDark ? '1px solid rgba(59,130,246,.25)' : '1px solid rgba(59,130,246,.3)')
          : '1px solid transparent',
        transition: 'all 0.15s ease',
        margin: '2px 0',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.05)' : 'rgba(59,130,246,.08)';
          e.currentTarget.style.color = isDark ? '#fff' : '#1e3a8a';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }
      }}
    >
      <item.icon
        size={16}
        style={{ color: active ? (isDark ? '#60a5fa' : '#2563eb') : 'var(--text-muted)', flexShrink: 0 }}
      />
      {!collapsed && (
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.label}
        </span>
      )}
      {!collapsed && active && (
        <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: isDark ? '#60a5fa' : '#2563eb', boxShadow: isDark ? '0 0 6px #60a5fa' : '0 0 6px #2563eb', flexShrink: 0 }} />
      )}
    </Link>
  );
}

// Section Header & Items Group
function SidebarSection({ section, collapsed }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { isDark } = useTheme();

  if (!section.label || section.label === 'MAIN') {
    return (
      <div style={{ marginBottom: '12px' }}>
        {section.items.map((item) => (
          <SidebarItem
            key={item.to + item.label}
            item={item}
            collapsed={collapsed}
            active={location.pathname === item.to}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '14px' }}>
      {!collapsed && (
        <button
          onClick={() => setOpen((p) => !p)}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 8px', borderRadius: '6px',
            fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#fff' : '#0f172a'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <span>{section.label}</span>
          <ChevronDown
            size={12}
            style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform 0.2s' }}
          />
        </button>
      )}

      <AnimatePresence initial={false}>
        {(open || collapsed) && (
          <motion.div
            initial={collapsed ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ overflow: 'hidden' }}
          >
            {section.items.map((item) => (
              <SidebarItem
                key={item.to + item.label}
                item={item}
                collapsed={collapsed}
                active={location.pathname === item.to || location.search.includes(encodeURIComponent(item.label.split(' ')[0]))}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Sidebar Export
export default function Sidebar() {
  const { collapsed, mobileOpen, isMobile, closeMobile } = useSidebar();
  const { isDark } = useTheme();

  const sidebarBg = isDark ? 'var(--bg-secondary)' : '#ffffff';
  const sidebarBorder = isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.15)';

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Mobile Drawer Header */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <BrandLogo size="sm" />
          <button onClick={closeMobile} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div style={{ flex: 1, overflowY: 'auto', padding: collapsed && !isMobile ? '12px 6px' : '14px 10px' }} className="scrollbar-hide">
        {menuSections.map((section, idx) => (
          <SidebarSection key={idx} section={section} collapsed={collapsed && !isMobile} />
        ))}
      </div>

      {/* Grade Feature Panel */}
      <GradeFeaturePanel collapsed={collapsed && !isMobile} />

      {/* Footer Version Note */}
      {!collapsed && (
        <div style={{
          padding: '12px 16px',
          borderTop: isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.12)',
          background: isDark ? 'rgba(0,0,0,.15)' : 'rgba(59,130,246,.03)',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0, fontWeight: 500 }}>
            DevOpsX Platform v1.0
          </p>
        </div>
      )}
    </div>
  );

  /* Desktop Sidebar */
  if (!isMobile) {
    return (
      <motion.aside
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          position: 'fixed', left: 0, top: 'var(--navbar-height)',
          height: 'calc(100vh - var(--navbar-height))',
          zIndex: 30, overflow: 'hidden',
          background: sidebarBg,
          borderRight: sidebarBorder,
          boxSizing: 'border-box',
        }}
      >
        {sidebarContent}
      </motion.aside>
    );
  }

  /* Mobile Drawer */
  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobile}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: isDark ? 'rgba(0,0,0,.65)' : 'rgba(0,20,80,.35)', backdropFilter: 'blur(4px)' }}
          />
          <motion.aside
            initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50,
              width: '260px', background: sidebarBg,
              borderRight: sidebarBorder,
            }}
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
