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

const ABSOLUTE_FILL = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  display: 'block',
};

// ── 16:9 wrapper ──────────────────────────────────────────────────────────
function VideoWrapper({ children, poster }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
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

// ── Click-to-load overlay for Drive ───────────────────────────────────────
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
          ? `linear-gradient(rgba(10,15,29,.5),rgba(10,15,29,.5)),url(${poster}) center/cover no-repeat`
          : 'linear-gradient(135deg,#0f172a,#1e293b)',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(99,102,241,.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(99,102,241,.6)',
        marginBottom: 12,
      }}>
        <Play size={28} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
      </div>
      <span style={{
        color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 600,
        textShadow: '0 1px 4px rgba(0,0,0,.6)',
      }}>
        Tap to play video
      </span>
    </div>
  );
}

// ── Chrome-masking strips ────────────────────────────────────────────────
// Drive's /preview renders:
//   top:    a toolbar  (~52 px)
//   middle: video content
//   bottom: control bar (~60 px)
//
// We can't clip INSIDE the cross-origin iframe, but we CAN paint sibling
// divs with a higher z-index on top of those chrome strips.
// pointerEvents:'none' so the video area below remains clickable (play/pause).
const TOP_MASK_H    = 52;   // px — Drive toolbar height
const BOTTOM_MASK_H = 60;   // px — Drive control bar height

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
      <div style={{ ...base, top: 0,    height: TOP_MASK_H }} />
      <div style={{ ...base, bottom: 0, height: BOTTOM_MASK_H }} />
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function LessonVideo({ lesson, autoPlay = true, title }) {
  const video = resolveVideo(lesson);
  const [driveActive,  setDriveActive]  = useState(false);
  const [driveLoaded,  setDriveLoaded]  = useState(false);

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

    // The iframe is offset so Drive's chrome is pushed OUTSIDE the container:
    //   top: -52px  → toolbar starts above the visible area
    //   height: +112px (52 top + 60 bottom) → controls extend below it
    // overflow:hidden on VideoWrapper clips those edges.
    // The DriveMask adds solid-colour strips on TOP of those edges as a
    // belt-and-braces fallback (handles any remaining Drive chrome pixels).
    const iframeStyle = {
      ...ABSOLUTE_FILL,
      top: `-${TOP_MASK_H}px`,
      height: `calc(100% + ${TOP_MASK_H + BOTTOM_MASK_H}px)`,
      opacity: driveLoaded ? 1 : 0,
      transition: 'opacity .4s',
    };

    return (
      <VideoWrapper poster={!driveActive ? poster : undefined}>
        {/* 1 — Loading overlay: click to activate */}
        {!driveActive && (
          <DriveLoadingOverlay
            poster={poster}
            onDismiss={() => setDriveActive(true)}
          />
        )}

        {/* 2 — Drive iframe (only mounted after user taps) */}
        {driveActive && (
          <iframe
            src={`https://drive.google.com/file/d/${video.id}/preview`}
            style={iframeStyle}
            scrolling="no"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={title || lesson.title || 'Lesson video'}
            onLoad={() => setDriveLoaded(true)}
          />
        )}

        {/* 3 — Chrome masks (painted above the iframe via z-index) */}
        {driveActive && driveLoaded && <DriveMask />}
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
