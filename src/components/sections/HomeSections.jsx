// ============================================================
// Home Page Sections — DevOpsX Learning (matches reference design)
//   1. Trusted-By strip        5. Testimonials
//   2. Explore Top Categories  6. FAQ
//   3. Featured Books/Courses  7. Newsletter
//   4. Subscription banner
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, ShoppingCart, CheckCircle2, ChevronRight, ChevronLeft,
  Mail, ChevronDown, Network, BrainCircuit, MessageSquare, Camera,
  Sparkles, Users,
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import CourseCard from '../cards/CourseCard';
import { getFeaturedCourses } from '../../data/courses';
import { books } from '../../data/books';
import { homeTestimonials } from '../../data/reviews';
import { homeFaqs } from '../../data/assignments';
import { useTheme } from '../../context/ThemeContext';
import { trustedLogos } from '../ui/BrandMarks';

const CONTAINER = 1120;
const ACCENT = '#4f46e5';

// ─── Shared bits ─────────────────────────────────────────────

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: 'easeOut', delay },
  };
}

function HomeSection({ children, bg = 'transparent', style = {} }) {
  return (
    <section
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '30px 32px',
        background: bg,
        overflowX: 'clip',
        ...style,
      }}
    >
      <div style={{ maxWidth: `${CONTAINER}px`, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

/** Section heading: title on the left, "View All" link on the right. */
function SectionHeading({ title, subtitle, center, link, linkLabel, extra }) {
  const { isDark } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: center ? 'center' : 'baseline',
        flexDirection: center ? 'column' : 'row',
        justifyContent: center ? 'center' : 'space-between',
        gap: center ? '6px' : '18px',
        marginBottom: center ? '26px' : '20px',
        textAlign: center ? 'center' : undefined,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '38px',
          flexWrap: 'wrap',
          flexDirection: center ? 'column' : 'row',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.4vw, 1.6rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            margin: 0,
          }}
        >
          {title}
        </h2>
        {extra}
      </div>

      {subtitle && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.855rem', margin: 0 }}>
          {subtitle}
        </p>
      )}

      {link && (
        <Link
          to={link}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '0.815rem', fontWeight: 600,
            color: isDark ? '#818cf8' : ACCENT,
            textDecoration: 'none', flexShrink: 0,
          }}
        >
          {linkLabel || 'View All'} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

/**
 * Horizontal scroll row with the circular chevron controls used across the
 * page. The right control is always rendered (as in the reference); the left
 * one appears once the row has been scrolled.
 */
