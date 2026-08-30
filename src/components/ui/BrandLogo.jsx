// ============================================================
// BrandLogo — DevOpsX Learning (Shared Brand Component)
// ============================================================
// Usage:
//   <BrandLogo size="md" />          → default (navbar / footer)
//   <BrandLogo size="lg" />          → auth pages
//   <BrandLogo size="sm" />          → compact
//   <BrandLogo iconOnly />           → collapsed sidebar icon
//   <BrandLogo tagline={false} />    → hide the "Learn AI. Build Future." line
// ============================================================

// Brain / neural-network mark drawn inline so it renders identically everywhere.
function BrainMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ flexShrink: 0, display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brand-brain" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <g stroke="url(#brand-brain)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Left hemisphere */}
        <path d="M19 7.5c-2.6-2-6.6-1.3-8.1 1.6-2.6.3-4.4 2.4-4.2 4.9-2.2 1.4-2.7 4.3-1 6.2-1 2.4.2 5.1 2.7 5.9.3 2.6 2.7 4.4 5.2 3.9 1.2 1.9 3.7 2.5 5.4 1.2" />
        {/* Right hemisphere */}
        <path d="M21 7.5c2.6-2 6.6-1.3 8.1 1.6 2.6.3 4.4 2.4 4.2 4.9 2.2 1.4 2.7 4.3 1 6.2 1 2.4-.2 5.1-2.7 5.9-.3 2.6-2.7 4.4-5.2 3.9-1.2 1.9-3.7 2.5-5.4 1.2" />
        {/* Central stem */}
        <path d="M20 8.6v22.6" />
        {/* Synapse branches */}
        <path d="M20 15h-4.6M20 22.5h-4.6M20 15h4.6M20 22.5h4.6" />
      </g>
      {/* Nodes */}
      <g fill="url(#brand-brain)">
        <circle cx="13.4" cy="15" r="2.1" />
        <circle cx="13.4" cy="22.5" r="2.1" />
        <circle cx="26.6" cy="15" r="2.1" />
        <circle cx="26.6" cy="22.5" r="2.1" />
      </g>
    </svg>
  );
}

export default function BrandLogo({
  size = 'md',
  iconOnly = false,
  tagline = true,
  className = '',
}) {
  const sizes = {
    sm: { icon: 26, textSize: '0.95rem', tagSize: '0.55rem', gap: '8px' },
    md: { icon: 34, textSize: '1.15rem', tagSize: '0.62rem', gap: '10px' },
    lg: { icon: 44, textSize: '1.5rem',  tagSize: '0.75rem', gap: '12px' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: iconOnly ? 0 : s.gap,
        textDecoration: 'none',
      }}
    >
      <BrainMark size={s.icon} />

      {!iconOnly && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: s.textSize,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            DevOpsX Learning
          </span>
          {tagline && (
            <span
              style={{
                fontSize: s.tagSize,
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.01em',
                marginTop: '3px',
                whiteSpace: 'nowrap',
              }}
            >
              Learn AI. Build Future.
            </span>
          )}
        </span>
      )}
    </span>
  );
}
