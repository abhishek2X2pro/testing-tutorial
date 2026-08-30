// ============================================================
// Order Details Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, CheckCircle2, Download,
  HelpCircle, RotateCcw, BookOpen, MessageCircle,
  ShoppingBag, FileText
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function OrderDetails() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const order = {
    orderId: '#AL2024PYO0123',
    orderDate: 'May 26, 2024, 10:30 AM',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    course: 'Complete Python for AI & Data Science',
    courseType: 'Digital Course',
    courseIcon: '🐍',
    courseIconBg: '#1e293b',
    price: '₹999',
    quantity: 1,
    total: '₹999',
    subtotal: '₹999',
    discount: '-₹150',
    tax: '₹150',
    finalTotal: '₹999',
    paymentMethod: 'UPI',
    transactionId: 'UPI20240526103045',
    paidOn: 'May 26, 2024, 10:30 AM',
    timeline: [
      { step: 'Order Placed', date: 'May 26, 2024, 10:30 AM', desc: 'Your order has been placed.', done: true },
      { step: 'Payment Successful', date: 'May 26, 2024, 10:30 AM', desc: 'Payment received via UPI.', done: true },
      { step: 'Processing', date: 'May 26, 2024, 10:31 AM', desc: 'Your order is being processed.', done: true },
      { step: 'Completed', date: 'May 26, 2024, 10:35 AM', desc: 'Your course is now available.', done: true },
    ],
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
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Order Details</span>
        </div>

        {/* HEADER ROW */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Order Details</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>View full information about your order.</p>
          </div>
          <button onClick={() => navigate('/orders')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
            <ChevronLeft size={15} /> Back to Orders
          </button>
        </div>

        {/* ORDER META ROW */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
          {[
            { label: 'Order ID', value: order.orderId },
            { label: 'Order Date', value: order.orderDate },
            { label: 'Payment Status', value: order.paymentStatus, badge: true, color: { bg: '#dcfce7', text: '#15803d' } },
            { label: 'Order Status', value: order.orderStatus, badge: true, color: { bg: '#dcfce7', text: '#15803d' } },
          ].map(m => (
            <div key={m.label}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</div>
              {m.badge ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, background: m.color.bg, color: m.color.text }}>
                  <CheckCircle2 size={12} /> {m.value}
                </span>
              ) : (
                <div style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 600 }}>{m.value}</div>
              )}
            </div>
          ))}
        </div>

        {/* MAIN 2-COLUMN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT MAIN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Items Section */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <div style={{ padding: '18px 24px', borderBottom: `1px solid ${border}` }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Items (1)</h3>
              </div>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 24px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb', borderBottom: `1px solid ${border}`, fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <div>Item</div><div>Price</div><div>Quantity</div><div style={{ textAlign: 'right' }}>Total</div>
              </div>
              {/* Item Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center', padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: order.courseIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {order.courseIcon}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>{order.course}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{order.courseType}</div>
                  </div>
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600 }}>{order.price}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600 }}>{order.quantity}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, textAlign: 'right' }}>{order.total}</div>
              </div>
            </div>

            {/* Price Details */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Price Details</h3>
              {[
                { label: 'Subtotal', value: order.subtotal, muted: true },
                { label: 'Discount', value: order.discount, green: true },
                { label: 'Tax (18%)', value: order.tax, muted: true },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>{r.label}</span>
                  <span style={{ color: r.green ? '#16a34a' : 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
              <div style={{ height: '1px', background: border, margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>Total Amount</span>
                <span style={{ color: '#4f46e5', fontSize: '1rem', fontWeight: 800 }}>{order.finalTotal}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px' }}>Payment Information</h3>
              {[
                { label: 'Payment Method', value: order.paymentMethod },
                { label: 'Transaction ID', value: order.transactionId },
                { label: 'Paid On', value: order.paidOn },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>{r.label}</span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Invoice Download Banner */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700 }}>Need an invoice?</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>Download invoice for this order for your records.</div>
              </div>
              <button onClick={() => toast.success('Downloading invoice...')} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                <Download size={15} /> Download Invoice
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Order Timeline */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: '0 0 16px' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {order.timeline.map((step, i) => (
                  <div key={step.step} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                    {/* Timeline line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: step.done ? '#dcfce7' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                        <CheckCircle2 size={14} color={step.done ? '#16a34a' : '#94a3b8'} />
                      </div>
                      {i < order.timeline.length - 1 && (
                        <div style={{ width: '2px', height: '32px', background: step.done ? '#16a34a' : '#e2e8f0' }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < order.timeline.length - 1 ? '8px' : '0', flex: 1 }}>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.3 }}>{step.step}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '1px' }}>{step.date}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px', lineHeight: 1.4 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => toast.success('Viewing certificate...')} style={{ marginTop: '12px', width: '100%', padding: '9px', borderRadius: '8px', background: 'transparent', border: `1px solid ${border}`, color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                📜 View Certificate
              </button>
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: BookOpen, label: 'How do I access my course?', desc: 'Learn how to access your purchase.' },
                { icon: RotateCcw, label: 'Refund & Cancellation Policy', desc: 'View our refund and cancellation policy.' },
                { icon: HelpCircle, label: 'Contact Support', desc: 'Our team is here to help you.' },
              ].map(link => {
                const Icon = link.icon;
                return (
                  <button key={link.label} onClick={() => toast.success(link.label)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: bg2, border: `1px solid ${border}`, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={15} color="#4f46e5" />
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

          </div>
        </div>

      </div>

      {/* Floating Chat */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        <button onClick={() => toast.success('Chat assistant coming soon!')} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', border: 'none', boxShadow: '0 6px 20px rgba(79,70,229,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <MessageCircle size={22} />
        </button>
      </div>
    </PageWrapper>
  );
}
