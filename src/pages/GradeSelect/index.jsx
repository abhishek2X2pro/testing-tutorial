// ============================================================
// GradeSelect — "View Learning Programs" (Original Grades + Image UI)
// Step 2 of onboarding.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, GraduationCap, Users, CheckCircle2, ArrowRight,
  ArrowLeft, Calendar, Award, Sparkles, Check, BookMarked,
  Video, FileText, ClipboardList, Brain, Terminal, Code2, Database, Cpu, Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import BrandLogo from '../../components/ui/BrandLogo';

const grades = [
  {
    id: 'grade-5-8',
    label: 'Class 5 – 8',
    sublabel: 'Middle School',
    desc: 'Foundation-level courses, guided learning, AI tools exploration',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop',
    accent: '#059669',
    badge: 'Class 5-8',
    details: [
      { icon: BookOpen, label: 'Classes', val: 'Class 5th to 8th' },
      { icon: Calendar, label: 'Duration', val: 'Flexible / Guided' },
      { icon: Users, label: 'Learners', val: '4-5 Learners per class' },
      { icon: Award, label: 'Curriculum', val: 'Aligned as per CBSE, ICSE, State Boards' },
    ],
    features: [
      'Ebooks & Study Material',
      'Video Courses',
      'Assignments & Quizzes',
      'AI Art Gallery',
      'Artscane Projects',
      'AI Agent Comparison',
      'AI Agent Projects',
      'AI Chatbots Practice',
      'AI Automation Basics',
      'Prompt Libraries',
      'Learning Support',
    ],
  },
  {
    id: 'grade-9-12',
    label: 'Class 9 – 12',
    sublabel: 'High School',
    desc: 'Syllabus-aligned courses, AI tools, advanced projects & exam prep',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop',
    accent: '#2563eb',
    badge: 'Class 9-12',
    details: [
      { icon: BookOpen, label: 'Classes', val: 'Class 9th to 12th' },
      { icon: Calendar, label: 'Duration', val: 'Term / Semester' },
      { icon: Users, label: 'Learners', val: '8-10 Learners per class' },
      { icon: Award, label: 'Curriculum', val: 'Aligned with Board & High School Syllabus' },
    ],
    features: [
      'Ebooks & Courses',
      'Assignments & Syllabus',
      'Video Courses',
      'AI Tool Access',
      'Learning Kit',
      'Prompt Libraries',
      'AI Chatbots',
      'AI Automation',
      'Peer Learning Tool',
      'Learning Support',
    ],
  },
  {
    id: 'college',
    label: 'College / Graduate',
    sublabel: 'Undergraduate & above',
    desc: 'Advanced AI, Machine Learning, Python, real-world projects & certifications',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop',
    accent: '#7c3aed',
    badge: 'College & Above',
    details: [
      { icon: BookOpen, label: 'Classes', val: 'Undergraduate & Graduate' },
      { icon: Calendar, label: 'Duration', val: 'Self-Paced / Guided' },
      { icon: Users, label: 'Learners', val: '10-15 Learners per batch' },
      { icon: Award, label: 'Curriculum', val: 'DevOps & AI Industry Standard' },
    ],
    features: [
      'Ebooks & Courses',
      'Video Lectures',
      'Masters Programs',
      'Learning Kit',
      'Advanced AI Projects',
      'Machine Learning',
      'ULMs & LLM Projects',
      'Python Language Models',
      'AI Automation',
      'Project Portfolio',
    ],
  },
];

const whatsYouLearnPoints = [
  'Enhance productivity with AI for everyday tasks',
  'Understand the fundamentals of AI & Cloud Infrastructure',
  'Master ChatGPT, Grok, Gemini, & Copilot tools',
  'Add advanced prompt engineering & automation techniques',
];

function featureIcon(label) {
  const map = {
    'Video': Video, 'Ebook': BookOpen, 'Book': BookOpen,
    'Assignment': ClipboardList, 'Syllabus': FileText,
    'AI': Brain, 'Python': Code2, 'Machine': Cpu,
    'Learning Kit': Layers, 'Prompt': Terminal,
    'Project': Database, 'Masters': GraduationCap,
    'ULM': Brain, 'Automation': Terminal,
  };
  for (const [key, Icon] of Object.entries(map)) {
    if (label.includes(key)) return Icon;
  }
  return BookOpen;
}

