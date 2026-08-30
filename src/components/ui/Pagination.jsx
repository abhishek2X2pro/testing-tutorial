// ============================================================
// Pagination Component — DevOpsX UI
// ============================================================

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { isDark } = useTheme();
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  let prev = null;
  const items = [];
  showPages.forEach((p) => {
    if (prev !== null && p - prev > 1) {
      items.push('...');
    }
    items.push(p);
    prev = p;
  });

  const btnBg = isDark ? 'var(--bg-card)' : '#ffffff';
  const btnBorder = isDark ? '1px solid var(--border-subtle)' : '1px solid rgba(59,130,246,.25)';
  const btnColor = isDark ? 'var(--text-secondary)' : 'var(--text-primary)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '32px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          width: '38px', height: '38px', borderRadius: '12px',
          background: btnBg, border: btnBorder, color: btnColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.4 : 1, transition: 'all 0.15s',
        }}
      >
        <ChevronLeft size={16} />
      </button>

      {items.map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} style={{ padding: '0 6px', color: 'var(--text-muted)' }}>…</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            style={{
              width: '38px', height: '38px', borderRadius: '12px',
              fontSize: '0.85rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
              border: currentPage === item ? 'none' : btnBorder,
              background: currentPage === item ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : btnBg,
              color: currentPage === item ? '#ffffff' : btnColor,
              boxShadow: currentPage === item ? '0 4px 14px rgba(59,130,246,.35)' : 'none',
            }}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          width: '38px', height: '38px', borderRadius: '12px',
          background: btnBg, border: btnBorder, color: btnColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.4 : 1, transition: 'all 0.15s',
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
