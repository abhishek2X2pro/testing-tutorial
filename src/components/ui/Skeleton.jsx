// ============================================================
// Skeleton / Loader Components — DevOpsX UI
// ============================================================

/** Animated skeleton block for loading states */
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`skeleton rounded-xl ${className}`}
      {...props}
    />
  );
}

/** Course card skeleton */
export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5" style={{ background: 'var(--bg-card)' }}>
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

/** Full-page spinner */
export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Loading DevOpsX...</p>
      </div>
    </div>
  );
}

/** Inline spinner */
export function Spinner({ size = 20, className = '' }) {
  return (
    <div
      className={`border-2 border-white/20 border-t-blue-500 rounded-full animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
