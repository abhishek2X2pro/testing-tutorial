// ============================================================
// My Orders Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, LayoutDashboard, BookOpen, Video, Award, Heart,
  Download, FileText, Trophy, Settings, HelpCircle, LogOut,
  ShoppingBag, MessageCircle, Filter, Search, MoreVertical,
  CheckCircle2, Clock, XCircle, RotateCcw, Package, TrendingUp
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

const ORDERS = [
  {
    id: '#AL2024PYO0123',
    course: 'Complete Python for AI & Data Science',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=80&auto=format&fit=crop',
    date: 'May 26, 2024',
    time: '10:30 AM',
    items: 1,
    amount: '₹989',
    orderStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: '#AL2024DL00087',
    course: 'Introduction to Deep Learning',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=80&auto=format&fit=crop',
    date: 'May 28, 2024',
    time: '02:15 PM',
    items: 1,
    amount: '₹1,299',
    orderStatus: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
  },
  {
    id: '#AL2024NLP00456',
    course: 'NLP with Transformers',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=80&auto=format&fit=crop',
    date: 'May 30, 2024',
    time: '11:45 AM',
    items: 1,
    amount: '₹1,499',
    orderStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: '#AL2024AI000074',
    course: 'Artificial Intelligence for Beginners',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop',
    date: 'May 24, 2024',
    time: '09:10 AM',
    items: 1,
    amount: '₹699',
    orderStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'Razorpay',
  },
  {
    id: '#AL2024DVO0211',
    course: 'Data Visualization with Python',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop',
    date: 'Jun 2, 2024',
    time: '03:20 PM',
    items: 1,
    amount: '₹799',
    orderStatus: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'Debit Card',
  },
  {
    id: '#AL2024ML0345',
    course: 'Machine Learning Bootcamp',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=80&auto=format&fit=crop',
    date: 'Apr 18, 2024',
    time: '10:10 AM',
    items: 1,
    amount: '₹1,899',
    orderStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: '#AL2024DS0210',
    course: 'Data Science with Python',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=80&auto=format&fit=crop',
    date: 'Apr 10, 2024',
    time: '05:25 PM',
    items: 1,
    amount: '₹999',
    orderStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: '#AL2024AI01101',
    course: 'AI Fundamentals Course',
    type: 'Digital Course',
    thumb: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=80&auto=format&fit=crop',
    date: 'Mar 22, 2024',
    time: '11:00 AM',
    items: 1,
    amount: '₹499',
    orderStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
  },
];

const sidebarMenuItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/my-learning' },
  { label: 'Live Classes', icon: Video, path: '/courses' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Orders', icon: ShoppingBag, path: '/orders', active: true },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Downloads', icon: Download, path: '/downloads' },
  { label: 'Notes', icon: FileText, path: '/notes' },
  { label: 'Achievements', icon: Trophy, path: '/achievements' },
  { label: 'Settings', icon: Settings, path: '/profile' },
  { label: 'Help & Support', icon: HelpCircle, path: '/contact' },
];

const STATUS_COLORS = {
  Completed: { bg: '#dcfce7', text: '#15803d' },
  Processing: { bg: '#dbeafe', text: '#1d4ed8' },
  Pending: { bg: '#fef3c7', text: '#b45309' },
  Cancelled: { bg: '#fee2e2', text: '#b91c1c' },
  Refunded: { bg: '#f3e8ff', text: '#7e22ce' },
};

