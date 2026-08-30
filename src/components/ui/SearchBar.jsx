// ============================================================
// SearchBar UI Component — DevOpsX
// ============================================================

import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ size = 'md', className = '', placeholder, value, onChange }) {
  const navigate = useNavigate();
  const [internalVal, setInternalVal] = useState('');
  const inputRef = useRef(null);

  const val     = value !== undefined ? value : internalVal;
  const setVal  = onChange ?? ((e) => setInternalVal(e.target.value));
  const ph      = placeholder ?? 'Search courses, books, topics…';

  const sizes = {
    sm:  { height: '36px', fontSize: '0.8rem',  iconSize: 14, pl: '36px', pr: '10px' },
    md:  { height: '42px', fontSize: '0.875rem',iconSize: 15, pl: '40px', pr: '12px' },
    lg:  { height: '52px', fontSize: '1rem',    iconSize: 18, pl: '48px', pr: '14px' },
  };
  const s = sizes[size] || sizes.md;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && val.trim()) {
      navigate(`/courses?search=${encodeURIComponent(val.trim())}`);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <Search
        size={s.iconSize}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--text-muted)' }}
      />

      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={setVal}
        onKeyDown={handleKeyDown}
        placeholder={ph}
        className="w-full rounded-xl outline-none transition-all"
        style={{
          height: s.height,
          fontSize: s.fontSize,
          paddingLeft: s.pl,
          paddingRight: '80px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-muted)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--brand-blue)';
          e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-muted)';
          e.target.style.boxShadow = 'none';
        }}
      />

      {/* Clear + Search button */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {val && (
          <button
            onClick={() => { setVal({ target: { value: '' } }); inputRef.current?.focus(); }}
            className="p-1 rounded-lg transition-colors text-gray-500 hover:text-gray-300"
          >
            <X size={13} />
          </button>
        )}
        <button
          onClick={() => val.trim() && navigate(`/courses?search=${encodeURIComponent(val.trim())}`)}
          className="px-3 py-1 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
