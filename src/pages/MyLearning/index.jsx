// ============================================================
// My Learning / My Courses Page — 1:1 Pixel-Perfect Reference Match
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  Clock,
  Calendar,
  FileText,
  MoreVertical,
  Award,
  Trophy,
  Star,
  CheckCircle2,
  PlayCircle,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const COURSES_DATA = [
  {
    id: 'c1',
    slug: 'complete-python-ai',
    title: 'Complete Python for AI & Data Science',
    author: 'by Ronak Patel',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop',
    status: 'in_progress',
    statusBadge: 'In Progress',
    progress: 66,
    sectionText: 'Section 7 of 12',
    timeLeft: '8h 15m left',
    lastAccessed: 'May 26, 2024',
    buttonText: 'Continue',
  },
  {
    id: 'c2',
    slug: 'deep-learning-tensorflow',
    title: 'Deep Learning with TensorFlow 2.0',
    author: 'by Neha Sharma',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop',
    status: 'in_progress',
    statusBadge: 'In Progress',
    progress: 43,
    sectionText: 'Section 5 of 12',
    timeLeft: '6h 30m left',
    lastAccessed: 'May 24, 2024',
    buttonText: 'Continue',
  },
  {
    id: 'c3',
    slug: 'ai-for-beginners',
    title: 'Artificial Intelligence for Beginners',
    author: 'by Shailendra Kumar',
    cover: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&auto=format&fit=crop',
    status: 'completed',
    statusBadge: 'Completed',
    progress: 100,
    sectionText: 'All Sections Completed',
    timeLeft: '4h 32m',
    completedDate: 'Completed on May 24, 2024',
    buttonText: 'Review Course',
    hasCertificate: true,
  },
  {
    id: 'c4',
    slug: 'data-science-bootcamp',
    title: 'Data Science & Analytics Bootcamp',
    author: 'by Ankit Jain',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop',
    status: 'not_started',
    statusBadge: 'Not Started',
    progress: 0,
    sectionText: '0 of 10 Sections',
    timeLeft: 'Duration 12h 45m',
    buttonText: 'Start Now',
  },
];

const RECOMMENDED_SIDEBAR = [
  {
    id: 1,
    title: 'Machine Learning A-Z™: Hands-On',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop',
    rating: 4.6,
    reviews: '8.2K',
    price: 1299,
    originalPrice: 2499,
    discountPct: 48,
  },
  {
    id: 2,
    title: 'Natural Language Processing in Python',
    cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&auto=format&fit=crop',
    rating: 4.5,
    reviews: '5.6K',
    price: 999,
    originalPrice: 1999,
    discountPct: 50,
  },
  {
    id: 3,
    title: 'Statistics for Data Science',
    cover: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&auto=format&fit=crop',
    rating: 4.7,
    reviews: '7.1K',
    price: 799,
    originalPrice: 1499,
    discountPct: 47,
  },
];

