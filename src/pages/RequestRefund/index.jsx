// ============================================================
// Request Return/Refund Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronRight, CheckCircle2, HelpCircle, RotateCcw,
  Clock, MessageCircle, AlertCircle, Send
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const REASONS = [
  { id: 'not_as_expected', label: 'Course not as expected', desc: 'The course content did not meet my expectations.' },
  { id: 'purchased_by_mistake', label: 'Purchased by mistake', desc: 'I accidentally purchased this course.' },
  { id: 'technical_issues', label: 'Technical issues', desc: "I'm facing technical problems accessing the course." },
  { id: 'duplicate', label: 'Duplicate purchase', desc: 'I have purchased this course multiple times.' },
  { id: 'not_useful', label: 'Not useful for me', desc: 'The course is not relevant to my needs.' },
  { id: 'other', label: 'Other reason', desc: 'I want to return this course for another reason.' },
];

export default function RequestRefund() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedReason, setSelectedReason] = useState('not_as_expected');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const order = {
    id: '#AL2024PYO0123',
    course: 'Complete Python for AI & Data Science',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120&auto=format&fit=crop',
    orderDate: 'May 26, 2024, 10:30 AM',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    amountPaid: '₹999',
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Refund request submitted successfully!');
      navigate('/orders/returns');
    }, 1500);
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/orders" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Orders</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Request a Return / Refund</span>
        </div>

        {/* HEADER */}
        <div>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Request a Return / Refund</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Choose a reason and submit your request. We'll take care of the rest.</p>
        </div>

        {/* MAIN 2-COLUMN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT FORM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Course Info */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={order.thumb} alt={order.course} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', border: `1px solid ${border}`, flexShrink: 0 }} />
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '0.96rem', fontWeight: 700, margin: '0 0 3px' }}>{order.course}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Order ID: {order.id}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '1px' }}>Ordered on: {order.orderDate}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Amount</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800 }}>{order.amountPaid}</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', fontSize: '0.76rem', fontWeight: 700 }}>
                  <CheckCircle2 size={12} /> {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Step 1: Select Reason */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 16px' }}>
                1. Select a reason for return / refund
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {REASONS.map(reason => {
                  const isSelected = selectedReason === reason.id;
                  return (
                    <div
                      key={reason.id}
                      onClick={() => setSelectedReason(reason.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: `2px solid ${isSelected ? '#4f46e5' : (isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0')}`,
                        background: isSelected ? (isDark ? 'rgba(79,70,229,0.12)' : '#f5f3ff') : card,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = isDark ? 'rgba(99,102,241,0.4)' : '#c7d2fe'; }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'; }}
                    >
                      {/* Radio */}
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${isSelected ? '#4f46e5' : (isDark ? '#475569' : '#d1d5db')}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', transition: 'all 0.15s' }}>
                        {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }} />}
                      </div>
                      <div>
                        <div style={{ color: isSelected ? '#4f46e5' : 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.3 }}>{reason.label}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '4px', lineHeight: 1.4 }}>{reason.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Additional Details */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px' }}>
                2. Additional details (optional)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 14px' }}>Please share more details about your issue.</p>
              <div style={{ position: 'relative' }}>
                <textarea
                  value={additionalDetails}
                  onChange={e => setAdditionalDetails(e.target.value.slice(0, 500))}
                  placeholder="Write your message here..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : '#f9fafb',
                    border: `1px solid ${border}`,
                    color: 'var(--text-primary)',
                    fontSize: '0.84rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: 1.6,
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#4f46e5'}
                  onBlur={e => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0'}
                />
                <div style={{ textAlign: 'right', marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {additionalDetails.length}/500 characters
                </div>
              </div>
            </div>

            {/* Step 3: Review & Submit */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 14px' }}>
                3. Review and submit
              </h3>

              {/* Notice */}
              <div style={{ background: isDark ? 'rgba(79,70,229,0.08)' : '#f5f3ff', border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#ddd6fe'}`, borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={16} color="#6366f1" />
                  <span style={{ color: isDark ? '#e0e7ff' : '#4338ca', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    Your request will be reviewed by our team.<br />
                    You will receive an email confirmation within 24-48 hours.
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 22px', borderRadius: '8px',
                    background: submitting ? '#9ca3af' : 'linear-gradient(135deg,#4f46e5,#6366f1)',
                    color: '#ffffff', border: 'none',
                    fontSize: '0.84rem', fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: submitting ? 'none' : '0 4px 12px rgba(79,70,229,0.3)',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  <Send size={15} />
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Order Summary */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Order Summary</h3>
              {[
                { label: 'Order ID', value: order.id },
                { label: 'Order Date', value: order.orderDate },
                { label: 'Payment Method', value: order.paymentMethod },
                { label: 'Amount Paid', value: order.amountPaid },
                { label: 'Payment Status', value: order.paymentStatus, badge: { bg: '#dcfce7', text: '#16a34a' } },
                { label: 'Order Status', value: order.orderStatus, badge: { bg: '#dcfce7', text: '#16a34a' } },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>{r.label}</span>
                  {r.badge ? (
                    <span style={{ padding: '2px 10px', borderRadius: '6px', background: r.badge.bg, color: r.badge.text, fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={10} />{r.value}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 600, textAlign: 'right', wordBreak: 'break-all', maxWidth: '140px' }}>{r.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Refund Policy */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Refund Policy</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'You can request a refund within 7 days of purchase.',
                  'Once approved, the refund will be processed within 5-7 business days.',
                  'Refunds will be credited to the original payment method only.',
                ].map((policy, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Clock size={13} color="#4f46e5" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5 }}>{policy}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => toast.success('Reading full refund policy...')} style={{ color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                Read Full Refund Policy →
              </button>
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: RotateCcw, label: 'How does refund work?', desc: 'Learn about our refund process.' },
                { icon: Clock, label: 'When will I get my refund?', desc: 'Check refund processing time.' },
                { icon: HelpCircle, label: 'Contact Support', desc: 'Our team is here to help you.' },
              ].map(link => {
                const Icon = link.icon;
                return (
                  <button key={link.label} onClick={() => toast.success(link.label)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: bg2, border: `1px solid ${border}`, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} color="#4f46e5" />
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700 }}>{link.label}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{link.desc}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} color="#94a3b8" />
                  </button>
                );
              })}
              <button onClick={() => toast.success('Opening Help Center')} style={{ width: '100%', padding: '9px', borderRadius: '8px', background: 'transparent', border: `1px solid ${border}`, color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                🛟 Visit Help Center
              </button>
            </div>

            {/* Hassle-free Returns Banner */}
            <div style={{ background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RotateCcw size={22} color="#4f46e5" />
              </div>
              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>Hassle-free Returns</h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>Not satisfied? No worries. Request a refund easily.</p>
              </div>
              <button onClick={() => toast.success('Learn more about returns')} style={{ width: '100%', padding: '9px 14px', borderRadius: '8px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        <button onClick={() => toast.success('Chat coming soon!')} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#fff', border: 'none', boxShadow: '0 6px 20px rgba(79,70,229,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <MessageCircle size={22} />
        </button>
      </div>
    </PageWrapper>
  );
}
