// ============================================================
// BookCard — Reference Design (compact grid card)
// ============================================================

import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function BookCard({ book, index = 0 }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const discount = book.originalPrice > book.price
    ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;

  const border = isDark ? 'rgba(255,255,255,.08)' : '#e5e7eb';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.25 }}
      onClick={() => navigate(`/textbooks/${book.id}`)}
      style={{
        background: 'var(--bg-card)',
        border: `1.5px solid ${border}`,
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      whileHover={{
        y: -4,
        borderColor: '#6366f1',
        boxShadow: isDark
          ? '0 10px 30px rgba(0,0,0,.4)'
          : '0 10px 30px rgba(99,102,241,.18)',
      }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: isDark ? '#111827' : '#f3f4f6', flexShrink: 0 }}>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        {/* Badges */}
        {book.isNew && (
          <span style={{ position: 'absolute', top: '8px', left: '8px', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 700, color: '#fff', background: '#6366f1' }}>
            NEW
          </span>
        )}
        {discount >= 30 && !book.isNew && (
          <span style={{ position: 'absolute', top: '8px', left: '8px', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 700, color: '#111', background: '#fbbf24' }}>
            BESTSELLER
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Title */}
        <h3
          style={{
            color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700,
            lineHeight: 1.35, margin: '0 0 3px',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {book.title}
        </h3>

        {/* Author */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.67rem', margin: '0 0 7px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {book.author}
        </p>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f59e0b' }}>{book.rating}</span>
          <div style={{ display: 'flex', gap: '1px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={10}
                fill={s <= Math.floor(book.rating) ? '#f59e0b' : 'none'}
                color={s <= Math.floor(book.rating) ? '#f59e0b' : (isDark ? '#4b5563' : '#d1d5db')}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>({book.ratingsCount?.toLocaleString()})</span>
        </div>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ₹{book.price}
            </span>
            {book.originalPrice > book.price && (
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={(e) => { e.stopPropagation(); }}
            style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: isDark ? 'rgba(99,102,241,.2)' : 'rgba(99,102,241,.1)',
              border: `1px solid ${isDark ? 'rgba(99,102,241,.3)' : 'rgba(99,102,241,.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all .15s', flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#6366f1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? 'rgba(99,102,241,.2)' : 'rgba(99,102,241,.1)'; }}
          >
            <ShoppingCart size={13} color="#6366f1" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
