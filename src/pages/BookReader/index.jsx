// ============================================================
// BookReader — in-app PDF reader for a book
// ------------------------------------------------------------
// Rendered with PDF.js (via react-pdf) onto a canvas rather than
// an <iframe>/<embed>. That matters: mobile Chrome and Safari do
// not render a PDF inside an iframe, they download the file
// instead, so an iframe-based reader is blank on a phone.
//
// The PDF itself lives in `public/books/` and is referenced by
// `pdfUrl` on the book in src/data/books.js. Moving the files to
// cloud storage later only changes that string — this component
// stays as-is.
// ============================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ChevronLeft, ChevronRight, ArrowLeft, Download,
  ZoomIn, ZoomOut, Maximize2, FileWarning,
} from 'lucide-react';
import { books } from '../../data/books';
import { useTheme } from '../../context/ThemeContext';

// Serve the worker from the installed package instead of a CDN, so the
// reader keeps working offline and is not blocked by a strict CSP.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const book = useMemo(() => books.find((b) => String(b.id) === String(id)), [id]);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState(null);
  const [scale, setScale] = useState(null); // null = fit to container width
  const [containerWidth, setContainerWidth] = useState(0);
  // The scale that fit-to-width resolves to, so the zoom buttons can step up
  // and down from what is actually on screen rather than from an assumed 1.0.
  const [fitScale, setFitScale] = useState(1);

  const holderRef = useRef(null);

  // Track the available width so a page can be rendered fit-to-width, which
  // is the only comfortable default on a phone.
  useEffect(() => {
    const el = holderRef.current;
    if (!el) return undefined;
    const measure = () => setContainerWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Arrow keys page through the book on desktop.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setPageNumber((p) => Math.min(p + 1, numPages || 1));
      if (e.key === 'ArrowLeft') setPageNumber((p) => Math.max(p - 1, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [numPages]);

  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,.1)' : '#e4e7ec';
  const barBg = isDark ? 'rgba(15,25,41,.96)' : 'rgba(255,255,255,.96)';

  const btn = (enabled = true) => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
    padding: '8px 12px', borderRadius: '9px',
    border: `1px solid ${border}`, background: cardBg,
    color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600,
    cursor: enabled ? 'pointer' : 'not-allowed', opacity: enabled ? 1 : 0.45,
    whiteSpace: 'nowrap',
  });

  if (!book) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', margin: '0 0 10px' }}>Book not found</h1>
        <Link to="/textbooks" style={{ color: '#4f46e5', fontWeight: 600 }}>Back to all books</Link>
      </div>
    );
  }

  // No file wired up yet — say so plainly instead of rendering an empty frame.
  if (!book.pdfUrl) {
    return (
      <div className="page-container" style={{ padding: '40px 16px', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <FileWarning size={38} color="#f59e0b" style={{ marginBottom: '14px' }} />
        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 8px' }}>
          PDF not uploaded yet
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 20px' }}>
          “{book.title}” has no file attached. Drop the PDF into
          {' '}<code style={{ background: isDark ? 'rgba(255,255,255,.08)' : '#f2f4f7', padding: '2px 6px', borderRadius: '5px' }}>public/books/</code>{' '}
          and set <code style={{ background: isDark ? 'rgba(255,255,255,.08)' : '#f2f4f7', padding: '2px 6px', borderRadius: '5px' }}>pdfUrl</code> for this book.
        </p>
        <button onClick={() => navigate(`/textbooks/${book.id}`)} style={btn()}>
          <ArrowLeft size={15} /> Back to book
        </button>
      </div>
    );
  }

  const pageWidth = scale === null
    ? Math.max(240, containerWidth - 4)
    : undefined;

  return (
    <div style={{ background: isDark ? 'var(--bg-primary)' : '#f7f8fb', minHeight: '100vh' }}>

      {/* ── Toolbar ── */}
      <div
        className="reader-bar"
        style={{
          position: 'sticky', top: 'var(--navbar-height)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
          padding: '10px 16px',
          background: barBg, backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${border}`,
        }}
      >
        <button onClick={() => navigate(`/textbooks/${book.id}`)} style={btn()} aria-label="Back to book details">
          <ArrowLeft size={15} /> Back
        </button>

        {/* Truncation lives in the stylesheet below, not inline: the global
            mobile layer rewrites inline `text-overflow: ellipsis` pairs so a
            hidden value can still be read, and that would break the title
            into single letters inside this narrow toolbar slot. */}
        <div className="reader-title" style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700 }}>
          {book.title}
        </div>

        <div className="reader-tools" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Zoom steps multiply the scale that is currently on screen, so one
              tap is a visible change whatever the page size. A fixed ±0.25
              step would barely move a page that starts at 0.88. */}
          <button
            onClick={() => setScale((s) => Math.max((s ?? fitScale) / 1.35, MIN_SCALE))}
            style={btn(true)}
            aria-label="Zoom out"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={() => setScale((s) => Math.min((s ?? fitScale) * 1.35, MAX_SCALE))}
            style={btn(true)}
            aria-label="Zoom in"
          >
            <ZoomIn size={15} />
          </button>
          <button onClick={() => setScale(null)} style={btn(true)} aria-label="Fit to width">
            <Maximize2 size={15} />
          </button>
          <a href={book.pdfUrl} download style={{ ...btn(true), textDecoration: 'none' }}>
            <Download size={15} /> PDF
          </a>
        </div>
      </div>

      {/* ── Page canvas ── */}
      <div
        style={{
          maxWidth: '900px', margin: '0 auto',
          padding: '18px 8px 96px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        {/* The ref sits on the scroller, not the padded wrapper: fit-to-width
            must match the box the page is actually laid out in, or the page
            ends up a few pixels wider than its container. */}
        <div className="pdf-scroll" ref={holderRef}>
        <Document
          file={book.pdfUrl}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            // Clamp here rather than in an effect: this is the only moment the
            // page count can change, so there is nothing to synchronise later.
            setPageNumber((p) => Math.min(p, n));
            setLoadError(null);
          }}
          onLoadError={(err) => setLoadError(err?.message || 'Could not open this PDF.')}
          loading={(
            <div style={{ padding: '60px 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Loading “{book.title}”…
            </div>
          )}
          error={(
            <div style={{ padding: '40px 16px', textAlign: 'center', maxWidth: '420px' }}>
              <FileWarning size={34} color="#ef4444" style={{ marginBottom: '12px' }} />
              <p style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '0 0 6px' }}>
                Could not open this PDF
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                {loadError || 'The file may be missing or corrupt.'}
              </p>
            </div>
          )}
        >
          <div className="pdf-page" style={{
            background: '#ffffff', borderRadius: '10px', overflow: 'hidden',
            boxShadow: isDark ? '0 8px 30px rgba(0,0,0,.5)' : '0 4px 20px rgba(16,24,40,.12)',
          }}>
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              scale={scale ?? undefined}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={(pg) => {
                if (pg?.originalWidth && containerWidth) {
                  setFitScale((containerWidth - 4) / pg.originalWidth);
                }
              }}
              loading={<div style={{ padding: '80px 30px', color: '#667085', fontSize: '0.85rem' }}>Rendering page…</div>}
            />
          </div>
        </Document>
        </div>
      </div>

      {/* ── Page navigation (fixed so it is always reachable on a phone) ── */}
      {numPages > 0 && (
        <div
          className="reader-nav"
          style={{
            position: 'fixed', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 30, display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 10px', borderRadius: '999px',
            background: barBg, backdropFilter: 'blur(8px)',
            border: `1px solid ${border}`,
            boxShadow: '0 6px 24px rgba(16,24,40,.18)',
            maxWidth: 'calc(100vw - 24px)',
          }}
        >
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            style={{ ...btn(pageNumber > 1), borderRadius: '999px', padding: '8px 10px' }}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          <span style={{
            color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700,
            whiteSpace: 'nowrap', padding: '0 4px',
          }}>
            {pageNumber} / {numPages}
          </span>

          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber >= numPages}
            style={{ ...btn(pageNumber < numPages), borderRadius: '999px', padding: '8px 10px' }}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        /* Zooming in has to actually enlarge the page. The global mobile
           layer caps every canvas at 100% of its container, which would snap
           a zoomed page straight back to the screen width — so the PDF canvas
           opts out of that cap. */
        .pdf-page canvas {
          max-width: none !important;
          display: block;
        }

        /* A zoomed page is wider than the phone, so it needs somewhere to be
           panned. Without this the right-hand side of the page would be
           clipped and unreachable. */
        .pdf-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
        }

        .pdf-page {
          width: max-content;
          margin: 0 auto;
        }

        .reader-title {
          flex: 1 1 auto;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* On a phone the toolbar cannot hold the buttons and the title on one
           line, so the title takes a second row at full width and truncates
           there instead of being squeezed to a few characters. */
        @media (max-width: 720px) {
          .reader-title {
            order: 3;
            flex: 1 1 100%;
            font-size: 0.8rem;
          }
          .reader-tools { margin-left: auto; }
        }
      `}</style>
    </div>
  );
}
