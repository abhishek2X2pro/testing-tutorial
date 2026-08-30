// ============================================================
// Wishlist Page — DevOpsX (Theme-Aware & Ultra Professional)
// ============================================================

import { Link } from 'react-router-dom';
import { Heart, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { courses } from '../../data/courses';
import CourseCard from '../../components/cards/CourseCard';
import EmptyState from '../../components/ui/EmptyState';
import PageWrapper, { PageHeader } from '../../components/ui/PageWrapper';

export default function Wishlist() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const wishlistCourses = courses.filter((c) => user?.wishlist?.includes(c.id));

  if (!user) return (
    <PageWrapper>
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(239,68,68,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lock size={32} color="#ef4444" />
        </div>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800 }}>Sign in to view your wishlist</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '360px' }}>
          Save your favorite courses and access them anytime.
        </p>
        <Link to="/login" style={{ padding: '12px 28px', borderRadius: '12px', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.875rem' }}>Sign In</Link>
      </div>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      {/* Page Header */}
      <PageHeader
        icon={Heart}
        iconColor="#ef4444"
        badge="SAVED COURSES"
        title="My Wishlist"
        subtitle={`${wishlistCourses.length} saved courses ready for learning`}
      />

      {wishlistCourses.length === 0 ? (
        <EmptyState
          icon="wishlist"
          title="Your wishlist is empty"
          description="Browse courses and click the heart icon to save them here."
          action={() => window.location.href = '/courses'}
          actionLabel="Browse Courses"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {wishlistCourses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
