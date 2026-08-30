// ============================================================
// Badge Component — DevOpsX UI
// ============================================================

const variants = {
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  green: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  gray: 'bg-white/10 text-gray-400 border-white/10',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const levelColors = {
  'Beginner': 'green',
  'Intermediate': 'yellow',
  'Advanced': 'red',
  'All Levels': 'blue',
};

export function Badge({ children, variant = 'blue', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium
        rounded-full border ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}

export function LevelBadge({ level }) {
  const color = levelColors[level] || 'blue';
  return <Badge variant={color}>{level}</Badge>;
}

export function FreeBadge() {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
      FREE
    </span>
  );
}

export function NewBadge() {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
      NEW
    </span>
  );
}

export function TrendingBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
      🔥 Trending
    </span>
  );
}
