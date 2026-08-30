// ============================================================
// BrandMarks — company wordmarks + payment marks
// Hand-built so they render in brand colours without any
// external image requests (matches the reference design).
// ============================================================

const wordmark = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1,
  userSelect: 'none',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
};

// ── Company logos (Trusted-By strip) ─────────────────────────

function Google({ size = 22 }) {
  const letters = [
    ['G', '#4285F4'], ['o', '#EA4335'], ['o', '#FBBC05'],
    ['g', '#4285F4'], ['l', '#34A853'], ['e', '#EA4335'],
  ];
  return (
    <span style={{ ...wordmark, fontSize: size, fontWeight: 500, letterSpacing: '-0.045em' }} aria-label="Google">
      {letters.map(([ch, color], i) => (
        <span key={i} style={{ color }}>{ch}</span>
      ))}
    </span>
  );
}

function Microsoft({ size = 20 }) {
  const sq = size * 0.42;
  const cells = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'];
  return (
    <span style={{ ...wordmark, gap: size * 0.36 }} aria-label="Microsoft">
      <span
        style={{
          display: 'grid',
          gridTemplateColumns: `${sq}px ${sq}px`,
          gridTemplateRows: `${sq}px ${sq}px`,
          gap: size * 0.08,
        }}
      >
        {cells.map((c) => (
          <span key={c} style={{ background: c, display: 'block' }} />
        ))}
      </span>
      <span style={{ fontSize: size, fontWeight: 600, color: '#5E5E5E', letterSpacing: '-0.02em' }}>
        Microsoft
      </span>
    </span>
  );
}

function Amazon({ size = 21 }) {
  return (
    <span style={{ ...wordmark, flexDirection: 'column', gap: size * 0.06 }} aria-label="Amazon">
      <span style={{ fontSize: size, fontWeight: 700, color: '#232F3E', letterSpacing: '-0.04em' }}>
        amazon
      </span>
      <svg width={size * 3.5} height={size * 0.42} viewBox="0 0 74 9" fill="none" style={{ marginTop: -size * 0.12 }}>
        <path
          d="M2 3.4C13 8.3 27 10.4 40 9.4c9-.7 17-3 24-6.6"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M63 1.2 68.5 3.1 62.8 5.6Z" fill="#FF9900" />
      </svg>
    </span>
  );
}