function ScrollRow({ children, step = 360, gap = 16 }) {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return undefined;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scroll = (dir) => ref.current?.scrollBy({ left: dir * step, behavior: 'smooth' });

  const btn = (side, enabled) => ({
    position: 'absolute',
    [side]: '-19px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 5,
    width: '38px', height: '38px', borderRadius: '50%',
    background: isDark ? 'rgba(15,25,41,.96)' : '#ffffff',
    border: isDark ? '1px solid rgba(255,255,255,.12)' : '1px solid rgba(15,23,42,.1)',
    boxShadow: isDark ? '0 4px 14px rgba(0,0,0,.4)' : '0 3px 12px rgba(15,23,42,.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: enabled ? 'pointer' : 'default',
    color: enabled ? 'var(--text-secondary)' : 'var(--text-muted)',
    opacity: enabled ? 1 : 0.45,
    transition: 'opacity .2s, box-shadow .2s',
  });

  return (
    <div style={{ position: 'relative' }}>
      {canLeft && (
        <button aria-label="Scroll left" onClick={() => scroll(-1)} style={btn('left', true)}>
          <ChevronLeft size={17} />
        </button>
      )}

      <div
        ref={ref}
        className="scrollbar-hide"
        style={{
          display: 'flex',
          gap: `${gap}px`,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '4px 2px 8px',
          margin: '-4px -2px -8px',
        }}
      >
        {children}
      </div>

      <button
        aria-label="Scroll right"
        onClick={() => canRight && scroll(1)}
        style={btn('right', canRight)}
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

// ── 1. Trusted-By strip ──────────────────────────────────────

export function TrustedBy() {
  const { isDark } = useTheme();
  return (
    <section
      style={{
        width: '100%',
        padding: '24px 32px 26px',
        borderTop: isDark ? '1px solid rgba(255,255,255,.06)' : '1px solid rgba(15,23,42,.06)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,.06)' : '1px solid rgba(15,23,42,.06)',
        background: isDark ? 'rgba(255,255,255,.015)' : '#fcfcfe',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: `${CONTAINER}px`, margin: '0 auto' }}>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.845rem',
            fontWeight: 600,
            margin: '0 0 20px',
          }}
        >
          Trusted by Learners from Top Companies &amp; Universities
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px 48px',
          }}
        >
          {trustedLogos.map(({ name, Mark }, i) => (
            <motion.span
              key={name}
              {...fadeInUp(i * 0.03)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                filter: isDark ? 'brightness(1.35) saturate(.9)' : 'none',
                transition: 'transform .2s, opacity .2s',
                cursor: 'default',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Mark />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 2. Explore Top Categories ────────────────────────────────

const topCategories = [
  { id: 1, icon: Network,      name: 'Machine Learning',           courses: 25, color: '#8b5cf6' },
  { id: 2, icon: BrainCircuit, name: 'Deep Learning',              courses: 18, color: '#10b981' },
  { id: 3, icon: MessageSquare,name: 'Natural Language Processing', courses: 15, color: '#f59e0b' },
  { id: 4, icon: Camera,       name: 'Computer Vision',            courses: 12, color: '#ef4444' },
  { id: 5, icon: Sparkles,     name: 'Generative AI',              courses: 14, color: '#8b5cf6' },
  { id: 6, icon: Users,        name: 'AI for Everyone',            courses: 20, color: '#3b82f6' },
];

export function ExploreCategories() {
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.09)';

  return (
    <HomeSection>
      <SectionHeading
        title="Explore Top Categories"
        subtitle="Choose a path and start your AI journey today"
        center
      />

      <ScrollRow step={340}>
        {topCategories.map(({ id, icon: Icon, name, courses, color }, i) => (
          <motion.div key={id} {...fadeInUp(i * 0.04)} style={{ flex: '0 0 172px' }}>
            <Link
              to={`/courses?category=${encodeURIComponent(name)}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '13px', textAlign: 'center',
                height: '100%', minHeight: '124px',
                padding: '24px 14px', borderRadius: '13px',
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
                boxShadow: isDark ? 'none' : '0 1px 4px rgba(15,23,42,.04)',
                textDecoration: 'none', transition: 'all .2s ease',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 10px 24px ${color}26`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = isDark ? 'none' : '0 1px 4px rgba(15,23,42,.04)';
              }}
            >
              <Icon size={27} color={color} strokeWidth={1.7} />
              <div>
                <p
                  style={{
                    color: 'var(--text-primary)', fontSize: '0.785rem',
                    fontWeight: 700, margin: 0, lineHeight: 1.32,
                  }}
                >
                  {name}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.685rem', margin: '4px 0 0' }}>
                  {courses} Courses
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </ScrollRow>
    </HomeSection>
  );
}

// ── 3. Featured Books & Courses ──────────────────────────────

function Stars({ rating, count }) {
  const { isDark } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', marginRight: '3px' }}>
        {rating}
      </span>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={10}
          fill={s <= Math.round(rating) ? '#fbbf24' : 'none'}
          color={s <= Math.round(rating) ? '#fbbf24' : (isDark ? '#374151' : '#cbd5e1')}
        />
      ))}
      <span style={{ fontSize: '0.645rem', color: 'var(--text-muted)', marginLeft: '3px' }}>
        ({count?.toLocaleString()})
      </span>
    </div>
  );
}

function BookFeaturedCard({ book, index = 0 }) {
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.09)';
  const discounted = book.originalPrice > book.price;
  const badge = book.isNew ? 'New' : book.isFeatured ? 'Bestseller' : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.32 }}
      style={{
        flex: '0 0 168px',
        background: 'var(--bg-card)',
        border: `1px solid ${border}`,
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all .2s ease',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 1px 4px rgba(15,23,42,.05)',
        cursor: 'pointer',
      }}
      whileHover={{
        y: -5,
        boxShadow: isDark ? '0 12px 28px rgba(0,0,0,.45)' : '0 10px 26px rgba(15,23,42,.13)',
      }}
    >
      <Link to={`/textbooks/${book.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        {/* Cover */}
        <div style={{ position: 'relative', background: isDark ? '#111827' : '#f1f5f9' }}>
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            style={{ width: '100%', height: '104px', objectFit: 'cover', display: 'block' }}
          />
          {badge && (
            <span
              style={{
                position: 'absolute', top: '7px', left: '7px',
                padding: '2px 7px', borderRadius: '4px',
                fontSize: '0.6rem', fontWeight: 700,
                color: '#422006', background: '#fbbf24',
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '11px 11px 12px' }}>
          <h4
            style={{
              color: 'var(--text-primary)', fontSize: '0.755rem', fontWeight: 700,
              lineHeight: 1.34, margin: '0 0 3px', minHeight: '2.02em',
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >
            {book.title}
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.655rem', margin: '0 0 7px' }}>
            {book.author}
          </p>
          <Stars rating={book.rating} count={book.ratingsCount} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
              <span style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{book.price.toLocaleString()}
              </span>
              {discounted && (
                <span style={{ fontSize: '0.655rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{book.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span
              aria-hidden="true"
              style={{
                width: '26px', height: '26px', borderRadius: '7px',
                background: isDark ? 'rgba(99,102,241,.2)' : '#eeecfd',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShoppingCart size={13} color={ACCENT} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedBooksAndCourses() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('books');
  const courses = getFeaturedCourses();

  const tab = (name) => ({
    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    fontFamily: 'inherit', fontSize: '0.855rem',
    fontWeight: activeTab === name ? 700 : 500,
    color: activeTab === name ? (isDark ? '#818cf8' : ACCENT) : 'var(--text-muted)',
    transition: 'color .15s',
  });

  return (
    <HomeSection bg={isDark ? 'var(--bg-secondary)' : '#fafaff'}>
      <SectionHeading
        title="Featured Books & Courses"
        link={activeTab === 'books' ? '/textbooks' : '/courses'}
        extra={
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
            <button onClick={() => setActiveTab('books')} style={tab('books')}>Books</button>
            <button onClick={() => setActiveTab('courses')} style={tab('courses')}>Courses</button>
          </div>
        }
      />

      <ScrollRow step={368}>
        {activeTab === 'books'
          ? books.map((book, i) => <BookFeaturedCard key={book.id} book={book} index={i} />)
          : courses.map((course, i) => (
            <div key={course.id} style={{ flex: '0 0 262px' }}>
              <CourseCard course={course} index={i} />
            </div>
          ))}
      </ScrollRow>
    </HomeSection>
  );
}

// ── 4. Subscription banner ───────────────────────────────────

const subscriptionFeatures = [
  'Access to 500+ Premium Courses',
  'Download eBooks & Resources',
  'Certificates on Completion',
  'Priority Support',
  'Learn at Your Own Pace',
];

/** Graduation cap resting on a book — the banner illustration. */
function CapOnBookArt() {
  return (
    <svg viewBox="0 0 170 116" fill="none" style={{ width: '160px', display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id="sub-cap" x1="20" y1="18" x2="150" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c6cf5" />
          <stop offset="1" stopColor="#5b4fe0" />
        </linearGradient>
        <linearGradient id="sub-cap-top" x1="30" y1="10" x2="140" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a99cff" />
          <stop offset="1" stopColor="#7c6cf5" />
        </linearGradient>
        <linearGradient id="sub-book-side" x1="18" y1="80" x2="152" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d5fe8" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      {/* Soft shadow */}
      <ellipse cx="86" cy="108" rx="66" ry="8" fill="#4f46e5" opacity="0.14" />

      {/* Book — side then top face */}
      <path d="M20 82v12c0 3 2 5 5 6l58 12c3 1 6 0 6-3V90L20 82Z" fill="url(#sub-book-side)" />
      <path d="M152 76v12c0 3-2 5-5 6l-58 13V90l63-14Z" fill="#3f37c9" />
      <path d="M20 82 86 66l66 10-63 14L20 82Z" fill="#f5f4ff" />
      <path d="M86 66 152 76 89 90 20 82 86 66Z" stroke="#ddd9ff" strokeWidth="1" fill="none" />
      {/* Pages hint */}
      <path d="M40 84l46-10M52 88l46-10" stroke="#d9d5fb" strokeWidth="1.4" strokeLinecap="round" />

      {/* Mortarboard base */}
      <path d="M50 52h72v10c0 6-16 11-36 11S50 68 50 62V52Z" fill="url(#sub-cap)" />
      {/* Mortarboard flat top */}
      <path d="M86 30 162 52 86 74 10 52 86 30Z" fill="url(#sub-cap-top)" />
      <path d="M86 34 148 52 86 70 24 52 86 34Z" fill="#8b7cf8" opacity="0.55" />

      {/* Tassel */}
      <path d="M150 54v18" stroke="#fbbf24" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M150 70c-3 4-3 9 0 13 3-4 3-9 0-13Z" fill="#fbbf24" />
      <circle cx="150" cy="53" r="3.4" fill="#f59e0b" />
    </svg>
  );
}

export function SubscriptionBanner() {
  const { isDark } = useTheme();

  return (
    <HomeSection>
      <motion.div
        {...fadeInUp()}
        className="sub-banner"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(79,70,229,.16) 0%, rgba(124,58,237,.11) 100%)'
            : 'linear-gradient(135deg, #f0eefe 0%, #ecebfd 55%, #efedfe 100%)',
          border: isDark ? '1px solid rgba(99,102,241,.25)' : '1px solid rgba(99,102,241,.16)',
          borderRadius: '18px',
          padding: '26px 34px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: '-46px', bottom: '-72px',
            width: '210px', height: '210px', borderRadius: '50%',
            background: isDark ? 'rgba(99,102,241,.08)' : 'rgba(99,102,241,.07)',
            pointerEvents: 'none',
          }}
        />

        <div className="sub-banner-grid">
          {/* Illustration */}
          <div className="sub-art" style={{ display: 'flex', justifyContent: 'center' }}>
            <CapOnBookArt />
          </div>

          {/* Copy */}
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.05rem, 2vw, 1.28rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: '0 0 8px',
              }}
            >
              Unlimited Learning. Unlimited Possibilities.
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.83rem',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '330px',
              }}
            >
              Get unlimited access to all books, courses, projects, and premium
              resources with our subscription plans.
            </p>
          </div>

          {/* Feature list */}
          <ul
            style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: '7px',
              minWidth: 0,
            }}
          >
            {subscriptionFeatures.map((f) => (
              <li
                key={f}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '0.755rem', color: 'var(--text-secondary)', lineHeight: 1.3,
                }}
              >
                <CheckCircle2 size={14} color={ACCENT} style={{ flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '10px', flexShrink: 0,
            }}
          >
            <Link
              to="/subscription"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '10px',
                background: '#5b4fe0',
                color: '#fff', fontSize: '0.855rem', fontWeight: 600,
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 8px 22px rgba(91,79,224,.3)',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#5b4fe0';
                e.currentTarget.style.transform = 'none';
              }}
            >
              View Plans <ArrowRight size={15} />
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.71rem', margin: 0, whiteSpace: 'nowrap' }}>
              Starting from ₹299/month
            </p>
          </div>
        </div>

        <style>{`
          .sub-banner-grid {
            position: relative;
            display: grid;
            grid-template-columns: 170px minmax(0, 1fr) auto auto;
            align-items: center;
            gap: 28px;
          }
          @media (max-width: 1000px) {
            .sub-banner-grid { grid-template-columns: 150px minmax(0, 1fr) auto; }
            .sub-banner-grid > :last-child { grid-column: 1 / -1; align-items: flex-start; }
          }
          @media (max-width: 720px) {
            .sub-banner { padding: 24px 22px; }
            .sub-banner-grid { grid-template-columns: 1fr; gap: 20px; }
            .sub-art { justify-content: flex-start !important; }
          }
        `}</style>
      </motion.div>
    </HomeSection>
  );
}

// ── 5. Testimonials ──────────────────────────────────────────

function TestimonialCard({ item, index }) {
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.09)';

  return (
    <motion.div
      {...fadeInUp(index * 0.07)}
      style={{
        flex: '0 0 350px',
        background: 'var(--bg-card)',
        border: `1px solid ${border}`,
        borderRadius: '14px',
        padding: '18px',
        boxSizing: 'border-box',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 1px 4px rgba(15,23,42,.05)',
        transition: 'all .2s ease',
      }}
      whileHover={{
        y: -4,
        boxShadow: isDark ? '0 12px 30px rgba(0,0,0,.4)' : '0 10px 26px rgba(15,23,42,.12)',
      }}
    >
      {/* Avatar + quote */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <img
          src={item.avatar}
          alt={item.name}
          loading="lazy"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            objectFit: 'cover', flexShrink: 0,
            background: isDark ? '#1e293b' : '#e2e8f0',
          }}
        />
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.79rem',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          &ldquo;{item.review}&rdquo;
        </p>
      </div>

      {/* Name / role / rating */}
      <div style={{ marginTop: '14px' }}>
        <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.805rem', margin: 0 }}>
          {item.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '3px' }}>
          <span
            style={{
              color: 'var(--text-muted)', fontSize: '0.705rem',
              minWidth: '88px', flexShrink: 0,
            }}
          >
            {item.role}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '0.735rem', fontWeight: 700, color: '#f59e0b', marginRight: '2px' }}>
              {item.rating}.0
            </span>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={11} fill="#fbbf24" color="#fbbf24" />
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const { isDark } = useTheme();
  return (
    <HomeSection bg={isDark ? 'var(--bg-secondary)' : '#fafaff'}>
      <SectionHeading
        title="What Our Learners Say"
        link="/courses"
        linkLabel="View All Reviews"
      />
      <ScrollRow step={366}>
        {homeTestimonials.map((item, i) => (
          <TestimonialCard key={item.id} item={item} index={i} />
        ))}
      </ScrollRow>
    </HomeSection>
  );
}

// ── 6. FAQ ───────────────────────────────────────────────────

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.09)';

  return (
    <motion.div
      {...fadeInUp(index * 0.04)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${open ? ACCENT : border}`,
        borderRadius: '10px',
        overflow: 'hidden',
        alignSelf: 'start',
        boxShadow: isDark ? 'none' : '0 1px 4px rgba(15,23,42,.04)',
        transition: 'border-color .2s',
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '10px',
          padding: '13px 15px',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.79rem', lineHeight: 1.4 }}>
          {faq.question}
        </span>
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,
            color: open ? ACCENT : 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .2s, color .2s',
          }}
        />
      </button>

      {open && (
        <div
          style={{
            padding: '12px 15px 14px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.06)' : 'rgba(15,23,42,.06)'}`,
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.775rem', lineHeight: 1.65, margin: 0 }}>
            {faq.answer}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function FAQ() {
  return (
    <HomeSection>
      <SectionHeading
        title="Frequently Asked Questions"
        link="/contact"
        linkLabel="View All FAQs"
      />
      <div className="faq-grid">
        {homeFaqs.map((faq, i) => (
          <FAQItem key={faq.id} faq={faq} index={i} />
        ))}
      </div>
      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: start;
          gap: 14px;
        }
        @media (max-width: 1000px) { .faq-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px)  { .faq-grid { grid-template-columns: 1fr; } }
      `}</style>
    </HomeSection>
  );
}

