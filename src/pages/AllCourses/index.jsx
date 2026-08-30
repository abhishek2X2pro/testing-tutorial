// ============================================================
// All Courses Page — Clean Full-Width Layout (Top Filter Pills)
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  RotateCcw,
  ChevronLeft,
  BookOpen,
  Filter,
} from 'lucide-react';
import { courses, courseCategories } from '../../data/courses';
import CourseCard from '../../components/cards/CourseCard';
import { useTheme } from '../../context/ThemeContext';

const COURSES_PER_PAGE = 8;

const LEVELS = [
  { label: 'All Levels', id: 'all' },
  { label: 'Beginner', id: 'Beginner' },
  { label: 'Intermediate', id: 'Intermediate' },
  { label: 'Advanced', id: 'Advanced' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function AllCourses() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All Categories';
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);

  const border = isDark ? 'rgba(255,255,255,.08)' : '#e9ecef';
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat && cat !== 'All Categories') {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    handleCategoryChange('All Categories');
    setSelectedLevel('all');
    setSort('popular');
    setPage(1);
  };

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All Categories') {
      result = result.filter(
        (c) => c.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedLevel !== 'all') {
      result = result.filter(
        (c) => c.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.studentsCount - a.studentsCount);
    }

    return result;
  }, [search, selectedCategory, selectedLevel, sort]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE) || 1;
  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(start, start + COURSES_PER_PAGE);
  }, [filteredCourses, page]);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '24px 28px 64px' }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto' }}>

        {/* ── BREADCRUMB ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Courses</span>
        </div>

        {/* ── HEADER TITLE & CONTROLS ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 4px',
                letterSpacing: '-0.02em',
              }}
            >
              Explore Courses
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
              Showing {filteredCourses.length} expert-led courses across AI, DevOps &amp; Engineering.
            </p>
          </div>

          {/* Search Input & Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '260px' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search courses..."
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: `1px solid ${border}`,
                  background: cardBg,
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
              <Search
                size={15}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                border: `1px solid ${border}`,
                background: cardBg,
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── TOP CATEGORY PILLS BAR ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '28px',
            paddingBottom: '16px',
            borderBottom: `1px solid ${border}`,
          }}
        >
          {courseCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  background: isActive
                    ? '#6366f1'
                    : isDark
                    ? 'rgba(255,255,255,.05)'
                    : '#f1f5f9',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {cat}
              </button>
            );
          })}

          {(selectedCategory !== 'All Categories' || search || selectedLevel !== 'all') && (
            <button
              onClick={resetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 14px',
                borderRadius: '999px',
                background: 'rgba(99,102,241,.12)',
                border: '1px solid rgba(99,102,241,.3)',
                color: '#6366f1',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>

        {/* ── 100% FULL-WIDTH 4-COLUMN COURSE CARDS GRID ── */}
        {paginatedCourses.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '16px',
            }}
          >
            <BookOpen size={36} color="#6366f1" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
              No courses found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 16px' }}>
              Try adjusting your search query or reset category filters.
            </p>
            <button
              onClick={resetFilters}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {paginatedCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── PAGINATION CONTROLS ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: `1px solid ${border}`,
                background: cardBg,
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', padding: '0 12px' }}>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: `1.5px solid ${border}`,
                background: cardBg,
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.5 : 1,
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
