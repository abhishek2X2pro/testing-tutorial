// ============================================================
// LearningProgramsSection — Grade & Learning Programs (Image 1 UI Style)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Users, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const programs = [
  {
    id: 'grade-5-8',
    title: 'Class 5 to 8 (Middle School)',
    subTitle: 'After-School AI & Foundation',
    desc: 'Fuel your child\'s Academic growth! See their confidence and grades improve.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop',
    accent: '#059669',
    badge: 'Class 5-8',
    details: [
      { icon: BookOpen, label: 'Classes', val: '5th to 8th Grade' },
      { icon: Calendar, label: 'Duration', val: '6 Days / Flexible' },
      { icon: Users, label: 'Learners', val: '4-5 Learners per class' },
      { icon: Award, label: 'Curriculum', val: 'Aligned as per CBSE, ICSE, State Boards' },
    ],
    buttonText: 'Explore Class 5-8',
    link: '/grade-select',
  },
  {
    id: 'grade-9-12',
    title: 'Class 9 to 12 (High School)',
    subTitle: 'CS, STEM & Board Prep',
    desc: 'Help students master Coding & English skills. Get ready for top certifications!',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop',
    accent: '#2563eb',
    badge: 'Class 9-12',
    details: [
      { icon: BookOpen, label: 'Classes', val: '9th to 12th Grade' },
      { icon: Calendar, label: 'Duration', val: '1 Month / Term' },
      { icon: Users, label: 'Learners', val: '8-10 Learners per class' },
      { icon: Award, label: 'Curriculum', val: 'Aligned with Board & Tech Standard' },
    ],
    buttonText: 'Explore Class 9-12',
    link: '/grade-select',
  },
  {
    id: 'college',
    title: 'College & Professional',
    subTitle: 'DevOps & AI Masterclass',
    desc: 'Unlock your Tech super powers! Solve complex DevOps & AI calculations in seconds.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop',
    accent: '#7c3aed',
    badge: 'College & Above',
    details: [
      { icon: BookOpen, label: 'Classes', val: 'Undergraduate & Working Pros' },
      { icon: Calendar, label: 'Duration', val: 'Self-Paced / Guided' },
      { icon: Users, label: 'Learners', val: '10-15 Learners per batch' },
      { icon: Award, label: 'Curriculum', val: 'DevOps & LLM Industry Standard' },
    ],
    buttonText: 'Explore College & Pro',
    link: '/grade-select',
  },
];

const whatsYouLearnPoints = [
  'Enhance productivity with AI for everyday tasks',
  'Understand the fundamentals of AI & Cloud Infrastructure',
  'Master ChatGPT, Grok, Gemini, & Copilot tools',
  'Add advanced prompt engineering & automation techniques',
];

export default function LearningProgramsSection() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section style={{ margin: '32px 0 48px', width: '100%' }}>

      {/* Main Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          View Learning Programs
        </h2>
        <h3 style={{ color: isDark ? '#60a5fa' : '#2563eb', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px' }}>
          Pick a learning program & get started!
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
          Choose from our Best Courses & Textbooks for your grade ⭐️
        </p>
      </div>

      {/* Main Layout: Left Side 'What you'll learn' + Right Side Program Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Left Side: What you'll learn */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px 20px',
          boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sparkles size={18} color="#2563eb" />
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              What you'll learn
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {whatsYouLearnPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 500 }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => navigate('/grade-select')}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '10px 14px', borderRadius: '8px', background: 'transparent',
                border: '1px solid #2563eb', color: '#2563eb', fontSize: '0.82rem', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2563eb'; }}
            >
              Select Your Grade <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Side: Grid of 3 Program Cards (Image 1 UI style) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {programs.map((prog, idx) => (
            <motion.article
              key={prog.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.25)' : '0 4px 14px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease',
              }}
              whileHover={{ y: -3 }}
            >
              {/* Card Image Banner */}
              <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', background: isDark ? '#111827' : '#e2e8f0' }}>
                <img
                  src={prog.image}
                  alt={prog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute', top: '10px', right: '10px',
                  padding: '3px 10px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800,
                  color: '#fff', background: prog.accent,
                }}>
                  {prog.badge}
                </span>
              </div>

              {/* Card Content Body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: '0 0 4px' }}>
                  {prog.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0 0 14px', lineHeight: 1.45 }}>
                  {prog.desc}
                </p>

                {/* Icon Bullet List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', marginTop: 'auto' }}>
                  {prog.details.map((d, i) => {
                    const DIcon = d.icon;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <DIcon size={13} color={prog.accent} style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{d.label}:</span>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{d.val}</span>
                      </div>
                    );
                  })}
                </div>

                  {/* Bottom Blue Action Button */}
                <button
                  onClick={() => navigate(prog.link)}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '8px',
                    border: 'none', background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    color: '#fff', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.3)', transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Book a Demo
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
