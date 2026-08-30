// ============================================================
// Onboarding — "What do you want to master?" (Original Tracks + Image UI)
// Step 1 of onboarding. Multi-select domain tracks.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cloud, Brain, CheckCircle2, ArrowRight, Sparkles, Check,
  Calendar, Layers, Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import BrandLogo from '../../components/ui/BrandLogo';

const tracks = [
  {
    id: 'cloud',
    icon: Cloud,
    badge: 'Popular',
    accent: '#0284c7',
    title: 'Cloud Infrastructure',
    desc: 'Learn AWS, Azure, GCP and how cloud systems work',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop',
    details: [
      { icon: Cloud, label: 'Domain', val: 'Cloud Infrastructure & AWS' },
      { icon: Calendar, label: 'Duration', val: '4-6 Weeks / Guided' },
      { icon: Layers, label: 'Level', val: 'Beginner to Advanced' },
      { icon: Award, label: 'Skills', val: 'AWS Basics, Azure Cloud, GCP, Kubernetes' },
    ],
    tags: ['AWS Basics', 'Azure Cloud', 'GCP', 'Kubernetes'],
  },
  {
    id: 'ai',
    icon: Brain,
    badge: 'Popular',
    accent: '#7c3aed',
    title: 'Artificial Intelligence',
    desc: 'Understand how AI thinks, learns and solves real-world problems',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop',
    details: [
      { icon: Brain, label: 'Domain', val: 'Artificial Intelligence & ML' },
      { icon: Calendar, label: 'Duration', val: '4-6 Weeks / Self-Paced' },
      { icon: Layers, label: 'Level', val: 'All Levels' },
      { icon: Award, label: 'Skills', val: 'What is AI?, Machine Learning, Neural Networks' },
    ],
    tags: ['What is AI?', 'Machine Learning', 'Neural Networks'],
  },
];

const whatsYouMasterPoints = [
  'Enhance productivity with Cloud & AI tools for everyday tasks',
  'Understand the fundamentals of AWS, Azure & Kubernetes',
  'Master ChatGPT, LLMs, Neural Networks & Machine Learning',
  'Build real-world portfolio projects & industry certifications',
];

