// ============================================================
// 404 Not Found Page — DevOpsX
// ============================================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="blob absolute w-96 h-96 top-0 left-0 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        <div className="blob blob-delay-4 absolute w-96 h-96 bottom-0 right-0 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <span
            className="text-[10rem] font-black leading-none select-none"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg,#3b82f6 0%,#8b5cf6 50%,#06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 60px rgba(59,130,246,0.4))',
            }}
          >
            404
          </span>
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Looks like this page got lost in the cloud! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}
          >
            <Home size={16} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-300 border border-white/15 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link
            to="/courses"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-300 border border-white/15 hover:bg-white/10 hover:text-white transition-all"
          >
            <Search size={16} /> Browse Courses
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
