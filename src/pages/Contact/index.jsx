// ============================================================
// Contact Page — DevOpsX (Vanilla CSS, Fully Mobile Responsive)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message)
      return toast.error('Please fill all required fields');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll reply within 24 hours. 🎉");
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const contactInfo = [
    { icon: Mail,   label: 'Email',         value: 'hello@devopsx.io',               href: 'mailto:hello@devopsx.io' },
    { icon: Phone,  label: 'Phone',         value: '+91 98765 43210',                href: 'tel:+919876543210' },
    { icon: MapPin, label: 'Address',       value: 'Koramangala, Bangalore 560034',  href: '#' },
    { icon: Clock,  label: 'Support Hours', value: 'Mon–Sat, 9AM–6PM IST',           href: '#' },
  ];

  /* ── Shared style helpers ── */
  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 14px',
    borderRadius: '10px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#d0d9f0'}`,
    background: isDark ? 'rgba(255,255,255,0.04)' : '#f4f7fe',
    color: 'var(--text-primary)',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginBottom: '6px',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        overflowX: 'hidden',
        padding: '60px 20px 80px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── HERO HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          {/* Badge */}
          <span
            style={{
              display: 'inline-block',
              padding: '5px 16px',
              borderRadius: '999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              color: '#60a5fa',
              border: '1px solid rgba(96,165,250,0.28)',
              background: 'rgba(59,130,246,0.08)',
              marginBottom: '16px',
              letterSpacing: '0.03em',
            }}
          >
            Get In Touch
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.7rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.88rem, 2vw, 1rem)',
              color: 'var(--text-muted)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Have a question? We're here to help. Send us a message and we'll respond within 24 hours.
          </p>
        </motion.div>

        {/* ── 2-COLUMN LAYOUT: Info + Form ── */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '28px', alignItems: 'start' }}>

          {/* ── LEFT: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(6,182,212,0.14))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#60a5fa" />
                </div>
                {/* Text */}
                <div>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '3px',
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* FAQ CTA Card */}
            <div
              style={{
                padding: '18px',
                borderRadius: '14px',
                background: isDark ? 'rgba(59,130,246,0.07)' : 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(96,165,250,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(59,130,246,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageSquare size={18} color="#60a5fa" />
              </div>
              <h4
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Check our FAQ
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Quick answers to common questions about courses, certificates, and more.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: '32px',
              borderRadius: '20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Name + Email row */}
              <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>
                    Full Name <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Email Address <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>
                  Message <span style={{ color: '#f87171' }}>*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: loading
                    ? 'rgba(59,130,246,0.5)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s, transform 0.15s',
                  boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite',
                      display: 'inline-block',
                    }} />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