export default function Onboarding() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(['cloud', 'ai']);
  const [loading, setLoading] = useState(false);

  const toggleTrack = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    navigate('/grade-select', { state: { tracks: selected } });
  };

  const firstName = user?.name?.split(' ')[0] || 'there';

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
      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: isDark ? 'linear-gradient(rgba(59,130,246,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.025) 1px, transparent 1px)' : 'linear-gradient(rgba(59,130,246,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.06) 1px, transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

      {/* Top Logo */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        style={{ marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        <BrandLogo size="lg" />
      </motion.div>

      {/* Main Headline (Image Header Style) */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.35 }}
        style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 2 }}>
        <p style={{ color: isDark ? '#60a5fa' : '#2563eb', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
          Welcome, {firstName} • Step 1 of 2
        </p>
        <h1 style={{ color: isDark ? '#fff' : '#0f172a', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.1 }}>
          View Learning Tracks
        </h1>
        <h3 style={{ color: isDark ? '#60a5fa' : '#2563eb', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px' }}>
          Pick your learning track & get started!
        </h3>
        <p style={{ color: isDark ? 'rgba(148,163,184,.7)' : '#64748b', fontSize: '0.9rem', margin: 0 }}>
          Select one or multiple learning tracks (Cloud Infrastructure & Artificial Intelligence) ⭐️
        </p>
      </motion.div>

      {/* Main Layout: Left Column + Right Cards Grid (Exact Image Layout) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 280px) 1fr',
        gap: '28px',
        width: '100%', maxWidth: '1020px',
        position: 'relative', zIndex: 2,
        marginBottom: '32px',
        alignItems: 'start',
      }}>

        {/* Left Column: What you'll master */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 }}
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
              What you'll master
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {whatsYouMasterPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: isDark ? 'rgba(226,232,240,.85)' : '#334155', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 500 }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : '#e2e8f0'}` }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
              Tracks Selected ({selected.length}):
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selected.map((tid) => {
                const tr = tracks.find((t) => t.id === tid);
                return tr ? (
                  <span key={tid} style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: tr.accent + '22', color: tr.accent, border: `1px solid ${tr.accent}44` }}>
                    {tr.title}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Original 2 Track Cards (Cloud & AI) in Image Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {tracks.map((track, i) => {
            const isSelected = selected.includes(track.id);
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.08, duration: 0.35 }}
                onClick={() => toggleTrack(track.id)}
                style={{
                  position: 'relative',
                  background: isSelected
                    ? (isDark ? 'rgba(10,25,70,0.98)' : '#eef4ff')
                    : (isDark ? 'rgba(13,22,52,0.95)' : '#ffffff'),
                  border: isSelected
                    ? `3px solid ${track.accent}`
                    : `2px solid ${isDark ? 'rgba(255,255,255,.18)' : '#b3c3ea'}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: isSelected
                    ? `0 0 0 4px ${track.accent}30, 0 16px 40px rgba(0,0,0,.32)`
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
                    background: track.accent, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}

                {/* Top Banner Image */}
                <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', background: isDark ? '#111827' : '#e2e8f0' }}>
                  <img
                    src={track.image}
                    alt={track.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800,
                    color: '#fff', background: track.accent,
                  }}>
                    {track.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Desc */}
                  <h3 style={{
                    color: isSelected
                      ? (isDark ? '#ffffff' : '#0f172a')
                      : (isDark ? '#e2e8f0' : '#1e293b'),
                    fontSize: '1.1rem',
                    fontWeight: isSelected ? 900 : 700,
                    margin: '0 0 4px',
                    letterSpacing: isSelected ? '-0.01em' : 'normal',
                  }}>
                    {track.title}
                  </h3>
                  <p style={{ color: isDark ? 'rgba(148,163,184,.7)' : '#64748b', fontSize: '0.8rem', margin: '0 0 16px', lineHeight: 1.45 }}>
                    {track.desc}
                  </p>

                  {/* Icon Bullet List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', marginTop: 'auto' }}>
                    {track.details.map((d, idx) => {
                      const DIcon = d.icon;
                      return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
                          <DIcon size={13} color={track.accent} style={{ flexShrink: 0 }} />
                          <span style={{ fontWeight: 600, color: isDark ? 'rgba(148,163,184,.7)' : '#64748b' }}>{d.label}:</span>
                          <span style={{ fontWeight: 700, color: isDark ? '#e2e8f0' : '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.val}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Blue Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTrack(track.id); }}
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
                    {isSelected ? '✓ Track Selected' : 'Select Track'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Navigation Buttons Stack */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <motion.button
          onClick={handleContinue}
          disabled={selected.length === 0 || loading}
          whileHover={selected.length > 0 && !loading ? { scale: 1.02 } : {}}
          whileTap={selected.length > 0 && !loading ? { scale: 0.98 } : {}}
          style={{
            padding: '12px 36px', borderRadius: '10px', border: 'none',
            background: selected.length > 0
              ? 'linear-gradient(135deg, #2563eb, #0284c7)'
              : (isDark ? 'rgba(255,255,255,.07)' : '#e2e8f0'),
            color: selected.length > 0 ? '#fff' : (isDark ? 'rgba(255,255,255,.25)' : '#94a3b8'),
            fontWeight: 800, fontSize: '0.95rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
            boxShadow: selected.length > 0 ? '0 8px 24px rgba(37,99,235,.35)' : 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? 'Getting things ready…' : `Next: Select Your Grade (${selected.length} Selected)`}
          {!loading && <ArrowRight size={16} />}
        </motion.button>

        <p style={{ color: isDark ? 'rgba(148,163,184,.35)' : '#94a3b8', fontSize: '0.73rem', textAlign: 'center' }}>
          You can select single or both learning tracks
        </p>
      </motion.div>
    </div>
  );
}
