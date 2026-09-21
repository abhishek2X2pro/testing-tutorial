// ============================================================
// LessonVideo — one player for however a lesson's video is hosted
// ============================================================

import { AlertCircle } from 'lucide-react';

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

// Drive chrome sizes (px)
// The wrapper is made taller by exactly these amounts so the iframe fills
// it naturally. DriveMask then paints clean black strips over the chrome,
// giving a crisp letterbox look: [black] video content [black].
const TOP_PX = 52;   // Drive toolbar height
const BOT_PX = 60;   // Drive control bar height

// ── 16:9 wrapper ─────────────────────────────────────────────────────────
function VideoWrapper({ children, isDrive }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        // For Drive: expand by chrome heights so iframe renders at its natural
        // size and the video content lands exactly in the center visible zone.
        paddingBottom: isDrive
          ? `calc(56.25% + ${TOP_PX + BOT_PX}px)`
          : '56.25%',
        height: 0,
        overflow: 'hidden',
        background: '#000',
        borderRadius: 'inherit',
      }}
    >
      {children}
    </div>
  );
}

// ── Mask strips ────────────────────────────────────────────────────────────
// Sibling divs with zIndex > iframe paint solid black over Drive's toolbar
// and control bar → clean black letterbox bars on top and bottom.
function DriveMask() {
  const base = {
    position: 'absolute',
    left: 0,
    right: 0,
    background: '#000',
    zIndex: 8,
    pointerEvents: 'none',   // clicks pass through to video content below
  };
  return (
    <>
      <div style={{ ...base, top: 0,    height: TOP_PX }} />
      <div style={{ ...base, bottom: 0, height: BOT_PX }} />
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function LessonVideo({ lesson, autoPlay = true, title }) {
  const video = resolveVideo(lesson);

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
    return (
      // isDrive=true → wrapper height = calc(56.25% + 112px)
      // Drive iframe fills it completely (ABSOLUTE_FILL, no offset)
      // DriveMask covers the chrome with clean black → letterbox look ✅
      <VideoWrapper isDrive>
        <iframe
          src={`https://drive.google.com/file/d/${video.id}/preview`}
          style={ABSOLUTE_FILL}
          scrolling="no"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={title || lesson.title || 'Lesson video'}
        />
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
