// ============================================================
// Invoice Details Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, CheckCircle2, Download,
  HelpCircle, CreditCard, MessageCircle, ShieldCheck, FileText
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function InvoiceDetails() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const invoice = {
    invoiceId: 'INV-2024-0008',
    orderId: '#AL2024PYO0123',
    invoiceDate: 'May 26, 2024',
    dueDate: 'May 26, 2024',
    status: 'Paid',
    paymentMethod: 'UPI',
    transactionId: 'UPI20240526103045',
    paidOn: 'May 26, 2024 10:30 AM',
    amountPaid: '₹999',
    billTo: {
      name: 'Shailendra Kumar',
      address: 'Khimlaas, Madhya Pradesh, India',
      email: 'shailendraahirwar@gmail.com',
      phone: '+91 62626 12345',
    },
    orderDetails: {
      courseName: 'Complete Python for AI & Data Science',
      orderDate: 'May 26, 2024, 10:30 AM',
      paymentMethod: 'UPI',
    },
    items: [
      {
        name: 'Complete Python for AI & Data Science',
        type: 'Digital Course',
        icon: '🐍',
        iconBg: '#1e293b',
        amount: '₹999',
      },
    ],
    subtotal: '₹999',
    discount: '-₹150',
    tax: '₹150',
    totalAmount: '₹999',
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
          <Link to="/orders/invoices" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Invoices</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>{invoice.invoiceId}</span>
        </div>

        {/* HEADER ROW */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Invoice Details</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>View and download your invoice.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/orders/invoices')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
              <ChevronLeft size={15} /> Back to Invoices
            </button>
            <button onClick={() => toast.success('Downloading PDF invoice...')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
              <Download size={15} /> Download PDF
            </button>
          </div>
        </div>

        {/* MAIN 2-COLUMN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT MAIN — INVOICE DOCUMENT */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>

            {/* Invoice Top Header */}
            <div style={{ padding: '24px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              {/* Brand Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800 }}>AI Learning</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Learn AI. Build Future.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Email: support@ailearning.com</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Phone: +91 98765 43210</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Website: www.ailearning.com</span>
                </div>
              </div>

              {/* Invoice Meta */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '6px', background: '#dcfce7', color: '#15803d', fontSize: '0.78rem', fontWeight: 700 }}>
                    <CheckCircle2 size={12} /> Paid
                  </span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Invoice</div>
                {[
                  { label: 'Invoice ID', value: invoice.invoiceId },
                  { label: 'Order ID', value: invoice.orderId },
                  { label: 'Invoice Date', value: invoice.invoiceDate },
                  { label: 'Due Date', value: invoice.dueDate },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{r.label}</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.74rem', fontWeight: 600 }}>: {r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill To + Order Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderBottom: `1px solid ${border}` }}>
              {/* Bill To */}
              <div style={{ padding: '20px 24px', borderRight: `1px solid ${border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={12} color="#4f46e5" />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bill To</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>{invoice.billTo.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{invoice.billTo.address}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{invoice.billTo.email}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{invoice.billTo.phone}</span>
                </div>
              </div>

              {/* Order Details */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={12} color="#4f46e5" />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Order Details</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {[
                    { label: 'Course Name', value: invoice.orderDetails.courseName },
                    { label: 'Order Date', value: invoice.orderDetails.orderDate },
                    { label: 'Payment Method', value: invoice.orderDetails.paymentMethod },
                  ].map(r => (
                    <div key={r.label}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{r.label}: </span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.74rem', fontWeight: 600 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div style={{ padding: '0' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', padding: '10px 24px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb', borderBottom: `1px solid ${border}`, fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <div>Item</div><div>Description</div><div style={{ textAlign: 'right' }}>Amount</div>
              </div>
              {/* Item Row */}
              {invoice.items.map(item => (
                <div key={item.name} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', alignItems: 'center', padding: '16px 24px', borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700 }}>{item.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{item.type}</div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>—</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700, textAlign: 'right' }}>{item.amount}</div>
                </div>
              ))}

              {/* Totals */}
              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                {[
                  { label: 'Subtotal', value: invoice.subtotal },
                  { label: 'Discount', value: invoice.discount, green: true },
                  { label: 'Tax (18%)', value: invoice.tax },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', gap: '40px', justifyContent: 'flex-end' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', minWidth: '80px', textAlign: 'right' }}>{r.label}</span>
                    <span style={{ color: r.green ? '#16a34a' : 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600, minWidth: '60px', textAlign: 'right' }}>{r.value}</span>
                  </div>
                ))}
                <div style={{ width: '100%', height: '1px', background: border, marginTop: '4px' }} />
                <div style={{ display: 'flex', gap: '40px', justifyContent: 'flex-end' }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>Total Amount</span>
                  <span style={{ color: '#4f46e5', fontSize: '1rem', fontWeight: 800, minWidth: '60px', textAlign: 'right' }}>{invoice.totalAmount}</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>(Inclusive of all taxes)</span>
              </div>
            </div>

            {/* Footer Note */}
            <div style={{ padding: '16px 24px', borderTop: `1px solid ${border}`, background: bg2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={12} color="#1d4ed8" />
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', lineHeight: 1.4 }}>
                  Thank you for choosing AI Learning. This is a system generated invoice and does not require a signature.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Payment Summary */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Payment Summary</h3>
              {[
                { label: 'Payment Status', value: invoice.status, badge: true },
                { label: 'Payment Method', value: invoice.paymentMethod },
                { label: 'Transaction ID', value: invoice.transactionId },
                { label: 'Paid On', value: invoice.paidOn },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', flexShrink: 0 }}>{r.label}</span>
                  {r.badge ? (
                    <span style={{ padding: '2px 10px', borderRadius: '6px', background: '#dcfce7', color: '#15803d', fontSize: '0.74rem', fontWeight: 700 }}>{r.value}</span>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, textAlign: 'right', wordBreak: 'break-all' }}>{r.value}</span>
                  )}
                </div>
              ))}
              <div style={{ height: '1px', background: border, margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>Amount Paid</span>
                <span style={{ color: '#4f46e5', fontSize: '1rem', fontWeight: 800 }}>{invoice.amountPaid}</span>
              </div>
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: Download, label: 'Download Invoice', desc: 'Learn how to download your invoice.' },
                { icon: CreditCard, label: 'Payment Issues', desc: 'Facing payment problems? Get help.' },
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
