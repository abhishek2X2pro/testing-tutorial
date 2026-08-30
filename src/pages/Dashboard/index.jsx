// ============================================================
// Dashboard Page — 1:1 Pixel-Perfect Reference Match (Extended Recommended Full Width)
// ============================================================

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Play,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const MY_COURSES = [
  {
    id: 1,
    title: 'Deep Learning with TensorFlow 2.0',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop',
    progress: 43,
    status: 'in_progress',
    buttonText: 'Resume',
  },
  {
    id: 2,
    title: 'Artificial Intelligence for Beginners',
    cover: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&auto=format&fit=crop',
    progress: 100,
    status: 'completed',
    statusText: 'Completed',
    buttonText: 'Review',
  },
  {
    id: 3,
    title: 'Data Science & Analytics Bootcamp',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop',
    progress: 25,
    status: 'in_progress',
    buttonText: 'Resume',
  },
  {
    id: 4,
    title: 'Generative AI with ChatGPT',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop',
    progress: 0,
    status: 'not_started',
    statusText: 'Not Started',
    buttonText: 'Start',
  },
];

const UPCOMING_CLASSES = [
  {
    id: 1,
    month: 'MAY',
    day: '28',
    title: 'Introduction to Deep Learning',
    instructor: 'Neha Sharma',
    time: 'Tomorrow, 7:00 PM',
  },
  {
    id: 2,
    month: 'MAY',
    day: '30',
    title: 'NLP with Transformers',
    instructor: 'Ronak Patel',
    time: 'Thu, 7:00 PM',
  },
  {
    id: 3,
    month: 'JUN',
    day: '02',
    title: 'Data Visualization with Python',
    instructor: 'Ankit Jain',
    time: 'Sun, 6:00 PM',
  },
];

const ACHIEVEMENTS = [
  {
    id: 1,
    Icon: Shield,
    iconBg: 'rgba(99,102,241,.12)',
    iconColor: '#6366f1',
    title: 'Course Completed',
    desc: 'Completed Artificial Intelligence for Beginners',
    date: 'May 24, 2024',
    points: '+200 Points',
  },
  {
    id: 2,
    Icon: Star,
    iconBg: 'rgba(245,158,11,.12)',
    iconColor: '#f59e0b',
    title: 'Streak Milestone',
    desc: 'Maintained a 7-day learning streak',
    date: 'May 22, 2024',
    points: '+100 Points',
  },
  {
    id: 3,
    Icon: Award,
    iconBg: 'rgba(16,185,129,.12)',
    iconColor: '#10b981',
    title: 'Certificate Earned',
    desc: 'Earned "AI Basics" Certificate',
    date: 'May 20, 2024',
    points: '+150 Points',
  },
];

