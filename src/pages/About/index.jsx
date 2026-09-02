// ============================================================
// About Page — DevOpsX (Fully Responsive, Vanilla CSS)
// ============================================================

import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { instructors } from '../../data/instructors';
import { useTheme } from '../../context/ThemeContext';

const values = [
  { icon: Heart,  title: 'Quality First',  desc: 'Every course is reviewed by experts before publication.' },
  { icon: Globe,  title: 'Learn Anywhere', desc: 'Access your courses on any device, anytime, anywhere.' },
  { icon: Users,  title: 'Community',      desc: 'Join 10,000+ learners and grow together.' },
  { icon: Award,  title: 'Certifications', desc: 'Earn verifiable certificates recognized by employers.' },
];

const stats = [
  ['500+', 'Courses'],
  ['10K+', 'Students'],
  ['50+',  'Instructors'],
  ['8K+',  'Certificates'],
];

export default function About() {
  const { isDark } = useTheme();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', background: 'var(--bg-primary)' }}>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 64px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
        className="about-hero"
      >
        {/* Background grid */}
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.25, zIndex: 0 }} />
        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            width: '480px',
            height: '480px',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}
        >
          {/* Badge */}
          <span
            style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#60a5fa',
              border: '1px solid rgba(96,165,250,0.3)',
              background: 'rgba(59,130,246,0.08)',
              marginBottom: '20px',
              letterSpacing: '0.02em',
            }}
          >
            About DevOpsX
          </span>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.18,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            We're on a mission to make{' '}
            <span className="gradient-text">tech education accessible</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            DevOpsX was founded in 2023 with a simple belief: world-class technical education should
            be available to everyone, regardless of geography or financial background.
          </p>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--bg-secondary)', padding: '48px 24px' }}>
        <div
          className="about-stats-grid"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {stats.map(([val, lbl]) => (
            <div
              key={lbl}
              style={{
                textAlign: 'center',
                padding: '20px 12px',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <p
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  fontWeight: 800,
                  marginBottom: '4px',
                  lineHeight: 1,
                }}
              >
                {val}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {lbl}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: '64px 24px' }}>
        <div
          className="about-mission-grid"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left — Text */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '14px',
              }}
            >
              We created DevOpsX because we saw the gap between what universities teach and what the
              industry needs. DevOps, Cloud, and modern engineering skills are increasingly in demand,
              yet quality educational resources remain expensive and scattered.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Our instructors are active professionals who've worked at companies like Google, Amazon,
              Microsoft, and Infosys. They bring real-world experience into every lesson.
            </p>
          </div>

          {/* Right — Value Cards */}
          <div
            className="about-values-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#60a5fa" />
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET OUR INSTRUCTORS ── */}
      <section style={{ background: 'var(--bg-secondary)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              textAlign: 'center',
              marginBottom: '40px',
              letterSpacing: '-0.01em',
            }}
          >
            Meet Our Instructors
          </h2>

          <div
            className="about-instructors-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}
          >
            {instructors.slice(0, 4).map((inst, i) => (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '24px 16px',
                  borderRadius: '18px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}
              >
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    border: '2px solid rgba(96,165,250,0.35)',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '2px',
                    }}
                  >
                    {inst.name}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {inst.title}
                  </p>
                </div>
                <p style={{ fontSize: '0.74rem', color: '#60a5fa', fontWeight: 600 }}>
                  ⭐ {inst.rating} · {(inst.students / 1000).toFixed(0)}K students
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
