// ============================================================
// Downloads Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Search, Filter, Folder, MoreVertical,
  LayoutDashboard, BookOpen, Video, Award, Heart, Download,
  FileText, Trophy, Settings, HelpCircle, LogOut, Smartphone,
  CheckCircle2, Sliders, MessageCircle, CloudDownload
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function Downloads() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock Downloads Data matching Reference Image
  const allDownloads = [
    {
      id: 1,
      title: 'Complete Python for AI & Data Science',
      subtitle: 'Section 7: Machine Learning with Python',
      type: 'Course',
      typeColor: { bg: '#e0e7ff', text: '#4338ca' },
      size: '2.34 GB',
      date: 'May 26, 2024',
      icon: '🐍',
      iconBg: '#1e293b',
      category: 'courses',
    },
    {
      id: 2,
      title: 'Introduction to Deep Learning',
      subtitle: 'Live Class Recording',
      type: 'Class',
      typeColor: { bg: '#dcfce7', text: '#15803d' },
      size: '1.12 GB',
      date: 'May 28, 2024',
      icon: 'DL',
      iconBg: '#312e81',
      category: 'courses',
    },
    {
      id: 3,
      title: 'NLP with Transformers',
      subtitle: 'Lecture Notes (PDF)',
      type: 'Notes',
      typeColor: { bg: '#fef3c7', text: '#b45309' },
      size: '8.45 MB',
      date: 'May 30, 2024',
      icon: 'NLP',
      iconBg: '#0f766e',
      category: 'notes',
    },
    {
      id: 4,
      title: 'Data Visualization with Python',
      subtitle: 'Cheat Sheet (PDF)',
      type: 'Notes',
      typeColor: { bg: '#fef3c7', text: '#b45309' },
      size: '1.78 MB',
      date: 'Jun 2, 2024',
      icon: '📊',
      iconBg: '#1e1b4b',
      category: 'notes',
    },
    {
      id: 5,
      title: 'Deep Learning with TensorFlow 2.0',
      subtitle: 'Course Material (ZIP)',
      type: 'Material',
      typeColor: { bg: '#f3e8ff', text: '#7e22ce' },
      size: '953 MB',
      date: 'May 24, 2024',
      icon: '⚛️',
      iconBg: '#311b92',
      category: 'others',
    },
    {
      id: 6,
      title: 'House Prices Dataset',
      subtitle: 'CSV File',
      type: 'Dataset',
      typeColor: { bg: '#d1fae5', text: '#047857' },
      size: '2.56 MB',
      date: 'May 21, 2024',
      icon: '📑',
      iconBg: '#065f46',
      category: 'datasets',
    },
    {
      id: 7,
      title: 'Artificial Intelligence for Beginners',
      subtitle: 'E-book (PDF)',
      type: 'E-book',
      typeColor: { bg: '#fce7f3', text: '#be185d' },
      size: '12.6 MB',
      date: 'May 20, 2024',
      icon: 'AI',
      iconBg: '#831843',
      category: 'ebooks',
    },
    {
      id: 8,
      title: 'Machine Learning Basics',
      subtitle: 'Lecture Slides (PDF)',
      type: 'Notes',
      typeColor: { bg: '#fef3c7', text: '#b45309' },
      size: '5.19 MB',
      date: 'May 19, 2024',
      icon: '💡',
      iconBg: '#1e293b',
      category: 'notes',
    },
  ];

  // Category Filter Pills definition
  const filterCategories = [
    { id: 'all', label: 'All', count: 26 },
    { id: 'courses', label: 'Courses', count: 8 },
    { id: 'notes', label: 'Lecture Notes', count: 7 },
    { id: 'ebooks', label: 'E-books', count: 5 },
    { id: 'datasets', label: 'Datasets', count: 3 },
    { id: 'others', label: 'Others', count: 3 },
  ];

  // Sidebar Menu Items
  const sidebarMenuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
    { label: 'Live Classes', icon: Video, path: '/courses' },
    { label: 'Certificates', icon: Award, path: '/certificates' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Downloads', icon: Download, path: '/downloads', active: true },
    { label: 'Notes', icon: FileText, path: '/notes' },
    { label: 'Achievements', icon: Trophy, path: '/certificates' },
    { label: 'Settings', icon: Settings, path: '/profile' },
    { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
  ];

  // Filter downloads
  const filteredDownloads = allDownloads.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenFolder = (title) => {
    toast.success(`Opening folder for "${title}"...`);
  };

  const handleItemAction = (title) => {
    toast.success(`Options for "${title}"`);
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Downloads</span>
        </div>

        {/* ── 3-COLUMN MAIN DASHBOARD PORTAL LAYOUT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr 280px',
          gap: '24px',
          alignItems: 'start',
        }}>

          {/* ── COLUMN 1: LEFT USER PORTAL SIDEBAR ── */}
          <div style={{
            background: isDark ? '#0f172a' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
            borderRadius: '16px',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
          }}>
            {/* Menu List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {sidebarMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.active;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? '#4f46e5'
                        : (isDark ? '#cbd5e1' : '#475467'),
                      background: isActive
                        ? (isDark ? 'rgba(79, 70, 229, 0.15)' : '#f5f3ff')
                        : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Icon size={16} color={isActive ? '#4f46e5' : (isDark ? '#94a3b8' : '#667085')} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => { logout(); navigate('/login'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px',
                  fontSize: '0.82rem', fontWeight: 500,
                  color: '#ef4444', background: 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '4px',
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>

            {/* Bottom Sidebar Promo Banner ("Learn Offline, Anytime!") */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg, #1e1b4b, #311b92)' : 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '14px',
              padding: '18px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: '#ffffff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CloudDownload size={22} color="#4f46e5" />
              </div>

              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>
                  Learn Offline, Anytime!
                </h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
                  Download courses, notes and resources to access offline whenever you need.
                </p>
              </div>

              <button
                onClick={() => navigate('/courses')}
                style={{
                  width: '100%', padding: '9px 14px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                  fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)', transition: 'all 0.15s',
                }}
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* ── COLUMN 2: CENTER DOWNLOADS TABLE & FILTERS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header Title */}
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                Downloads
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                Access your downloaded courses, notes and resources.
              </p>
            </div>

            {/* Filter Pills & Search Bar Row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '12px', flexWrap: 'wrap',
            }}>
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                {filterCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '6px 14px', borderRadius: '999px',
                        fontSize: '0.78rem', fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#ffffff' : (isDark ? '#cbd5e1' : '#475467'),
                        background: isActive
                          ? '#4f46e5'
                          : (isDark ? 'rgba(255,255,255,0.06)' : '#f2f4f7'),
                        border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  );
                })}
              </div>

              {/* Search & Filter Trigger */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative', width: '180px' }}>
                  <Search size={14} color="#98a2b3" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search downloads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%', padding: '6px 12px 6px 30px', borderRadius: '8px',
                      background: isDark ? '#0f172a' : '#ffffff',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d5dd'}`,
                      color: 'var(--text-primary)', fontSize: '0.78rem', outline: 'none',
                    }}
                  />
                </div>

                <button
                  onClick={() => toast.success('Filter options toggle')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '8px',
                    background: isDark ? '#0f172a' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d5dd'}`,
                    color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  <Sliders size={13} /> Filter
                </button>
              </div>
            </div>

            {/* Downloads Data Table Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 80px',
                padding: '12px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb',
                fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                <div>Name</div>
                <div>Type</div>
                <div>Size</div>
                <div>Downloaded On</div>
                <div style={{ textAlign: 'right' }}>Actions</div>
              </div>

              {/* Table Body Rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredDownloads.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 80px',
                      alignItems: 'center', padding: '14px 20px',
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`,
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Item Name + Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: item.iconBg, color: '#ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.85rem', fontWeight: 800, flexShrink: 0,
                      }}>
                        {item.icon}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                          {item.title}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '1px' }}>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div>
                      <span style={{
                        padding: '3px 10px', borderRadius: '6px',
                        fontSize: '0.7rem', fontWeight: 700,
                        background: item.typeColor.bg, color: item.typeColor.text,
                      }}>
                        {item.type}
                      </span>
                    </div>

                    {/* Size */}
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500 }}>
                      {item.size}
                    </div>

                    {/* Downloaded Date */}
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      {item.date}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => handleOpenFolder(item.title)}
                        style={{
                          padding: '6px', borderRadius: '6px', background: 'transparent',
                          border: 'none', color: '#4f46e5', cursor: 'pointer', display: 'flex',
                        }}
                        title="Open folder"
                      >
                        <Folder size={16} />
                      </button>

                      <button
                        onClick={() => handleItemAction(item.title)}
                        style={{
                          padding: '6px', borderRadius: '6px', background: 'transparent',
                          border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex',
                        }}
                        title="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Pagination Footer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', background: isDark ? 'rgba(255,255,255,0.01)' : '#ffffff',
                fontSize: '0.78rem', color: 'var(--text-muted)',
              }}>
                <span>Showing 1 to {filteredDownloads.length} of 26 items</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => setCurrentPage(1)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      background: currentPage === 1 ? '#4f46e5' : 'transparent',
                      color: currentPage === 1 ? '#ffffff' : 'var(--text-primary)',
                      border: currentPage === 1 ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0'}`,
                      fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    1
                  </button>
                  <button
                    onClick={() => setCurrentPage(2)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px', background: 'transparent',
                      color: 'var(--text-primary)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0'}`,
                      fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    2
                  </button>
                  <button
                    onClick={() => setCurrentPage(3)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px', background: 'transparent',
                      color: 'var(--text-primary)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0'}`,
                      fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    3
                  </button>
                  <span style={{ color: 'var(--text-muted)' }}>...</span>
                  <button
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px', background: 'transparent',
                      color: 'var(--text-primary)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0'}`,
                      fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    4
                  </button>
                  <button
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px', background: 'transparent',
                      color: 'var(--text-primary)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0'}`,
                      fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ── COLUMN 3: RIGHT STORAGE & RECENT ACTIVITY WIDGETS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* WIDGET 1: Download Storage Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Download Storage
                </h3>
                <span
                  onClick={() => toast.success('Manage storage clicked')}
                  style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  Manage Storage
                </span>
              </div>

              {/* Donut Storage Graphic */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* SVG Donut Ring */}
                <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                  <svg width="90" height="90" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}
                      strokeWidth="3.8"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3.8"
                      strokeDasharray="68, 100"
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                    <strong style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                      6.8 GB
                    </strong>
                    <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      of 10 GB used
                    </span>
                  </div>
                </div>

                {/* Storage Legend List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, fontSize: '0.76rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }} />
                      Used
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>6.8 GB</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }} />
                      Available
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>3.2 GB</strong>
                  </div>

                  <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0', margin: '2px 0' }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Total</span>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>10 GB</strong>
                  </div>
                </div>
              </div>

              {/* Device Status Box */}
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}`,
                borderRadius: '10px', padding: '12px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Downloads available offline on ⓘ
                </span>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                    <Smartphone size={14} color="#64748b" />
                    <span style={{ fontWeight: 600 }}>This Device</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>6.8 GB</span>
                    <CheckCircle2 size={14} color="#16a34a" />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                    <Smartphone size={14} color="#64748b" />
                    <span style={{ fontWeight: 600 }}>Android App</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>2.1 GB</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Download Settings Button */}
              <button
                onClick={() => toast.success('Download settings opened')}
                style={{
                  width: '100%', padding: '9px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}
              >
                <Settings size={14} /> Download Settings
              </button>
            </div>

            {/* WIDGET 2: Recent Downloads Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Recent Downloads
                </h3>
                <span
                  onClick={() => toast.success('View all recent downloads')}
                  style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All
                </span>
              </div>

              {/* Recent downloads list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {allDownloads.slice(0, 5).map((rec) => (
                  <div key={rec.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <div style={{
                        width: '30px', height: '30px', borderRadius: '6px',
                        background: rec.iconBg, color: '#ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                      }}>
                        {rec.icon}
                      </div>

                      <div style={{ overflow: 'hidden' }}>
                        <h5 style={{
                          color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 700, margin: 0,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {rec.title}
                        </h5>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {rec.size} • {rec.date}
                        </span>
                      </div>
                    </div>

                    <CheckCircle2 size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', paddingTop: '4px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}` }}>
                <span
                  onClick={() => toast.success('Showing all downloads')}
                  style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All Downloads →
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ── FLOATING CHAT WIDGET BUTTON (BOTTOM-RIGHT) ── */}
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
        }}>
          <button
            onClick={() => toast.success('Need help? Chat assistant coming soon!')}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
              border: 'none', boxShadow: '0 6px 20px rgba(79,70,229,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MessageCircle size={22} />
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}
