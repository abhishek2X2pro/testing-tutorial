// ============================================================
// Notes Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Search, Plus, Folder, MoreVertical, Pin,
  LayoutDashboard, BookOpen, Video, Award, Heart, Download,
  FileText, Trophy, Settings, HelpCircle, LogOut, Lightbulb,
  MessageCircle, Notebook
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function Notes() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotes, setSelectedNotes] = useState([]);

  // Mock Notes Data matching Reference Image
  const [allNotes, setAllNotes] = useState([
    {
      id: 1,
      title: 'Linear Regression - Key Concepts',
      subtitle: 'Notes on linear regression assumptions, cost function and gradient descent.',
      course: 'Machine Learning with Python',
      courseIcon: '🤖',
      lastUpdated: 'May 26, 2024 10:45 AM',
      tags: ['Regression', 'ML'],
      pinned: true,
      category: 'all',
      folder: 'ml',
      iconColor: { bg: '#fef9c3', text: '#ca8a04', border: '#fde047' },
    },
    {
      id: 2,
      title: 'Pandas Cheat Sheet',
      subtitle: 'Important pandas functions for data manipulation and analysis.',
      course: 'Complete Python for AI & Data Science',
      courseIcon: '🐍',
      lastUpdated: 'May 24, 2024 09:30 PM',
      tags: ['Pandas', 'Python'],
      pinned: false,
      category: 'all',
      folder: 'python',
      iconColor: { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
    },
    {
      id: 3,
      title: 'Decision Trees - Summary',
      subtitle: 'Key points about decision trees, entropy, information gain and pruning.',
      course: 'Machine Learning with Python',
      courseIcon: '🤖',
      lastUpdated: 'May 23, 2024 06:15 PM',
      tags: ['Classification', 'ML'],
      pinned: true,
      category: 'all',
      folder: 'ml',
      iconColor: { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' },
    },
    {
      id: 4,
      title: 'NLP Transformers - Overview',
      subtitle: 'Transformer architecture, self-attention mechanism and use cases.',
      course: 'NLP with Transformers',
      courseIcon: '💬',
      lastUpdated: 'May 22, 2024 11:20 AM',
      tags: ['NLP', 'Transformers'],
      pinned: false,
      category: 'all',
      folder: 'nlp',
      iconColor: { bg: '#f3e8ff', text: '#9333ea', border: '#d8b4fe' },
    },
    {
      id: 5,
      title: 'Data Visualization Tips',
      subtitle: 'Best practices for creating effective visualizations in Python.',
      course: 'Data Visualization with Python',
      courseIcon: '📊',
      lastUpdated: 'May 20, 2024 04:40 PM',
      tags: ['Visualization', 'Python'],
      pinned: false,
      category: 'all',
      folder: 'python',
      iconColor: { bg: '#ffedd5', text: '#ea580c', border: '#fdba74' },
    },
    {
      id: 6,
      title: 'Deep Learning - Activation Functions',
      subtitle: 'Summary of activation functions with formulas and graphs.',
      course: 'Deep Learning with TensorFlow 2.0',
      courseIcon: '⚛️',
      lastUpdated: 'May 19, 2024 03:10 PM',
      tags: ['Deep Learning', 'DL'],
      pinned: false,
      category: 'all',
      folder: 'dl',
      iconColor: { bg: '#e0f2fe', text: '#0284c7', border: '#7dd3fc' },
    },
  ]);

  // Folder Categories
  const folders = [
    { id: 'ml', name: 'Machine Learning', count: 6 },
    { id: 'python', name: 'Python', count: 5 },
    { id: 'dl', name: 'Deep Learning', count: 3 },
    { id: 'ds', name: 'Data Science', count: 2 },
    { id: 'nlp', name: 'NLP', count: 1 },
    { id: 'uncategorized', name: 'Uncategorized', count: 1 },
  ];

  // Sidebar Menu Items
  const sidebarMenuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
    { label: 'Live Classes', icon: Video, path: '/courses' },
    { label: 'Certificates', icon: Award, path: '/certificates' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Downloads', icon: Download, path: '/downloads' },
    { label: 'Notes', icon: FileText, path: '/notes', active: true },
    { label: 'Achievements', icon: Trophy, path: '/certificates' },
    { label: 'Settings', icon: Settings, path: '/profile' },
    { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
  ];

  // Toggle Pin state
  const handleTogglePin = (id) => {
    setAllNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
    toast.success('Note pin state updated!');
  };

  // Toggle checkbox selection
  const handleSelectNote = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter notes
  const filteredNotes = allNotes.filter((note) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pinned' && note.pinned) ||
      (activeTab === 'shared' && note.category === 'shared') ||
      (activeTab === 'trash' && note.category === 'trash');

    const matchesFolder = selectedFolder === 'all' || note.folder === selectedFolder;

    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesFolder && matchesSearch;
  });

  const handleCreateNote = () => {
    toast.success('Create new note editor opened!');
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Notes</span>
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

            {/* Bottom Sidebar Promo Banner ("Organize Your Notes") */}
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
                <Notebook size={22} color="#4f46e5" />
              </div>

              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>
                  Organize Your Notes
                </h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
                  Create, manage and access all your study notes in one place.
                </p>
              </div>

              <button
                onClick={handleCreateNote}
                style={{
                  width: '100%', padding: '9px 14px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                  fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)', transition: 'all 0.15s',
                }}
              >
                Create New Note
              </button>
            </div>
          </div>

          {/* ── COLUMN 2: CENTER MY NOTES TABLE & ACTION BAR ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header Title */}
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                My Notes
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                Create and organize your notes to enhance your learning.
              </p>
            </div>

            {/* Tabs & New Note Bar Row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '12px', flexWrap: 'wrap', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              paddingBottom: '12px',
            }}>
              {/* Underlined Tab Switcher */}
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { id: 'all', label: 'All Notes (18)' },
                  { id: 'pinned', label: 'Pinned (4)' },
                  { id: 'shared', label: 'Shared with Me (2)' },
                  { id: 'trash', label: 'Trash (1)' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        padding: '6px 0', background: 'none', border: 'none',
                        borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
                        color: isActive ? '#4f46e5' : 'var(--text-muted)',
                        fontSize: '0.82rem', fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Search & + New Note Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative', width: '180px' }}>
                  <Search size={14} color="#98a2b3" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search notes..."
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
                  onClick={handleCreateNote}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '8px 16px', borderRadius: '8px',
                    background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                    fontSize: '0.8rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79,70,229,0.3)', transition: 'all 0.15s',
                  }}
                >
                  <Plus size={15} /> New Note
                </button>
              </div>
            </div>

            {/* Notes Data Table Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '40px 2.5fr 1.6fr 1.2fr 1.2fr 80px',
                padding: '12px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb',
                fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em',
                alignItems: 'center',
              }}>
                <div>
                  <input type="checkbox" style={{ cursor: 'pointer' }} />
                </div>
                <div>Title</div>
                <div>Course</div>
                <div>Last Updated</div>
                <div>Tags</div>
                <div style={{ textAlign: 'right' }}>Actions</div>
              </div>

              {/* Table Body Rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredNotes.map((note) => {
                  const isChecked = selectedNotes.includes(note.id);
                  return (
                    <div
                      key={note.id}
                      style={{
                        display: 'grid', gridTemplateColumns: '40px 2.5fr 1.6fr 1.2fr 1.2fr 80px',
                        alignItems: 'center', padding: '14px 20px',
                        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`,
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      {/* Checkbox */}
                      <div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectNote(note.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>

                      {/* Title & Description with Color Notebook Icon */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingRight: '12px' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '8px',
                          background: note.iconColor.bg, color: note.iconColor.text,
                          border: `1px solid ${note.iconColor.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: '2px',
                        }}>
                          <FileText size={17} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                              {note.title}
                            </span>
                            {note.pinned && <Pin size={12} color="#4f46e5" fill="#4f46e5" style={{ transform: 'rotate(45deg)' }} />}
                          </div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px', lineHeight: 1.35 }}>
                            {note.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Course */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                        <span style={{ fontSize: '0.9rem' }}>{note.courseIcon}</span>
                        <span style={{ fontWeight: 600, lineHeight: 1.3 }}>{note.course}</span>
                      </div>

                      {/* Last Updated */}
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                        {note.lastUpdated}
                      </div>

                      {/* Tags Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {note.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '2px 8px', borderRadius: '6px',
                              fontSize: '0.68rem', fontWeight: 600,
                              background: isDark ? 'rgba(79,70,229,0.15)' : '#e0e7ff',
                              color: isDark ? '#a5b4fc' : '#4338ca',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <button
                          onClick={() => handleTogglePin(note.id)}
                          style={{
                            padding: '6px', borderRadius: '6px', background: 'transparent',
                            border: 'none', color: note.pinned ? '#4f46e5' : 'var(--text-muted)',
                            cursor: 'pointer', display: 'flex',
                          }}
                          title={note.pinned ? 'Unpin note' : 'Pin note'}
                        >
                          <Pin size={15} fill={note.pinned ? '#4f46e5' : 'none'} style={{ transform: 'rotate(45deg)' }} />
                        </button>

                        <button
                          onClick={() => toast.success(`Options for "${note.title}"`)}
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
                  );
                })}
              </div>

              {/* Table Pagination Footer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', background: isDark ? 'rgba(255,255,255,0.01)' : '#ffffff',
                fontSize: '0.78rem', color: 'var(--text-muted)',
              }}>
                <span>Showing 1 to {filteredNotes.length} of 18 notes</span>

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

          {/* ── COLUMN 3: RIGHT FOLDERS & RECENT NOTES WIDGETS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* WIDGET 1: My Folders Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Folder size={16} color="#4f46e5" />
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                    My Folders
                  </h3>
                </div>
                <span
                  onClick={() => toast.success('New folder created')}
                  style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  + New Folder
                </span>
              </div>

              {/* Folders List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div
                  onClick={() => setSelectedFolder('all')}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 10px', borderRadius: '8px', cursor: 'pointer',
                    background: selectedFolder === 'all' ? (isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff') : 'transparent',
                    color: selectedFolder === 'all' ? '#4f46e5' : 'var(--text-primary)',
                    fontSize: '0.8rem', fontWeight: selectedFolder === 'all' ? 700 : 500,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Folder size={14} color={selectedFolder === 'all' ? '#4f46e5' : '#64748b'} />
                    <span>All Folders</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>18</span>
                </div>

                {folders.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFolder(f.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 10px', borderRadius: '8px', cursor: 'pointer',
                      background: selectedFolder === f.id ? (isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff') : 'transparent',
                      color: selectedFolder === f.id ? '#4f46e5' : 'var(--text-primary)',
                      fontSize: '0.8rem', fontWeight: selectedFolder === f.id ? 700 : 500,
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Folder size={14} color={selectedFolder === f.id ? '#4f46e5' : '#64748b'} />
                      <span>{f.name}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{f.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 2: Recent Notes Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Recent Notes
                </h3>
                <span
                  onClick={() => toast.success('Viewing all recent notes')}
                  style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All
                </span>
              </div>

              {/* Recent notes list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {allNotes.slice(0, 5).map((rec) => (
                  <div key={rec.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <div style={{
                        width: '26px', height: '26px', borderRadius: '6px',
                        background: rec.iconColor.bg, color: rec.iconColor.text,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <FileText size={13} />
                      </div>

                      <h5 style={{
                        color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 700, margin: 0,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {rec.title}
                      </h5>
                    </div>

                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                      {rec.lastUpdated.split(' ')[2] || '10:45 AM'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 3: Quick Tip Card */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg, #1e1b4b, #2e1065)' : '#f5f3ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '16px', padding: '16px 18px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <Lightbulb size={20} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: isDark ? '#ffffff' : '#4338ca', fontSize: '0.82rem', display: 'block', fontWeight: 700, marginBottom: '2px' }}>
                  Quick Tip
                </strong>
                <span style={{ fontSize: '0.74rem', color: isDark ? '#cbd5e1' : '#5b21b6', lineHeight: 1.4 }}>
                  Use tags and folders to keep your notes organized and easy to find.
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
