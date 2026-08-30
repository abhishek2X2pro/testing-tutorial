// ============================================================
// TextBooks / All Books Page — Clean Full-Width Layout (Top Filter Pills)
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  RotateCcw,
  BookOpen,
  ChevronLeft,
} from 'lucide-react';
import { books, bookCategories } from '../../data/books';
import BookCard from '../../components/cards/BookCard';
import { useTheme } from '../../context/ThemeContext';

const BOOKS_PER_PAGE = 8;

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
];

export default function TextBooks() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All Categories';
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
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
    setSort('newest');
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...books];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.subject?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== 'All Categories') {
      result = result.filter(
        (b) => b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [search, selectedCategory, sort]);

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE) || 1;
  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * BOOKS_PER_PAGE;
    return filtered.slice(start, start + BOOKS_PER_PAGE);
  }, [filtered, page]);

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
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>TextBooks</span>
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
              Textbooks &amp; Study Guides
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
              Browse through {filtered.length} textbooks, solution manuals and reference guides.
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
                placeholder="Search textbooks by title or author..."
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
          {bookCategories.map((cat) => {
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

          {(selectedCategory !== 'All Categories' || search) && (
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

        {/* ── 100% FULL-WIDTH 4-COLUMN BOOK CARDS GRID ── */}
        {paginatedBooks.length === 0 ? (
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
              No textbooks found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 16px' }}>
              Try adjusting your search query or select a different category.
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {paginatedBooks.map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <BookCard book={book} />
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
