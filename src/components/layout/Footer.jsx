// ============================================================
// Footer — DevOpsX Learning (matches reference design)
// [ brand + socials ] [ Explore ] [ Company ] [ Support ] [ We Accept ]
// ============================================================

import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import { paymentMarks, SocialIcon } from '../ui/BrandMarks';
import { useTheme } from '../../context/ThemeContext';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Books',        to: '/textbooks' },
      { label: 'Courses',      to: '/courses' },
      { label: 'Live Classes', to: '/curriculum' },
      { label: 'Resources',    to: '/resources' },
      { label: 'Blog',         to: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',             to: '/about' },
      { label: 'Contact Us',           to: '/contact' },
      { label: 'Careers',              to: '/about' },
      { label: 'Become an Instructor', to: '/contact' },
      { label: 'Affiliate Program',    to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center',        to: '/contact' },
      { label: 'FAQs',               to: '/contact' },
      { label: 'Privacy Policy',     to: '/about' },
      { label: 'Terms & Conditions', to: '/about' },
      { label: 'Refund Policy',      to: '/about' },
    ],
  },
];

const socials = [
  { name: 'facebook',  href: 'https://facebook.com',  label: 'Facebook' },
  { name: 'twitter',   href: 'https://twitter.com',   label: 'Twitter' },
  { name: 'youtube',   href: 'https://youtube.com',   label: 'YouTube' },
  { name: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { name: 'linkedin',  href: 'https://linkedin.com',  label: 'LinkedIn' },
];

export default function Footer() {
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)';
  const accent = isDark ? '#818cf8' : '#4f46e5';

  return (
    <footer
      style={{
        background: isDark ? 'var(--bg-secondary)' : '#ffffff',
        borderTop: `1px solid ${border}`,
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1120px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '34px 32px 30px',
        }}
      >
        <div className="footer-grid">
          {/* ── Brand ── */}
          <div style={{ minWidth: 0 }}>
            <Link to="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              <BrandLogo size="md" />
            </Link>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.76rem',
                lineHeight: 1.65,
                margin: '16px 0 16px',
                maxWidth: '208px',
              }}
            >
              Empowering learners with quality AI education and resources.
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map(({ name, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: isDark ? 'rgba(255,255,255,.05)' : '#f6f7fb',
                    border: `1px solid ${border}`,
                    color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all .15s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,.05)' : '#f6f7fb';
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <SocialIcon name={name} size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {columns.map(({ title, links }) => (
            <div key={title} style={{ minWidth: 0 }}>
              <h4
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.815rem',
                  fontWeight: 700,
                  margin: '0 0 14px',
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.755rem',
                        textDecoration: 'none',
                        transition: 'color .15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── We Accept + copyright ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h4
              style={{
                color: 'var(--text-primary)',
                fontSize: '0.815rem',
                fontWeight: 700,
                margin: '0 0 14px',
              }}
            >
              We Accept
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {paymentMarks.map(({ name, Mark }) => (
                <Mark key={name} />
              ))}
            </div>

            <p
              className="footer-copy"
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.735rem',
                margin: '44px 0 0',
                whiteSpace: 'nowrap',
              }}
            >
              © {new Date().getFullYear()} DevOpsX Learning. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 272px repeat(3, minmax(0, 1fr)) 240px;
          gap: 22px;
          align-items: start;
        }
        @media (max-width: 1000px) {
          .footer-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 24px; }
          .footer-grid > :first-child { grid-column: 1 / -1; }
          .footer-copy { white-space: normal !important; }
        }
        @media (max-width: 620px) {
          .footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
    </footer>
  );
}
