// ============================================================
// AuthLayout — Centered layout for Login/Register pages
// ============================================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute w-96 h-96 rounded-full opacity-20 -top-20 -left-20"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        <div className="blob blob-delay-2 absolute w-80 h-80 rounded-full opacity-15 -bottom-10 -right-10"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
        <div className="bg-grid absolute inset-0 opacity-30" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
            <span className="text-white font-bold">Dx</span>
          </div>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            DevOps<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">X</span>
          </span>
        </Link>
      </motion.div>

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative w-full max-w-md rounded-3xl border p-8"
        style={{
          background: 'rgba(17,24,39,0.8)',
          backdropFilter: 'blur(24px)',
          borderColor: 'var(--border-muted)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
