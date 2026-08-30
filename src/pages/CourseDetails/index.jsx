// ============================================================
// CourseDetails Page — 1:1 Pixel-Perfect Reference Match
// ============================================================

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Star,
  Play,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Code2,
  Folder,
  Download,
  Monitor,
  Award,
  Globe,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  User,
  Calendar,
  BarChart2,
} from 'lucide-react';
import { getCourseBySlug, courses } from '../../data/courses';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function CourseDetails() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const { user, isEnrolled, toggleWishlist, isWishlisted } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('about');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  if (!course) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>
            Course Not Found
          </h2>
          <button
            onClick={() => navigate('/courses')}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Back to Courses
          </button>
        </div>
      </PageWrapper>
    );
  }

  const wishlisted = isWishlisted(course.id);
  const originalPrice = course.originalPrice || Math.round(course.price * 2);
  const discountPercent = Math.round(((originalPrice - course.price) / originalPrice) * 100);

  const whatYoullLearn = [
    'Build machine learning models from scratch',
    'Deploy ML models in real-world applications',
    'Implement regression, classification & clustering',
    'Understand model evaluation techniques',
    'Work with Python and R for ML projects',
    'Build and evaluate recommendation systems',
    'Handle real-world datasets and missing data',
    'Create end-to-end ML projects',
  ];

  const studentsAlsoBought = courses
    .filter((c) => c.id !== course.id)
    .slice(0, 3);

  const handleEnroll = () => {
    toast.success(`Enrolling in "${course.title}"...`);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    toast.success(`Added "${course.title}" to your cart!`);
  };

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 28px 56px' }}>
        {/* ── BREADCRUMB ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <Link
            to="/courses"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Courses
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{course.title}</span>
        </div>

        {/* ── TOP HERO AREA (3 COLUMNS: VIDEO PLAYER | INFO | STICKY BUY CARD) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 330px) minmax(0, 1fr) 290px',
            gap: '20px',
            alignItems: 'start',
            marginBottom: '32px',
          }}
        >
          {/* COLUMN 1: Video Player */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/10',
              borderRadius: '14px',
              overflow: 'hidden',
              background: '#0a0f1d',
              border: `1px solid ${border}`,
              boxShadow: '0 10px 30px rgba(0,0,0,.25)',
            }}
          >
            {isPlayingVideo ? (
              <iframe
                src="https://www.youtube.com/embed/Nftif8BrGMo?autoplay=1"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                title="Course Preview"
              />
            ) : (
              <div
                onClick={() => setIsPlayingVideo(true)}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                {/* Play Button Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: '3px',
                      boxShadow: '0 8px 24px rgba(0,0,0,.4)',
                    }}
                  >
                    <Play size={24} color="#6366f1" fill="#6366f1" />
                  </div>
                </div>

                {/* Bottom Bar on Video */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '10px 14px',
                    background: 'linear-gradient(to top, rgba(0,0,0,.85), transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Play size={12} fill="#fff" /> Preview this course
                  </span>
                  <span>Watch Trailer &nbsp; 02:35</span>
                </div>
              </div>
            )}
          </div>

          {/* COLUMN 2: Course Info & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
            {/* Badge */}
            <div>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#111',
                  background: '#fbbf24',
                  padding: '3px 10px',
                  borderRadius: '5px',
                  letterSpacing: '0.02em',
                }}
              >
                {course.badge || 'Bestseller'}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {course.title}
            </h1>

            {/* Subtitle */}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
              {course.description}
            </p>

            {/* Ratings & Students */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.76rem',
                color: 'var(--text-muted)',
              }}
            >
              <span style={{ fontWeight: 800, color: '#f59e0b' }}>{course.rating}</span>
              <div style={{ display: 'flex', gap: '1px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    fill={s <= Math.floor(course.rating) ? '#f59e0b' : 'none'}
                    color={s <= Math.floor(course.rating) ? '#f59e0b' : isDark ? '#4b5563' : '#d1d5db'}
                  />
                ))}
              </div>
              <span>({(course.ratingCount || 12400).toLocaleString()} reviews)</span>
              <span>|</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {(course.students || 250000).toLocaleString()}+ students
              </span>
              <span>|</span>
              <span>Last updated 5/2024</span>
            </div>

            {/* Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px 12px',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
                fontSize: '0.74rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.66rem' }}>
                  Created by
                </span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  {course.instructor.name}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.66rem' }}>
                  Level
                </span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  {course.level}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.66rem' }}>
                  Duration
                </span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  {course.duration}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.66rem' }}>
                  Lectures
                </span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  {course.lessons || 352}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.66rem' }}>
                  Language
                </span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  English
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.66rem' }}>
                  Certificate
                </span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                  Yes
                </strong>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
              <button
                onClick={handleEnroll}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(99,102,241,.35)',
                  transition: 'all .15s',
                }}
              >
                Enroll Now
              </button>

              <button
                onClick={handleAddToCart}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: isDark ? 'rgba(99,102,241,.12)' : '#eef2ff',
                  border: `1.5px solid ${isDark ? 'rgba(99,102,241,.3)' : '#c7d2fe'}`,
                  color: '#6366f1',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all .15s',
                }}
              >
                <ShoppingCart size={15} /> Add to Cart
              </button>

              <button
                onClick={() => user && toggleWishlist(course.id)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: `1px solid ${border}`,
                  color: wishlisted ? '#ef4444' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Heart size={14} fill={wishlisted ? '#ef4444' : 'none'} /> Wishlist
              </button>

              <button
                onClick={() => toast.success('Link copied to clipboard!')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: `1px solid ${border}`,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>

          {/* COLUMN 3: Right Sticky Buy Box */}
          <div
            style={{
              position: 'sticky',
              top: '80px',
              background: 'var(--bg-card)',
              border: `1.5px solid ${border}`,
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: isDark
                ? '0 10px 30px rgba(0,0,0,.4)'
                : '0 10px 30px rgba(99,102,241,.12)',
            }}
          >
            {/* Price Header */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                }}
              >
                ₹{course.price.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'line-through',
                }}
              >
                ₹{originalPrice.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#10b981',
                  background: 'rgba(16,185,129,.12)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {discountPercent}% OFF
              </span>
            </div>

            {/* Full-width Enroll & Add to Cart */}
            <button
              onClick={handleEnroll}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(99,102,241,.35)',
              }}
            >
              Enroll Now
            </button>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1.5px solid #6366f1',
                color: '#6366f1',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>

            <p
              style={{
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                margin: 0,
              }}
            >
              30-Day Money Back Guarantee
            </p>

            <div style={{ height: '1px', background: border }} />

            {/* This course includes list */}
            <div>
              <p
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  margin: '0 0 12px',
                }}
              >
                This course includes:
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '9px',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Video size={14} color="#6366f1" />
                  <span>{course.duration} on-demand video</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={14} color="#6366f1" />
                  <span>{course.lessons || 352} lectures</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Code2 size={14} color="#6366f1" />
                  <span>25 coding exercises</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Folder size={14} color="#6366f1" />
                  <span>15 real-world projects</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Download size={14} color="#6366f1" />
                  <span>Downloadable resources</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={14} color="#6366f1" />
                  <span>Full lifetime access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Monitor size={14} color="#6366f1" />
                  <span>Access on mobile and TV</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={14} color="#6366f1" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABBED NAVIGATION AREA (About | Curriculum | Instructor | Reviews | Q&A) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 310px',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* Left Area: Tabs Header & Tab Content */}
          <div>
            {/* Tabs Header */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                borderBottom: `1px solid ${border}`,
                marginBottom: '28px',
              }}
            >
              {[
                { id: 'about', label: 'About' },
                { id: 'curriculum', label: 'Curriculum' },
                { id: 'instructor', label: 'Instructor' },
                { id: 'reviews', label: 'Reviews (12.4K)' },
                { id: 'qna', label: 'Q&A' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '12px 4px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                    color: activeTab === tab.id ? '#6366f1' : 'var(--text-muted)',
                    fontSize: '0.88rem',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              {/* Main Column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* What you'll learn (2-column checkmark box) */}
                <div
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${border}`,
                    borderRadius: '14px',
                    padding: '24px',
                  }}
                >
                  <h3
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.96rem',
                      fontWeight: 800,
                      margin: '0 0 16px',
                    }}
                  >
                    What you'll learn
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px 20px',
                    }}
                  >
                    {whatYoullLearn.map((pt, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.45,
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color="#6366f1"
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Description */}
                <div>
                  <h3
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.96rem',
                      fontWeight: 800,
                      margin: '0 0 12px',
                    }}
                  >
                    Course Description
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    This course is your complete guide to Machine Learning using Python and R. You
                    will learn all the essential algorithms, build real-world projects, and gain
                    the skills needed to become a Machine Learning expert.
                  </p>
                  {showFullDesc && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ marginTop: '12px' }}
                    >
                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.84rem',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        Covering Supervised Learning (Linear Regression, Logistic Regression, Decision
                        Trees, Random Forests, SVMs) and Unsupervised Learning (K-Means Clustering,
                        Hierarchical Clustering, PCA), this course combines deep theoretical intuition
                        with hands-on Python &amp; R code templates you can use in your own portfolio!
                      </p>
                    </motion.div>
                  )}
                  <button
                    onClick={() => setShowFullDesc((p) => !p)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6366f1',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '8px',
                      padding: 0,
                    }}
                  >
                    {showFullDesc ? 'Show less' : 'Show more'}
                    {showFullDesc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Specification Box on Right of Tab Content */}
              <div
                style={{
                  width: '210px',
                  flexShrink: 0,
                  background: 'var(--bg-card)',
                  border: `1px solid ${border}`,
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontSize: '0.78rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BarChart2 size={13} color="#6366f1" /> Level
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{course.level}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} color="#6366f1" /> Total Hours
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{course.duration}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={13} color="#6366f1" /> Lectures
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{course.lessons || 352}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Folder size={13} color="#6366f1" /> Projects
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>15</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={13} color="#6366f1" /> Language
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>English</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="#6366f1" /> Last Updated
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>May 2024</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column below Sticky Card: Students Also Bought */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${border}`,
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h4
              style={{
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 800,
                margin: 0,
              }}
            >
              Students also bought
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {studentsAlsoBought.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    navigate(`/courses/${rel.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '8px',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark
                      ? 'rgba(255,255,255,.04)'
                      : 'rgba(99,102,241,.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    style={{
                      width: '64px',
                      height: '44px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        margin: '0 0 3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {rel.title}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#f59e0b' }}>{rel.rating}</span>
                      <Star size={9} color="#f59e0b" fill="#f59e0b" />
                      <span>({(rel.ratingCount / 1000).toFixed(1)}K)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ₹{rel.price.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                          textDecoration: 'line-through',
                        }}
                      >
                        ₹{rel.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/courses"
              style={{
                color: '#6366f1',
                fontSize: '0.78rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px',
              }}
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── TRUST FOOTER STRIP ── */}
        <div
          style={{
            marginTop: '48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            padding: '20px 24px',
            borderRadius: '14px',
            background: 'var(--bg-card)',
            border: `1px solid ${border}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isDark ? 'rgba(99,102,241,.14)' : 'rgba(99,102,241,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Monitor size={18} color="#6366f1" />
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                Learn at your own pace
              </strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Study anytime, anywhere
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isDark ? 'rgba(99,102,241,.14)' : 'rgba(99,102,241,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <User size={18} color="#6366f1" />
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                Expert instructors
              </strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Learn from industry experts
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isDark ? 'rgba(99,102,241,.14)' : 'rgba(99,102,241,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Folder size={18} color="#6366f1" />
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                Hands-on projects
              </strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Build real-world applications
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isDark ? 'rgba(99,102,241,.14)' : 'rgba(99,102,241,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Award size={18} color="#6366f1" />
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                Certificate included
              </strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Share on LinkedIn &amp; resume
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
