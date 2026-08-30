// ============================================================
// Button UI Component — DevOpsX
// ============================================================

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: {
    background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 14px rgba(59,130,246,.3)',
  },
  secondary: {
    background: 'rgba(255,255,255,.07)',
    color: '#cbd5e1',
    border: '1px solid rgba(255,255,255,.12)',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#94a3b8',
    border: '1px solid rgba(255,255,255,.1)',
    boxShadow: 'none',
  },
  danger: {
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 12px rgba(220,38,38,.3)',
  },
  success: {
    background: 'linear-gradient(135deg,#10b981,#059669)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 12px rgba(16,185,129,.3)',
  },
};

const sizes = {
  xs: { padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px',  height: '30px' },
  sm: { padding: '8px 16px', fontSize: '0.8rem',  borderRadius: '10px', height: '34px' },
  md: { padding: '10px 20px',fontSize: '0.875rem',borderRadius: '12px', height: '40px' },
  lg: { padding: '12px 24px',fontSize: '0.9375rem',borderRadius:'14px', height: '48px' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  type = 'button',
  onClick,
  className = '',
}) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { opacity: 0.9, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ ...v, ...s }}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : Icon ? (
        <Icon size={14} />
      ) : null}
      {children}
    </motion.button>
  );
}
