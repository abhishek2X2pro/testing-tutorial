// ============================================================
// Order Tracking Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, CheckCircle2, BookOpen,
  HelpCircle, CreditCard, MessageCircle, Lightbulb, Package
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const TIMELINE_STEPS = [
  { key: 'order_placed', label: 'Order Placed', date: 'May 26, 2024', time: '10:30 AM', done: true },
  { key: 'payment_successful', label: 'Payment Successful', date: 'May 26, 2024', time: '10:30 AM', done: true },
  { key: 'processing', label: 'Processing', date: 'May 26, 2024', time: '10:31 AM', done: true },
  { key: 'completed', label: 'Completed', date: 'May 26, 2024', time: '10:35 AM', done: true },
  { key: 'course_available', label: 'Course Available', date: 'May 26, 2024', time: '10:36 AM', done: true },
];

const ORDER_UPDATES = [
  { step: 'Order Placed', desc: 'Your order has been placed successfully.', date: 'May 26, 2024 10:30 AM', done: true },
  { step: 'Payment Successful', desc: 'We have received your payment via UPI.', date: 'May 26, 2024 10:30 AM', done: true },
  { step: 'Processing', desc: 'Your order is being processed.', date: 'May 26, 2024 10:31 AM', done: true },
  { step: 'Completed', desc: 'Your order has been completed.', date: 'May 26, 2024 10:35 AM', done: true },
  { step: 'Course Available', desc: 'You can now access your course.', date: 'May 26, 2024 10:36 AM', done: true },
];

export default function OrderTracking() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const order = {
    id: '#AL2024PYO0123',
    course: 'Complete Python for AI & Data Science',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120&auto=format&fit=crop',
    orderDate: 'May 26, 2024 10:30 AM',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    totalAmount: '₹999',
    items: 1,
  };

  const completedCount = TIMELINE_STEPS.filter(s => s.done).length;
  const progressPct = ((completedCount - 1) / (TIMELINE_STEPS.length - 1)) * 100;

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/orders" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Orders</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Order Tracking</span>
        </div>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Order Tracking</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Track your order status in real-time.</p>
          </div>
          <button onClick={() => navigate('/orders')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
            <ChevronLeft size={15} /> Back to Orders
          </button>
        </div>

        {/* MAIN 2-COLUMN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT MAIN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Course Info Card */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src={order.thumb} alt={order.course} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', border: `1px solid ${border}`, flexShrink: 0 }} />
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>{order.course}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>Order ID: {order.id}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '1px' }}>Ordered on: {order.orderDate}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', fontSize: '0.78rem', fontWeight: 700 }}>
                  <CheckCircle2 size={13} /> {order.orderStatus}
                </span>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{order.items} Item &nbsp;•&nbsp; <strong style={{ color: 'var(--text-primary)' }}>{order.totalAmount}</strong></div>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '28px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Background Track */}
                <div style={{ position: 'absolute', top: '21px', left: '40px', right: '40px', height: '3px', background: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0', zIndex: 0 }} />
                {/* Progress Fill */}
                <div style={{ position: 'absolute', top: '21px', left: '40px', width: `${progressPct}%`, height: '3px', background: 'linear-gradient(90deg, #4f46e5, #6366f1)', zIndex: 0, transition: 'width 0.4s ease' }} />

                {TIMELINE_STEPS.map((step, i) => (
                  <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1, zIndex: 1, position: 'relative' }}>
                    {/* Circle */}
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: step.done ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : (isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'), border: step.done ? 'none' : `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: step.done ? '0 4px 12px rgba(79,70,229,0.3)' : 'none', transition: 'all 0.3s' }}>
                      <CheckCircle2 size={20} color={step.done ? '#ffffff' : '#94a3b8'} />
                    </div>
                    {/* Label + Date */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: step.done ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.76rem', fontWeight: step.done ? 700 : 500, lineHeight: 1.3 }}>{step.label}</div>
                      {step.date && (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.66rem', marginTop: '3px', lineHeight: 1.4 }}>{step.date}<br />{step.time}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Updates */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 20px' }}>Order Updates</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {ORDER_UPDATES.map((upd, i) => (
                  <div key={upd.step} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                    {/* Left: dot + line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', flexShrink: 0 }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                        <CheckCircle2 size={14} color="#16a34a" />
                      </div>
                      {i < ORDER_UPDATES.length - 1 && (
                        <div style={{ width: '2px', flex: 1, minHeight: '28px', background: '#bbf7d0', margin: '3px 0' }} />
                      )}
                    </div>
                    {/* Right: content */}
                    <div style={{ paddingBottom: i < ORDER_UPDATES.length - 1 ? '20px' : '0', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, marginBottom: '2px' }}>{upd.step}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.4 }}>{upd.desc}</div>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{upd.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Good News Banner */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '18px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Lightbulb size={18} color="#d97706" />
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>Good news!</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>Your course is now available in your library. Start learning now!</div>
                </div>
              </div>
              <button onClick={() => navigate('/my-learning')} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <BookOpen size={15} color="#4f46e5" /> Go to My Courses
              </button>
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
                { label: 'Payment Status', value: order.paymentStatus, badge: { bg: '#dcfce7', text: '#15803d' } },
                { label: 'Order Status', value: order.orderStatus, badge: { bg: '#dcfce7', text: '#15803d' } },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>{r.label}</span>
                  {r.badge ? (
                    <span style={{ padding: '2px 10px', borderRadius: '6px', background: r.badge.bg, color: r.badge.text, fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={10} />{r.value}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 600, textAlign: 'right' }}>{r.value}</span>
                  )}
                </div>
              ))}
              <div style={{ height: '1px', background: border }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>Total Amount</span>
                <strong style={{ color: '#4f46e5', fontSize: '1rem', fontWeight: 800 }}>{order.totalAmount}</strong>
              </div>
            </div>

            {/* Course Access */}
            <div style={{ background: isDark ? 'rgba(79,70,229,0.08)' : '#f5f3ff', border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#ddd6fe'}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={18} color="#ffffff" />
                </div>
                <div>
                  <div style={{ color: isDark ? '#e0e7ff' : '#4338ca', fontSize: '0.84rem', fontWeight: 700 }}>Course Access</div>
                  <div style={{ color: isDark ? '#a5b4fc' : '#6366f1', fontSize: '0.72rem' }}>You can access your purchased course anytime from your library.</div>
                </div>
              </div>
              <button onClick={() => navigate('/my-learning')} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
                <BookOpen size={15} /> Go to My Courses →
              </button>
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: BookOpen, label: "Where is my course?", desc: 'Learn how to access purchased courses.' },
                { icon: CreditCard, label: 'Payment Issues', desc: 'Facing payment problems? Get help.' },
                { icon: HelpCircle, label: 'Contact Support', desc: 'Our team is here to assist you.' },
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