const RECOMMENDED_COURSES = [
  {
    id: 101,
    title: 'Machine Learning A-Z™: Hands-On',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: '8.2K',
    price: 1299,
    originalPrice: 2499,
    discountPct: 48,
  },
  {
    id: 102,
    title: 'Natural Language Processing in Python',
    cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: '5.6K',
    price: 999,
    originalPrice: 1999,
    discountPct: 50,
  },
  {
    id: 103,
    title: 'Statistics for Data Science',
    cover: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: '7.1K',
    price: 799,
    originalPrice: 1499,
    discountPct: 47,
  },
  {
    id: 104,
    title: 'Deep Reinforcement Learning',
    cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: '3.9K',
    price: 1199,
    originalPrice: 2399,
    discountPct: 50,
  },
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const recScrollRef = useRef(null);

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';

  const userName = user?.name || 'Shailendra';

  const scrollRecLeft = () => recScrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRecRight = () => recScrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '24px 28px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── HEADER GREETING & STREAK / POINTS BADGES ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 4px',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome back, {userName}! 👋
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
              Continue your learning journey and achieve your goals.
            </p>
          </div>

          {/* Top-Right Stats Cards */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Day Streak */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                borderRadius: '14px',
                background: cardBg,
                border: `1px solid ${border}`,
                boxShadow: isDark ? '0 2px 8px rgba(0,0,0,.2)' : '0 2px 8px rgba(0,0,0,.03)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(99,102,241,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flame size={20} color="#6366f1" />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  12
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Day Streak
                </div>
              </div>
            </div>

            {/* Total Points */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                borderRadius: '14px',
                background: cardBg,
                border: `1px solid ${border}`,
                boxShadow: isDark ? '0 2px 8px rgba(0,0,0,.2)' : '0 2px 8px rgba(0,0,0,.03)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(16,185,129,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Award size={20} color="#10b981" />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  1250
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Total Points
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN DASHBOARD GRID (LEFT: 65% | RIGHT: 35%) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)',
            gap: '24px',
            alignItems: 'start',
            marginBottom: '24px',
          }}
        >

          {/* LEFT MAIN COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* 1. CONTINUE LEARNING HERO CARD */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '18px',
                padding: '24px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Continue Learning
                </h2>
                <Link
                  to="/my-learning"
                  style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  View All
                </Link>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Hero Thumbnail with dark overlay percentage */}
                <div
                  style={{
                    position: 'relative',
                    width: '130px',
                    height: '130px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop"
                    alt="Python Course"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15,23,42,.4)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '8px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(0,0,0,.75)',
                        color: '#fff',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      65%
                    </span>
                  </div>
                </div>

                {/* Info & Progress */}
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: '0 0 4px',
                      lineHeight: 1.3,
                    }}
                  >
                    Complete Python for AI &amp; Data Science
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0 0 16px' }}>
                    Section 7: Machine Learning with Python
                  </p>

                  {/* Progress Bar Row */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '6px', fontWeight: 700 }}>
                      <span style={{ color: '#6366f1' }}>65% Complete</span>
                      <span style={{ color: 'var(--text-muted)' }}>8h 15m left</span>
                    </div>
                    <div
                      style={{
                        height: '6px',
                        width: '100%',
                        borderRadius: '999px',
                        background: isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '65%',
                          height: '100%',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/courses/complete-python-ai')}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      color: '#fff',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(99,102,241,.3)',
                      transition: 'all .15s',
                    }}
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>

            {/* 2. MY COURSES SECTION */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '18px',
                padding: '24px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  My Courses
                </h2>
                <Link
                  to="/my-learning"
                  style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  View All
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {MY_COURSES.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                      border: `1px solid ${border}`,
                    }}
                  >
                    <img
                      src={course.cover}
                      alt={course.title}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: '0 0 6px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {course.title}
                      </h4>

                      {/* Status / Progress bar */}
                      {course.status === 'completed' ? (
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#10b981' }}>
                          Completed
                        </span>
                      ) : course.status === 'not_started' ? (
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          Not Started
                        </span>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              height: '5px',
                              flex: 1,
                              maxWidth: '180px',
                              borderRadius: '999px',
                              background: isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: `${course.progress}%`,
                                height: '100%',
                                borderRadius: '999px',
                                background: '#6366f1',
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366f1' }}>
                            {course.progress}% Complete
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate('/courses/deep-learning-tensorflow')}
                      style={{
                        padding: '7px 18px',
                        borderRadius: '6px',
                        background: 'transparent',
                        border: '1.5px solid #6366f1',
                        color: '#6366f1',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all .15s',
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
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* WIDGET 1: UPCOMING LIVE CLASSES */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '18px',
                padding: '22px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Upcoming Live Classes
                </h3>
                <Link
                  to="/practice"
                  style={{ color: '#6366f1', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  View All
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {UPCOMING_CLASSES.map((cls) => (
                  <div
                    key={cls.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      {/* Date Badge Box */}
                      <div
                        style={{
                          width: '42px',
                          height: '46px',
                          borderRadius: '8px',
                          background: isDark ? 'rgba(99,102,241,.18)' : '#eef2ff',
                          border: '1px solid rgba(99,102,241,.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', lineHeight: 1 }}>
                          {cls.month}
                        </span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                          {cls.day}
                        </span>
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <h4
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            margin: '0 0 2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {cls.title}
                        </h4>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>
                          with {cls.instructor}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={10} color="#6366f1" /> {cls.time}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toast.success(`Joining live class: ${cls.title}`)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        background: 'transparent',
                        border: '1.5px solid #6366f1',
                        color: '#6366f1',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 2: RECENT ACHIEVEMENTS */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '18px',
                padding: '22px',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Recent Achievements
                </h3>
                <Link
                  to="/certificates"
                  style={{ color: '#6366f1', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  View All
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {ACHIEVEMENTS.map(({ id, Icon, iconBg, iconColor, title, desc, date, points }) => (
                  <div key={id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={iconColor} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>
                        {title}
                      </h4>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0 0 4px', lineHeight: 1.3 }}>
                        {desc}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{date}</span>
                        <span style={{ color: '#10b981', fontWeight: 700 }}>{points}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ── 3. RECOMMENDED FOR YOU (FULL-WIDTH 100% EXTENDED BOTTOM SECTION) ── */}
        <div
          style={{
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: '18px',
            padding: '24px',
            boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 2px 12px rgba(99,102,241,.05)',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Recommended for You
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to="/courses"
                style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
              >
                View All
              </Link>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={scrollRecLeft}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: `1px solid ${border}`,
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={scrollRecRight}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: `1px solid ${border}`,
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Full-width 4-card Grid */}
          <div
            ref={recScrollRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              width: '100%',
            }}
          >
            {RECOMMENDED_COURSES.map((course) => (
              <div
                key={course.id}
                style={{
                  background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                  border: `1px solid ${border}`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
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
                <img
                  src={course.cover}
                  alt={course.title}
                  style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: '0 0 8px',
                      lineHeight: 1.3,
                      height: '34px',
                      overflow: 'hidden',
                    }}
                  >
                    {course.title}
                  </h4>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', margin: '0 0 10px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{course.rating}</span>
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={11} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>({course.reviewsCount})</span>
                  </div>

                  {/* Price */}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{course.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,.12)', padding: '2px 6px', borderRadius: '4px' }}>
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
  );
}
