// ============================================================
// Payment Page — Step 3: Secure Payment & Payment Gateway Selection
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock, ShieldCheck, CheckCircle2, CreditCard, Smartphone,
  Building2, Wallet, ArrowLeft, Check, Award
} from 'lucide-react';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '1234 5678 9012 3456',
    cardName: 'xyz',
    expiry: '12/28',
    cvv: '123',
    saveCard: true,
  });

  const handlePay = (e) => {
    e.preventDefault();
    toast.success('Processing payment...');
    setTimeout(() => {
      navigate('/order-success');
    }, 800);
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* ── STEP NAVIGATION BAR (Cart > Checkout > Payment > Success) ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
          padding: '16px', borderRadius: '12px', background: '#ffffff',
          border: '1px solid #dde5f5', fontSize: '0.85rem', color: '#667085',
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
          <span style={{ width: '40px', height: '1px', background: '#2563eb' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 700 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 }}>3</span>
            <span>Payment</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#dde5f5' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#98a2b3' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 }}>4</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* ── PAGE HEADER TITLE ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ color: '#101828', fontFamily: 'Inter, sans-serif', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
            Secure Payment
          </h1>
          <Lock size={18} color="#2563eb" />
        </div>
        <p style={{ color: '#667085', fontSize: '0.88rem', margin: '-16px 0 0' }}>
          Complete your payment to get instant access to the course and books.
        </p>

        {/* ── 2-COLUMN MAIN CONTENT GRID ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr minmax(320px, 360px)', gap: '28px', alignItems: 'start',
        }}>

          {/* LEFT COLUMN: PAYMENT METHOD CHOOSE & CARD DETAILS FORM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Choose a Payment Method Box */}
            <div style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                Choose a payment method
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Option 1: Credit / Debit Card */}
                <div
                  onClick={() => setSelectedMethod('card')}
                  style={{
                    padding: '16px', borderRadius: '10px',
                    border: `2px solid ${selectedMethod === 'card' ? '#2563eb' : '#dde5f5'}`,
                    background: selectedMethod === 'card' ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={selectedMethod === 'card'} readOnly />
                    <CreditCard size={18} color="#2563eb" />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#101828', display: 'block' }}>Credit / Debit / ATM Card</strong>
                      <span style={{ fontSize: '0.72rem', color: '#667085' }}>Visa, Mastercard, RuPay & more</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', background: '#1a1f71', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>VISA</span>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', background: '#eb001b', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>Mastercard</span>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', background: '#0072b8', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>RuPay</span>
                  </div>
                </div>

                {/* Option 2: UPI */}
                <div
                  onClick={() => setSelectedMethod('upi')}
                  style={{
                    padding: '16px', borderRadius: '10px',
                    border: `2px solid ${selectedMethod === 'upi' ? '#7c3aed' : '#eaecf0'}`,
                    background: selectedMethod === 'upi' ? '#f5f3ff' : '#ffffff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={selectedMethod === 'upi'} readOnly />
                    <Smartphone size={18} color="#2563eb" />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#101828', display: 'block' }}>UPI</strong>
                      <span style={{ fontSize: '0.72rem', color: '#667085' }}>Pay using Google Pay, PhonePe, Paytm UPI</span>
                    </div>
                  </div>
                  <span style={{ padding: '2px 6px', borderRadius: '4px', background: '#2563eb', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>UPI</span>
                </div>

                {/* Option 3: Net Banking */}
                <div
                  onClick={() => setSelectedMethod('netbanking')}
                  style={{
                    padding: '16px', borderRadius: '10px',
                    border: `2px solid ${selectedMethod === 'netbanking' ? '#7c3aed' : '#eaecf0'}`,
                    background: selectedMethod === 'netbanking' ? '#f5f3ff' : '#ffffff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={selectedMethod === 'netbanking'} readOnly />
                    <Building2 size={18} color="#2563eb" />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#101828', display: 'block' }}>Net Banking</strong>
                      <span style={{ fontSize: '0.72rem', color: '#667085' }}>All major banks supported</span>
                    </div>
                  </div>
                </div>

                {/* Option 4: Wallets */}
                <div
                  onClick={() => setSelectedMethod('wallet')}
                  style={{
                    padding: '16px', borderRadius: '10px',
                    border: `2px solid ${selectedMethod === 'wallet' ? '#7c3aed' : '#eaecf0'}`,
                    background: selectedMethod === 'wallet' ? '#f5f3ff' : '#ffffff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={selectedMethod === 'wallet'} readOnly />
                    <Wallet size={18} color="#2563eb" />
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: '#101828', display: 'block' }}>Wallets</strong>
                      <span style={{ fontSize: '0.72rem', color: '#667085' }}>PhonePe, Paytm, Amazon Pay & more</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card Form Details Section (If Card is selected) */}
              {selectedMethod === 'card' && (
                <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid #eaecf0' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#101828', margin: 0 }}>Card Details</h4>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      required
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>Name on Card</label>
                    <input
                      type="text"
                      value={cardDetails.cardName}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                      placeholder="Enter card holder name"
                      required
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        placeholder="MM / YY"
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.76rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>CVV</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="123"
                        required
                        maxLength={4}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#667085' }}>
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={cardDetails.saveCard}
                      onChange={(e) => setCardDetails({ ...cardDetails, saveCard: e.target.checked })}
                    />
                    <label htmlFor="saveCard" style={{ cursor: 'pointer' }}>Save card for faster payments</label>
                  </div>

                  {/* Security Guarantee Bar */}
                  <div style={{ padding: '12px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #eaecf0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: '#667085' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={14} color="#2563eb" />
                      <span>Your payment is 100% secure</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', fontWeight: 700 }}>
                      <span>PCI DSS</span> • <span>SSL</span> • <span>VERIFIED</span>
                    </div>
                  </div>

                  {/* Pay Action Button */}
                  <button
                    type="submit"
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', color: '#ffffff', fontSize: '0.95rem', fontWeight: 800,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.35)', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <Lock size={16} /> Pay ₹799
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    style={{ background: 'none', border: 'none', color: '#667085', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', marginTop: '4px' }}
                  >
                    ← Back to Checkout
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY & WHAT YOU GET */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Order Summary Box */}
            <div style={{
              background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px',
              padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
            }}>
              <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop"
                  alt="Course Thumbnail"
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ color: '#101828', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px' }}>
                    AI for Beginners: Complete Video Course
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>By Aman Verma</span>
                </div>
              </div>

              <div style={{ height: '1px', background: '#eaecf0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Price</span>
                  <span style={{ color: '#101828', fontWeight: 600 }}>₹1,299</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#027a48' }}>
                  <span>Discount (38%)</span>
                  <span style={{ fontWeight: 700 }}>- ₹500</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Subtotal</span>
                  <span style={{ color: '#101828', fontWeight: 600 }}>₹799</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#667085' }}>Tax (0%)</span>
                  <span style={{ color: '#101828', fontWeight: 600 }}>₹0</span>
                </div>
              </div>

              <div style={{ height: '1px', background: '#eaecf0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.95rem', color: '#101828' }}>Total Amount</strong>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>₹799</span>
              </div>

              <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#ecfdf3', border: '1px solid #abefc6', color: '#027a48', fontSize: '0.76rem', fontWeight: 700, textAlign: 'center' }}>
                🏷️ You are saving ₹500 on this purchase!
              </div>
            </div>

            {/* What you get Card */}
            <div style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ color: '#101828', fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>What you get</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.78rem', color: '#475467' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Award size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#101828', display: 'block' }}>Lifetime Access</strong>
                    <span>Watch anytime, anywhere</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Award size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#101828', display: 'block' }}>Certificate of Completion</strong>
                    <span>Share on LinkedIn & resume</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Award size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#101828', display: 'block' }}>Access on all Devices</strong>
                    <span>Mobile, Laptop & TV</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageWrapper>
  );
}
