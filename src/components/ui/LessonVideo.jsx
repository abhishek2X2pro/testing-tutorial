// ============================================================
// LessonVideo — one player for however a lesson's video is hosted
// ------------------------------------------------------------
// A lesson can point at its video in any of these ways:
//
//   { youtubeId: 'Nftif8BrGMo' }                      → YouTube
//   { videoUrl: 'https://youtu.be/Nftif8BrGMo' }      → YouTube (any URL form)
//   { videoUrl: 'https://drive.google.com/file/d/ID/view' } → Google Drive
//   { videoUrl: '/videos/lesson-1.mp4' }              → a file we host
//
// Paste whichever link you have; the source is worked out from the URL, so
// moving a video from Drive to YouTube later is a one-line data change and
// nothing else has to be touched.
//
// A note on Google Drive: Drive enforces a daily view quota. Once a file is
// popular enough to trip it, Drive serves "Sorry, you can't view or download
// this file at this time" for roughly 24 hours. It is fine for showing work
// to someone today; it is not dependable for real traffic. YouTube (unlisted)
// has no such limit and streams adaptively, which matters a lot on mobile
// data — prefer it once there is time to upload.
// ============================================================

import { AlertCircle } from 'lucide-react';

// Pulls the file id out of any of Drive's link shapes:
//   /file/d/<id>/view   ·   ?id=<id>   ·   /open?id=<id>
function driveFileId(url) {
  if (!url || !url.includes('drive.google.com')) return null;
  return url.match(/\/file\/d\/([^/?#]+)/)?.[1]
    || url.match(/[?&]id=([^&#]+)/)?.[1]
    || null;
}

// Handles youtu.be/<id>, /watch?v=<id>, /embed/<id> and /shorts/<id>.
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

// ── Shared absolute-fill style ────────────────────────────────────────────
// Using position:absolute + inset:0 instead of width/height:100% because
// height:100% does NOT resolve when the parent's height comes from
// aspect-ratio (it needs an *explicit* height on the parent). The wrapper
// below gives an explicit height via the padding-bottom 16:9 trick, so the
// absolute child always fills it perfectly on every screen size.
const ABSOLUTE_FILL = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  display: 'block',
};

// 16:9 aspect-ratio wrapper — works on every browser without relying on the
// CSS `aspect-ratio` property resolving for child percentages.
function VideoWrapper({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', /* 9/16 = 0.5625 */
        height: 0,
        overflow: 'hidden',
        background: '#0a0f1d',
        borderRadius: 'inherit',
      }}
    >
      {children}
    </div>
  );
}

export default function LessonVideo({ lesson, autoPlay = true, title }) {
  const video = resolveVideo(lesson);

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

  if (video.kind === 'drive') {
    // Drive's /preview layout (measured):
    //   ┌─ toolbar ─────────── ~52px ─┐  ← clip with top: -52px
    //   │  video content   ✅          │
    //   └─ controls bar ───── ~48px ─┘  ← clip with extra height
    //
    //   height = 100% + 100px  (52px top clip + 48px bottom clip)
    const driveStyle = {
      ...ABSOLUTE_FILL,
      top: '-52px',
      height: 'calc(100% + 100px)',
    };
    return (
      <VideoWrapper>
        <iframe
          src={`https://drive.google.com/file/d/${video.id}/preview`}
          style={driveStyle}
          scrolling="no"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={title || lesson.title || 'Lesson video'}
        />
      </VideoWrapper>
    );
  }

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

  return (
    <VideoWrapper>
      <div
        style={{
          ...ABSOLUTE_FILL,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '10px', padding: '24px', textAlign: 'center',
          background: '#0a0f1d', color: '#cbd5e1',
          boxSizing: 'border-box',
        }}
      >
        <AlertCircle size={30} color="#f59e0b" />
        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>No video attached yet</div>
        <div style={{ fontSize: '0.8rem', lineHeight: 1.6, maxWidth: '380px' }}>
          Add a <code>videoUrl</code> to this lesson — a YouTube link, a Google
          Drive share link, or a file path.
        </div>
      </div>
    </VideoWrapper>
  );
}
