// ============================================================
// ChatWidget — floating support bubble (bottom-right)
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,.1)' : 'rgba(15,23,42,.1)';

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              right: '28px',
              bottom: '90px',
              zIndex: 60,
              width: '272px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'var(--bg-card)',
              border: `1px solid ${border}`,
              boxShadow: isDark ? '0 24px 60px rgba(0,0,0,.6)' : '0 20px 50px rgba(15,23,42,.18)',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(100deg, #5b4fe0, #7c3aed)',
                padding: '16px 18px',
              }}
            >
              <p style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                Need help?
              </p>
              <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '0.745rem', margin: '3px 0 0', lineHeight: 1.45 }}>
                Our team usually replies within a few hours.
              </p>
            </div>

            <div style={{ padding: '8px' }}>
              {[
                { icon: Mail, label: 'Contact support', to: '/contact' },
                { icon: BookOpen, label: 'Browse FAQs', to: '/contact' },
              ].map(({ icon: Icon, label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 11px', borderRadius: '10px',
                    color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500,
                    textDecoration: 'none', transition: 'all .12s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(99,102,241,.14)' : 'rgba(79,70,229,.07)';
                    e.currentTarget.style.color = isDark ? '#a5b4fc' : '#4f46e5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <Icon size={15} color={isDark ? '#a5b4fc' : '#4f46e5'} />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? 'Close support' : 'Open support'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          right: '28px',
          bottom: '26px',
          zIndex: 60,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #5b4fe0, #7c3aed)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 28px rgba(91,79,224,.42)',
        }}
      >
        {open ? <X size={21} color="#fff" /> : <MessageCircle size={22} color="#fff" />}
      </motion.button>
    </>
  );
}
