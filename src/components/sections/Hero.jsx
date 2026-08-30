// ============================================================
// Hero Section — DevOpsX Learning (matches reference design)
// [ copy + stats + CTA ]   [ 3D book on pedestal ]   [ 4 feature cards ]
// ============================================================

import { motion } from 'framer-motion';
import {
  ArrowRight, BookOpen, Users, Clock, Award, Blocks, RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const featureCards = [
  { icon: BookOpen, title: 'Beginner Friendly',  subtitle: 'Start from Scratch' },
  { icon: Blocks,   title: 'Hands-on Projects',  subtitle: 'Build Real World Applications' },
  { icon: Award,    title: 'Certificate Included', subtitle: 'Showcase Your Skills' },
  { icon: Clock,    title: 'Lifetime Access',    subtitle: 'Learn Anytime, Anywhere' },
];

const stats = [
  { icon: Users,    value: '20,000+',      label: 'Happy Learners' },
  { icon: BookOpen, value: '500+',         label: 'Expert Courses' },
  { icon: Clock,    value: '10,000+',      label: 'Hours of Content' },
  { icon: Award,    value: 'Certificates', label: 'Boost Your Career' },
];

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── AI head artwork on the book cover (inline so it never fails to load) ──
function AiHeadArt() {
  return (
    <svg viewBox="0 0 160 170" fill="none" style={{ width: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <radialGradient id="hero-head-glow" cx="0.5" cy="0.45" r="0.6">
          <stop stopColor="#3b82f6" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#1d4ed8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0b1020" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-head-line" x1="30" y1="10" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93c5fd" />
          <stop offset="0.5" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="82" cy="78" rx="72" ry="80" fill="url(#hero-head-glow)" />

      {/* Head profile, facing right */}
      <path
        d="M112 163c-1-14 1-24 5-32 5-10 13-16 17-26 6-16 3-35-8-49C114 41 96 32 77 33 53 34 33 51 28 74c-4 19 2 34 5 47 2 9 2 17 1 27 0 6 3 12 9 14 8 3 17 3 26 3h34c5 0 9-2 9-2Z"
        stroke="url(#hero-head-line)"
        strokeWidth="1.8"
        fill="rgba(37,99,235,0.10)"
      />

      {/* Brain circuitry inside the head */}
      <g stroke="url(#hero-head-line)" strokeWidth="1.3" strokeLinecap="round" opacity="0.95">
        <path d="M60 62c8-8 20-9 28-2M52 78c6 6 16 8 24 4M66 96c8 5 18 4 25-3M74 48v14M88 60v16M62 78v18M96 74l12-6M96 90l10 5M74 62 62 78M74 62l14 12M62 96l12-8M88 76l8 14M50 66l-8-5M52 92l-9 6" />
        <path d="M44 74c-6 4-8 12-4 18" opacity="0.6" />
        <path d="M104 56c8 2 13 10 12 18" opacity="0.6" />
      </g>

      {/* Synapse nodes */}
      <g fill="#bfdbfe">
        {[
          [74, 48], [88, 60], [62, 78], [74, 62], [96, 74], [88, 76],
          [62, 96], [74, 88], [96, 90], [108, 68], [42, 61], [43, 98],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" />
        ))}
      </g>
      <g fill="#e0f2fe">
        {[[74, 48], [96, 74], [62, 96]].map(([cx, cy]) => (
          <circle key={`hi-${cx}-${cy}`} cx={cx} cy={cy} r="1" />
        ))}
      </g>
    </svg>
  );
}

// ── The 3D book standing on a pedestal ──
function HeroBook() {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* Pedestal */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '78px',
        }}
      >
        {/* Cylinder side */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: '20px', height: '44px',
            background: 'linear-gradient(180deg, #d9d7fb 0%, #c4c1f5 100%)',
            borderRadius: '0 0 200px 200px / 0 0 32px 32px',
          }}
        />
        {/* Cylinder top */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #f2f1fe 0%, #e3e1fb 100%)',
            boxShadow: 'inset 0 -2px 6px rgba(99,102,241,.12)',
          }}
        />
        {/* Contact shadow under the book */}
        <div
          style={{
            position: 'absolute', left: '50%', top: '13px',
            transform: 'translateX(-50%)',
            width: '250px', height: '24px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(76,66,160,.30) 0%, transparent 72%)',
            filter: 'blur(4px)',
          }}
        />
        {/* Ground shadow */}
        <div
          style={{
            position: 'absolute', left: '50%', bottom: '-14px',
            transform: 'translateX(-50%)',
            width: '420px', height: '28px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(79,70,229,.16) 0%, transparent 70%)',
            filter: 'blur(7px)',
          }}
        />
      </div>

      {/* Book */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', marginBottom: '42px', filter: 'drop-shadow(14px 22px 34px rgba(30,27,75,.34))' }}
      >
        {/* Page block edge (right side, gives the 3D thickness) */}
        <div
          style={{
            position: 'absolute', top: '6px', bottom: '6px', right: '-11px',
            width: '14px', borderRadius: '0 4px 4px 0',
            background: 'linear-gradient(90deg, #cbd5e1 0%, #f1f5f9 45%, #cbd5e1 100%)',
            transform: 'skewY(-2deg)',
          }}
        />

        {/* Front cover */}
        <div
          style={{
            position: 'relative',
            width: '276px',
            aspectRatio: '276 / 402',
            borderRadius: '4px 7px 7px 4px',
            background: 'linear-gradient(160deg, #131c33 0%, #0a1024 55%, #060a18 100%)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '28px 23px 20px',
            boxSizing: 'border-box',
            border: '1px solid rgba(148,163,184,.16)',
          }}
        >
          {/* Spine */}
          <div
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '9px',
              background: 'linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(255,255,255,.06) 55%, transparent 100%)',
            }}
          />
          {/* Sheen */}
          <div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(105deg, rgba(255,255,255,.10) 0%, transparent 26%, transparent 78%, rgba(255,255,255,.05) 100%)',
            }}
          />

          {/* Title */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.32rem',
                fontWeight: 800,
                lineHeight: 1.16,
                letterSpacing: '0.005em',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              Artificial<br />Intelligence
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.06rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              For Beginners
            </div>
            <div
              style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: '#fcd34d',
                marginTop: '7px',
                textTransform: 'uppercase',
              }}
            >
              Learn · Build · Innovate
            </div>
          </div>

          {/* Artwork */}
          <div style={{ width: '84%', marginTop: '10px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center' }}>
            <AiHeadArt />
          </div>

          {/* Author */}
          <div
            style={{
              fontSize: '0.745rem',
              fontWeight: 500,
              color: 'rgba(226,232,240,.85)',
              letterSpacing: '0.03em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Shailendra Kumar
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { isDark } = useTheme();

  const cardBg = isDark ? 'rgba(15,25,41,0.92)' : '#ffffff';
  const cardBorder = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(15,23,42,0.09)';
  const iconTile = isDark ? 'rgba(99,102,241,0.16)' : '#f1f0fe';
  const iconColor = isDark ? '#a5b4fc' : '#4f46e5';

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: isDark
          ? 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,102,241,.14) 0%, transparent 62%), #060b18'
          : 'radial-gradient(ellipse 90% 55% at 50% -12%, rgba(99,102,241,.06) 0%, transparent 60%), #ffffff',
        boxSizing: 'border-box',
        padding: '40px 32px 48px',
      }}
    >
      {/* Dotted decoration, top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '54px', right: '38px',
          width: '130px', height: '80px', pointerEvents: 'none',
          backgroundImage: `radial-gradient(${isDark ? 'rgba(148,163,184,.28)' : 'rgba(99,102,241,.22)'} 1.4px, transparent 1.4px)`,
          backgroundSize: '13px 13px',
          maskImage: 'linear-gradient(to bottom left, #000, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom left, #000, transparent 75%)',
        }}
      />

      <div className="hero-grid">
        {/* ── LEFT: copy ── */}
        <motion.div variants={containerVar} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={itemVar}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '6px 13px', borderRadius: '7px',
                background: isDark ? 'rgba(99,102,241,.16)' : '#eeecfd',
                color: isDark ? '#a5b4fc' : '#4f46e5',
                fontSize: '0.755rem', fontWeight: 600, letterSpacing: '0.005em',
              }}
            >
              #1 Platform to Learn AI Online
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVar}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 4.7vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.11,
              letterSpacing: '-0.033em',
              color: 'var(--text-primary)',
              margin: '20px 0 0',
            }}
          >
            Learn AI.<br />
            Build Skills.<br />
            <span
              style={{
                background: 'linear-gradient(95deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Shape Your Future.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVar}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.94rem',
              lineHeight: 1.72,
              margin: '20px 0 0',
              maxWidth: '430px',
            }}
          >
            Access top-quality books, expert-led courses, hands-on projects,
            and resources to master AI and build a successful career.
          </motion.p>

          {/* Stats card */}
          <motion.div
            variants={itemVar}
            className="hero-stats"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              margin: '26px 0 0',
              padding: '13px 5px',
              borderRadius: '13px',
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              boxShadow: isDark ? 'none' : '0 2px 10px rgba(15,23,42,.05)',
              width: 'fit-content',
              maxWidth: '100%',
            }}
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '9px',
                  padding: '0 11px', flex: '0 0 auto', minWidth: 0,
                  borderLeft: i === 0 ? 'none' : `1px solid ${cardBorder}`,
                }}
              >
                <span
                  style={{
                    width: '29px', height: '29px', borderRadius: '8px',
                    background: iconTile, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Icon size={15} color={iconColor} strokeWidth={2} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.815rem', fontWeight: 800,
                      color: 'var(--text-primary)', lineHeight: 1.15,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.66rem', color: 'var(--text-muted)',
                      marginTop: '2px', whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVar}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', margin: '26px 0 0' }}
          >
            <Link
              to="/courses"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '14px 27px', borderRadius: '10px',
                background: '#5b4fe0',
                color: '#fff', fontSize: '0.895rem', fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 8px 22px rgba(91,79,224,.32)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(91,79,224,.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#5b4fe0';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 22px rgba(91,79,224,.32)';
              }}
            >
              Explore Courses <ArrowRight size={16} />
            </Link>

            <Link
              to="/textbooks"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '14px 25px', borderRadius: '10px',
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                color: 'var(--text-primary)', fontSize: '0.895rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
                boxShadow: isDark ? 'none' : '0 1px 3px rgba(15,23,42,.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5b4fe0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cardBorder;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <BookOpen size={16} /> Browse Books
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={itemVar}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '22px', alignItems: 'center', margin: '22px 0 0' }}
          >
            {[
              { icon: Clock, text: '7-Day Money Back Guarantee' },
              { icon: RotateCcw, text: 'Cancel Anytime' },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  fontSize: '0.755rem', color: 'var(--text-muted)',
                }}
              >
                <Icon size={14} strokeWidth={1.8} />
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── CENTER: book ── */}
        <motion.div
          className="hero-book"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <HeroBook />
        </motion.div>

        {/* ── RIGHT: feature cards ── */}
        <motion.div
          className="hero-features"
          variants={containerVar}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
        >
          {featureCards.map(({ icon: Icon, title, subtitle }) => (
            <motion.div
              key={title}
              variants={itemVar}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 14px',
                borderRadius: '12px',
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,.28)' : '0 2px 10px rgba(15,23,42,.05)',
                cursor: 'default',
              }}
              whileHover={{
                y: -2,
                boxShadow: isDark ? '0 8px 24px rgba(0,0,0,.45)' : '0 8px 22px rgba(79,70,229,.13)',
              }}
            >
              <span
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: iconTile, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Icon size={17} color={iconColor} strokeWidth={1.9} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.795rem', fontWeight: 700, lineHeight: 1.25 }}>
                  {title}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.685rem', marginTop: '2px', lineHeight: 1.35 }}>
                  {subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-grid {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px 190px;
          gap: 26px;
          align-items: center;
        }
        @media (max-width: 1180px) {
          .hero-grid { grid-template-columns: minmax(0, 1fr) 300px; }
          .hero-features {
            grid-column: 1 / -1;
            flex-direction: row !important;
            flex-wrap: wrap;
          }
          .hero-features > * { flex: 1 1 220px; }
        }
        @media (max-width: 1020px) {
          .hero-stats { flex-wrap: wrap; gap: 12px 0; width: 100% !important; }
          .hero-stats > * { flex: 1 1 46% !important; border-left: none !important; }
        }
        @media (max-width: 900px) {
          .hero-section { padding: 30px 20px 40px; }
          .hero-grid { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 560px) {
          .hero-book { display: none; }
        }
      `}</style>
    </section>
  );
}
