// ============================================================
// Invoices List Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, FileText, Download, Filter, Search,
  HelpCircle, MoreVertical, MessageCircle, Mail, AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const INVOICES = [
  { id: 'INV-2024-0008', orderId: '#AL2024PYO0123', course: 'Complete Python for AI & Data Science', date: 'May 26, 2024', amount: '₹999', status: 'Paid' },
  { id: 'INV-2024-0007', orderId: '#AL2024DL00087', course: 'Introduction to Deep Learning', date: 'May 28, 2024', amount: '₹1,299', status: 'Paid' },
  { id: 'INV-2024-0006', orderId: '#AL2024NLP00456', course: 'NLP with Transformers', date: 'May 30, 2024', amount: '₹1,499', status: 'Paid' },
  { id: 'INV-2024-0005', orderId: '#AL2024AI000074', course: 'Artificial Intelligence for Beginners', date: 'May 24, 2024', amount: '₹699', status: 'Paid' },
  { id: 'INV-2024-0004', orderId: '#AL2024DVO0211', course: 'Data Visualization with Python', date: 'Jun 2, 2024', amount: '₹799', status: 'Paid' },
  { id: 'INV-2024-0003', orderId: '#AL2024ML0345', course: 'Machine Learning Bootcamp', date: 'Apr 18, 2024', amount: '₹1,899', status: 'Paid' },
  { id: 'INV-2024-0002', orderId: '#AL2024DS0210', course: 'Data Science with Python', date: 'Apr 10, 2024', amount: '₹999', status: 'Paid' },
  { id: 'INV-2024-0001', orderId: '#AL2024AI01101', course: 'AI Fundamentals Course', date: 'Mar 22, 2024', amount: '₹499', status: 'Paid' },
];

export default function Invoices() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const filtered = INVOICES.filter(inv =>
    inv.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = INVOICES.reduce((acc, inv) => {
    const num = parseInt(inv.amount.replace(/[₹,]/g, ''));
    return acc + num;
  }, 0);

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/orders" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Orders</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Invoices</span>
        </div>

        {/* 2-COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT MAIN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Invoices</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>View and download all your order invoices.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={13} color="#98a2b3" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" placeholder="Search invoices..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '8px 12px 8px 30px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', outline: 'none', width: '170px' }} />
                </div>
                <button onClick={() => toast.success('Filter options')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  <Filter size={13} /> Filter
                </button>
              </div>
            </div>

            {/* Invoices Table */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr 1fr 1fr 120px 40px', padding: '11px 20px', borderBottom: `1px solid ${border}`, background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', alignItems: 'center' }}>
                <div>Invoice ID</div><div>Order Details</div><div>Date</div><div>Amount</div><div>Status</div><div>Actions</div><div></div>
              </div>

              {/* Table Rows */}
              {filtered.map(inv => (
                <div key={inv.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr 1fr 1fr 120px 40px', alignItems: 'center', padding: '14px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`, transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {/* Invoice ID */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={14} color="#4f46e5" />
                    </div>
                    <span style={{ color: '#4f46e5', fontSize: '0.8rem', fontWeight: 700 }}>{inv.id}</span>
                  </div>
                  {/* Order Details */}
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.3 }}>{inv.course}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '1px' }}>Order: {inv.orderId}</div>
                  </div>
                  {/* Date */}
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{inv.date}</div>
                  {/* Amount */}
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700 }}>{inv.amount}</div>
                  {/* Status */}
                  <div>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 700 }}>{inv.status}</span>
                  </div>
                  {/* Download */}
                  <button onClick={() => toast.success(`Downloading ${inv.id}.pdf...`)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '7px', background: isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff', border: `1px solid ${isDark ? 'rgba(99,102,241,0.25)' : '#ddd6fe'}`, color: '#4f46e5', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Download size={13} /> Download PDF
                  </button>
                  {/* More */}
                  <button onClick={() => toast.success('More options')} style={{ padding: '5px', borderRadius: '6px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MoreVertical size={15} />
                  </button>
                </div>
              ))}

              {/* Pagination */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>Showing 1 to {filtered.length} of {INVOICES.length} invoices</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'transparent', border: `1px solid ${border}`, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#4f46e5', color: '#fff', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>1</button>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'transparent', border: `1px solid ${border}`, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Invoice Summary */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Invoice Summary</h3>
              {[
                { label: 'Total Invoices', value: INVOICES.length, icon: FileText, color: '#4f46e5', bg: '#f5f3ff' },
                { label: 'Total Amount', value: `₹${totalAmount.toLocaleString('en-IN')}`, icon: CheckCircle2, color: '#0891b2', bg: '#e0f2fe' },
                { label: 'Paid Invoices', value: INVOICES.length, icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7' },
                { label: 'Pending Invoices', value: 0, icon: AlertCircle, color: '#d97706', bg: '#fef3c7' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} color={item.color} />
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.label}</span>
                    </div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.86rem', fontWeight: 700 }}>{item.value}</strong>
                  </div>
                );
              })}
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: HelpCircle, label: 'How do I get my invoice?', desc: 'Learn how to download your invoice.' },
                { icon: AlertCircle, label: 'Invoice related issues?', desc: 'Get help with invoice problems.' },
                { icon: Mail, label: 'Contact Support', desc: 'Our team is here to help you.' },
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

            {/* Promo Banner */}
            <div style={{ background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} color="#4f46e5" />
              </div>
              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>All Your Invoices in One Place</h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>Download and manage your invoices anytime, anywhere.</p>
              </div>
              <button onClick={() => toast.success('Downloading all invoices...')} style={{ width: '100%', padding: '9px 14px', borderRadius: '8px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
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