export default function Orders() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const card = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#eaecf0';
  const bg2 = isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc';

  const tabs = [
    { id: 'all', label: 'All Orders', count: ORDERS.length },
    { id: 'Completed', label: 'Completed', count: ORDERS.filter(o => o.orderStatus === 'Completed').length },
    { id: 'Processing', label: 'Processing', count: ORDERS.filter(o => o.orderStatus === 'Processing').length },
    { id: 'Cancelled', label: 'Cancelled', count: 0 },
    { id: 'Refunded', label: 'Refunded', count: 0 },
  ];

  const filtered = (activeTab === 'all' ? ORDERS : ORDERS.filter(o => o.orderStatus === activeTab))
    .filter(o => o.course.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const summary = {
    total: ORDERS.length,
    completed: ORDERS.filter(o => o.orderStatus === 'Completed').length,
    processing: ORDERS.filter(o => o.orderStatus === 'Processing').length,
    cancelled: 0,
    refunded: 0,
    totalSpent: '₹6,295',
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#4f46e5', fontWeight: 600 }}>Orders</span>
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
                <LogOut size={16} /><span>Logout</span>
              </button>
            </div>

            {/* Explore More Promo */}
            <div style={{ background: isDark ? 'linear-gradient(135deg,#1e1b4b,#311b92)' : 'linear-gradient(135deg,#f5f3ff,#ede9fe)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#ddd6fe'}`, borderRadius: '14px', padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 4px 12px rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={22} color="#4f46e5" />
              </div>
              <div>
                <h4 style={{ color: isDark ? '#ffffff' : '#1e1b4b', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 4px' }}>Explore More</h4>
                <p style={{ color: isDark ? '#cbd5e1' : '#5b21b6', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>Discover new courses, books and live classes.</p>
              </div>
              <button onClick={() => navigate('/courses')} style={{ width: '100%', padding: '9px 14px', borderRadius: '8px', background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
                Browse Courses
              </button>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header */}
            <div>
              <h1 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>My Orders</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>Track, manage and view your all orders in one place.</p>
            </div>

            {/* Tabs + Search Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${border}`, overflowX: 'auto' }}>
                {tabs.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 14px', background: 'none', border: 'none', borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent', color: isActive ? '#4f46e5' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: isActive ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', marginBottom: '-1px' }}>
                      {tab.label} ({tab.count})
                    </button>
                  );
                })}
              </div>

              {/* Search + Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={13} color="#98a2b3" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" placeholder="Search orders..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '7px 12px 7px 30px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', outline: 'none', width: '160px' }} />
                </div>
                <button onClick={() => toast.success('Filter options')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 13px', borderRadius: '8px', background: card, border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  <Filter size={13} /> Filter
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr 1fr 1fr 1fr 90px', padding: '11px 20px', borderBottom: `1px solid ${border}`, background: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <div>Order Details</div><div>Date</div><div>Amount</div><div>Status</div><div>Payment</div><div style={{ textAlign: 'right' }}>Actions</div>
              </div>

              {/* Table Rows */}
              {filtered.map(order => {
                const sc = STATUS_COLORS[order.orderStatus] || STATUS_COLORS.Completed;
                return (
                  <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr 1fr 1fr 1fr 90px', alignItems: 'center', padding: '13px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f2f4f7'}`, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {/* Course */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={order.thumb} alt={order.course} style={{ width: '46px', height: '46px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: `1px solid ${border}` }} />
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3, maxWidth: '200px' }}>{order.course}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '1px' }}>Order ID: {order.id}</div>
                      </div>
                    </div>
                    {/* Date */}
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 500 }}>{order.date}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{order.time}</div>
                    </div>
                    {/* Amount */}
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 700 }}>{order.amount}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{order.items} item</div>
                    </div>
                    {/* Status */}
                    <div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, background: sc.bg, color: sc.text }}>
                        <CheckCircle2 size={10} />{order.orderStatus}
                      </span>
                    </div>
                    {/* Payment */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.76rem', fontWeight: 600 }}>{order.paymentStatus}</span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '1px' }}>{order.paymentMethod}</div>
                    </div>
                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <button onClick={() => navigate(`/orders/${order.id.replace('#', '')}/tracking`)} style={{ padding: '6px 10px', borderRadius: '6px', background: 'transparent', border: `1px solid ${border}`, color: 'var(--text-primary)', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        View Details
                      </button>
                      <button onClick={() => toast.success('More options')} style={{ padding: '5px', borderRadius: '6px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>Showing 1 to {filtered.length} of {ORDERS.length} orders</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: card, border: `1px solid ${border}`, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#4f46e5', color: '#fff', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>1</button>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'transparent', color: 'var(--text-primary)', border: `1px solid ${border}`, fontSize: '0.78rem', cursor: 'pointer' }}>2</button>
                  <button style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'transparent', border: `1px solid ${border}`, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Order Summary */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Order Summary</h3>
                <span onClick={() => toast.success('View report')} style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}>View Report</span>
              </div>
              {[
                { label: 'Total Orders', value: summary.total, icon: ShoppingBag, color: '#4f46e5', bg: '#f5f3ff' },
                { label: 'Completed', value: summary.completed, icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7' },
                { label: 'Processing', value: summary.processing, icon: Clock, color: '#d97706', bg: '#fef3c7' },
                { label: 'Cancelled', value: summary.cancelled, icon: XCircle, color: '#dc2626', bg: '#fee2e2' },
                { label: 'Refunded', value: summary.refunded, icon: RotateCcw, color: '#7c3aed', bg: '#f3e8ff' },
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
              <div style={{ height: '1px', background: border }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 700 }}>Total Spent</span>
                <strong style={{ color: '#4f46e5', fontSize: '0.92rem', fontWeight: 800 }}>{summary.totalSpent}</strong>
              </div>
            </div>

            {/* Need Help */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Need Help?</h3>
              {[
                { icon: HelpCircle, label: 'How do I track my order?', desc: 'Get step by step guide.' },
                { icon: Download, label: 'How to download my course?', desc: 'Learn how to access your purchase.' },
                { icon: RotateCcw, label: 'Request a Refund', desc: 'Raise a refund request easily.' },
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
