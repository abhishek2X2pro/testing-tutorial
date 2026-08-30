// ============================================================
// Live Classes Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Calendar as CalendarIcon, Clock, Users, Video,
  LayoutDashboard, BookOpen, Award, Heart, Download, FileText,
  Trophy, Settings, HelpCircle, LogOut, MessageCircle, ChevronLeft,
  Play, Eye, Plus, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function LiveClasses() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  // Live Classes Data
  const upcomingClasses = [
    {
      id: 1,
      title: 'Introduction to Deep Learning',
      instructor: 'Neha Sharma',
      description: 'Understand the fundamentals of Deep Learning and its real-world applications.',
      date: 'Tue, May 28, 2024',
      time: '7:00 PM - 8:30 PM',
      duration: '90 mins',
      registeredCount: 256,
      startsIn: 'Starts in 2 Days',
      graphicTitle: 'DEEP LEARNING',
      graphicIcon: '🌌',
      bgGradient: 'linear-gradient(135deg, #090d16, #1e1b4b, #311b92)',
    },
    {
      id: 2,
      title: 'NLP with Transformers',
      instructor: 'Ronak Patel',
      description: 'Explore transformer architecture and build powerful NLP models.',
      date: 'Thu, May 30, 2024',
      time: '7:00 PM - 8:30 PM',
      duration: '90 mins',
      registeredCount: 198,
      startsIn: 'Starts in 4 Days',
      graphicTitle: 'NLP with Transformers',
      graphicIcon: '🧠',
      bgGradient: 'linear-gradient(135deg, #090d16, #0c4a6e, #0369a1)',
    },
    {
      id: 3,
      title: 'Data Visualization with Python',
      instructor: 'Ankit Jain',
      description: 'Learn data visualization techniques using Matplotlib, Seaborn and Plotly.',
      date: 'Sun, Jun 2, 2024',
      time: '6:00 PM - 7:30 PM',
      duration: '90 mins',
      registeredCount: 142,
      startsIn: 'Starts in 7 Days',
      graphicTitle: 'Data Vis with Python',
      graphicIcon: '📊',
      bgGradient: 'linear-gradient(135deg, #090d16, #1e293b, #4338ca)',
    },
  ];

  // Past Classes Data
  const pastClasses = [
    {
      id: 101,
      title: 'Python for Data Analysis',
      instructor: 'Neha Sharma',
      date: 'May 21, 2024',
      icon: '🐍',
      bgGradient: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
    },
    {
      id: 102,
      title: 'Machine Learning Basics',
      instructor: 'Ronak Patel',
      date: 'May 19, 2024',
      icon: '🤖',
      bgGradient: 'linear-gradient(135deg, #0f172a, #065f46)',
    },
    {
      id: 103,
      title: 'EDA with Pandas',
      instructor: 'Ankit Jain',
      date: 'May 16, 2024',
      icon: '📈',
      bgGradient: 'linear-gradient(135deg, #0f172a, #581c87)',
    },
  ];

  // Sidebar Menu Items
  const sidebarMenuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
    { label: 'Live Classes', icon: Video, path: '/live-classes', active: true },
    { label: 'Certificates', icon: Award, path: '/certificates' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Downloads', icon: Download, path: '/downloads' },
    { label: 'Notes', icon: FileText, path: '/notes' },
    { label: 'Achievements', icon: Trophy, path: '/achievements' },
    { label: 'Settings', icon: Settings, path: '/profile' },
    { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
  ];

  // Month Calendar Days (May 2024)
  const calendarDays = [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true, isLiveClass: true }, // May 28 Live Class
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true, isRegistered: true }, // May 30 Registered
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
  ];

  const handleJoinClass = (title) => {
    toast.success(`Joining live classroom for "${title}"...`);
    navigate('/curriculum');
  };

  const handleEnableReminders = () => {
    setRemindersEnabled(true);
    toast.success('Live class calendar reminders enabled!');
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Live Classes</span>
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

            {/* Bottom Sidebar Promo Banner ("Never Miss a Class!") */}
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
                <CalendarIcon size={22} color="#4f46e5" />
              </div>

              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>
                  Never Miss a Class!
                </h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
                  Enable reminders and get notified before every live session.
                </p>
              </div>

              <button
                onClick={handleEnableReminders}
                style={{
                  width: '100%', padding: '9px 14px', borderRadius: '8px',
                  background: remindersEnabled ? '#16a34a' : 'transparent',
                  border: `1px solid ${remindersEnabled ? '#16a34a' : '#4f46e5'}`,
                  color: remindersEnabled ? '#ffffff' : '#4f46e5',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {remindersEnabled ? '✓ Reminders Enabled' : 'Enable Reminders'}
              </button>
            </div>
          </div>

          {/* ── COLUMN 2: CENTER LIVE CLASSES & SCHEDULE ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header Title & Top Action */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                  Live Classes
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                  Join live interactive sessions, learn from experts and clarify your doubts in real-time.
                </p>
              </div>

              <button
                onClick={() => toast.success('Schedule a class request opened!')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '8px',
                  background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#4f46e5'}`,
                  color: isDark ? '#ffffff' : '#4f46e5', fontSize: '0.78rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <CalendarIcon size={14} /> Schedule a Class
              </button>
            </div>

            {/* Tabs Row */}
            <div style={{
              display: 'flex', gap: '20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              paddingBottom: '10px',
            }}>
              {[
                { id: 'upcoming', label: 'Upcoming Classes (3)' },
                { id: 'registered', label: 'Registered (1)' },
                { id: 'my_bookings', label: 'My Bookings (0)' },
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
                      fontSize: '0.84rem', fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* UPCOMING LIVE CLASS CARDS LIST (3 Detailed Cards) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingClasses.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: isDark ? '#0f172a' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
                    borderRadius: '16px', padding: '16px',
                    display: 'flex', gap: '18px', alignItems: 'stretch',
                    boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Left Graphic Banner Thumbnail */}
                  <div style={{
                    width: '150px', borderRadius: '12px', background: item.bgGradient,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '16px', textAlign: 'center', color: '#ffffff', flexShrink: 0,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                  }}>
                    <span style={{ fontSize: '2rem', marginBottom: '4px' }}>{item.graphicIcon}</span>
                    <strong style={{ fontSize: '0.78rem', fontWeight: 800, lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.graphicTitle}
                    </strong>
                  </div>

                  {/* Center Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px' }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontWeight: 500 }}>
                      with {item.instructor}
                    </span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: '2px 0 6px', lineHeight: 1.4 }}>
                      {item.description}
                    </p>

                    {/* Meta Badge Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={13} color="#98a2b3" /> {item.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="#98a2b3" /> {item.time}
                      </span>
                      <span style={{
                        padding: '2px 8px', borderRadius: '999px',
                        background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '0.68rem',
                      }}>
                        {item.duration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} color="#98a2b3" /> {item.registeredCount} Registered
                      </span>
                    </div>
                  </div>

                  {/* Right Actions & Starts In Badge */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between',
                    gap: '12px', flexShrink: 0, width: '130px',
                  }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '8px',
                      background: '#f5f3ff', color: '#4f46e5',
                      fontSize: '0.74rem', fontWeight: 700, width: '100%', textAlign: 'center',
                    }}>
                      {item.startsIn}
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                      <button
                        onClick={() => handleJoinClass(item.title)}
                        style={{
                          width: '100%', padding: '8px', borderRadius: '8px',
                          background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#ffffff',
                          fontSize: '0.76rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          boxShadow: '0 4px 12px rgba(79,70,229,0.25)',
                        }}
                      >
                        <Video size={13} /> Join Class
                      </button>
                      <button
                        onClick={() => toast.success(`Viewing details for ${item.title}`)}
                        style={{
                          width: '100%', padding: '7px', borderRadius: '8px',
                          background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                          color: 'var(--text-primary)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                        }}
                      >
                        <Eye size={12} /> View Details
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Banner: Interactive Live Sessions Guidelines */}
            <div style={{
              background: isDark ? 'linear-gradient(135deg, #1e1b4b, #2e1065)' : '#f5f3ff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`,
              borderRadius: '16px', padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '16px', flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.15)',
                }}>
                  <Video size={20} color="#4f46e5" />
                </div>
                <div>
                  <strong style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.86rem', display: 'block', fontWeight: 800 }}>
                    Interactive Live Sessions
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: isDark ? '#cbd5e1' : '#5b21b6' }}>
                    Ask questions, participate in polls, and get your doubts cleared in real-time.
                  </span>
                </div>
              </div>

              <button
                onClick={() => toast.success('Opening live class guidelines...')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  background: 'none', border: 'none', color: '#4f46e5',
                  fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer',
                }}
              >
                View Live Class Guidelines <ArrowRight size={14} />
              </button>
            </div>

          </div>

          {/* ── COLUMN 3: RIGHT CALENDAR & PAST CLASSES WIDGETS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* WIDGET 1: Interactive Month Calendar */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '18px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>
                  Calendar
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>May 2024</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '2px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ChevronLeft size={14} /></button>
                    <button style={{ padding: '2px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ChevronRight size={14} /></button>
                  </div>
                </div>
              </div>

              {/* Days Header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>

              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.74rem' }}>
                {calendarDays.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%',
                      color: !item.isCurrentMonth
                        ? '#cbd5e1'
                        : item.isLiveClass || item.isRegistered
                        ? '#ffffff'
                        : 'var(--text-primary)',
                      background: item.isLiveClass
                        ? '#4f46e5'
                        : item.isRegistered
                        ? '#16a34a'
                        : 'transparent',
                      fontWeight: (item.isLiveClass || item.isRegistered) ? 800 : 500,
                    }}
                  >
                    {item.day}
                  </div>
                ))}
              </div>

              {/* Calendar Legend */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}`, fontSize: '0.72rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }} />
                  Live Class
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                  Registered
                </span>
              </div>
            </div>

            {/* WIDGET 2: Past Classes Card */}
            <div style={{
              background: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}`,
              borderRadius: '16px', padding: '18px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>
                  Past Classes
                </h3>
                <span onClick={() => toast.success('Viewing all past classes')} style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}>
                  View All
                </span>
              </div>

              {/* List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pastClasses.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '8px',
                        background: item.bgGradient, color: '#ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', flexShrink: 0,
                      }}>
                        {item.icon}
                      </div>

                      <div style={{ overflow: 'hidden' }}>
                        <h5 style={{
                          color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 700, margin: 0,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {item.title}
                        </h5>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          with {item.instructor} • {item.date}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => { toast.success(`Playing recording for "${item.title}"`); navigate('/curriculum'); }}
                      style={{
                        padding: '4px 10px', borderRadius: '6px',
                        background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#d0d5dd'}`,
                        color: '#4f46e5', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                        whiteSpace: 'nowrap', flexShrink: 0,
                      }}
                    >
                      Watch Replay
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '6px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}` }}>
                <span
                  onClick={() => toast.success('Viewing all past class recordings')}
                  style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All Past Classes →
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
            onClick={() => toast.success('Need help with Live Classes? Chat assistant coming soon!')}
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
