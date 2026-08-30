// ============================================================
// Subscription Page — Perfect Hybrid (Hero 3D Book + 4-Plan Detailed Grid & Compare Table)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  RefreshCw,
  Monitor,
  Star,
  Video,
  Code2,
  Download,
  Award,
  Headphones,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Shield,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

// Safe SVG for Infinity icon
function InfinityIconSvg({ size = 20, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  );
}

// ─── Data ───────────────────────────────────────────────────

const FEATURES = [
  {
    IconComponent: Video,
    title: 'Expert Video Lessons',
    desc: 'High-quality content by industry experts',
    color: '#6366f1',
    bg: 'rgba(99,102,241,.12)',
  },
  {
    IconComponent: Code2,
    title: 'Hands-on Projects',
    desc: 'Build real projects step by step',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,.12)',
  },
  {
    IconComponent: Download,
    title: 'Downloadable Resources',
    desc: 'Notes, cheat sheets, source code & more',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,.12)',
  },
  {
    IconComponent: Award,
    title: 'Certificate Included',
    desc: 'Earn a certificate upon completion',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,.12)',
  },
  {
    CustomSvg: InfinityIconSvg,
    title: 'Lifetime Access',
    desc: 'Learn anytime, anywhere',
    color: '#10b981',
    bg: 'rgba(16,185,129,.12)',
  },
  {
    IconComponent: Headphones,
    title: 'Priority Support',
    desc: 'Get help whenever you need it',
    color: '#ef4444',
    bg: 'rgba(239,68,68,.12)',
  },
];

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'For learners getting started',
    monthlyPrice: 299,
    yearlyNote: '₹3,588 billed yearly',
    popular: false,
    features: [
      'Access to 100+ Courses',
      'Access to 2,000+ Books',
      'Standard Support',
      'Download Resources',
      '1 Device Access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'For serious learners',
    monthlyPrice: 599,
    yearlyNote: '₹7,188 billed yearly',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Access to 300+ Courses',
      'Access to 6,000+ Books',
      'Certificates on Completion',
      'Download Resources',
      'Priority Support',
      '2 Device Access',
      'Live Q&A Sessions',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'For professionals & developers',
    monthlyPrice: 999,
    yearlyNote: '₹11,988 billed yearly',
    popular: false,
    features: [
      'Access to 500+ Courses',
      'Access to 10,000+ Books',
      'Certificates on Completion',
      'Download Resources',
      'Priority Support',
      '5 Device Access',
      'Live Classes Access',
      'Early Access to New Courses',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    subtitle: 'One-time payment',
    monthlyPrice: 14999,
    yearlyNote: 'One-time payment',
    isLifetime: true,
    popular: false,
    features: [
      'Everything in Premium',
      'Lifetime Access',
      'All Future Updates',
      'Certificates on Completion',
      'Download Resources',
      'Priority Support',
      'Live Classes Access',
    ],
  },
];

const COMPARISON_ROWS = [
  { key: 'courses', label: 'Courses Access', Icon: BookOpen, basic: '100+', pro: '300+', premium: '500+', lifetime: '500+' },
  { key: 'books', label: 'Books Access', Icon: Video, basic: '2,000+', pro: '6,000+', premium: '10,000+', lifetime: '10,000+' },
  { key: 'certs', label: 'Certificates', Icon: Award, basic: false, pro: true, premium: true, lifetime: true },
  { key: 'download', label: 'Download Resources', Icon: Download, basic: false, pro: true, premium: true, lifetime: true },
  { key: 'live', label: 'Live Classes', Icon: Monitor, basic: false, pro: false, premium: true, lifetime: true },
  { key: 'devices', label: 'Devices', Icon: Monitor, basic: '1', pro: '2', premium: '5', lifetime: 'Unlimited' },
  { key: 'support', label: 'Support', Icon: Headphones, basic: 'Standard', pro: 'Priority', premium: 'Priority', lifetime: 'Priority' },
  { key: 'price', label: 'Price (Yearly)', Icon: Sparkles, basic: '₹3,588', pro: '₹7,188', premium: '₹11,988', lifetime: '₹14,999 (One-time)' },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aman Verma',
    role: 'Data Science Student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
    rating: 5,
    review:
      'This platform helped me go from zero to building my first machine learning project. Highly recommended!',
  },
  {
    id: 2,
    name: 'Neha Patel',
    role: 'ML Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    rating: 5,
    review:
      'The content is easy to understand and the projects are very practical. Worth every penny!',
  },
  {
    id: 3,
    name: 'Rahul Singh',
    role: 'Software Developer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
    rating: 5,
    review:
      'I used the resources and projects in my internship and it really helped me stand out!',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes! You can cancel at any time without hidden fees. Access continues until the billing period ends.',
  },
  {
    q: 'Will I get a certificate?',
    a: 'Absolutely. Every course comes with a verifiable certificate of completion you can share on LinkedIn.',
  },
  {
    q: 'How long will I have access to the courses?',
    a: 'Monthly/Yearly subscribers have access while active. Lifetime members get permanent access.',
  },
  {
    q: 'Can I access the courses on mobile?',
    a: 'Yes, fully responsive — works on mobile, tablet, and desktop.',
  },
  {
    q: 'Is there a money-back guarantee?',
    a: 'Yes — 30-day money-back guarantee. Contact support within 30 days for a full refund.',
  },
];

