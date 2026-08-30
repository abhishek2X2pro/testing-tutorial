// ============================================================
// CourseCard — Reference Design (DITTO match)
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Heart, Play, Clock, BarChart2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function CourseCard({ course, index = 0 }) {
  const { user, toggleWishlist, isWishlisted } = useAuth();
  const { isDark } = useTheme();

  const wishlisted = isWishlisted(course.id);
  const border = isDark ? 'rgba(255,255,255,.08)' : '#e5e7eb';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.25 }}
      style={{
        background: 'var(--bg-card)',
        border: `1.5px solid ${border}`,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark
          ? '0 2px 10px rgba(0,0,0,0.25)'
          : '0 2px 10px rgba(30,64,175,.06)',
        transition: 'all 0.2s ease',
      }}
      whileHover={{
        y: -4,
        borderColor: '#6366f1',
        boxShadow: isDark
          ? '0 10px 30px rgba(0,0,0,.4)'
          : '0 10px 30px rgba(99,102,241,.16)',
      }}
    >
      {/* ── Thumbnail Section with Overlay ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          background: isDark ? '#111827' : '#f3f4f6',
          flexShrink: 0,
        }}
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />

        {/* Play Button Overlay in center */}
        <Link
          to={`/courses/${course.slug}`}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              paddingLeft: '2px',
            }}
          >
            <Play size={16} color="#6366f1" fill="#6366f1" />
          </div>
        </Link>

        {/* Top-left Badge */}
        {course.badge && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '3px 9px',
              borderRadius: '5px',
              fontSize: '0.62rem',
              fontWeight: 800,
              color: '#111',
              background: '#fbbf24',
              letterSpacing: '0.02em',
              zIndex: 2,
            }}
          >
            {course.badge}
          </span>
        )}

        {/* Top-right Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            user && toggleWishlist(course.id);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: wishlisted ? '#ef4444' : 'rgba(0,0,0,0.45)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            zIndex: 2,
            transition: 'transform 0.15s',
          }}
        >
          <Heart size={13} fill={wishlisted ? '#fff' : 'none'} color="#fff" />
        </button>
      </div>

      {/* ── Content Section ── */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Title */}
        <Link to={`/courses/${course.slug}`} style={{ textDecoration: 'none', marginBottom: '6px' }}>
          <h3
            style={{
              color: 'var(--text-primary)',
              fontSize: '0.86rem',
              fontWeight: 700,
              lineHeight: 1.35,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {course.title}
          </h3>
        </Link>

        {/* Instructor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {course.instructor.name}
          </span>
        </div>

        {/* Rating + Students */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginBottom: '10px',
          }}
        >
          <span style={{ fontWeight: 800, color: '#f59e0b' }}>{course.rating}</span>
          <div style={{ display: 'flex', gap: '1px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={10}
                fill={s <= Math.floor(course.rating) ? '#f59e0b' : 'none'}
                color={s <= Math.floor(course.rating) ? '#f59e0b' : isDark ? '#4b5563' : '#d1d5db'}
              />
            ))}
          </div>
          <span>({(course.ratingCount / 1000).toFixed(1)}K)</span>
          <span>•</span>
          <span>{(course.students / 1000).toFixed(0)}K+ students</span>
        </div>

        {/* Duration + Level Meta Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginBottom: '12px',
            marginTop: 'auto',
            paddingTop: '8px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,.05)' : '#f3f4f6'}`,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Clock size={11} /> {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <BarChart2 size={11} /> {course.level}
          </span>
        </div>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            ₹{course.price.toLocaleString()}
          </span>
          {course.originalPrice > course.price && (
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}
            >
              ₹{course.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