export default function MyLearning() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'in_progress' | 'completed' | 'not_started'
  const [searchQuery, setSearchQuery] = useState('');

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'in_progress' && course.status === 'in_progress') ||
      (activeTab === 'completed' && course.status === 'completed') ||
      (activeTab === 'not_started' && course.status === 'not_started');

    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '24px 28px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── BREADCRUMB ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>My Courses</span>
        </div>

        {/* ── PAGE TITLE ── */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          My Courses
        </h1>

        {/* ── TABS FILTER BAR & SEARCH ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Tab Filter Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All Courses (${COURSES_DATA.length})` },
              { id: 'in_progress', label: 'In Progress (2)' },
              { id: 'completed', label: 'Completed (1)' },
              { id: 'not_started', label: 'Not Started (1)' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: 'none',
                    background: isActive ? '#6366f1' : isDark ? 'rgba(255,255,255,.05)' : '#f1f5f9',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Filter Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search my courses..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: `1px solid ${border}`,
                  background: cardBg,
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <Search
                size={14}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>

            <button
              onClick={() => toast('Filter options coming soon!')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: `1px solid ${border}`,
                background: cardBg,
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={14} color="#6366f1" /> Filter
            </button>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT GRID (LEFT: COURSES | RIGHT: PROGRESS & RECOMMENDED) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(300px, 340px)',
            gap: '24px',
            alignItems: 'start',
          }}
        >

          {/* LEFT COLUMN: COURSE CARDS LIST + STAY CONSISTENT BANNER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                  boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
                  transition: 'transform .15s, border-color .15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = border;
                }}
              >
                {/* Course Cover Image */}
                <div
                  style={{
                    width: '140px',
                    height: '95px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <img
                    src={course.cover}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15,23,42,.35)',
                    }}
                  />
                </div>

                {/* Info & Progress */}
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h3
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: '0 0 2px',
                      lineHeight: 1.3,
                    }}
                  >
                    {course.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: '0 0 12px' }}>
                    {course.author}
                  </p>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '12px' }}>
                    <div
                      style={{
                        height: '5px',
                        width: '100%',
                        borderRadius: '999px',
                        background: isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0',
                        overflow: 'hidden',
                        marginBottom: '4px',
                      }}
                    >
                      <div
                        style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          borderRadius: '999px',
                          background: course.status === 'completed'
                            ? '#10b981'
                            : 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: course.status === 'completed' ? '#10b981' : '#6366f1',
                      }}
                    >
                      {course.status === 'completed' ? 'Completed' : `${course.progress}% Complete`}
                    </span>
                  </div>

                  {/* Meta Specs Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.74rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={13} color="#6366f1" /> {course.sectionText}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} color="#6366f1" /> {course.timeLeft}
                    </span>
                    {course.hasCertificate ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', fontWeight: 700 }}>
                        <Award size={13} /> Certificate
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <FileText size={13} color="#6366f1" /> Course Material ˅
                      </span>
                    )}
                    <button style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Status Badge & Action Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: course.status === 'completed' ? '#10b981' : course.status === 'in_progress' ? '#10b981' : 'var(--text-muted)',
                      background: course.status === 'completed' ? 'rgba(16,185,129,.12)' : course.status === 'in_progress' ? 'rgba(16,185,129,.12)' : isDark ? 'rgba(255,255,255,.05)' : '#f1f5f9',
                      padding: '3px 9px',
                      borderRadius: '4px',
                    }}
                  >
                    {course.statusBadge}
                  </span>

                  {course.lastAccessed && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Last accessed<br />{course.lastAccessed}
                    </span>
                  )}
                  {course.completedDate && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {course.completedDate}
                    </span>
                  )}

                  <button
                    onClick={() => navigate(`/learn/${course.slug}`)}
                    style={{
                      padding: '9px 20px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: '1.5px solid #6366f1',
                      color: '#6366f1',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .15s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(99,102,241,.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {course.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}

            {/* STAY CONSISTENT BANNER CARD */}
            <div
              style={{
                background: isDark
                  ? 'linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.12))'
                  : 'linear-gradient(135deg,#f8fafc,#eef2ff)',
                border: '1.5px solid rgba(99,102,241,.25)',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 6px 16px rgba(99,102,241,.3)',
                    flexShrink: 0,
                  }}
                >
                  <Trophy size={20} color="#fff" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: '0 0 2px',
                    }}
                  >
                    Stay Consistent, Achieve More!
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0 }}>
                    Set a daily learning goal and track your streak.
                  </p>
                </div>
              </div>

              <button
                onClick={() => toast.success('Daily learning goal set for 30 mins!')}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(99,102,241,.3)',
                }}
              >
                Set Daily Goal
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR COLUMN (YOUR LEARNING PROGRESS & RECOMMENDED) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* WIDGET 1: YOUR LEARNING PROGRESS */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '22px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px' }}>
                Your Learning Progress
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* SVG Doughnut Chart */}
                <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
                  <svg width="100" height="100" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0'}
                      strokeWidth="3.8"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3.8"
                      strokeDasharray="62, 100"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                      62%
                    </span>
                    <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                      Overall Progress
                    </span>
                  </div>
                </div>

                {/* Legend List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.74rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1' }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>4</span>
                    <span style={{ color: 'var(--text-muted)' }}>Total Courses</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3b82f6' }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>2</span>
                    <span style={{ color: 'var(--text-muted)' }}>In Progress</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>1</span>
                    <span style={{ color: 'var(--text-muted)' }}>Completed</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#94a3b8' }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>1</span>
                    <span style={{ color: 'var(--text-muted)' }}>Not Started</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WIDGET 2: TOTAL LEARNING TIME */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(99,102,241,.18)' : '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6366f1',
                  flexShrink: 0,
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>
                  Total Learning Time
                </span>
                <strong style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
                  18h 47m
                </strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  Time Spent Learning
                </span>
              </div>
            </div>

            {/* WIDGET 3: RECOMMENDED FOR YOU */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '20px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Recommended for You
                </h3>
                <Link
                  to="/courses"
                  style={{ color: '#6366f1', fontSize: '0.76rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  View All
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {RECOMMENDED_SIDEBAR.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <img
                      src={course.cover}
                      alt={course.title}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: '0 0 2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {course.title}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.68rem', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{course.rating}</span>
                        <div style={{ display: 'flex', gap: '1px' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={10} fill="#fbbf24" color="#fbbf24" />
                          ))}
                        </div>
                        <span style={{ color: 'var(--text-muted)' }}>({course.reviews})</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                          ₹{course.price.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#10b981' }}>
                          {course.discountPct}% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