const TRUST_ITEMS = [
  { emoji: '📦', title: '100% Original Content', desc: 'Sourced from trusted educators' },
  { emoji: '🚚', title: 'Free Shipping', desc: 'On physical learning kits & books' },
  { emoji: '🔄', title: '7 Days Return', desc: 'No questions asked' },
  { emoji: '🛡️', title: 'Secure Payment', desc: '100% protected' },
];

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          fill={n <= count ? '#fbbf24' : 'none'}
          color={n <= count ? '#fbbf24' : '#9ca3af'}
        />
      ))}
    </div>
  );
}

function FAQRow({ item }) {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${
          open ? '#6366f1' : isDark ? 'rgba(255,255,255,.08)' : 'rgba(99,102,241,.18)'
        }`,
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '10px',
        transition: 'border-color .2s',
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '12px',
        }}
      >
        <span
          style={{
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            flexShrink: 0,
            background: open
              ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
              : isDark
              ? 'rgba(255,255,255,.08)'
              : 'rgba(99,102,241,.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background .2s',
          }}
        >
          {open ? (
            <Minus size={12} color="#fff" />
          ) : (
            <Plus size={12} color={isDark ? '#a5b4fc' : '#6366f1'} />
          )}
        </div>
      </button>
      {open && (
        <div
          style={{
            padding: '0 20px 15px',
            borderTop: `1px solid ${
              isDark ? 'rgba(255,255,255,.05)' : 'rgba(99,102,241,.1)'
            }`,
            paddingTop: '12px',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {item.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Subscription() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [tIdx, setTIdx] = useState(0);
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'

  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(99,102,241,.18)';

  const scrollToPlans = (e) => {
    e.preventDefault();
    document.getElementById('sub-plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (plan) => {
    toast.success(`Selected ${plan.name} Plan! Proceeding to checkout...`);
    navigate('/checkout');
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* ══ 1. HERO SECTION (3D BOOK + PLANT SHOWCASE) ════════════ */}
      <section
        style={{
          padding: '56px 32px 64px',
          background: isDark
            ? 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(99,102,241,.14) 0%, transparent 65%), var(--bg-primary)'
            : 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(99,102,241,.09) 0%, transparent 65%), var(--bg-primary)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: `linear-gradient(${
              isDark ? 'rgba(99,102,241,.03)' : 'rgba(99,102,241,.05)'
            } 1px,transparent 1px),linear-gradient(90deg,${
              isDark ? 'rgba(99,102,241,.03)' : 'rgba(99,102,241,.05)'
            } 1px,transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ flex: '1 1 400px', maxWidth: '520px' }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 14px',
                borderRadius: '999px',
                marginBottom: '20px',
                background: isDark ? 'rgba(99,102,241,.15)' : 'rgba(99,102,241,.1)',
                border: '1px solid rgba(99,102,241,.3)',
                color: isDark ? '#a5b4fc' : '#4f46e5',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              Join Thousands of Learners
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                margin: '0 0 16px',
              }}
            >
              Start Your AI Journey<br />
              with{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Premium Access
              </span>
            </h1>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.96rem',
                lineHeight: 1.7,
                margin: '0 0 22px',
                maxWidth: '440px',
              }}
            >
              Get unlimited access to expert-led video courses, hands-on projects, downloadable
              resources and a certificate of completion.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
            >
              {[
                'Learn at your own pace',
                'Practical projects & real-world skills',
                'Certificate to boost your career',
              ].map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <CheckCircle2 size={16} color="#6366f1" /> {f}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
              <a
                href="#sub-plans"
                onClick={scrollToPlans}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(99,102,241,.35)',
                  transition: 'all .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,.35)';
                }}
              >
                Start Subscription
              </a>
              <button
                onClick={() => toast.success('Playing free preview video...')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 22px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: `1.5px solid ${
                    isDark ? 'rgba(255,255,255,.12)' : 'rgba(99,102,241,.25)'
                  }`,
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark
                    ? 'rgba(255,255,255,.12)'
                    : 'rgba(99,102,241,.25)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={10} color="#fff" fill="#fff" />
                </div>
                Watch Free Preview
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
              <span style={{ color: '#22c55e' }}>✓</span> 7-day money back guarantee &nbsp;•&nbsp;
              <span style={{ color: '#22c55e' }}>✓</span> Cancel anytime
            </p>
          </motion.div>

          {/* Right: 3D Book & Potted Plant Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '24px',
              flexShrink: 0,
            }}
          >
            {/* 3D Vertical Book */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', width: '220px', zIndex: 2 }}
            >
              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: isDark
                    ? '20px 20px 60px rgba(0,0,0,.75)'
                    : '20px 20px 60px rgba(0,20,80,.25)',
                  transform: 'rotateY(-12deg) rotateX(4deg)',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&auto=format&fit=crop"
                  alt="AI Book Cover"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(145deg, rgba(6,11,28,.75) 0%, rgba(30,27,75,.5) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#fbbf24',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    ARTIFICIAL<br />INTELLIGENCE<br />FOR BEGINNERS
                  </div>
                  <div
                    style={{
                      fontSize: '0.55rem',
                      color: 'rgba(255,255,255,.75)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Learn Skills · Build Projects · Get Hired
                  </div>
                </div>
                {/* 3D Spine */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '8px',
                    background: 'linear-gradient(180deg,#6366f1,#8b5cf6)',
                  }}
                />
              </div>
              {/* Author badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(10,15,30,.88)',
                  border: '1px solid rgba(255,255,255,.15)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Shailendra Kumar
              </div>
            </motion.div>

            {/* Potted Plant 🪴 */}
            <div style={{ position: 'relative', width: '130px', zIndex: 1 }}>
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop"
                alt="Potted plant"
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,.15)',
                  display: 'block',
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. FEATURES STRIP (6 COLUMNS) ════════════════════════ */}
      <section
        style={{
          padding: '36px 32px',
          background: isDark ? 'var(--bg-secondary)' : 'var(--bg-card)',
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '24px',
          }}
        >
          {FEATURES.map(({ IconComponent, CustomSvg, title, desc, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: bg,
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {CustomSvg ? (
                  <CustomSvg size={22} color={color} />
                ) : (
                  <IconComponent size={22} color={color} />
                )}
              </div>
              <div>
                <p
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    margin: '0 0 3px',
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.68rem',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 3. 4-PLAN DETAILED PRICING SECTION ══════════════════ */}
      <section id="sub-plans" style={{ padding: '64px 32px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem,3vw,2.2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 8px',
                letterSpacing: '-0.02em',
              }}
            >
              Choose the Plan That Fits Your Learning Goals
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 24px' }}>
              Unlimited access to books, courses, projects, and premium resources
            </p>

            {/* Monthly / Yearly Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  background: isDark ? 'rgba(0,0,0,.3)' : 'rgba(99,102,241,.08)',
                  padding: '4px',
                  borderRadius: '999px',
                  border: `1px solid ${border}`,
                }}
              >
                <button
                  onClick={() => setBillingCycle('monthly')}
                  style={{
                    padding: '7px 20px',
                    borderRadius: '999px',
                    border: 'none',
                    background: billingCycle === 'monthly' ? '#6366f1' : 'transparent',
                    color: billingCycle === 'monthly' ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  style={{
                    padding: '7px 20px',
                    borderRadius: '999px',
                    border: 'none',
                    background: billingCycle === 'yearly' ? '#6366f1' : 'transparent',
                    color: billingCycle === 'yearly' ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  Yearly
                </button>
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#10b981',
                  background: 'rgba(16,185,129,.12)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                Save up to 60%
              </span>
            </div>
          </div>

          {/* 4 Plan Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
              marginBottom: '56px',
            }}
          >
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  position: 'relative',
                  background: plan.popular
                    ? isDark
                      ? 'rgba(99,102,241,.14)'
                      : '#f5f3ff'
                    : 'var(--bg-card)',
                  border: `1.5px solid ${plan.popular ? '#6366f1' : border}`,
                  borderRadius: '18px',
                  padding: '28px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: plan.popular
                    ? '0 12px 36px rgba(99,102,241,.22)'
                    : isDark
                    ? '0 2px 8px rgba(0,0,0,.2)'
                    : '0 2px 8px rgba(30,64,175,.05)',
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-13px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '4px 14px',
                      borderRadius: '999px',
                      boxShadow: '0 4px 12px rgba(99,102,241,.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <h3
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    margin: '0 0 2px',
                  }}
                >
                  {plan.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 18px' }}>
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: plan.popular ? '#6366f1' : 'var(--text-primary)',
                      }}
                    >
                      ₹{plan.monthlyPrice.toLocaleString()}
                    </span>
                    {!plan.isLifetime && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>/month</span>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '4px 0 0' }}>
                    {plan.yearlyNote}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    background: plan.popular
                      ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                      : 'transparent',
                    border: `1.5px solid ${plan.popular ? 'transparent' : '#6366f1'}`,
                    color: plan.popular ? '#fff' : '#6366f1',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: '24px',
                    boxShadow: plan.popular ? '0 6px 18px rgba(99,102,241,.32)' : 'none',
                    transition: 'all .2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 26px rgba(99,102,241,.45)';
                    } else {
                      e.currentTarget.style.background = isDark
                        ? 'rgba(99,102,241,.18)'
                        : 'rgba(99,102,241,.08)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(99,102,241,.32)';
                    } else {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                >
                  Get Started
                </button>

                {/* Features Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Check size={14} color="#6366f1" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ══ COMPARE ALL PLANS TABLE ═════════════════════════ */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${border}`,
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '48px',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${border}`,
                background: isDark ? 'rgba(255,255,255,.02)' : 'rgba(99,102,241,.03)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Compare All Plans
              </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${border}`, fontSize: '0.82rem' }}>
                    <th style={{ padding: '16px 24px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      Features
                    </th>
                    <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      Basic
                    </th>
                    <th style={{ padding: '16px 20px', color: '#6366f1', fontWeight: 800 }}>
                      Pro <span style={{ fontSize: '0.68rem', background: 'rgba(99,102,241,.12)', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>Popular</span>
                    </th>
                    <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      Premium
                    </th>
                    <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      Lifetime
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr
                      key={row.key}
                      style={{
                        borderBottom: idx < COMPARISON_ROWS.length - 1 ? `1px solid ${border}` : 'none',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <td style={{ padding: '14px 24px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <row.Icon size={14} color="#6366f1" /> {row.label}
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? (
                            <Check size={16} color="#10b981" strokeWidth={2.5} />
                          ) : (
                            <X size={16} color="#ef4444" strokeWidth={2} />
                          )
                        ) : (
                          row.basic
                        )}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check size={16} color="#10b981" strokeWidth={2.5} />
                          ) : (
                            <X size={16} color="#ef4444" strokeWidth={2} />
                          )
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <Check size={16} color="#10b981" strokeWidth={2.5} />
                          ) : (
                            <X size={16} color="#ef4444" strokeWidth={2} />
                          )
                        ) : (
                          row.premium
                        )}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {typeof row.lifetime === 'boolean' ? (
                          row.lifetime ? (
                            <Check size={16} color="#10b981" strokeWidth={2.5} />
                          ) : (
                            <X size={16} color="#ef4444" strokeWidth={2} />
                          )
                        ) : (
                          row.lifetime
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ══ 30-DAY MONEY BACK BANNER ════════════════════════ */}
          <div
            style={{
              background: isDark
                ? 'linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.12))'
                : 'linear-gradient(135deg,#f3f4f6,#eef2ff)',
              border: '1.5px solid rgba(99,102,241,.25)',
              borderRadius: '18px',
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 6px 18px rgba(99,102,241,.35)',
                  flexShrink: 0,
                }}
              >
                <Shield size={22} color="#fff" />
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: '0 0 2px',
                  }}
                >
                  30-Day Money Back Guarantee
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
                  Not satisfied? Get a full refund within 30 days, no questions asked.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/courses')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(99,102,241,.35)',
                transition: 'all .15s',
              }}
            >
              Start Your Learning Journey <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ 4. TESTIMONIALS ══════════════════════════════════════ */}
      <section
        style={{
          padding: '56px 32px',
          background: isDark ? 'var(--bg-secondary)' : 'rgba(99,102,241,.03)',
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem,3vw,1.9rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 10px',
                letterSpacing: '-0.02em',
              }}
            >
              Trusted by Thousands of Learners
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Stars count={5} />
              <span
                style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.9rem' }}
              >
                4.8/5
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                (1,240+ Reviews)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() =>
                setTIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
              }
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                flexShrink: 0,
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                boxShadow: '0 3px 12px rgba(0,0,0,.1)',
              }}
            >
              <ChevronLeft size={17} />
            </button>

            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {[0, 1, 2].map((offset) => {
                const t = TESTIMONIALS[(tIdx + offset) % TESTIMONIALS.length];
                return (
                  <motion.div
                    key={`${tIdx}-${offset}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: offset * 0.06 }}
                    style={{
                      background: 'var(--bg-card)',
                      border: `1.5px solid ${border}`,
                      borderRadius: '16px',
                      padding: '22px',
                      boxShadow: isDark
                        ? '0 2px 8px rgba(0,0,0,.22)'
                        : '0 2px 8px rgba(30,64,175,.06)',
                    }}
                  >
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.83rem',
                        lineHeight: 1.65,
                        margin: '0 0 16px',
                        fontStyle: 'italic',
                      }}
                    >
                      "{t.review}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          border: '2px solid rgba(99,102,241,.35)',
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <p
                          style={{
                            color: 'var(--text-primary)',
                            fontWeight: 700,
                            fontSize: '0.83rem',
                            margin: '0 0 1px',
                          }}
                        >
                          {t.name}
                        </p>
                        <p
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.7rem',
                            margin: '0 0 4px',
                          }}
                        >
                          {t.role}
                        </p>
                        <Stars count={t.rating} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => setTIdx((i) => (i + 1) % TESTIMONIALS.length)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                flexShrink: 0,
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                boxShadow: '0 3px 12px rgba(0,0,0,.1)',
              }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ 5. FAQ + UPGRADE CTA CARD ════════════════════════════ */}
      <section style={{ padding: '64px 32px', background: 'var(--bg-primary)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr minmax(300px, 360px)',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem,2.5vw,1.75rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 22px',
                letterSpacing: '-0.02em',
              }}
            >
              Frequently Asked Questions
            </h2>
            {FAQ_ITEMS.map((item, i) => (
              <FAQRow key={i} item={item} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: isDark
                ? 'linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.12))'
                : 'linear-gradient(135deg,#eef2ff,#ede9fe)',
              border: '1.5px solid rgba(99,102,241,.3)',
              borderRadius: '20px',
              padding: '32px 26px',
              textAlign: 'center',
              position: 'sticky',
              top: '90px',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '12px', lineHeight: 1 }}>🧠</div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 10px',
                letterSpacing: '-0.02em',
              }}
            >
              Upgrade Your Skills.<br />Upgrade Your Future.
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.84rem',
                margin: '0 0 22px',
                lineHeight: 1.6,
              }}
            >
              Join thousands of learners and start building in-demand AI skills today.
            </p>
            <a
              href="#sub-plans"
              onClick={scrollToPlans}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '13px 20px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(99,102,241,.35)',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,.35)';
              }}
            >
              Start Your Subscription Now <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ 6. TRUST FOOTER STRIP ═══════════════════════════════ */}
      <section
        style={{
          padding: '28px 32px',
          background: isDark ? 'var(--bg-secondary)' : 'var(--bg-card)',
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
            gap: '20px',
          }}
        >
          {TRUST_ITEMS.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(99,102,241,.12)' : 'rgba(99,102,241,.1)',
                  border: '1px solid rgba(99,102,241,.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                {emoji}
              </div>
              <div>
                <p
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    margin: '0 0 2px',
                  }}
                >
                  {title}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
