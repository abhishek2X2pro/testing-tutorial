// ============================================================
// ReviewCard Component — DevOpsX (Ultra-Professional Design)
// ============================================================

import { motion } from 'framer-motion';
import { Quote, ThumbsUp, CheckCircle2, Star } from 'lucide-react';

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.25 }}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
      }}
      whileHover={{
        transform: 'translateY(-3px)',
        borderColor: 'rgba(59,130,246,0.3)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
      }}
    >
      {/* Background Subtle Quote Icon */}
      <div style={{ position: 'absolute', top: '16px', right: '18px', opacity: 0.12, pointerEvents: 'none' }}>
        <Quote size={38} color="#60a5fa" fill="#60a5fa" />
      </div>

      {/* Top Stars & Verified Pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={13}
              color={i < review.rating ? '#fbbf24' : '#374151'}
              fill={i < review.rating ? '#fbbf24' : 'none'}
            />
          ))}
        </div>
        {review.verified && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: 'rgba(16,185,129,.12)', color: '#34d399', border: '1px solid rgba(16,185,129,.25)' }}>
            <CheckCircle2 size={10} color="#34d399" /> Verified Student
          </span>
        )}
      </div>

      {/* Review Text */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        margin: '0 0 18px',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        fontStyle: 'italic',
      }}>
        "{review.review}"
      </p>

      {/* Author Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        paddingTop: '14px', borderTop: '1px solid var(--border-subtle)',
        marginTop: 'auto',
      }}>
        <img
          src={review.avatar}
          alt={review.name}
          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(59,130,246,.35)', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {review.name}
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {review.role}
          </p>
        </div>

        {review.helpful > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>
            <ThumbsUp size={11} color="#60a5fa" />
            <span>{review.helpful}</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
