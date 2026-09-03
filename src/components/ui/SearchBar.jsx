// ============================================================
// SearchBar UI Component — DevOpsX (Vanilla CSS, no Tailwind)
// ============================================================

import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ size = 'md', className = '', placeholder, value, onChange }) {
  const navigate = useNavigate();
  const [internalVal, setInternalVal] = useState('');
  const inputRef = useRef(null);

  const val    = value !== undefined ? value : internalVal;
  const setVal = onChange ?? ((e) => setInternalVal(e.target.value));
  const ph     = placeholder ?? 'Search courses, books, topics…';

  const sizes = {
    sm: { height: '36px', fontSize: '0.8rem',   iconSize: 14, pl: '34px' },
    md: { height: '40px', fontSize: '0.86rem',  iconSize: 15, pl: '38px' },
    lg: { height: '52px', fontSize: '1rem',     iconSize: 18, pl: '46px' },
  };
  const s = sizes[size] || sizes.md;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && val.trim()) {
      navigate(`/courses?search=${encodeURIComponent(val.trim())}`);
    }
  };

  const handleSearch = () => {
    if (val.trim()) navigate(`/courses?search=${encodeURIComponent(val.trim())}`);
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        minWidth: 0,
      }}
    >
      {/* Search icon — absolutely positioned inside input */}
      <Search
        size={s.iconSize}
        style={{
          position: 'absolute',
          left: '11px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
          flexShrink: 0,
          zIndex: 1,
        }}
      />

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={setVal}
        onKeyDown={handleKeyDown}
        placeholder={ph}
        style={{
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          height: s.height,
          fontSize: s.fontSize,
          paddingLeft: s.pl,
          paddingRight: val ? '110px' : '84px',
          borderRadius: '10px',
          background: 'var(--bg-input, var(--bg-card))',
          border: '1px solid var(--border-muted, var(--border-subtle))',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          fontFamily: 'inherit',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3b82f6';
          e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-muted, var(--border-subtle))';
          e.target.style.boxShadow = 'none';
        }}
      />

      {/* Right side: clear + search button */}
      <div
        style={{
          position: 'absolute',
          right: '6px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {/* Clear button */}
        {val && (
          <button
            onClick={() => {
              setVal({ target: { value: '' } });
              inputRef.current?.focus();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            <X size={13} />
          </button>
        )}

        {/* Search button */}
        <button
          onClick={handleSearch}
          style={{
            padding: '5px 12px',
            borderRadius: '7px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.15s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Search
        </button>
      </div>
    </div>
  );
}
