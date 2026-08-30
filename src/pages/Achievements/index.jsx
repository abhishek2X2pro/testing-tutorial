// ============================================================
// Achievements Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Share2, Trophy, Award, Flame, Target,
  LayoutDashboard, BookOpen, Video, Heart, Download, FileText,
  Settings, HelpCircle, LogOut, Lock, Star, Zap, Users, CheckCircle2,
  TrendingUp, MessageCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function Achievements() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');

  // Achievements Data List matching Reference Image
  const achievementsList = [
    {
      id: 1,
      title: 'First Course Completed',
      subtitle: 'Complete your first course',
      points: 100,
      status: 'completed',
      date: 'May 24, 2024',
      icon: '🎓',
      iconBg: '#fef3c7',
      iconColor: '#b45309',
    },
    {
      id: 2,
      title: 'Consistent Learner',
      subtitle: 'Maintain a 7-day learning streak',
      points: 150,
      status: 'completed',
      date: 'May 20, 2024',
      icon: '🚀',
      iconBg: '#f3e8ff',
      iconColor: '#7e22ce',
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      subtitle: 'Complete 5 courses',
      points: 200,
      status: 'in_progress',
      progress: '3/5',
      progressPercent: 60,
      icon: '📘',
      iconBg: '#e0f2fe',
      iconColor: '#0369a1',
    },
    {
      id: 4,
      title: 'Certificate Collector',
      subtitle: 'Earn 5 certificates',
      points: 250,
      status: 'in_progress',
      progress: '3/5',
      progressPercent: 60,
      icon: '🏅',
      iconBg: '#dcfce7',
      iconColor: '#15803d',
    },
    {
      id: 5,
      title: 'AI Expert',
      subtitle: 'Complete 10 courses',
      points: 500,
      status: 'locked',
      progress: '3/10',
      progressPercent: 30,
      icon: '🔒',
      iconBg: '#f1f5f9',
      iconColor: '#64748b',
    },
    {
      id: 6,
      title: 'Master Learner',
      subtitle: 'Earn 10 certificates',
      points: 600,
      status: 'locked',
      progress: '2/10',
      progressPercent: 20,
      icon: '💎',
      iconBg: '#f1f5f9',
      iconColor: '#64748b',
    },
  ];

  // Recent Badges
  const recentBadges = [
    { id: 1, title: 'First Course Completed', date: 'May 24, 2024', points: '+100', icon: '🎓', bg: '#fef3c7' },
    { id: 2, title: 'Consistent Learner', date: 'May 20, 2024', points: '+150', icon: '🚀', bg: '#f3e8ff' },
    { id: 3, title: 'Quick Learner', date: 'May 18, 2024', points: '+80', icon: '⚡', bg: '#e0f2fe' },
    { id: 4, title: 'Active Participant', date: 'May 15, 2024', points: '+70', icon: '👥', bg: '#ffedd5' },
    { id: 5, title: 'Note Taker', date: 'May 10, 2024', points: '+50', icon: '📝', bg: '#dbeafe' },
  ];

  // Sidebar Menu Items
  const sidebarMenuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
    { label: 'Live Classes', icon: Video, path: '/courses' },
    { label: 'Certificates', icon: Award, path: '/certificates' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Downloads', icon: Download, path: '/downloads' },
    { label: 'Notes', icon: FileText, path: '/notes' },
    { label: 'Achievements', icon: Trophy, path: '/achievements', active: true },
    { label: 'Settings', icon: Settings, path: '/profile' },
    { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
  ];

  // Filter achievements
  const filteredAchievements = achievementsList.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const handleShareAchievements = () => {
    toast.success('Achievements link copied to clipboard!');
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Achievements</span>
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

            {/* Bottom Sidebar Promo Banner ("Celebrate Your Learning Journey!") */}
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
                <Trophy size={22} color="#4f46e5" />
              </div>

              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>
                  Celebrate Your Learning Journey!
                </h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
                  Keep learning and unlock more achievements.
                </p>
              </div>

              <button
                onClick={() => toast.success('Viewing achievements overview...')}
                style={{
                  width: '100%', padding: '9px 14px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                  fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)', transition: 'all 0.15s',
                }}
              >
                View All Achievements
              </button>
            </div>
          </div>

          {/* ── COLUMN 2: CENTER MY ACHIEVEMENTS & STATS BAR ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header Title */}
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                My Achievements
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                Track your progress and celebrate your learning milestones.
              </p>
            </div>

            {/* 4 STAT SUMMARY BADGES BOX + SHARE BUTTON */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '16px', flexWrap: 'wrap',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', flex: 1 }}>

                {/* Stat 1: Total Achievements */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: '#f3e8ff', color: '#7e22ce',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Trophy size={18} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                      15
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                      Total Achievements
                    </div>
                  </div>
                </div>

                {/* Stat 2: Total Points */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: '#dcfce7', color: '#15803d',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Star size={18} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                      880
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                      Total Points
                    </div>
                  </div>
                </div>

                {/* Stat 3: Day Streak */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: '#e0f2fe', color: '#0369a1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Flame size={18} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                      12
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                      Day Streak
                    </div>
                  </div>
                </div>

                {/* Stat 4: In Progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: '#ffedd5', color: '#ea580c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Target size={18} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                      3
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                      In Progress
                    </div>
                  </div>
                </div>

              </div>

              {/* Share Button */}
              <button
                onClick={handleShareAchievements}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#4f46e5'}`,
                  color: isDark ? '#ffffff' : '#4f46e5', fontSize: '0.78rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                }}
              >
                <Share2 size={14} /> Share Achievements
              </button>
            </div>

            {/* Tabs Row */}
            <div style={{
              display: 'flex', gap: '16px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              paddingBottom: '10px',
            }}>
              {[
                { id: 'all', label: 'All Achievements (15)' },
                { id: 'completed', label: 'Completed (10)' },
                { id: 'in_progress', label: 'In Progress (3)' },
                { id: 'locked', label: 'Locked (5)' },
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

            {/* Achievements List Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '12px 20px',
              display: 'flex', flexDirection: 'column', gap: '12px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              {filteredAchievements.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 0', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`,
                    gap: '16px',
                  }}
                >
                  {/* Left: Icon + Title + Points */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: item.iconBg, color: item.iconColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700, margin: 0 }}>
                        {item.title}
                      </h4>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                        {item.subtitle}
                      </span>
                      <span style={{ color: '#16a34a', fontSize: '0.72rem', fontWeight: 700, marginTop: '2px' }}>
                        +{item.points} Points
                      </span>
                    </div>
                  </div>

                  {/* Right: Status / Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {item.status === 'completed' && (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '999px',
                          fontSize: '0.7rem', fontWeight: 700,
                          background: '#dcfce7', color: '#15803d', display: 'inline-block',
                        }}>
                          Completed
                        </span>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.date}
                        </span>
                      </div>
                    )}

                    {item.status === 'in_progress' && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', width: '120px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: '999px',
                            fontSize: '0.66rem', fontWeight: 700,
                            background: '#ffedd5', color: '#c2410c',
                          }}>
                            In Progress
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {item.progress}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div style={{ width: '100%', height: '5px', borderRadius: '999px', background: '#e2e8f0', overflow: 'hidden' }}>
                          <div style={{ width: `${item.progressPercent}%`, height: '100%', background: '#4f46e5', borderRadius: '999px' }} />
                        </div>
                      </div>
                    )}

                    {item.status === 'locked' && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', width: '120px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: '999px',
                            fontSize: '0.66rem', fontWeight: 700,
                            background: '#f1f5f9', color: '#64748b',
                          }}>
                            Locked
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {item.progress}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div style={{ width: '100%', height: '5px', borderRadius: '999px', background: '#e2e8f0', overflow: 'hidden' }}>
                          <div style={{ width: `${item.progressPercent}%`, height: '100%', background: '#94a3b8', borderRadius: '999px' }} />
                        </div>
                      </div>
                    )}

                    {item.status === 'locked' ? (
                      <Lock size={16} color="#94a3b8" />
                    ) : (
                      <ChevronRight size={16} color="#94a3b8" />
                    )}
                  </div>
                </div>
              ))}

              {/* Bottom Action */}
              <div style={{ textAlign: 'center', padding: '10px 0 6px' }}>
                <button
                  onClick={() => toast.success('Showing all 15 achievements...')}
                  style={{
                    padding: '8px 20px', borderRadius: '8px',
                    background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                    color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  View All Achievements
                </button>
              </div>
            </div>

          </div>

          {/* ── COLUMN 3: RIGHT PROGRESS, RECENT BADGES & KEEP GOING WIDGETS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* WIDGET 1: Your Progress Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                Your Progress
              </h3>

              {/* Donut Progress Graphic */}
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
                      strokeDasharray="60, 100"
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                    <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                      60%
                    </strong>
                    <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Overall Progress
                    </span>
                  </div>
                </div>

                {/* Progress Legend List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, fontSize: '0.76rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                      Completed
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>10</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c' }} />
                      In Progress
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>3</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
                      Locked
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>5</strong>
                  </div>
                </div>
              </div>

              {/* Total Points Earned Box */}
              <div style={{
                background: isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.25)' : '#ddd6fe'}`,
                borderRadius: '10px', padding: '12px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={18} color="#4f46e5" fill="#4f46e5" />
                  <div>
                    <strong style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.9rem', display: 'block', fontWeight: 800, lineHeight: 1 }}>
                      880
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: isDark ? '#cbd5e1' : '#5b21b6' }}>
                      Total Points Earned
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WIDGET 2: Recent Badges Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Recent Badges
                </h3>
                <span
                  onClick={() => toast.success('Viewing all badges...')}
                  style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All
                </span>
              </div>

              {/* Recent Badges List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recentBadges.map((badge) => (
                  <div key={badge.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: badge.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', flexShrink: 0,
                      }}>
                        {badge.icon}
                      </div>

                      <div style={{ overflow: 'hidden' }}>
                        <h5 style={{
                          color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 700, margin: 0,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {badge.title}
                        </h5>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {badge.date}
                        </span>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 800, flexShrink: 0 }}>
                      {badge.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 3: Keep Going Card */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg, #1e1b4b, #2e1065)' : '#f5f3ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '16px', padding: '16px 18px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <TrendingUp size={20} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: isDark ? '#ffffff' : '#4338ca', fontSize: '0.82rem', display: 'block', fontWeight: 700, marginBottom: '2px' }}>
                  Keep Going! 🎉
                </strong>
                <span style={{ fontSize: '0.74rem', color: isDark ? '#cbd5e1' : '#5b21b6', lineHeight: 1.4 }}>
                  You're doing great! Keep learning to unlock more achievements and rewards.
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
