// ============================================================
// Star Rating Component — DevOpsX UI
// ============================================================

import { Star } from 'lucide-react';

export default function StarRating({ rating, maxRating = 5, size = 14, showCount, count, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="text-gray-600 fill-gray-600"
              style={{ position: 'absolute', inset: 0 }}
            />
            {(filled || partial) && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  width: filled ? '100%' : `${(rating % 1) * 100}%`,
                }}
              >
                <Star size={size} className="text-yellow-400 fill-yellow-400" />
              </span>
            )}
          </span>
        );
      })}
      <span className="text-yellow-400 font-semibold ml-0.5" style={{ fontSize: size }}>
        {rating.toFixed(1)}
      </span>
      {showCount && count && (
        <span className="text-gray-500" style={{ fontSize: size - 2 }}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
