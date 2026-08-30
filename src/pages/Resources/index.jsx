// ============================================================
// Resources Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Search, Download, Play, Folder, MoreVertical,
  LayoutDashboard, BookOpen, Video, Award, Heart, FileText,
  Settings, HelpCircle, LogOut, Code2, BookMarked, Sparkles,
  ShoppingBag, FileCheck, Upload, Lightbulb, MessageCircle, ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function Resources() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // 7 Resource Categories
  const categoryStrip = [
    { id: 'all', label: 'All Resources', count: 128, icon: '📖', bg: '#f3e8ff', color: '#7e22ce' },
    { id: 'ebooks', label: 'eBooks', count: 32, icon: '📚', bg: '#dcfce7', color: '#15803d' },
    { id: 'videos', label: 'Videos', count: 28, icon: '🎥', bg: '#ffedd5', color: '#c2410c' },
    { id: 'guides', label: 'Guides', count: 24, icon: '📑', bg: '#e0f2fe', color: '#0369a1' },
    { id: 'templates', label: 'Templates', count: 18, icon: '📝', bg: '#fce7f3', color: '#be185d' },
    { id: 'cheatsheets', label: 'Cheat Sheets', count: 12, icon: '📊', bg: '#ccfbf1', color: '#0f766e' },
    { id: 'code', label: 'Source Code', count: 14, icon: '💻', bg: '#e0e7ff', color: '#4338ca' },
  ];

  // Popular This Week Featured Cards
  const popularResources = [
    {
      id: 1,
      title: 'Artificial Intelligence Fundamentals',
      subtitle: 'A complete guide to understand AI from basics to real-world applications.',
      type: 'eBook',
      meta: 'PDF  2.4 MB',
      action: 'Download',
      actionType: 'download',
      bgGradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
      icon: '🤖',
    },
    {
      id: 2,
      title: 'Machine Learning Full Course (2024)',
      subtitle: 'Learn ML step-by-step with practical examples and projects.',
      type: 'Video Course',
      meta: '8 Lessons',
      action: 'Watch Now',
      actionType: 'watch',
      bgGradient: 'linear-gradient(135deg, #10b981, #059669)',
      icon: '▶',
    },
    {
      id: 3,
      title: 'Prompt Engineering Complete Guide',
      subtitle: 'Master the art of writing powerful prompts for any AI tool.',
      type: 'Guide',
      meta: 'PDF  1.7 MB',
      action: 'Download',
      actionType: 'download',
      bgGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: '📝',
    },
    {
      id: 4,
      title: 'Python Projects Source Code',
      subtitle: 'Download source code for 15+ beginner to advanced projects.',
      type: 'Code',
      meta: 'ZIP  5.6 MB',
      action: 'Download',
      actionType: 'download',
      bgGradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      icon: '</>',
    },
  ];

  // Recently Added Resources Table Data
  const recentResources = [
    {
      id: 1,
      name: 'ChatGPT for Students - Ultimate Guide',
      category: 'AI Tools',
      type: 'eBook',
      typeColor: { bg: '#e0e7ff', text: '#4338ca' },
      size: '1.6 MB',
      date: 'May 29, 2024',
      action: 'Download',
      actionType: 'download',
      icon: 'B',
      iconBg: '#0f766e',
    },
    {
      id: 2,
      name: 'Data Science Roadmap 2024',
      category: 'Data Science',
      type: 'Guide',
      typeColor: { bg: '#fef3c7', text: '#b45309' },
      size: 'PDF 1.2 MB',
      date: 'May 28, 2024',
      action: 'Download',
      actionType: 'download',
      icon: 'D',
      iconBg: '#15803d',
    },
    {
      id: 3,
      name: '10 Python Mini Projects for Beginners',
      category: 'Python',
      type: 'Source Code',
      typeColor: { bg: '#fce7f3', text: '#be185d' },
      size: 'ZIP 3.8 MB',
      date: 'May 28, 2024',
      action: 'Download',
      actionType: 'download',
      icon: 'B',
      iconBg: '#1e293b',
    },
    {
      id: 4,
      name: 'AI & Ethics - Complete Handbook',
      category: 'AI Ethics',
      type: 'eBook',
      typeColor: { bg: '#e0e7ff', text: '#4338ca' },
      size: 'PDF 2.1 MB',
      date: 'May 27, 2024',
      action: 'Download',
      actionType: 'download',
      icon: 'B',
      iconBg: '#4338ca',
    },
    {
      id: 5,
      name: 'Generative AI Explained Simply',
      category: 'Generative AI',
      type: 'Video',
      typeColor: { bg: '#dcfce7', text: '#15803d' },
      size: '32:45 min',
      date: 'May 26, 2024',
      action: 'Watch Now',
      actionType: 'watch',
      icon: 'D',
      iconBg: '#0284c7',
    },
  ];

  // Sidebar Menu Items
  const sidebarMenuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
    { label: 'Live Classes', icon: Video, path: '/courses' },
    { label: 'Certificates', icon: Award, path: '/certificates' },
    { label: 'Orders', icon: ShoppingBag, path: '/checkout' },
    { label: 'Invoices', icon: FileCheck, path: '/checkout' },
    { label: 'Resources', icon: Folder, path: '/resources', active: true },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Downloads', icon: Download, path: '/downloads' },
    { label: 'Notes', icon: FileText, path: '/notes' },
    { label: 'Achievements', icon: Award, path: '/achievements' },
    { label: 'Settings', icon: Settings, path: '/profile' },
    { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
  ];

  const handleAction = (itemTitle, actionType) => {
    if (actionType === 'watch') {
      toast.success(`Opening video player for "${itemTitle}"...`);
      navigate('/curriculum');
    } else {
      toast.success(`Downloading resource "${itemTitle}"...`);
    }
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Resources</span>
        </div>

        {/* ── 3-COLUMN MAIN PORTAL DASHBOARD LAYOUT ── */}
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

            {/* Bottom Sidebar Promo Banner ("Access 1000+ Premium Resources") */}
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
                <Folder size={22} color="#4f46e5" />
              </div>

              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>
                  Access 1000+ Premium Resources
                </h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
                  eBooks, templates, guides and more to accelerate your learning.
                </p>
              </div>

              <button
                onClick={() => navigate('/subscription')}
                style={{
                  width: '100%', padding: '9px 14px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                  fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)', transition: 'all 0.15s',
                }}
              >
                Go Premium
              </button>
            </div>
          </div>

          {/* ── COLUMN 2: CENTER RESOURCES CONTENT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header Title */}
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                Resources
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                Find the best study materials, templates, code, and guides to enhance your learning.
              </p>
            </div>

            {/* Search Bar + 3 Dropdown Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={15} color="#98a2b3" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search resources (e.g. Machine Learning, Python, Prompt Guide...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%', padding: '8px 12px 8px 34px', borderRadius: '10px',
                    background: isDark ? '#0f172a' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d5dd'}`,
                    color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none',
                  }}
                />
              </div>

              {/* Select Dropdowns */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '8px 12px', borderRadius: '10px',
                  background: isDark ? '#0f172a' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                }}
              >
                <option value="all">All Categories</option>
                <option value="ai">AI Tools</option>
                <option value="python">Python</option>
                <option value="ds">Data Science</option>
                <option value="ml">Machine Learning</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  padding: '8px 12px', borderRadius: '10px',
                  background: isDark ? '#0f172a' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                }}
              >
                <option value="all">All Types</option>
                <option value="ebook">eBooks</option>
                <option value="video">Videos</option>
                <option value="guide">Guides</option>
                <option value="code">Source Code</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 12px', borderRadius: '10px',
                  background: isDark ? '#0f172a' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d5dd'}`,
                  color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Horizontal Resource Category Cards Strip (7 Cards) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '10px',
              overflowX: 'auto',
            }}>
              {categoryStrip.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: isDark ? '#0f172a' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                    borderRadius: '12px', padding: '12px 10px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    gap: '6px', cursor: 'pointer', transition: 'all 0.15s ease',
                    boxShadow: '0 1px 2px rgba(16,24,40,0.03)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: cat.bg, color: cat.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.74rem', display: 'block', fontWeight: 700, lineHeight: 1.2 }}>
                      {cat.label}
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {cat.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular This Week Grid */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                  Popular This Week
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span onClick={() => toast.success('Viewing all popular resources')} style={{ fontSize: '0.76rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}>
                    View All
                  </span>
                  <button style={{
                    width: '26px', height: '26px', borderRadius: '50%', background: isDark ? '#0f172a' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#eaecf0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-primary)',
                  }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {popularResources.map((res) => (
                  <div
                    key={res.id}
                    style={{
                      background: isDark ? '#0f172a' : '#ffffff',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                      borderRadius: '14px', overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
                    }}
                  >
                    {/* Top Graphic Banner */}
                    <div style={{
                      height: '90px', background: res.bgGradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff', fontSize: '2.2rem', fontWeight: 800,
                    }}>
                      {res.icon}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, gap: '6px' }}>
                      <span style={{ fontSize: '0.66rem', color: '#4f46e5', fontWeight: 700 }}>
                        {res.type}
                      </span>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                        {res.title}
                      </h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {res.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                          {res.meta}
                        </span>
                        <button
                          onClick={() => handleAction(res.title, res.actionType)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            padding: '5px 10px', borderRadius: '6px',
                            background: 'transparent', color: '#4f46e5',
                            border: 'none', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer',
                          }}
                        >
                          {res.actionType === 'watch' ? <Play size={12} fill="#4f46e5" /> : <Download size={12} />}
                          {res.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Added Resources Table Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}` }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.94rem', fontWeight: 700, margin: 0 }}>
                  Recently Added Resources
                </h3>
              </div>

              {/* Table Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2.5fr 1.2fr 1fr 1fr 1fr 120px',
                padding: '10px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb',
                fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                <div>Resource Name</div>
                <div>Category</div>
                <div>Type</div>
                <div>Size</div>
                <div>Added On</div>
                <div style={{ textAlign: 'right' }}>Action</div>
              </div>

              {/* Table Body Rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentResources.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid', gridTemplateColumns: '2.5fr 1.2fr 1fr 1fr 1fr 120px',
                      alignItems: 'center', padding: '12px 20px',
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`,
                    }}
                  >
                    {/* Name + Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '30px', height: '30px', borderRadius: '6px',
                        background: item.iconBg, color: '#ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.78rem', fontWeight: 800, flexShrink: 0,
                      }}>
                        {item.icon}
                      </div>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
                        {item.name}
                      </span>
                    </div>

                    {/* Category */}
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontWeight: 500 }}>
                      {item.category}
                    </div>

                    {/* Type Badge */}
                    <div>
                      <span style={{
                        padding: '2px 8px', borderRadius: '4px',
                        fontSize: '0.68rem', fontWeight: 700,
                        background: item.typeColor.bg, color: item.typeColor.text,
                      }}>
                        {item.type}
                      </span>
                    </div>

                    {/* Size */}
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.76rem' }}>
                      {item.size}
                    </div>

                    {/* Added On */}
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                      {item.date}
                    </div>

                    {/* Action button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => handleAction(item.name, item.actionType)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '4px 10px', borderRadius: '6px',
                          background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                          color: '#4f46e5', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                        }}
                      >
                        {item.actionType === 'watch' ? <Play size={11} fill="#4f46e5" /> : <Download size={11} />}
                        {item.action}
                      </button>
                      <button
                        onClick={() => toast.success(`Options for "${item.name}"`)}
                        style={{ padding: '4px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div style={{ textAlign: 'center', padding: '14px 0' }}>
                <button
                  onClick={() => toast.success('Loading more resources...')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '8px 18px', borderRadius: '8px',
                    background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                    color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Load More Resources <ChevronDown size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* ── COLUMN 3: RIGHT CATEGORIES, QUICK LINKS & SUPPORT WIDGETS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* WIDGET 1: Resource Categories Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                Resource Categories
              </h3>

              {/* List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categoryStrip.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontSize: '0.78rem', cursor: 'pointer', padding: '4px 0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                      <span>{cat.icon}</span>
                      <span style={{ fontWeight: 600 }}>{cat.label}</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '6px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}` }}>
                <span
                  onClick={() => toast.success('Showing all categories')}
                  style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All Categories →
                </span>
              </div>
            </div>

            {/* WIDGET 2: Quick Links Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                Quick Links
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/downloads" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Download size={14} color="#4f46e5" />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>My Downloads</strong>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>View all downloaded resources</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </Link>

                <Link to="/wishlist" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Heart size={14} color="#be185d" />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>Saved Resources</strong>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>View your bookmarked resources</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </Link>

                <div onClick={() => toast.success('Upload resource feature')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Upload size={14} color="#15803d" />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>Upload Resource</strong>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Share helpful resources with others</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </div>

                <div onClick={() => toast.success('Suggest resource feature')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lightbulb size={14} color="#b45309" />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>Suggest a Resource</strong>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Recommend resources for others</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </div>
              </div>
            </div>

            {/* WIDGET 3: Can't find what you need? Support Card */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg, #1e1b4b, #2e1065)' : '#f5f3ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '16px', padding: '18px 20px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              <div>
                <strong style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.86rem', display: 'block', fontWeight: 700, marginBottom: '4px' }}>
                  Can't find what you need?
                </strong>
                <span style={{ fontSize: '0.74rem', color: isDark ? '#cbd5e1' : '#5b21b6', lineHeight: 1.4 }}>
                  Our support team is here to help you find the best resources.
                </span>
              </div>

              <button
                onClick={() => navigate('/contact')}
                style={{
                  width: '100%', padding: '9px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                  fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                }}
              >
                <HelpCircle size={15} /> Visit Help Center
              </button>
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