// ── 7. Newsletter banner ─────────────────────────────────────

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(''); }, 2600);
  };

  return (
    <section style={{ width: '100%', padding: '4px 32px 30px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: `${CONTAINER}px`, margin: '0 auto' }}>
        <motion.div
          {...fadeInUp()}
          className="news-banner"
          style={{
            background: 'linear-gradient(100deg, #5b4fe0 0%, #6d4fe6 48%, #7c3aed 100%)',
            borderRadius: '14px',
            padding: '19px 26px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative blobs */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-40px', bottom: '-56px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,.07)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', right: '-24px', top: '-46px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }} />

          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1, minWidth: 0 }}>
            <span
              style={{
                width: '42px', height: '42px', borderRadius: '11px',
                background: 'rgba(255,255,255,.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Mail size={21} color="#fff" />
            </span>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 800, margin: '0 0 3px', letterSpacing: '-0.01em' }}>
                Stay Updated
              </h3>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '0.775rem', margin: 0, lineHeight: 1.4 }}>
                Subscribe to get the latest updates on new courses and offers.
              </p>
            </div>
          </div>

          {/* Right */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', zIndex: 1, flexShrink: 0 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              aria-label="Email address"
              style={{
                padding: '10px 15px', borderRadius: '8px',
                border: 'none', background: '#fff',
                color: '#0f172a', fontSize: '0.815rem', outline: 'none',
                width: '188px', fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px', borderRadius: '8px',
                background: sent ? '#22c55e' : '#8b7cf8',
                color: '#fff', fontSize: '0.815rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all .2s', fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => { if (!sent) e.currentTarget.style.background = '#7c6ef2'; }}
              onMouseLeave={(e) => { if (!sent) e.currentTarget.style.background = '#8b7cf8'; }}
            >
              {sent ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </motion.div>

        <style>{`
          @media (max-width: 620px) {
            .news-banner form { width: 100%; }
            .news-banner input { flex: 1; width: auto !important; min-width: 140px; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ── Legacy exports kept so other pages keep compiling ────────

export function FeaturedCourses() {
  return (
    <HomeSection>
      <SectionHeading title="Featured Courses" link="/courses" linkLabel="Browse All Courses" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {getFeaturedCourses().slice(0, 4).map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </HomeSection>
  );
}

export function PopularCategories() { return null; }
export function TrendingCourses()   { return null; }
export function LearningPaths()     { return null; }
export function LatestBooks()       { return null; }
export function TopInstructors()    { return null; }
export function StudentReviews()    { return null; }
