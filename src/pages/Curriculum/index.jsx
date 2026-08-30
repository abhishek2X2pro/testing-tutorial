// ============================================================
// Curriculum Page — Clean Classroom Layout (Uses Main App Sidebar)
// ============================================================

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  Award,
  ChevronDown,
  FileText,
  Download,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { courses } from '../../data/courses';
import { toast } from 'react-hot-toast';

const MOCK_SECTIONS = [
  {
    id: 'sec6',
    title: 'Section 6: Data Preprocessing',
    completedBadge: '4/4',
    isCompleted: true,
    isExpanded: false,
    lessons: [
      { id: 'l_sec6_1', title: '1. Feature Scaling & Normalization', duration: '12:10', isCompleted: true },
      { id: 'l_sec6_2', title: '2. One-Hot Encoding', duration: '09:45', isCompleted: true },
      { id: 'l_sec6_3', title: '3. Train-Test Split Techniques', duration: '15:20', isCompleted: true },
      { id: 'l_sec6_4', title: '4. Imputing Missing Values', duration: '11:30', isCompleted: true },
    ],
  },
  {
    id: 'sec7',
    title: 'Section 7: Machine Learning with Python',
    completedBadge: '3/12',
    isCompleted: false,
    isExpanded: true,
    lessons: [
      { id: 'l1', title: '3. Linear Regression in Python', duration: '8:15', isCompleted: true, youtubeId: 'Nftif8BrGMo' },
      { id: 'l2', title: '4. Multiple Linear Regression', duration: '10:24', isCompleted: false, youtubeId: 'rfscVS0vtbw' },
      { id: 'l3', title: '5. Polynomial Regression', duration: '7:48', isCompleted: false, youtubeId: 'YYXdXT2l-Gg' },
      { id: 'l4', title: '6. Logistic Regression', duration: '9:12', isCompleted: false, youtubeId: 'kqtD5dpn9C8' },
      { id: 'l5', title: '7. Decision Trees', duration: '11:05', isLocked: true, youtubeId: 'W8KRzm-HUcc' },
      { id: 'l6', title: '8. Random Forest', duration: '10:18', isLocked: true, youtubeId: 'PqFKRqpHrjw' },
      { id: 'l7', title: '9. Support Vector Machine', duration: '12:36', isLocked: true, youtubeId: 'u-OmVr_fT4s' },
      { id: 'l8', title: '10. K-Means Clustering', duration: '8:50', isLocked: true, youtubeId: 'QUT1VHiLg5w' },
      { id: 'l9', title: '11. Model Evaluation', duration: '7:30', isLocked: true, youtubeId: 'vmEHCJofslg' },
      { id: 'l10', title: '12. Hands-on Project', duration: '15:40', isLocked: true, youtubeId: 'EaGbS7eacCW' },
    ],
  },
  {
    id: 'sec8',
    title: 'Section 8: Deep Learning Basics',
    completedBadge: '0/8',
    isCompleted: false,
    isExpanded: false,
    lessons: [
      { id: 'l_sec8_1', title: '1. Neural Network Architecture', duration: '14:20', isLocked: true },
      { id: 'l_sec8_2', title: '2. Activation Functions', duration: '18:50', isLocked: true },
    ],
  },
  {
    id: 'sec9',
    title: 'Section 9: Projects',
    completedBadge: '0/3',
    isCompleted: false,
    isExpanded: false,
    lessons: [
      { id: 'l_sec9_1', title: '1. Capstone Project Setup', duration: '20:10', isLocked: true },
    ],
  },
];

const RESOURCES = [
  { name: 'Lecture Slides (PDF)', size: '1.2 MB', ext: 'pdf' },
  { name: 'Code Notebook (.ipynb)', size: '245 KB', ext: 'ipynb' },
  { name: 'Dataset (CSV)', size: '89 KB', ext: 'csv' },
];

