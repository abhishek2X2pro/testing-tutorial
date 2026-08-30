// ============================================================
// Course Player / Video Lecture Page — DevOpsX Interactive LMS
// ============================================================

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  MessageSquare,
  FileText,
  Share2,
  Award,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Check,
  Video,
  Lock,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { courses } from '../../data/courses';
import { toast } from 'react-hot-toast';

const MOCK_SECTIONS = [
  {
    id: 's1',
    title: 'Section 1: Introduction & Environment Setup',
    duration: '45 mins',
    completedCount: 3,
    totalCount: 3,
    lessons: [
      { id: 'l1', title: '1. Welcome to the Course & Roadmap', duration: '08:20', youtubeId: 'Nftif8BrGMo', completed: true },
      { id: 'l2', title: '2. Installing Python & Anaconda Navigator', duration: '14:15', youtubeId: 'rfscVS0vtbw', completed: true },
      { id: 'l3', title: '3. VS Code Setup & Python Extensions', duration: '22:25', youtubeId: 'YYXdXT2l-Gg', completed: true },
    ],
  },
  {
    id: 's2',
    title: 'Section 2: Python Essentials & Data Structures',
    duration: '1h 20m',
    completedCount: 2,
    totalCount: 4,
    lessons: [
      { id: 'l4', title: '4. Variables, Data Types & Operations', duration: '16:40', youtubeId: 'kqtD5dpn9C8', completed: true },
      { id: 'l5', title: '5. Lists, Tuples, Dictionaries & Sets', duration: '24:10', youtubeId: 'W8KRzm-HUcc', completed: true },
      { id: 'l6', title: '6. Conditional Logic & Loops', duration: '20:15', youtubeId: 'PqFKRqpHrjw', completed: false },
      { id: 'l7', title: '7. Functions & Lambda Expressions', duration: '18:50', youtubeId: 'u-OmVr_fT4s', completed: false },
    ],
  },
  {
    id: 's3',
    title: 'Section 3: Data Analysis with NumPy & Pandas',
    duration: '2h 10m',
    completedCount: 0,
    totalCount: 5,
    lessons: [
      { id: 'l8', title: '8. NumPy Array Operations & Indexing', duration: '25:30', youtubeId: 'QUT1VHiLg5w', completed: false },
      { id: 'l9', title: '9. Pandas DataFrames & Data Cleaning', duration: '32:15', youtubeId: 'vmEHCJofslg', completed: false },
      { id: 'l10', title: '10. Handling Missing Data & Outliers', duration: '22:40', youtubeId: 'EaGbS7eacCW', completed: false },
      { id: 'l11', title: '11. GroupBy, Pivot Tables & Merging', duration: '28:10', youtubeId: 'txM29kyfQZu', completed: false },
      { id: 'l12', title: '12. Real-World Data Analysis Project', duration: '21:25', youtubeId: 'eMOA1pPVucU', completed: false },
    ],
  },
  {
    id: 's4',
    title: 'Section 4: Machine Learning Algorithms',
    duration: '3h 15m',
    completedCount: 0,
    totalCount: 6,
    lessons: [
      { id: 'l13', title: '13. Supervised vs Unsupervised Learning', duration: '18:00', youtubeId: 'Gv9_4yMHFhI', completed: false },
      { id: 'l14', title: '14. Linear & Logistic Regression', duration: '35:20', youtubeId: 'C7M-f7m3s2w', completed: false },
      { id: 'l15', title: '15. Decision Trees & Random Forests', duration: '40:10', youtubeId: 'J4Wdy0Wc_xQ', completed: false },
      { id: 'l16', title: '16. Support Vector Machines (SVM)', duration: '28:45', youtubeId: 'efR1C6BUdn8', completed: false },
      { id: 'l17', title: '17. K-Means Clustering & PCA', duration: '32:10', youtubeId: 'FgakZw6K1QQ', completed: false },
      { id: 'l18', title: '18. Model Evaluation & Cross-Validation', duration: '41:15', youtubeId: 'fSytzGwwBVw', completed: false },
    ],
  },
];

