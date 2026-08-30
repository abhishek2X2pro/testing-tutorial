// ============================================================
// Categories Page — DevOpsX
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Server, Cloud, Globe, BarChart3, Shield, Terminal, Cpu, Database, Brain, Wrench, GitBranch } from 'lucide-react';
import { categories, learningPaths } from '../../data/categories';
import PageWrapper, { PageHeader } from '../../components/ui/PageWrapper';

const categoryIconMap = {
  'DevOps': Server, 'Cloud Computing': Cloud, 'Web Development': Globe, 'Data Science': BarChart3,
  'Cyber Security': Shield, 'Linux': Terminal, 'Programming': Cpu, 'Databases': Database,
  'AI & Machine Learning': Brain, 'School – Class 9-12': BookOpen, 'Engineering': Wrench, 'Version Control': GitBranch,
};

export default function Categories() {
  return (
    <PageWrapper>
      <PageHeader
        icon={BookOpen}
        iconColor="#60a5fa"
        badge="ALL CATEGORIES"
        title="Explore Categories & Learning Paths"
        subtitle="Find structured roadmaps and domain-specific courses to master tech skills"
      />

      {/* Learning Paths */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
          Career Learning Paths
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {learningPaths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: 'rgba(59,130,246,.15)', border: '1px solid rgba(59,130,246,.25)' }}>
                  {path.level}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{path.duration}</span>
              </div>
              <div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: '0 0 4px' }}>{path.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{path.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{path.courses} courses</span>
                <Link to="/courses" style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Start Path <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Categories */}
      <div>
        <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
          All Categories ({categories.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
          {categories.map((cat, i) => {
            const IconComp = categoryIconMap[cat.name] || BookOpen;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/courses?category=${cat.slug}`}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
                    padding: '20px 16px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                    textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg,rgba(59,130,246,.2),rgba(6,182,212,.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={22} color="#60a5fa" />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px' }}>{cat.name}</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{cat.courseCount} courses</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
