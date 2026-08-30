// ============================================================
// Your Cart Page — 1:1 Pixel-Perfect Reference Match
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Lock,
  Tag,
  Package,
  RotateCcw,
  Truck,
  Zap,
  Headphones,
  ShoppingBag,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const INITIAL_ITEMS = [
  {
    id: 'b1',
    type: 'Book',
    title: 'Artificial Intelligence for Beginners',
    author: 'Shailendra Kumar',
    cover: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&auto=format&fit=crop',
    price: 499,
    originalPrice: 799,
    discountPct: 38,
    quantity: 1,
    selected: true,
  },
  {
    id: 'c1',
    type: 'Course',
    title: 'Complete Python for AI & Data Science',
    author: 'Rounak Patel',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop',
    price: 1499,
    originalPrice: 2099,
    discountPct: 29,
    quantity: 1,
    selected: true,
  },
  {
    id: 'c2',
    type: 'Course',
    title: 'Deep Learning with TensorFlow 2.0',
    author: 'Neha Sharma',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop',
    price: 1699,
    originalPrice: 2999,
    discountPct: 43,
    quantity: 1,
    selected: true,
  },
];

export default function Checkout() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectAll, setSelectAll] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';

  const toggleSelectAll = () => {
    const nextVal = !selectAll;
    setSelectAll(nextVal);
    setItems((prev) => prev.map((item) => ({ ...item, selected: nextVal })));
  };

  const toggleItemSelect = (id) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
      setSelectAll(next.every((i) => i.selected));
      return next;
    });
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const q = Math.max(1, item.quantity + delta);
          return { ...item, quantity: q };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const selectedItems = items.filter((i) => i.selected);

  // Math
  const rawSubtotal = selectedItems.reduce(
    (acc, i) => acc + i.originalPrice * i.quantity,
    0
  );
  const finalPrice = selectedItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const couponDiscount = appliedCoupon ? 200 : 0;
  const totalSavings = rawSubtotal - finalPrice + couponDiscount;
  const grandTotal = Math.max(0, finalPrice - couponDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    setAppliedCoupon(true);
    toast.success(`Coupon "${couponCode.toUpperCase()}" applied! ₹200 discount added.`);
  };

  const handleProceedCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item to proceed');
      return;
    }
    toast.success('Proceeding to Payment...');
    navigate('/payment');
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 28px 48px' }}>

        {/* ── BREADCRUMB ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Cart</span>
        </div>

        {/* ── PAGE TITLE & CONTINUE SHOPPING ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 4px',
                letterSpacing: '-0.02em',
              }}
            >
              Your Cart ({items.length})
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>
              Review your items and proceed to checkout
            </p>
          </div>

          <button
            onClick={() => navigate('/courses')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              background: 'var(--bg-card)',
              border: `1.5px solid ${border}`,
              color: '#6366f1',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(99,102,241,.12)' : '#eef2ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-card)';
            }}
          >
            <ArrowLeft size={14} /> Continue Shopping
          </button>
        </div>

        {/* ── MAIN CONTENT (LEFT: CART TABLE + STRIPS | RIGHT: ORDER SUMMARY) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr minmax(310px, 350px)',
            gap: '24px',
            alignItems: 'start',
          }}
        >

          {/* LEFT COLUMN: CART TABLE + FEATURE STRIP + TRUST STRIP (NO VERTICAL GAP) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* CART TABLE CARD */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              {/* Table Header Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1.8fr 1fr 110px 1fr 40px',
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: `1px solid ${border}`,
                  background: isDark ? 'rgba(255,255,255,.02)' : '#f8fafc',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    style={{ accentColor: '#6366f1', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                </div>
                <div>Select All ({items.length}) &nbsp; Item</div>
                <div style={{ textAlign: 'center' }}>Price</div>
                <div style={{ textAlign: 'center' }}>Quantity</div>
                <div style={{ textAlign: 'center' }}>Total</div>
                <div />
              </div>

              {/* Items Rows */}
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={42} color="#94a3b8" style={{ marginBottom: '12px' }} />
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>Your cart is empty</p>
                  <p style={{ fontSize: '0.8rem', margin: '0 0 16px' }}>Explore our books and courses to add items to your cart</p>
                  <button
                    onClick={() => navigate('/courses')}
                    style={{ padding: '9px 20px', borderRadius: '8px', background: '#6366f1', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1.8fr 1fr 110px 1fr 40px',
                      alignItems: 'center',
                      padding: '18px 20px',
                      borderBottom: `1px solid ${border}`,
                      transition: 'background .15s',
                    }}
                  >
                    {/* Checkbox */}
                    <div>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItemSelect(item.id)}
                        style={{ accentColor: '#6366f1', width: '15px', height: '15px', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Thumbnail + Details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={item.cover}
                        alt={item.title}
                        style={{
                          width: '52px',
                          height: '66px',
                          borderRadius: '6px',
                          objectFit: 'cover',
                          border: `1px solid ${border}`,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <h4
                          style={{
                            color: 'var(--text-primary)',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            margin: '0 0 3px',
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '0 0 6px' }}>
                          {item.author}
                        </p>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: '#6366f1',
                            background: isDark ? 'rgba(99,102,241,.18)' : 'rgba(99,102,241,.1)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* Price & Discount */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ₹{item.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{item.originalPrice.toLocaleString()}
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981' }}>
                        {item.discountPct}% OFF
                      </span>
                    </div>

                    {/* Quantity Control */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: `1px solid ${border}`,
                          borderRadius: '6px',
                          background: 'var(--bg-primary)',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Minus size={11} />
                        </button>
                        <span
                          style={{
                            padding: '0 10px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Trash Button */}
                    <div style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => removeItem(item.id)}
                        title="Remove item"
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '4px',
                          transition: 'color .15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FEATURE STRIP 1: BELOW CART TABLE (100% Original, Secure Payment, Hassle-free Returns) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={20} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                    100% Original
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Sourced from trusted publishers
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lock size={20} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                    Secure Payment
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    100% secure &amp; protected
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={20} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.8rem', display: 'block', fontWeight: 700 }}>
                    Hassle-free Returns
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Easy 7 days return policy
                  </span>
                </div>
              </div>
            </div>

            {/* TRUST FOOTER STRIP 2: DIRECTLY BELOW (NO VERTICAL GAP) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>
                    Free Shipping
                  </strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    On all orders
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={18} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>
                    7 Days Return
                  </strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    No questions asked
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={18} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>
                    Instant Access
                  </strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Learn right away
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Headphones size={18} color="#6366f1" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.78rem', display: 'block', fontWeight: 700 }}>
                    24/7 Support
                  </strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    We're here to help
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY + COUPON BOX */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>

            {/* ORDER SUMMARY CARD */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: `1.5px solid ${border}`,
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: isDark ? '0 10px 30px rgba(0,0,0,.4)' : '0 6px 20px rgba(99,102,241,.08)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Subtotal ({selectedItems.length} items)
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    ₹{rawSubtotal.toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>Discount</span>
                  <span style={{ fontWeight: 800 }}>- ₹{(rawSubtotal - finalPrice).toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                    <span>Coupon Discount</span>
                    <span style={{ fontWeight: 800 }}>- ₹200</span>
                  </div>
                )}
              </div>

              <div style={{ height: '1px', background: border }} />

              {/* Grand Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>Total</strong>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    (Inc. of all taxes)
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                  }}
                >
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>

              {/* Savings Banner Box */}
              {totalSavings > 0 && (
                <div
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: isDark ? 'rgba(99,102,241,.18)' : '#eef2ff',
                    border: '1px solid rgba(99,102,241,.3)',
                    color: '#6366f1',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Tag size={13} /> You are saving ₹{totalSavings.toLocaleString()} on this order!
                </div>
              )}

              {/* Buttons */}
              <button
                onClick={handleProceedCheckout}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 18px rgba(99,102,241,.35)',
                  transition: 'all .15s',
                }}
              >
                <Lock size={15} /> Proceed to Checkout
              </button>

              <button
                onClick={handleProceedCheckout}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '10px',
                  background: 'transparent',
                  border: '1.5px solid #6366f1',
                  color: '#6366f1',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                Buy Now
              </button>

              {/* Payment Methods Acceptance */}
              <div style={{ paddingTop: '8px', borderTop: `1px solid ${border}` }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  We Accept
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  <span style={{ padding: '2px 6px', background: isDark ? 'rgba(255,255,255,.06)' : '#f1f5f9', borderRadius: '4px', color: '#2563eb' }}>VISA</span>
                  <span style={{ padding: '2px 6px', background: isDark ? 'rgba(255,255,255,.06)' : '#f1f5f9', borderRadius: '4px', color: '#ea580c' }}>MasterCard</span>
                  <span style={{ padding: '2px 6px', background: isDark ? 'rgba(255,255,255,.06)' : '#f1f5f9', borderRadius: '4px', color: '#059669' }}>RuPay</span>
                  <span style={{ padding: '2px 6px', background: isDark ? 'rgba(255,255,255,.06)' : '#f1f5f9', borderRadius: '4px', color: '#7c3aed' }}>UPI</span>
                  <span style={{ fontSize: '0.65rem' }}>and more...</span>
                </div>
              </div>
            </div>

            {/* COUPON CODE BOX */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${border}`,
                borderRadius: '16px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Tag size={14} color="#6366f1" /> Have a coupon code?
              </h4>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="ENTER COUPON CODE"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${border}`,
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Apply
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
