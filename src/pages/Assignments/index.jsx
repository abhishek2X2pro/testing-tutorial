import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle, AlertCircle, Circle, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { assignments } from '../../data/assignments';
import PageWrapper, { PageHeader, FilterPill } from '../../components/ui/PageWrapper';

const statusConfig = {
  pending:     { icon: Circle,       color: '#9ca3af', label: 'Pending',     bg: 'rgba(156,163,175,.12)' },
  'in-progress':{ icon: AlertCircle, color: '#f59e0b', label: 'In Progress', bg: 'rgba(245,158,11,.12)'  },
  completed:   { icon: CheckCircle,  color: '#10b981', label: 'Completed',   bg: 'rgba(16,185,129,.12)'  },
};
const diffColor = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

export default function Assignments() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? assignments : assignments.filter((a) => a.status === filter);

  const counts = {
    all:          assignments.length,
    pending:      assignments.filter((a) => a.status === 'pending').length,
    'in-progress':assignments.filter((a) => a.status === 'in-progress').length,
    completed:    assignments.filter((a) => a.status === 'completed').length,
  };

  return (
    <PageWrapper>
      <PageHeader
        icon={ClipboardList}
        iconColor="#3b82f6"
        title="Assignments"
        subtitle={`${assignments.length} assignments total — track your progress`}
      />

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {[
          { key: 'all',         label: `All (${counts.all})` },
          { key: 'pending',     label: `Pending (${counts.pending})` },
          { key: 'in-progress', label: `In Progress (${counts['in-progress']})` },
          { key: 'completed',   label: `Completed (${counts.completed})` },
        ].map(({ key, label }) => (
          <FilterPill key={key} label={label} active={filter === key} onClick={() => setFilter(key)} />
        ))}
      </div>

      {/* Summary stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'Pending',     value: counts.pending,      color: '#6b7280', emoji: '⏳' },
          { label: 'In Progress', value: counts['in-progress'],color: '#d97706', emoji: '🔄' },
          { label: 'Completed',   value: counts.completed,    color: '#059669', emoji: '✅' },
        ].map(({ label, value, color, emoji }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: isDark ? 'none' : '0 2px 8px rgba(15,23,42,.04)' }}>
            <span style={{ fontSize: '22px' }}>{emoji}</span>
            <div>
              <p style={{ color, fontWeight: 800, fontSize: '1.25rem', margin: 0, lineHeight: 1 }}>{value}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '3px 0 0' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Assignment list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((a, i) => {
          const { icon: StatusIcon, color, label, bg } = statusConfig[a.status];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'flex-start', gap: '14px', transition: 'all 0.2s', cursor: 'default', boxShadow: isDark ? 'none' : '0 2px 8px rgba(15,23,42,.04)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.background = isDark ? 'rgba(15,25,41,.9)' : 'rgba(59,130,246,.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
            >
              {/* Status icon */}
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <StatusIcon size={18} style={{ color }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px' }}>{a.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: `${diffColor[a.difficulty]}20`, color: diffColor[a.difficulty] }}>
                      {a.difficulty}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)' }}>{a.points} pts</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: '0 0 10px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {a.description}
                </p>

                {/* Meta row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                    <Clock size={10} /> Due: {a.dueDate}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Est: {a.estimatedTime}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '2px 10px', borderRadius: '999px', background: bg, color, fontSize: '0.68rem', fontWeight: 600 }}>
                    <StatusIcon size={9} /> {label}
                  </span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                  {a.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '999px', background: isDark ? 'rgba(59,130,246,.1)' : 'rgba(59,130,246,.08)', color: 'var(--text-accent)', border: '1px solid rgba(59,130,246,.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
            </motion.div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
