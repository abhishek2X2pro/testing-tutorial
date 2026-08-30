// ============================================================
// Returns & Refunds Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, RotateCcw, Filter, MoreVertical,
  LayoutDashboard, BookOpen, Video, Award, Heart,
  Download, FileText, Trophy, Settings, HelpCircle,
  LogOut, ShoppingBag, MessageCircle, CheckCircle2,
  Clock, XCircle, DollarSign, HelpCircle as HelpIcon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const RETURNS = [
  {
    id: 'RET-2024-0008',
    orderId: '#AL2024PYO0123',
    course: 'Complete Python for AI & Data Science',
    icon: '🐍', iconBg: '#1e293b',
    reason: 'Course not as expected',
    status: 'Under Review',
    requestedOn: 'May 29, 2024\n11:20 AM',
    amount: '₹899',
  },
  {
    id: 'RET-2024-0007',
    orderId: '#AL2024DL00087',
    course: 'Introduction to Deep Learning',
    icon: 'DL', iconBg: '#312e81',
    reason: 'Technical issues',
    status: 'Approved',
    requestedOn: 'May 28, 2024\n04:15 PM',
    amount: '₹1,299',
  },
  {
    id: 'RET-2024-0006',
    orderId: '#AL2024NLP00456',
    course: 'NLP with Transformers',
    icon: 'NLP', iconBg: '#0f766e',
    reason: 'Not useful for me',
    status: 'Refunded',
    requestedOn: 'May 26, 2024\n09:40 AM',
    amount: '₹1,499',
  },
  {
    id: 'RET-2024-0005',
    orderId: '#AL2024AI000074',
    course: 'Artificial Intelligence for Beginners',
    icon: 'AI', iconBg: '#831843',
    reason: 'Purchased by mistake',
    status: 'Rejected',
    requestedOn: 'May 24, 2024\n02:30 PM',
    amount: '₹699',
  },
  {
    id: 'RET-2024-0004',
    orderId: '#AL2024DVO028',
    course: 'Data Visualization with Python',
    icon: '📊', iconBg: '#1e1b4b',
    reason: 'Course not as expected',
    status: 'Approved',
    requestedOn: 'May 22, 2024\n01:05 PM',
    amount: '₹799',
  },
  {
    id: 'RET-2024-0003',
    orderId: '#AL2024ML0345',
    course: 'Machine Learning Bootcamp',
    icon: '💡', iconBg: '#1e293b',
    reason: 'Technical issues',
    status: 'Refunded',
    requestedOn: 'May 20, 2024\n10:10 AM',
    amount: '₹1,899',
  },
  {
    id: 'RET-2024-0002',
    orderId: '#AL2024DS0210',
    course: 'Data Science with Python',
    icon: '📑', iconBg: '#065f46',
    reason: 'Not useful for me',
    status: 'Rejected',
    requestedOn: 'May 18, 2024\n05:25 PM',
    amount: '₹899',
  },
  {
    id: 'RET-2024-0001',
    orderId: '#AL2024AI01101',
    course: 'AI Fundamentals Course',
    icon: '⚛️', iconBg: '#311b92',
    reason: 'Course not as expected',
    status: 'Refunded',
    requestedOn: 'May 16, 2024\n11:00 AM',
    amount: '₹499',
  },
];

const STATUS_COLORS = {
  'Under Review': { bg: '#fef3c7', text: '#b45309' },
  'Approved': { bg: '#dcfce7', text: '#15803d' },
  'Refunded': { bg: '#dbeafe', text: '#1d4ed8' },
  'Rejected': { bg: '#fee2e2', text: '#b91c1c' },
  'Return Requested': { bg: '#f3e8ff', text: '#7e22ce' },
};

const sidebarMenuItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
  { label: 'Live Classes', icon: Video, path: '/courses' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Orders', icon: ShoppingBag, path: '/orders' },
  { label: 'Invoices', icon: FileText, path: '/orders/invoices' },
  { label: 'Returns & Refunds', icon: RotateCcw, path: '/orders/returns', active: true },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Downloads', icon: Download, path: '/downloads' },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/profile' },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'Return Requested', label: 'Return Requested' },
  { id: 'Under Review', label: 'Under Review' },
  { id: 'Approved', label: 'Approved' },
  { id: 'Refunded', label: 'Refunded' },
  { id: 'Rejected', label: 'Rejected' },
];

