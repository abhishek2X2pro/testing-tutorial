// ============================================================
// BookDetailModal — Rich Book Description Modal (Image Reference UI Style)
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ShoppingCart, PlayCircle, Star, CheckCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

export default function BookDetailModal({ book, isOpen, onClose }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (!isOpen || !book) return null;

  const handleDownload = () => {
    toast.success(`Downloading PDF for "${book.title}"...`);
    if (book.downloadUrl && book.downloadUrl !== '#') {
      window.open(book.downloadUrl, '_blank');
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added "${book.title}" to your cart!`);
  };

  const handleWatchVideo = () => {
    toast.success(`Opening video tutorial preview for "${book.title}"...`);
  };

  const handleOpenFullPage = () => {
    onClose();
    navigate(`/textbooks/${book.id}`);
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', overflowY: 'auto',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'relative', width: '100%', maxWidth: '1080px',
            maxHeight: '92vh', overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px', padding: '36px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            color: 'var(--text-primary)',
          }}
        >
          {/* Header Action Buttons (Open Full Page + Close) */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleOpenFullPage}
              title="Open full page view"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '8px',
                background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.borderColor = '#2563eb'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
            >
              <ExternalLink size={14} /> Full Page
            </button>

            <button
              onClick={onClose}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = '#2563eb'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Main 2-Column Layout matching User Reference Image */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}>

            {/* Left Column: Book Cover Image & "About the Book!" */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '340px' }}>
              {/* Cover Image Frame */}
              <div style={{
                width: '100%', aspectRatio: '3/4', borderRadius: '16px',
                overflow: 'hidden', border: '1px solid var(--border-subtle)',
                background: isDark ? '#111827' : '#f8fafc', boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
              }}>
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* About the Book Section (Under Left Cover Image) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  margin: 0,
                }}>
                  About the Book!
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                  {book.description}
                </p>

                {book.whatYoullLearn && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    {book.whatYoullLearn.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Category, Title, Subtitle, Price, Actions, Stats & Explore Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Category / Grade Header Tag */}
              <span style={{
                fontSize: '0.8rem', fontWeight: 700, color: '#2563eb',
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                {book.gradeLabel || `${book.category} • Grade Level`}
              </span>

              {/* Book Main Title */}
              <h1 style={{
                color: 'var(--text-primary)', fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900,
                lineHeight: 1.25, margin: 0, letterSpacing: '-0.02em',
              }}>
                {book.title}
              </h1>

              {/* Subtitle / Key Highlights */}
              <p style={{
                color: 'var(--text-secondary)', fontSize: '0.92rem',
                lineHeight: 1.55, margin: 0, fontWeight: 500,
              }}>
                {book.subtitle || book.description}
              </p>

              {/* Meta Row: Edition, Publisher, Format */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <span>{book.edition || 'English Edition'}</span>
                <span>•</span>
                <span>By {book.author}</span>
                <span>•</span>
                <span>Format {book.format || 'PDF'}</span>
              </div>

              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Created by <strong style={{ color: 'var(--text-primary)' }}>{book.publisher || 'DevOpsX Learning'}</strong>
              </span>

              {/* Price Tag */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '2px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>From</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  ₹{(book.price || 500).toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{(book.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Action Buttons Stack (Reference Image style) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '4px 0 8px' }}>
                <button
                  onClick={handleDownload}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px 20px', borderRadius: '9px', border: 'none',
                    background: '#2563eb', color: '#fff', fontSize: '0.92rem', fontWeight: 800,
                    cursor: 'pointer', transition: 'background 0.15s', boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                >
                  <Download size={17} /> Download PDF
                </button>

                <button
                  onClick={handleAddToCart}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '11px 20px', borderRadius: '9px',
                    background: 'transparent', border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.borderColor = '#2563eb'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <ShoppingCart size={16} /> Add To Cart
                </button>

                <button
                  onClick={handleWatchVideo}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '10px 20px', borderRadius: '9px', background: 'transparent',
                    border: 'none', color: '#2563eb', fontSize: '0.9rem', fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <PlayCircle size={17} color="#2563eb" /> Watch Video Tutorial
                </button>
              </div>

              {/* Ratings & Learners Counter Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '14px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)' }}>{book.rating || 4.6}</span>
                    <Star size={15} color="#fbbf24" fill="#fbbf24" />
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {(book.ratingsCount || 2609).toLocaleString()} ratings
                  </span>
                </div>

                <div style={{ height: '28px', width: '1px', background: 'var(--border-subtle)' }} />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                      {(book.learnersCount || 33243).toLocaleString()}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>learners</span>
                </div>
              </div>

              {/* Explore More Content for This Book Section */}
              <div style={{ marginTop: '8px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, margin: '0 0 12px' }}>
                  Explore more content for this book
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px' }}>
                  {(book.exploreMoreContent || [
                    'Ebook', 'Courses', 'Assignments', 'Syllabus', 'Videos',
                    'AI Art gallery', 'AI tool and Comparison', 'AI small projects', 'AI Chatbots overview and creation'
                  ]).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#2563eb', fontWeight: 900, fontSize: '1.05rem' }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* RECOMMENDED GRADES SECTION INSIDE MODAL */}
          {/* ============================================================ */}
          <div style={{
            marginTop: '36px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb' }}>
                RECOMMENDED GRADE TRACKS
              </span>
              <h3 style={{
                color: 'var(--text-primary)', fontFamily: 'var(--font-display)',
                fontSize: '1.35rem', fontWeight: 900, margin: '4px 0 0',
              }}>
                Recommended Grades for "{book.title}"
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}>
              {[
                {
                  id: 'grade-5-8', label: 'Class 5 – 8', sublabel: 'Middle School', accent: '#059669',
                  desc: 'Foundation courses, guided learning & AI tool practice',
                  image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop',
                },
                {
                  id: 'grade-9-12', label: 'Class 9 – 12', sublabel: 'High School', accent: '#2563eb',
                  desc: 'Syllabus courses, AI projects & board exam prep',
                  image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop',
                },
                {
                  id: 'college', label: 'College / Graduate', sublabel: 'Undergraduate & above', accent: '#7c3aed',
                  desc: 'Advanced AI, ML, Python & DevOps certifications',
                  image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop',
                },
              ].map((g) => {
                const isMatched = (
                  (book.gradeLabel || '').toLowerCase().includes(g.id.replace('grade-', '')) ||
                  (g.id === 'grade-5-8' && (book.title.includes('5-8') || book.gradeLabel?.includes('5-8'))) ||
                  (g.id === 'grade-9-12' && (book.gradeLabel?.includes('9-12') || book.gradeLabel?.includes('12'))) ||
                  (g.id === 'college' && (book.gradeLabel?.includes('College') || book.gradeLabel?.includes('Professional')))
                );

                return (
                  <div
                    key={g.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: `1.5px solid ${isMatched ? g.accent : 'var(--border-subtle)'}`,
                      borderRadius: '14px', overflow: 'hidden', padding: '14px',
                      display: 'flex', flexDirection: 'column', gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: g.accent, textTransform: 'uppercase' }}>
                      {isMatched ? '★ Recommended' : g.sublabel}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>{g.label}</h4>
                    <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)' }}>{g.desc}</p>
                    <button
                      onClick={handleOpenFullPage}
                      style={{
                        marginTop: 'auto', padding: '7px 12px', borderRadius: '6px', border: 'none',
                        background: isMatched ? g.accent : 'var(--bg-glass-hover)',
                        color: isMatched ? '#fff' : 'var(--text-primary)',
                        fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                      }}
                    >
                      {isMatched ? 'Selected Grade' : 'View Details'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