export default function Curriculum() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const course = courses.find((c) => c.slug === slug) || courses[0];

  const [sections, setSections] = useState(MOCK_SECTIONS);
  const [activeLesson, setActiveLesson] = useState(MOCK_SECTIONS[1].lessons[0]); // Lecture 3 active
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(true);

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';

  const toggleSectionExpand = (secId) => {
    setSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, isExpanded: !s.isExpanded } : s))
    );
  };

  const handleToggleComplete = () => {
    setIsLessonCompleted((prev) => !prev);
    toast.success(isLessonCompleted ? 'Marked as uncompleted' : 'Marked as completed!');
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '24px 28px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* BREADCRUMB */}
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          &nbsp;&gt;&nbsp;
          <Link to="/my-learning" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>My Courses</Link>
          &nbsp;&gt;&nbsp; Complete Python for AI &amp; Data Science &nbsp;&gt;&nbsp; Section 7 &nbsp;&gt;&nbsp;{' '}
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Machine Learning with Python</span>
        </div>

        {/* SECTION TITLE & HEADER CONTROLS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 4px',
              }}
            >
              Section 7: Machine Learning with Python
            </h1>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Lecture 3 of 12 &nbsp;•&nbsp; 8 min 15 sec
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: `1.5px solid ${border}`,
                background: cardBg,
                color: '#6366f1',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={15} /> Previous
            </button>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Next <ChevronRight size={15} />
            </button>

            <button
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: `1.5px solid ${border}`,
                background: cardBg,
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT (VIDEO + PLAYLIST SIDEBAR) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(310px, 340px)',
            gap: '24px',
            alignItems: 'start',
          }}
        >

          {/* LEFT: VIDEO PLAYER & DETAILS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* VIDEO PLAYER */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#060a17',
                border: `1px solid ${border}`,
                boxShadow: '0 12px 36px rgba(0,0,0,.35)',
              }}
            >
              {/* Fake Video Canvas Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #060a17 100%)',
                  color: '#fff',
                }}
              >
                <div style={{ fontSize: '0.82rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                  Machine Learning with Python
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
                  Linear Regression in Python
                </h2>
              </div>

              {/* Bottom Video Control Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px 18px',
                  background: 'linear-gradient(to top, rgba(0,0,0,.9), transparent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  color: '#fff',
                  fontSize: '0.78rem',
                }}
              >
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer' }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#fff" />}
                </button>

                <Volume2 size={16} />

                <span>02:15 / 08:15</span>

                {/* Progress Scrubbing Bar */}
                <div style={{ flex: 1, height: '4px', borderRadius: '999px', background: 'rgba(255,255,255,.3)', position: 'relative' }}>
                  <div style={{ width: '32%', height: '100%', borderRadius: '999px', background: '#8b5cf6' }} />
                  <div
                    style={{
                      position: 'absolute',
                      left: '32%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#fff',
                    }}
                  />
                </div>

                <span style={{ fontWeight: 700 }}>1.25x</span>
                <span style={{ fontWeight: 800, fontSize: '0.7rem', border: '1px solid #fff', padding: '1px 4px', borderRadius: '3px' }}>CC</span>
                <Maximize2 size={15} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* OVERVIEW TABS & MARK AS COMPLETE BUTTON */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '20px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {['overview', 'notes', 'qna'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      style={{
                        paddingBottom: '8px',
                        border: 'none',
                        borderBottom: activeTab === t ? '2.5px solid #6366f1' : '2.5px solid transparent',
                        background: 'transparent',
                        color: activeTab === t ? '#6366f1' : 'var(--text-muted)',
                        fontWeight: activeTab === t ? 800 : 600,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t === 'qna' ? 'Q&A' : t}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleToggleComplete}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1.5px solid #6366f1',
                    background: 'transparent',
                    color: '#6366f1',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <CheckCircle2 size={16} color="#6366f1" /> Mark as Complete
                </button>
              </div>

              {/* OVERVIEW CONTENT + SPEC BOX */}
              <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.6, margin: '0 0 16px' }}>
                    In this lecture, we will understand Linear Regression and how it works in Python using Scikit-learn.
                    We will build a simple model and evaluate its performance.
                  </p>

                  <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px' }}>
                    What you'll learn in this lecture:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} color="#6366f1" /> What is Linear Regression
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} color="#6366f1" /> Implement Linear Regression in Python
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} color="#6366f1" /> Model Evaluation using Metrics
                    </li>
                  </ul>
                </div>

                {/* Right Spec Box */}
                <div
                  style={{
                    width: '200px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                    border: `1px solid ${border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    fontSize: '0.76rem',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={16} color="#6366f1" />
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Duration</span>
                      <strong style={{ color: 'var(--text-primary)' }}>8 min 15 sec</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Play size={16} color="#6366f1" />
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Watched</span>
                      <strong style={{ color: 'var(--text-primary)' }}>60%</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={16} color="#6366f1" />
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Last watched</span>
                      <strong style={{ color: 'var(--text-primary)' }}>May 26, 2024</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM CARDS: MY NOTES & TOP DISCUSSION */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                
                {/* My Notes */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isDark ? 'rgba(255,255,255,.02)' : '#fefce8',
                    border: '1px solid #fef08a',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#854d0e' }}>My Notes</strong>
                    <button style={{ border: 'none', background: 'transparent', color: '#6366f1', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}>
                      ✏️ Add Note
                    </button>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#713f12', margin: '0 0 8px', lineHeight: 1.4 }}>
                    Linear regression is used to predict a continuous value based on one or more predictor variables.
                  </p>
                  <span style={{ fontSize: '0.68rem', color: '#a16207' }}>May 26, 2024, 10:45 AM</span>
                </div>

                {/* Top Discussion */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                    border: `1px solid ${border}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>Top Discussion</strong>
                    <button style={{ border: 'none', background: 'transparent', color: '#6366f1', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}>
                      View All
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#475569', color: '#fff', fontSize: '0.68rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      RK
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '2px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Rohit Kumar</strong>
                        <span style={{ color: 'var(--text-muted)' }}>May 25, 2024</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 6px', lineHeight: 1.3 }}>
                        Can you explain how to handle outliers in linear regression?
                      </p>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <span>👍 12</span>
                        <span>💬 3</span>
                        <span style={{ color: '#6366f1', fontWeight: 700, cursor: 'pointer' }}>Reply</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* FLOATING "UP NEXT" BANNER */}
            <div
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                background: cardBg,
                border: `1px solid ${border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={16} color="#6366f1" fill="#6366f1" />
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#6366f1', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                    Up Next
                  </span>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                    Lecture 4: Multiple Linear Regression &nbsp;•&nbsp; <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>10 min 24 sec</span>
                  </strong>
                </div>
              </div>

              <button
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Continue Learning →
              </button>
            </div>

          </div>

          {/* RIGHT: COURSE CONTENT & RESOURCES SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* CARD 1: COURSE CONTENT */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: `1px solid ${border}`,
                  background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Course Content
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  12 Lectures
                </span>
              </div>

              {/* Sections list */}
              <div>
                {sections.map((sec) => (
                  <div key={sec.id} style={{ borderBottom: `1px solid ${border}` }}>
                    <button
                      onClick={() => toggleSectionExpand(sec.id)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        {sec.isExpanded ? <ChevronDown size={14} color="var(--text-muted)" /> : <ChevronRight size={14} color="var(--text-muted)" />}
                        <strong style={{ fontSize: '0.78rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sec.title}
                        </strong>
                      </div>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: sec.isCompleted ? '#10b981' : '#6366f1',
                          background: sec.isCompleted ? 'rgba(16,185,129,.12)' : 'rgba(99,102,241,.1)',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          flexShrink: 0,
                        }}
                      >
                        {sec.completedBadge}
                      </span>
                    </button>

                    {/* Lessons list */}
                    {sec.isExpanded && (
                      <div style={{ background: isDark ? 'rgba(0,0,0,.2)' : 'rgba(99,102,241,.02)' }}>
                        {sec.lessons.map((lesson) => {
                          const isActive = activeLesson.id === lesson.id;
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => !lesson.isLocked && setActiveLesson(lesson)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                padding: '10px 16px 10px 32px',
                                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.03)' : 'rgba(99,102,241,.05)'}`,
                                background: isActive ? (isDark ? 'rgba(99,102,241,.25)' : '#eef2ff') : 'transparent',
                                cursor: lesson.isLocked ? 'not-allowed' : 'pointer',
                                opacity: lesson.isLocked ? 0.6 : 1,
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                                {lesson.isCompleted ? (
                                  <CheckCircle2 size={14} color="#10b981" />
                                ) : lesson.isLocked ? (
                                  <Lock size={13} color="var(--text-muted)" />
                                ) : (
                                  <Circle size={14} color={isActive ? '#6366f1' : 'var(--text-muted)'} />
                                )}
                                <span
                                  style={{
                                    fontSize: '0.76rem',
                                    fontWeight: isActive ? 800 : 600,
                                    color: isActive ? '#6366f1' : 'var(--text-primary)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {lesson.title}
                                </span>
                              </div>

                              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                                {lesson.duration}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 2: RESOURCES */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 14px' }}>
                Resources
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {RESOURCES.map((r) => (
                  <div
                    key={r.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                      border: `1px solid ${border}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={15} color="#6366f1" />
                      <div>
                        <strong style={{ fontSize: '0.76rem', color: 'var(--text-primary)', display: 'block' }}>
                          {r.name}
                        </strong>
                        <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>{r.size}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toast.success(`Downloading ${r.name}...`)}
                      style={{ border: 'none', background: 'transparent', color: '#6366f1', cursor: 'pointer' }}
                    >
                      <Download size={15} />
                    </button>
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
