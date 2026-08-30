// ============================================================
// OrderSuccess Page — Step 4: Order Confirmation & Receipt ("Thank You!" Page)
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, Download, Copy, PlayCircle, BookOpen, Award,
  Users, Home, ArrowRight, Check, ShieldCheck
} from 'lucide-react';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const orderId = 'AI202600123';
  const paymentId = 'PAY87234156';

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order ID copied to clipboard!');
  };

  const handleDownloadInvoice = () => {
    toast.success('Downloading PDF Invoice...');
  };

  const handleDownloadEbook = () => {
    toast.success('Downloading eBook PDF...');
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* ── STEP NAVIGATION BAR (Cart > Checkout > Payment > Success) ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
          padding: '14px', borderRadius: '12px', background: '#ffffff',
          border: '1px solid #eaecf0', fontSize: '0.85rem', color: '#667085',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#027a48' }}>
            <CheckCircle2 size={16} color="#027a48" />
            <span>Cart</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#027a48' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#027a48' }}>
            <CheckCircle2 size={16} color="#027a48" />
            <span>Checkout</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#027a48' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#027a48' }}>
            <CheckCircle2 size={16} color="#027a48" />
            <span>Payment</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#027a48' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#027a48', fontWeight: 800 }}>
            <CheckCircle2 size={18} color="#027a48" />
            <span>Confirmation</span>
          </div>
        </div>

        {/* ── THANK YOU HERO HEADER CARD ── */}
        <div style={{
          background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '20px',
          padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(16,24,40,0.04)',
        }}>
          {/* Big Green Checkmark Icon */}
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%', background: '#dcfce7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 8px #f0fdf4',
          }}>
            <Check size={36} color="#16a34a" strokeWidth={3} />
          </div>

          <h1 style={{ color: '#101828', fontFamily: 'Inter, sans-serif', fontSize: '2.1rem', fontWeight: 900, margin: 0 }}>
            Payment Successful!
          </h1>
          <h2 style={{ color: '#2563eb', fontSize: '1.2rem', fontWeight: 700, margin: '-6px 0 0' }}>
            Welcome to DevOpsX Learning 🎉
          </h2>

          <p style={{ color: '#475467', fontSize: '0.9rem', maxWidth: '520px', margin: 0, lineHeight: 1.5 }}>
            Your order has been placed successfully. We have sent the order confirmation details to your registered email.
          </p>

          {/* Payment ID & Date Bar */}
          <div style={{
            marginTop: '8px', padding: '10px 20px', borderRadius: '10px', background: '#f8fafc',
            border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justify: 'center', gap: '16px', fontSize: '0.82rem', color: '#344054',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#16a34a" />
              <strong>Payment ID:</strong> <span>{paymentId}</span>
            </div>
            <span>•</span>
            <div>
              <strong>Date:</strong> <span>20 May 2024, 11:30 AM</span>
            </div>
            <span>•</span>
            <button
              onClick={handleDownloadInvoice}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}
            >
              <Download size={14} /> Download Invoice
            </button>
          </div>

          {/* Order ID Pill Box */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 20px', borderRadius: '10px', background: '#ecfdf3',
            border: '1px solid #abefc6', color: '#027a48', fontSize: '1.05rem', fontWeight: 800, marginTop: '4px',
          }}>
            <span>Order ID: #{orderId}</span>
            <Copy size={16} style={{ cursor: 'pointer' }} onClick={handleCopyOrderId} />
          </div>
        </div>

        {/* ── 2-COLUMN ORDER DETAILS & WHAT'S NEXT GRID ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start',
        }}>

          {/* LEFT BOX: ORDER SUMMARY */}
          <div style={{
            background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '16px',
            padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
          }}>
            <h3 style={{ color: '#101828', fontSize: '1rem', fontWeight: 800, margin: 0 }}>
              Order Summary
            </h3>

            {/* Product Item Preview */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop"
                alt="Book cover"
                style={{ width: '60px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eaecf0' }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#101828', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px' }}>
                  Artificial Intelligence for Beginners
                </h4>
                <span style={{ fontSize: '0.76rem', color: '#667085' }}>by Shailendra Kumar</span>
                <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#027a48', fontWeight: 700 }}>
                  ₹589 Paid ✓
                </div>
              </div>
            </div>

            <div style={{ height: '1px', background: '#eaecf0' }} />

            {/* Delivery & Payment details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.8rem', color: '#475467' }}>
              <div>
                <strong style={{ color: '#101828', display: 'block', marginBottom: '2px' }}>📅 Order Date</strong>
                <span>28 May, 2024</span>
              </div>

              <div>
                <strong style={{ color: '#101828', display: 'block', marginBottom: '2px' }}>🚚 Delivery Method</strong>
                <span>Standard Express Shipping</span>
              </div>

              <div>
                <strong style={{ color: '#101828', display: 'block', marginBottom: '2px' }}>💳 Payment Method</strong>
                <span>UPI / Online Payment</span>
              </div>

              <div>
                <strong style={{ color: '#101828', display: 'block', marginBottom: '2px' }}>⏱️ Estimated Delivery</strong>
                <span>2 - 4 Business Days</span>
              </div>
            </div>

            {/* Amount Paid Bar */}
            <div style={{
              padding: '12px 16px', borderRadius: '10px', background: '#f8fafc',
              border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '6px',
            }}>
              <span style={{ color: '#475467', fontSize: '0.85rem', fontWeight: 600 }}>Total Amount Paid</span>
              <strong style={{ color: '#101828', fontSize: '1.25rem', fontWeight: 900 }}>₹589</strong>
            </div>
          </div>

          {/* RIGHT BOX: WHAT'S NEXT ACTION STEPS */}
          <div style={{
            background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '16px',
            padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
          }}>
            <h3 style={{ color: '#101828', fontSize: '1rem', fontWeight: 800, margin: 0 }}>
              What's Next?
            </h3>

            {/* List of Next Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                onClick={() => navigate('/my-learning')}
                style={{
                  padding: '12px 14px', borderRadius: '10px', background: '#f8fafc',
                  border: '1px solid #eaecf0', display: 'flex', alignItems: 'center',
                  justify: 'space-between', cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PlayCircle size={20} color="#2563eb" />
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: '#101828', display: 'block' }}>Start Learning Now</strong>
                    <span style={{ fontSize: '0.72rem', color: '#667085' }}>Go to your dashboard & start lessons</span>
                  </div>
                </div>
                <ArrowRight size={16} color="#667085" />
              </div>

              <div
                onClick={handleDownloadEbook}
                style={{
                  padding: '12px 14px', borderRadius: '10px', background: '#f8fafc',
                  border: '1px solid #eaecf0', display: 'flex', alignItems: 'center',
                  justify: 'space-between', cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BookOpen size={20} color="#2563eb" />
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: '#101828', display: 'block' }}>Download eBook Access</strong>
                    <span style={{ fontSize: '0.72rem', color: '#667085' }}>Access code files & PDF materials</span>
                  </div>
                </div>
                <ArrowRight size={16} color="#667085" />
              </div>
            </div>

            {/* Action Buttons Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => navigate('/my-learning')}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                  background: '#2563eb', color: '#ffffff', fontSize: '0.88rem', fontWeight: 800,
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                }}
              >
                Go to My Learning
              </button>

              <button
                onClick={() => navigate('/')}
                style={{
                  width: '100%', padding: '11px', borderRadius: '8px',
                  background: '#ffffff', border: '1px solid #d0d5dd', color: '#344054',
                  fontSize: '0.86rem', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}
              >
                <Home size={15} /> Back to Home
              </button>
            </div>
          </div>

        </div>

        {/* ── NEED HELP / SUPPORT BANNER ── */}
        <div style={{
          padding: '16px 20px', borderRadius: '12px', background: '#eff6ff',
          border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center',
          justify: 'space-between', gap: '16px', flexWrap: 'wrap',
        }}>
          <div>
            <strong style={{ color: '#1e40af', fontSize: '0.88rem', display: 'block' }}>🎧 Need help with your order?</strong>
            <span style={{ color: '#3b82f6', fontSize: '0.78rem' }}>Our dedicated support team is available 24/7 to assist you.</span>
          </div>
          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: '8px 16px', borderRadius: '6px', background: '#ffffff',
              border: '1px solid #3b82f6', color: '#1e40af', fontSize: '0.8rem',
              fontWeight: 700, cursor: 'pointer',
            }}
          >
            Contact Support
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}