export default function ReturnsRefunds() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const filtered = activeTab === 'all' ? RETURNS : RETURNS.filter(r => r.status === activeTab);

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/orders" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Orders</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Returns & Refunds</span>
        </div>

        {/* 3-COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {sidebarMenuItems.map(item => {
                const Icon = item.icon;
                const isActive = item.active;
                return (
                  <Link key={item.label} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#4f46e5' : (isDark ? '#cbd5e1' : '#475467'), background: isActive ? (isDark ? 'rgba(79,70,229,0.15)' : '#f5f3ff') : 'transparent', textDecoration: 'none', transition: 'all 0.15s ease' }}>
                    <Icon size={16} color={isActive ? '#4f46e5' : (isDark ? '#94a3b8' : '#667085')} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button onClick={() => { logout(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 500, color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>

            {/* Promo Banner */}
            <div style={{ background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`, borderRadius: '14px', padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RotateCcw size={22} color="#4f46e5" />
              </div>
              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>Hassle-free Returns</h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>We're here to make your learning experience better.</p>
              </div>
              <button onClick={() => toast.success('Learn more about returns')} style={{ width: '100%', padding: '9px 14px', borderRadius: '8px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
                Learn More
              </button>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Returns & Refunds</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Track all your return and refund requests.</p>
              </div>
              <button onClick={() => toast.success('Filter options')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                <Filter size={14} /> Filter
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0', borderBottom: `1px solid ${border}`, overflowX: 'auto' }}>
              {TABS.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '10px 16px', background: 'none', border: 'none', borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent', color: isActive ? '#4f46e5' : 'var(--text-muted)', fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', marginBottom: '-1px', flexShrink: 0 }}>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Returns Table */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.2fr 1fr 1fr 100px 80px', padding: '12px 20px', borderBottom: `1px solid ${border}`, background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <div>Request ID</div>
                <div>Order Details</div>
                <div>Reason</div>
                <div>Status</div>
                <div>Requested On</div>
                <div>Amount</div>
                <div style={{ textAlign: 'right' }}>Actions</div>
              </div>

              {/* Table Rows */}
              {filtered.map(ret => {
                const sc = STATUS_COLORS[ret.status] || STATUS_COLORS['Under Review'];
                return (
                  <div key={ret.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.2fr 1fr 1fr 100px 80px', alignItems: 'center', padding: '14px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {/* Request ID */}
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700 }}>{ret.id}</div>
                    {/* Order Details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: ret.iconBg, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }}>
                        {ret.icon}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700, lineHeight: 1.3 }}>{ret.course}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Order: {ret.orderId}</div>
                      </div>
                    </div>
                    {/* Reason */}
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>{ret.reason}</div>
                    {/* Status */}
                    <div>
                      <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, background: sc.bg, color: sc.text }}>{ret.status}</span>
                    </div>
                    {/* Requested On */}
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{ret.requestedOn}</div>
                    {/* Amount */}
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700 }}>{ret.amount}</div>
                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <button onClick={() => navigate(`/orders/returns/${ret.id}`)} style={{ padding: '6px 10px', borderRadius: '6px', background: '#4f46e5', color: '#ffffff', border: 'none', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                        View Details
                      </button>
                      <button onClick={() => toast.success('Options')} style={{ padding: '6px', borderRadius: '6px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>Showing 1 to {filtered.length} of {RETURNS.length} requests</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#4f46e5', color: '#ffffff', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>1</button>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'transparent', color: 'var(--text-primary)', border: `1px solid ${border}`, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Returns Summary */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Returns Summary</h3>
              {[
                { label: 'Total Requests', value: '8', icon: RotateCcw, color: '#4f46e5', bg: '#f5f3ff' },
                { label: 'Under Review', value: '1', icon: Clock, color: '#d97706', bg: '#fef3c7' },
                { label: 'Approved', value: '2', icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7' },
                { label: 'Refunded', value: '3', icon: DollarSign, color: '#1d4ed8', bg: '#dbeafe' },
                { label: 'Rejected', value: '2', icon: XCircle, color: '#dc2626', bg: '#fee2e2' },
                { label: 'Total Refunded', value: '₹3,297', icon: DollarSign, color: '#4f46e5', bg: '#f5f3ff' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} color={item.color} />
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{item.label}</span>
                    </div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>{item.value}</strong>
                  </div>
                );
              })}
            </div>

            {/* Refund Policy */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Refund Policy</h3>
              <ul style={{ margin: 0, padding: '0 0 0 4px', display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                {[
                  'You can request a return within 7 days of purchase.',
                  'Approved refunds are processed within 5–7 business days.',
                  'Refunds are issued to the original payment method only.',
                ].map((policy, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.5 }}>
                    <CheckCircle2 size={14} color="#4f46e5" style={{ flexShrink: 0, marginTop: '1px' }} />
                    {policy}
                  </li>
                ))}
              </ul>
              <button onClick={() => toast.success('Reading full refund policy...')} style={{ color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0' }}>
                Read Full Refund Policy →
              </button>
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