function IBM({ size = 23 }) {
  return (
    <span
      aria-label="IBM"
      style={{
        ...wordmark,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        background: 'repeating-linear-gradient(180deg, #1F70C1 0 2px, transparent 2px 4px)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      IBM
    </span>
  );
}

function Deloitte({ size = 21 }) {
  return (
    <span style={{ ...wordmark, fontSize: size, fontWeight: 700, color: '#26282A', letterSpacing: '-0.035em' }} aria-label="Deloitte">
      Deloitte
      <span style={{ color: '#86BC25' }}>.</span>
    </span>
  );
}

function Infosys({ size = 21 }) {
  return (
    <span style={{ ...wordmark, fontSize: size, fontWeight: 500, color: '#007CC3', letterSpacing: '-0.01em' }} aria-label="Infosys">
      Infosys
    </span>
  );
}

function TCS({ size = 22 }) {
  return (
    <span style={{ ...wordmark, fontSize: size, fontWeight: 600, color: '#0E6BA8', letterSpacing: '-0.02em' }} aria-label="TCS">
      tcs
    </span>
  );
}

function UniversityCrest({ size = 26 }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 26 30" fill="none" aria-label="Universities" role="img">
      <path
        d="M13 1 24 4.6v11.1c0 6.2-4.4 11-11 13.3-6.6-2.3-11-7.1-11-13.3V4.6L13 1Z"
        fill="#1E3A8A"
      />
      <path
        d="M13 3.1 22 6.1v9.6c0 5.2-3.6 9.3-9 11.3-5.4-2-9-6.1-9-11.3V6.1l9-3Z"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.9"
        fill="none"
      />
      {/* Open book */}
      <path d="M6.6 13.3h5.6v6.4c-1.6-1-3.7-1.3-5.6-1.1v-5.3Z" fill="#fff" opacity="0.95" />
      <path d="M19.4 13.3h-5.6v6.4c1.6-1 3.7-1.3 5.6-1.1v-5.3Z" fill="#fff" opacity="0.95" />
      <path d="M13 12.4v7.6" stroke="#1E3A8A" strokeWidth="0.9" />
      {/* Torch / star above */}
      <path d="M13 6.4l1.1 2.3 2.5.3-1.8 1.7.4 2.5-2.2-1.2-2.2 1.2.4-2.5-1.8-1.7 2.5-.3L13 6.4Z" fill="#FBBF24" />
      {/* Base ribbon */}
      <path d="M5.6 21.4h14.8v1.5H5.6z" fill="#fff" opacity="0.85" />
    </svg>
  );
}

export const trustedLogos = [
  { name: 'Google',       Mark: Google },
  { name: 'Microsoft',    Mark: Microsoft },
  { name: 'Amazon',       Mark: Amazon },
  { name: 'IBM',          Mark: IBM },
  { name: 'Deloitte',     Mark: Deloitte },
  { name: 'Infosys',      Mark: Infosys },
  { name: 'TCS',          Mark: TCS },
  { name: 'Universities', Mark: UniversityCrest },
];

// ── Social glyphs ────────────────────────────────────────────
// lucide-react v1 dropped brand icons, so these are drawn here
// in the same 24×24 stroke style as the rest of the icon set.

const socialPaths = {
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  twitter: (
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 12 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  ),
  youtube: (
    <>
      <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

export function SocialIcon({ name, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {socialPaths[name]}
    </svg>
  );
}

// ── Payment marks (footer "We Accept") ───────────────────────

const payBadge = {
  height: '24px',
  minWidth: '38px',
  padding: '0 5px',
  borderRadius: '4px',
  background: '#ffffff',
  border: '1px solid rgba(15,23,42,.12)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  flexShrink: 0,
};

function Visa() {
  return (
    <span style={payBadge} aria-label="Visa">
      <span
        style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800, fontStyle: 'italic',
          fontSize: '0.7rem', color: '#1A1F71', letterSpacing: '-0.02em', lineHeight: 1,
        }}
      >
        VISA
      </span>
    </span>
  );
}

function Mastercard() {
  return (
    <span style={payBadge} aria-label="Mastercard">
      <svg width="25" height="15" viewBox="0 0 28 17" fill="none">
        <circle cx="10" cy="8.5" r="7" fill="#EB001B" />
        <circle cx="18" cy="8.5" r="7" fill="#F79E1B" />
        <path
          d="M14 2.6a7 7 0 0 0 0 11.8 7 7 0 0 0 0-11.8Z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  );
}

function Amex() {
  return (
    <span style={{ ...payBadge, background: '#016FD0', border: '1px solid #016FD0' }} aria-label="American Express">
      <span
        style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          fontSize: '0.46rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05,
          textAlign: 'center',
        }}
      >
        AMEX
      </span>
    </span>
  );
}

function RuPay() {
  return (
    <span style={payBadge} aria-label="RuPay">
      <span
        style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          fontSize: '0.63rem', letterSpacing: '-0.03em', lineHeight: 1,
        }}
      >
        <span style={{ color: '#097A3D' }}>Ru</span>
        <span style={{ color: '#F26F21' }}>Pay</span>
      </span>
    </span>
  );
}

function UPI() {
  return (
    <span style={payBadge} aria-label="UPI">
      <span
        style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800,
          fontSize: '0.64rem', letterSpacing: '-0.02em', lineHeight: 1,
          display: 'inline-flex', alignItems: 'center', gap: '2px',
        }}
      >
        <span style={{ color: '#F26F21' }}>U</span>
        <span style={{ color: '#097A3D' }}>P</span>
        <span style={{ color: '#0B4A8F' }}>I</span>
      </span>
    </span>
  );
}

export const paymentMarks = [
  { name: 'Visa', Mark: Visa },
  { name: 'Mastercard', Mark: Mastercard },
  { name: 'Amex', Mark: Amex },
  { name: 'RuPay', Mark: RuPay },
  { name: 'UPI', Mark: UPI },
];
