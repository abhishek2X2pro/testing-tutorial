// ============================================================
// Refund Request Details Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, CheckCircle2, Clock,
  HelpCircle, RotateCcw, MessageCircle, Paperclip, FileImage, AlertCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const STEP_CONFIGS = [
  { key: 'return_requested', label: 'Return Requested', icon: RotateCcw },
  { key: 'under_review', label: 'Under Review', icon: Clock },
  { key: 'approved', label: 'Approved', icon: CheckCircle2 },
  { key: 'refund_processed', label: 'Refund Processed', icon: CheckCircle2 },
  { key: 'refund_completed', label: 'Refund Completed', icon: CheckCircle2 },
];

export default function RefundDetails() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const refund = {
    requestId: 'RET-2024-0008',
    orderId: '#AL2024PYO0123',
    course: 'Complete Python for AI & Data Science',
    courseIcon: '🐍',
    courseIconBg: '#1e293b',
    orderDate: 'May 26, 2024, 10:30 AM',
    amountPaid: '₹999',
    requestDate: 'May 29, 2024, 11:20 AM',
    currentStatus: 'Under Review',
    refundMethod: 'UPI (Original Payment)',
    amountPaidSummary: '₹999',
    refundAmount: '₹999',
    expectedResolution: 'Within 24-48 hours',
    reasonForReturn: 'Course not as expected',
    reasonDetail: 'The course content did not meet my expectations. It is too basic and not what was mentioned in the description.',
    additionalDetails: 'The course is too basic. I was expecting more practical examples and in-depth content.',
    attachments: [
      { name: 'Screenshot_20240529_1120.png', size: '245 KB', icon: FileImage },
    ],
    timeline: [
      { step: 'return_requested', label: 'Return Requested', date: 'May 29, 2024', time: '11:20 AM', done: true },
      { step: 'under_review', label: 'Under Review', date: 'May 29, 2024', time: '11:45 AM', done: true },
      { step: 'approved', label: 'Approved', date: null, time: null, done: false },
      { step: 'refund_processed', label: 'Refund Processed', date: null, time: null, done: false },
      { step: 'refund_completed', label: 'Refund Completed', date: null, time: null, done: false },
    ],
    whatHappensNext: [
      'We are reviewing your request.',
      'Once approved, refund will be processed.',
      'Refund will be credited to your original payment method.',
    ],
    email: 'shailendraahirwar@gmail.com',
  };

  const STATUS_COLORS = {
    'Under Review': { bg: '#fef3c7', text: '#b45309' },
    'Approved': { bg: '#dcfce7', text: '#15803d' },
    'Refunded': { bg: '#dbeafe', text: '#1d4ed8' },
    'Rejected': { bg: '#fee2e2', text: '#b91c1c' },
  };
  const sc = STATUS_COLORS[refund.currentStatus] || STATUS_COLORS['Under Review'];

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/orders" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Orders</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/orders/returns" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Returns & Refunds</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>{refund.requestId}</span>
        </div>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Refund Request Details</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Track the status and details of your refund request.</p>
          </div>
          <button onClick={() => navigate('/orders/returns')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
            <ChevronLeft size={15} /> Back to Returns & Refunds
          </button>
        </div>

        {/* MAIN 2-COLUMN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT MAIN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Course Info Card */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Course Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '10px', background: refund.courseIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                  {refund.courseIcon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>{refund.course}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>Order ID: {refund.orderId} &nbsp;•&nbsp; Order Date: {refund.orderDate}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '2px' }}>Amount Paid: <strong style={{ color: 'var(--text-primary)' }}>{refund.amountPaid}</strong></div>
                </div>
              </div>

              {/* 3 Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '8px', borderTop: `1px solid ${border}` }}>
                {[
                  { label: 'Request ID', value: refund.requestId },
                  { label: 'Request Date', value: refund.requestDate },
                  { label: 'Current Status', value: refund.currentStatus, badge: true },
                  { label: 'Refund Method', value: refund.refundMethod },
                ].map(r => (
                  <div key={r.label}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{r.label}</div>
                    {r.badge ? (
                      <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700, background: sc.bg, color: sc.text, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.text }} />
                        {r.value}
                      </span>
                    ) : (
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600 }}>{r.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Status Timeline */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              {/* Horizontal Timeline */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', overflowX: 'auto' }}>
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: '17px', left: '40px', right: '40px', height: '2px', background: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0', zIndex: 0 }} />
                {/* Progress Line */}
                <div style={{ position: 'absolute', top: '17px', left: '40px', width: `${(refund.timeline.filter(s => s.done).length - 1) / (refund.timeline.length - 1) * 100}%`, height: '2px', background: '#4f46e5', zIndex: 0 }} />

                {refund.timeline.map((step, i) => {
                  const Icon = STEP_CONFIGS[i]?.icon || CheckCircle2;
                  return (
                    <div key={step.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '90px', flex: 1, zIndex: 1, position: 'relative' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: step.done ? (step.step === 'under_review' ? '#fef3c7' : '#dcfce7') : (isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'), border: step.done ? `2px solid ${step.step === 'under_review' ? '#d97706' : '#16a34a'}` : `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={15} color={step.done ? (step.step === 'under_review' ? '#d97706' : '#16a34a') : '#94a3b8'} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ color: step.done ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.72rem', fontWeight: step.done ? 700 : 500, lineHeight: 1.3 }}>{step.label}</div>
                        {step.date ? (
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.66rem', marginTop: '2px' }}>{step.date}<br />{step.time}</div>
                        ) : (
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.66rem', marginTop: '2px' }}>–</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reason for Return */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertCircle size={14} color="#4f46e5" />
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>Reason for Return</h3>
              </div>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600 }}>{refund.reasonForReturn}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{refund.reasonDetail}</div>
            </div>

            {/* Additional Details */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={14} color="#4f46e5" />
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>Additional Details</h3>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{refund.additionalDetails}</div>
            </div>

            {/* Attachments */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Paperclip size={14} color="#4f46e5" />
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>Attachments ({refund.attachments.length})</h3>
              </div>
              {refund.attachments.map(att => {
                const Icon = att.icon;
                return (
                  <div key={att.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '10px', background: bg2, border: `1px solid ${border}` }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color="#0369a1" />
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700 }}>{att.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{att.size}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Notice Box */}
            <div style={{ background: isDark ? 'rgba(79,70,229,0.08)' : '#f5f3ff', border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#ddd6fe'}`, borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <AlertCircle size={18} color="#6366f1" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <div style={{ color: isDark ? '#e0e7ff' : '#4338ca', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  We will review your request and get back to you within 24–48 hours.
                </div>
                <div style={{ color: isDark ? '#a5b4fc' : '#6366f1', fontSize: '0.76rem', marginTop: '4px' }}>
                  You will receive an email update on {refund.email}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Refund Request Summary */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Refund Request Summary</h3>
              {[
                { label: 'Request ID', value: refund.requestId },
                { label: 'Order ID', value: refund.orderId },
                { label: 'Amount Paid', value: refund.amountPaidSummary },
                { label: 'Refund Amount', value: refund.refundAmount },
                { label: 'Refund Method', value: refund.refundMethod },
                { label: 'Status', value: refund.currentStatus, badge: true },
                { label: 'Expected Resolution', value: refund.expectedResolution },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', flexShrink: 0 }}>{r.label}</span>
                  {r.badge ? (
                    <span style={{ padding: '2px 10px', borderRadius: '6px', background: sc.bg, color: sc.text, fontSize: '0.72rem', fontWeight: 700 }}>{r.value}</span>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 600, textAlign: 'right' }}>{r.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* What Happens Next */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>What happens next?</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {refund.whatHappensNext.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <Clock size={11} color="#d97706" />
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: RotateCcw, label: 'How does return work?', desc: 'Learn about our return process.' },
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
