// ============================================================
// PageWrapper — Shared layout wrapper for all resource pages
// ============================================================

import { motion } from 'framer-motion';

/**
 * Consistent page container used by all resource pages.
 * Prevents overflow with sidebar, adds proper padding.
 */
export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        padding: '28px 20px 60px',
        background: 'var(--bg-primary)',
        overflowX: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Page header section — title, subtitle, optional badge + actions
 */
export function PageHeader({ icon: Icon, iconColor = '#3b82f6', badge, title, subtitle, actions }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {badge && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.25)', color: 'var(--text-accent)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
          {Icon && <Icon size={12} color={iconColor} />}
          {badge}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {Icon && !badge && (
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: `${iconColor}18`, border: `1px solid ${iconColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={20} style={{ color: iconColor }} />
            </div>
          )}
          <div>
            <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '4px 0 0' }}>{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>{actions}</div>}
      </div>
    </div>
  );
}

/**
 * Filter pill button
 */
export function FilterPill({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        border: active ? 'none' : '1px solid rgba(255,255,255,.1)',
        background: active ? (color ? `${color}33` : 'linear-gradient(135deg,#3b82f6,#06b6d4)') : 'rgba(255,255,255,.04)',
        color: active ? (color || '#fff') : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
        outline: active && color ? `1px solid ${color}66` : 'none',
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.color = '#fff'; } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
    >
      {label}
    </button>
  );
}

/**
 * Thin horizontal divider
 */
export function Divider() {
  return <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />;
}

/**
 * Section card — consistent card container
 */
export function PageCard({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      padding: '20px',
      ...style,
    }}>
      {children}
    </div>
  );
}