export default function CoursePlayer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Find course or fallback
  const course = courses.find((c) => c.slug === slug) || courses[0];

  const [sections, setSections] = useState(MOCK_SECTIONS);
  const [activeLesson, setActiveLesson] = useState(MOCK_SECTIONS[1].lessons[2]); // Lesson 6 active
  const [openSections, setOpenSections] = useState({ s1: true, s2: true, s3: true });
  const [activeTab, setActiveTab] = useState('overview');

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';

  // Stats calculation
  const allLessons = sections.flatMap((s) => s.lessons);
  const completedLessons = allLessons.filter((l) => l.completed).length;
  const progressPct = Math.round((completedLessons / allLessons.length) * 100);

  const toggleLessonComplete = (lessonId) => {
    setSections((prev) =>
      prev.map((sec) => {
        const nextLessons = sec.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: !l.completed } : l
        );
        const compCount = nextLessons.filter((l) => l.completed).length;
        return { ...sec, lessons: nextLessons, completedCount: compCount };
      })
    );
    toast.success('Progress updated!');
  };

  const toggleSectionOpen = (secId) => {
    setOpenSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  const handleNextLesson = () => {
    const idx = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (idx < allLessons.length - 1) {
      setActiveLesson(allLessons[idx + 1]);
    } else {
      toast.success('Congratulations! You reached the end of the course!');
    }
  };

  const handlePrevLesson = () => {
    const idx = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (idx > 0) {
      setActiveLesson(allLessons[idx - 1]);
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '16px 24px 64px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        {/* ── TOP HEADER / NAV BAR ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/my-learning')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: cardBg,
                border: `1px solid ${border}`,
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} /> Back to My Learning
            </button>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {course.title}
              </h1>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Playing: {activeLesson.title}
              </span>
            </div>
          </div>

          {/* Progress & Next/Prev Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#6366f1' }}>
                  {completedLessons} / {allLessons.length} Watched ({progressPct}%)
                </span>
                <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  Course Progress
                </span>
              </div>
              <div
                style={{
                  width: '60px',
                  height: '6px',
                  borderRadius: '999px',
                  background: isDark ? 'rgba(255,255,255,.1)' : '#e2e8f0',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressPct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                    borderRadius: '999px',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handlePrevLesson}
                style={{
                  padding: '7px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${border}`,
                  background: cardBg,
                  color: 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                onClick={handleNextLesson}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#6366f1',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Next Lesson <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT (LEFT: VIDEO PLAYER | RIGHT: LECTURES PLAYLIST) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 360px',
            gap: '20px',
            alignItems: 'start',
          }}
        >

          {/* LEFT COLUMN: VIDEO PLAYER & LECTURE DETAILS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* VIDEO PLAYER BOX */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#0a0f1d',
                boxShadow: '0 12px 36px rgba(0,0,0,.35)',
                border: `1px solid ${border}`,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&rel=0`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media; fullscreen"
                title={activeLesson.title}
              />
            </div>

            {/* ACTION & TITLE BAR BELOW VIDEO */}
            <div
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: '0 0 4px',
                    }}
                  >
                    {activeLesson.title}
                  </h2>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Duration: {activeLesson.duration} &nbsp;•&nbsp; Instructor: {course.instructor?.name || 'Shailendra Kumar'}
                  </span>
                </div>

                <button
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: activeLesson.completed ? 'rgba(16,185,129,.12)' : 'rgba(99,102,241,.1)',
                    border: `1.5px solid ${activeLesson.completed ? '#10b981' : '#6366f1'}`,
                    color: activeLesson.completed ? '#10b981' : '#6366f1',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {activeLesson.completed ? (
                    <>
                      <CheckCircle2 size={16} color="#10b981" /> Completed
                    </>
                  ) : (
                    <>
                      <Circle size={16} color="#6366f1" /> Mark as Complete
                    </>
                  )}
                </button>
              </div>

              {/* TABS HEADER BAR (Overview | Resources & Code | Q&A | Notes) */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  borderBottom: `1px solid ${border}`,
                  paddingBottom: '10px',
                }}
              >
                {[
                  { id: 'overview', label: 'Overview', icon: BookOpen },
                  { id: 'resources', label: 'Resources & Code', icon: Download },
                  { id: 'discussion', label: 'Q&A Discussion', icon: MessageSquare },
                  { id: 'notes', label: 'My Notes', icon: FileText },
                ].map(({ id, label, icon: TabIcon }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        border: 'none',
                        background: isActive
                          ? isDark
                            ? 'rgba(99,102,241,.2)'
                            : '#eef2ff'
                          : 'transparent',
                        color: isActive ? '#6366f1' : 'var(--text-muted)',
                        fontSize: '0.8rem',
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                      }}
                    >
                      <TabIcon size={14} /> {label}
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT DETAILS */}
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {activeTab === 'overview' && (
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '0 0 8px' }}>
                      About this Lesson
                    </h4>
                    <p style={{ margin: '0 0 14px' }}>
                      In this lecture, we dive into practical implementation, writing clean Python code step by step.
                      Make sure to follow along in VS Code or Jupyter Notebooks to solidify your understanding.
                    </p>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '0 0 8px' }}>
                      Key Learning Takeaways:
                    </h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <li>Understand core syntax and execution flow</li>
                      <li>Write reusable modular functions with clean comments</li>
                      <li>Handle edge cases and debug errors efficiently</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
                      Downloadable Attachments:
                    </h4>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: isDark ? 'rgba(255,255,255,.03)' : '#f8fafc',
                        border: `1px solid ${border}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={18} color="#6366f1" />
                        <div>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.82rem', display: 'block' }}>
                            Lecture_06_SourceCode.py
                          </strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>14 KB • Python File</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toast.success('Downloading Source Code...')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: '#6366f1',
                          color: '#fff',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '0 0 12px' }}>
                      Discussion &amp; Q&amp;A
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <input
                        type="text"
                        placeholder="Ask a question about this lecture..."
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: `1px solid ${border}`,
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.82rem',
                          outline: 'none',
                        }}
                      />
                      <button
                        onClick={() => toast.success('Question submitted to instructor!')}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '8px',
                          background: '#6366f1',
                          color: '#fff',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '0 0 8px' }}>
                      Personal Notes
                    </h4>
                    <textarea
                      placeholder="Type your notes here... They automatically save to your Notes page!"
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: `1px solid ${border}`,
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.82rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LECTURES PLAYLIST SIDEBAR */}
          <div
            style={{
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: isDark ? '0 4px 16px rgba(0,0,0,.3)' : '0 2px 10px rgba(99,102,241,.05)',
            }}
          >
            {/* Playlist Header */}
            <div
              style={{
                padding: '18px 20px',
                borderBottom: `1px solid ${border}`,
                background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Course Content
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {allLessons.length} Lectures
              </span>
            </div>

            {/* Accordion Sections List */}
            <div style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
              {sections.map((sec) => {
                const isOpen = openSections[sec.id];
                return (
                  <div key={sec.id} style={{ borderBottom: `1px solid ${border}` }}>
                    {/* Section Header Bar */}
                    <button
                      onClick={() => toggleSectionOpen(sec.id)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            display: 'block',
                            fontSize: '0.82rem',
                            color: 'var(--text-primary)',
                            fontWeight: 700,
                            lineHeight: 1.3,
                          }}
                        >
                          {sec.title}
                        </strong>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {sec.completedCount} / {sec.totalCount} Watched &nbsp;•&nbsp; {sec.duration}
                        </span>
                      </div>
                      {isOpen ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                    </button>

                    {/* Section Lessons List */}
                    {isOpen && (
                      <div style={{ display: 'flex', flexDirection: 'column', background: isDark ? 'rgba(0,0,0,.2)' : 'rgba(99,102,241,.02)' }}>
                        {sec.lessons.map((lesson) => {
                          const isPlaying = activeLesson.id === lesson.id;
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => setActiveLesson(lesson)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 18px',
                                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.03)' : 'rgba(99,102,241,.06)'}`,
                                background: isPlaying
                                  ? isDark
                                    ? 'rgba(99,102,241,.25)'
                                    : '#eef2ff'
                                  : 'transparent',
                                cursor: 'pointer',
                                transition: 'background .15s',
                              }}
                            >
                              {/* Checkbox toggle */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLessonComplete(lesson.id);
                                }}
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                              >
                                {lesson.completed ? (
                                  <CheckCircle2 size={16} color="#10b981" />
                                ) : (
                                  <Circle size={16} color="var(--text-muted)" />
                                )}
                              </button>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <span
                                  style={{
                                    display: 'block',
                                    fontSize: '0.78rem',
                                    fontWeight: isPlaying ? 800 : 600,
                                    color: isPlaying ? '#6366f1' : 'var(--text-primary)',
                                    lineHeight: 1.3,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {lesson.title}
                                </span>
                                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Video size={10} color="#6366f1" /> {lesson.duration}
                                </span>
                              </div>

                              {isPlaying && (
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    color: '#6366f1',
                                    background: 'rgba(99,102,241,.15)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    flexShrink: 0,
                                  }}
                                >
                                  Playing
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
