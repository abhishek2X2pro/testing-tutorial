// ============================================================
// LessonVideo — one player for however a lesson's video is hosted
// ============================================================

import { useState } from 'react';
import { AlertCircle, Play } from 'lucide-react';

function driveFileId(url) {
  if (!url || !url.includes('drive.google.com')) return null;
  return url.match(/\/file\/d\/([^/?#]+)/)?.[1]
    || url.match(/[?&]id=([^&#]+)/)?.[1]
    || null;
}

function youtubeId(url) {
  if (!url) return null;
  if (!/youtube\.com|youtu\.be/.test(url)) return null;
  return url.match(/[?&]v=([^&#]+)/)?.[1]
    || url.match(/youtu\.be\/([^/?#]+)/)?.[1]
    || url.match(/\/embed\/([^/?#]+)/)?.[1]
    || url.match(/\/shorts\/([^/?#]+)/)?.[1]
    || null;
}

export function resolveVideo(lesson) {
  if (!lesson) return { kind: 'none' };
  if (lesson.youtubeId) return { kind: 'youtube', id: lesson.youtubeId };
  const url = lesson.videoUrl;
  if (!url) return { kind: 'none' };
  const yt = youtubeId(url);
  if (yt) return { kind: 'youtube', id: yt };
  const drive = driveFileId(url);
  if (drive) return { kind: 'drive', id: drive };
  return { kind: 'file', src: url };
}

// ── Drive chrome heights (px) ───────────────────────────────────────────
// Drive's /preview renders a toolbar at the top and a control bar at the
// bottom.  We make the wrapper TALLER by exactly these amounts so the
// iframe fills it naturally, then paint solid-colour mask divs on top of
// those chrome strips.  No iframe offset is needed or used.
//
//  VideoWrapper height = 56.25% (16:9 video) + TOP_PX + BOT_PX
//  ┌─ TOP_MASK (zIndex 8) ──── TOP_PX px ─┐
//  │                                       │
//  │   iframe (Drive player — ABSOLUTE_FILL) - video content visible here
//  │                                       │
//  └─ BOT_MASK (zIndex 8) ──── BOT_PX px ─┘
const TOP_PX = 52;   // Drive toolbar
const BOT_PX = 60;   // Drive control bar

const ABSOLUTE_FILL = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  display: 'block',
};

// ── 16:9 wrapper ─────────────────────────────────────────────────────────
// For Drive we expand the wrapper by TOP_PX + BOT_PX so the iframe has
// room to show its full layout; the masks then cover those chrome strips.
function VideoWrapper({ children, poster, isDrive }) {
  const extraPx = isDrive ? TOP_PX + BOT_PX : 0;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        // calc(56.25% + Npx) mixes % of width with fixed px — works in all
        // browsers and gives exactly the right height on every screen size.
        paddingBottom: extraPx ? `calc(56.25% + ${extraPx}px)` : '56.25%',
        height: 0,
        overflow: 'hidden',
        background: '#0a0f1d',
        ...(poster && {
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
        borderRadius: 'inherit',
      }}
    >
      {children}
    </div>
  );
}

// ── Drive chrome masks ───────────────────────────────────────────────────
// Sibling divs with a higher z-index than the iframe paint over Drive's
// toolbar (top) and control bar (bottom), hiding them visually.
// pointerEvents:none so the video content below stays clickable.
function DriveMask() {
  const base = {
    position: 'absolute',
    left: 0,
    right: 0,
    background: '#0a0f1d',
    zIndex: 8,
    pointerEvents: 'none',
  };
  return (
    <>
      <div style={{ ...base, top: 0,    height: TOP_PX }} />
      <div style={{ ...base, bottom: 0, height: BOT_PX }} />
    </>
  );
}

// ── Click-to-load thumbnail overlay ─────────────────────────────────────
function DriveLoadingOverlay({ poster, onDismiss }) {
  return (
    <div
      onClick={onDismiss}
      style={{
        ...ABSOLUTE_FILL,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: poster
          ? `linear-gradient(rgba(10,15,29,.45),rgba(10,15,29,.45)),url(${poster}) center/cover no-repeat`
          : 'linear-gradient(135deg,#0f172a,#1e293b)',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      <div style={{
        width: 68, height: 68, borderRadius: '50%',
        background: 'rgba(99,102,241,.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 28px rgba(99,102,241,.55)',
        marginBottom: 14,
      }}>
        <Play size={30} color="#fff" fill="#fff" style={{ marginLeft: 5 }} />
      </div>
      <span style={{
        color: '#e2e8f0', fontSize: '0.82rem', fontWeight: 700,
        textShadow: '0 1px 6px rgba(0,0,0,.7)', letterSpacing: '0.03em',
      }}>
        Tap to play video
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function LessonVideo({ lesson, autoPlay = true, title }) {
  const video = resolveVideo(lesson);
  const [driveActive, setDriveActive] = useState(false);

  /* ── YouTube ── */
  if (video.kind === 'youtube') {
    return (
      <VideoWrapper>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?rel=0${autoPlay ? '&autoplay=1' : ''}`}
          style={ABSOLUTE_FILL}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          title={title || lesson.title || 'Lesson video'}
        />
      </VideoWrapper>
    );
  }

  /* ── Google Drive ── */
  if (video.kind === 'drive') {
    const poster = lesson.thumbnail || lesson.poster || null;

    return (
      // isDrive=true → wrapper height = calc(56.25% + 112px) to fit Drive chrome
      <VideoWrapper isDrive poster={!driveActive ? poster : undefined}>

        {/* Thumbnail overlay shown until user taps */}
        {!driveActive && (
          <DriveLoadingOverlay
            poster={poster}
            onDismiss={() => setDriveActive(true)}
          />
        )}

        {/* Drive iframe — mounted on first tap, full opacity immediately */}
        {driveActive && (
          <iframe
            src={`https://drive.google.com/file/d/${video.id}/preview`}
            style={ABSOLUTE_FILL}   // fills the full expanded wrapper
            scrolling="no"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={title || lesson.title || 'Lesson video'}
          />
        )}

        {/* Mask strips sit above the iframe and cover Drive's chrome */}
        <DriveMask />
      </VideoWrapper>
    );
  }

  /* ── Local / hosted file ── */
  if (video.kind === 'file') {
    return (
      <VideoWrapper>
        <video
          src={video.src}
          style={{ ...ABSOLUTE_FILL, objectFit: 'contain' }}
          controls
          playsInline
          preload="metadata"
          autoPlay={autoPlay}
        />
      </VideoWrapper>
    );
  }

  /* ── No video ── */
  return (
    <VideoWrapper>
      <div style={{
        ...ABSOLUTE_FILL,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '10px', padding: '24px', textAlign: 'center',
        background: '#0a0f1d', color: '#cbd5e1', boxSizing: 'border-box',
      }}>
        <AlertCircle size={30} color="#f59e0b" />
        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>
          No video attached yet
        </div>
        <div style={{ fontSize: '0.8rem', lineHeight: 1.6, maxWidth: '380px' }}>
          Add a <code>videoUrl</code> to this lesson — a YouTube link, a Google
          Drive share link, or a file path.
        </div>
      </div>
    </VideoWrapper>
  );
}