export default function GradeSelect() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState('grade-5-8');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    navigate('/dashboard');
  };

  const selectGradeItem = (id) => {
    setSelected(id);
    localStorage.setItem('devopsx_grade', id);
    window.dispatchEvent(new CustomEvent('gradechange', { detail: id }));
  };

  const selectedGrade = grades.find((g) => g.id === selected);

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: isDark
        ? 'linear-gradient(145deg, #060d1f 0%, #09152e 55%, #060d1f 100%)'
        : 'linear-gradient(145deg, #f8fafc 0%, #eff6ff 55%, #f8fafc 100%)',
      color: isDark ? '#f8fafc' : '#0f172a',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'flex-start', padding: '32px 20px 48px',
      fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden',
      transition: 'background 0.2s ease',
    }}>
      {/* Ambient background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: isDark ? 'linear-gradient(rgba(59,130,246,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.025) 1px, transparent 1px)' : 'linear-gradient(rgba(59,130,246,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.06) 1px, transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

      {/* Top Logo */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        style={{ marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        <BrandLogo size="lg" />
      </motion.div>

      {/* Progress Steps */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', position: 'relative', zIndex: 2 }}>
        {['Choose Track', 'Select Grade', 'Get Started'].map((step, i) => {
          const done = i < 1;
          const active = i === 1;
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', fontSize: '0.68rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? (isDark ? 'rgba(52,211,153,.2)' : '#d1fae5') : active ? 'linear-gradient(135deg,#2563eb,#0284c7)' : (isDark ? 'rgba(255,255,255,.07)' : '#f1f5f9'),
                  border: `1.5px solid ${done ? (isDark ? '#34d399' : '#059669') : active ? '#2563eb' : (isDark ? 'rgba(255,255,255,.12)' : '#cbd5e1')}`,
                  color: done ? (isDark ? '#34d399' : '#059669') : active ? '#fff' : (isDark ? 'rgba(148,163,184,.3)' : '#94a3b8'),
                }}>
                  {done ? <CheckCircle2 size={13} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: active ? 700 : 500, color: active ? (isDark ? '#fff' : '#0f172a') : done ? (isDark ? '#34d399' : '#059669') : (isDark ? 'rgba(148,163,184,.3)' : '#94a3b8') }}>
                  {step}
                </span>
              </div>
              {i < 2 && <div style={{ width: '32px', height: '1.5px', background: done ? (isDark ? '#34d399' : '#059669') : (isDark ? 'rgba(255,255,255,.1)' : '#cbd5e1'), borderRadius: '2px' }} />}
            </div>
          );
        })}
      </motion.div>

      {/* Main Headline (Image Header Style) */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
        style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 2 }}>
        <h1 style={{ color: isDark ? '#fff' : '#0f172a', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.1 }}>
          View Learning Programs
        </h1>
        <h3 style={{ color: isDark ? '#60a5fa' : '#2563eb', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px' }}>
          Pick a learning program & get started!
        </h3>
        <p style={{ color: isDark ? 'rgba(148,163,184,.7)' : '#64748b', fontSize: '0.9rem', margin: 0 }}>
          Choose from our Best Courses for your grade ⭐️
        </p>
      </motion.div>

      {/* Main Layout: Left Column + Right Cards Grid (Exact Image Layout) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 280px) 1fr',
        gap: '28px',
        width: '100%', maxWidth: '1080px',
        position: 'relative', zIndex: 2,
        marginBottom: '28px',
        alignItems: 'start',
      }}>

        {/* Left Column: What you'll learn */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            background: isDark ? 'rgba(13,22,52,0.85)' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0'}`,
            borderRadius: '20px',
            padding: '24px 20px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,.35)' : '0 6px 20px rgba(15,23,42,.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
            <Sparkles size={20} color="#2563eb" />
            <h2 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>
              What you'll learn
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {whatsYouLearnPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: isDark ? 'rgba(226,232,240,.85)' : '#334155', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 500 }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>

          {selectedGrade && (
            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0'}` }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: selectedGrade.accent, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                Selected Track:
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 900, color: isDark ? '#fff' : '#0f172a', margin: 0 }}>
                {selectedGrade.label}
              </p>
              <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(148,163,184,.6)' : '#64748b', margin: '2px 0 0' }}>
                {selectedGrade.sublabel}
              </p>
            </div>
          )}
        </motion.div>

        {/* Right Column: 3 Original Grade Cards with Image Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '18px',
        }}>
          {grades.map((grade, i) => {
            const isSelected = selected === grade.id;
            return (
              <motion.div
                key={grade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                onClick={() => selectGradeItem(grade.id)}
                style={{
                  position: 'relative',
                  background: isSelected
                    ? (isDark ? 'rgba(10,25,70,0.98)' : '#eef4ff')
                    : (isDark ? 'rgba(13,22,52,0.95)' : '#ffffff'),
                  border: isSelected
                    ? `3px solid ${grade.accent}`
                    : `2px solid ${isDark ? 'rgba(255,255,255,.18)' : '#b3c3ea'}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: isSelected
                    ? `0 0 0 4px ${grade.accent}30, 0 16px 40px rgba(0,0,0,.32)`
                    : (isDark ? '0 4px 16px rgba(0,0,0,.25)' : '0 2px 10px rgba(30,64,175,.1)'),
                  transition: 'all 0.22s ease',
                }}
                whileHover={{ y: -4 }}
              >
                {/* Checkmark Indicator when Selected */}
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: grade.accent, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}

                {/* Top Banner Image */}
                <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', background: isDark ? '#111827' : '#e2e8f0' }}>
                  <img
                    src={grade.image}
                    alt={grade.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800,
                    color: '#fff', background: grade.accent,
                  }}>
                    {grade.sublabel}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Sublabel */}
                  <h3 style={{
                    color: isSelected
                      ? (isDark ? '#ffffff' : '#0f172a')
                      : (isDark ? '#e2e8f0' : '#1e293b'),
                    fontSize: '1.05rem',
                    fontWeight: isSelected ? 900 : 700,
                    margin: '0 0 4px',
                    letterSpacing: isSelected ? '-0.01em' : 'normal',
                  }}>
                    {grade.label}
                  </h3>
                  <p style={{ color: isDark ? 'rgba(148,163,184,.7)' : '#64748b', fontSize: '0.78rem', margin: '0 0 14px', lineHeight: 1.4 }}>
                    {grade.desc}
                  </p>

                  {/* Icon Bullet List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', marginTop: 'auto' }}>
                    {grade.details.map((d, idx) => {
                      const DIcon = d.icon;
                      return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                          <DIcon size={13} color={grade.accent} style={{ flexShrink: 0 }} />
                          <span style={{ fontWeight: 600, color: isDark ? 'rgba(148,163,184,.7)' : '#64748b' }}>{d.label}:</span>
                          <span style={{ fontWeight: 700, color: isDark ? '#e2e8f0' : '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.val}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Action Button (Image Style) */}
                  <button
                    onClick={(e) => { e.stopPropagation(); selectGradeItem(grade.id); }}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '8px',
                      border: 'none',
                      background: isSelected
                        ? 'linear-gradient(135deg, #1d4ed8, #0284c7)'
                        : 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      color: '#fff', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(29,78,216,.35)' : '0 4px 12px rgba(37,99,235,.3)',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {isSelected ? '✓ Grade Selected' : 'Select Grade'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Feature Preview Panel for Selected Original Grade */}
      <AnimatePresence>
        {selectedGrade && (
          <motion.div
            key={selectedGrade.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            style={{
              width: '100%', maxWidth: '1080px', marginBottom: '32px',
              background: isDark
                ? `linear-gradient(135deg, ${selectedGrade.accent}0f, rgba(13,22,52,.9))`
                : '#ffffff',
              border: `1px solid ${isDark ? selectedGrade.accent + '30' : '#e2e8f0'}`,
              borderRadius: '18px', padding: '20px 24px',
              position: 'relative', zIndex: 2, overflow: 'hidden',
              boxShadow: isDark ? 'none' : '0 8px 24px rgba(15,23,42,.04)',
            }}
          >
            <p style={{ color: selectedGrade.accent, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 14px' }}>
              What you get with {selectedGrade.label} ({selectedGrade.sublabel})
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
              {selectedGrade.features.map((feature, i) => {
                const FIcon = featureIcon(feature);
                return (
                  <div
                    key={feature}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,.04)' : '#f8fafc', border: isDark ? '1px solid rgba(255,255,255,.06)' : '1px solid #e2e8f0' }}
                  >
                    <FIcon size={14} color={selectedGrade.accent} style={{ flexShrink: 0 }} />
                    <span style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '0.8rem', fontWeight: 600 }}>{feature}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons Stack */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/onboarding')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '12px 22px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,.06)' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid #cbd5e1', color: isDark ? 'rgba(148,163,184,.7)' : '#475569', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
          >
            <ArrowLeft size={15} /> Back
          </button>

          <motion.button
            onClick={handleContinue}
            disabled={!selected || loading}
            whileHover={selected && !loading ? { scale: 1.02 } : {}}
            whileTap={selected && !loading ? { scale: 0.98 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '12px 36px', borderRadius: '10px', border: 'none',
              background: 'linear-gradient(135deg, #2563eb, #0284c7)',
              color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(37,99,235,.35)',
              transition: 'all 0.22s ease',
            }}
          >
            {loading ? 'Setting up your dashboard…' : 'Enter DevOpsX Learning'}
            {!loading && <ArrowRight size={16} />}
          </motion.button>
        </div>

        <p style={{ color: isDark ? 'rgba(148,163,184,.35)' : '#94a3b8', fontSize: '0.73rem', textAlign: 'center' }}>
          Your grade can be updated anytime from your Profile settings
        </p>
      </motion.div>
    </div>
  );
}
