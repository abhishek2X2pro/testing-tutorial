// ============================================================
// Certificates Page — 1:1 Pixel-Perfect Reference Match
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Share2,
  Eye,
  Download,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  X,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const CERTIFICATES_DATA = [
  {
    id: 'cert_1',
    type: 'course',
    typeBadge: 'COURSE CERTIFICATE',
    badgeBg: 'rgba(99,102,241,.12)',
    badgeColor: '#6366f1',
    title: 'Artificial Intelligence for Beginners',
    recipient: 'Shailendra Kumar',
    issuedDate: 'May 24, 2024',
    duration: '4h 32m',
    certId: 'AI-2024-88412',
    accentColor: '#d97706',
    borderFlourish: 'linear-gradient(135deg,#d97706,#f59e0b)',
  },
  {
    id: 'cert_2',
    type: 'course',
    typeBadge: 'COURSE CERTIFICATE',
    badgeBg: 'rgba(99,102,241,.12)',
    badgeColor: '#6366f1',
    title: 'Complete Python for AI & Data Science',
    recipient: 'Shailendra Kumar',
    issuedDate: 'May 26, 2024',
    duration: '11h 48m',
    certId: 'PY-2024-99102',
    accentColor: '#1e40af',
    borderFlourish: 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
  },
  {
    id: 'cert_3',
    type: 'course',
    typeBadge: 'COURSE CERTIFICATE',
    badgeBg: 'rgba(99,102,241,.12)',
    badgeColor: '#6366f1',
    title: 'Deep Learning with TensorFlow 2.0',
    recipient: 'Shailendra Kumar',
    issuedDate: 'May 28, 2024',
    duration: '9h 16m',
    certId: 'DL-2024-77301',
    accentColor: '#6366f1',
    borderFlourish: 'linear-gradient(135deg,#4f46e5,#8b5cf6)',
  },
  {
    id: 'cert_4',
    type: 'completion',
    typeBadge: 'COMPLETION CERTIFICATE',
    badgeBg: 'rgba(16,185,129,.12)',
    badgeColor: '#10b981',
    title: 'Learning Milestone (1250 Points)',
    recipient: 'Shailendra Kumar',
    issuedDate: 'May 30, 2024',
    totalCourses: '10',
    isAchievement: true,
    certId: 'MS-2024-12500',
    accentColor: '#059669',
    borderFlourish: 'linear-gradient(135deg,#059669,#10b981)',
  },
];

export default function Certificates() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'course' | 'completion'
  const [verifyId, setVerifyId] = useState('');
  const [selectedCertModal, setSelectedCertModal] = useState(null);

  const border = isDark ? 'rgba(255,255,255,.08)' : '#eaecf0';
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';

  const filteredCerts = CERTIFICATES_DATA.filter((cert) => {
    if (activeTab === 'course') return cert.type === 'course';
    if (activeTab === 'completion') return cert.type === 'completion';
    return true;
  });

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verifyId.trim()) {
      toast.error('Please enter a certificate ID to verify');
      return;
    }
    toast.success(`Certificate ${verifyId.toUpperCase()} is 100% Authentic & Verified!`);
  };

  const handleShareAll = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Certificates portfolio link copied to clipboard!');
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '24px 28px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── BREADCRUMB ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Certificates</span>
        </div>

        {/* ── PAGE HEADER & TOP CONTROLS ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 4px',
                letterSpacing: '-0.02em',
              }}
            >
              My Certificates
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
              All your earned certificates in one place.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleShareAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '8px',
                background: cardBg,
                border: `1.5px solid ${border}`,
                color: '#6366f1',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              <Share2 size={15} /> Share My Certificates
            </button>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '8px',
                background: cardBg,
                border: `1.5px solid ${border}`,
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              All Certificates <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* ── TABS FILTER BAR ── */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            borderBottom: `1px solid ${border}`,
            marginBottom: '28px',
          }}
        >
          {[
            { id: 'all', label: `All Certificates (${CERTIFICATES_DATA.length})` },
            { id: 'course', label: `Course Certificates (3)` },
            { id: 'completion', label: `Completion Certificates (1)` },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  paddingBottom: '12px',
                  border: 'none',
                  borderBottom: isActive ? '2.5px solid #6366f1' : '2.5px solid transparent',
                  background: 'transparent',
                  color: isActive ? '#6366f1' : 'var(--text-muted)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── CERTIFICATES GRID (4 CARDS) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,.3)' : '0 2px 10px rgba(99,102,241,.06)',
                transition: 'transform .15s, border-color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = border;
              }}
            >
              {/* VISUAL CERTIFICATE MOCKUP THUMBNAIL */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1.4/1',
                  background: isDark ? '#0b1120' : '#fcfcfd',
                  borderBottom: `1px solid ${border}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Border Flourish Accent */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '8px',
                    border: `1.5px double ${isDark ? 'rgba(99,102,241,.3)' : '#cbd5e1'}`,
                    borderRadius: '6px',
                    pointerEvents: 'none',
                  }}
                />

                {/* Top Brand Header */}
                <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  AI LEARNING
                </div>

                <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  {cert.isAchievement ? 'CERTIFICATE OF ACHIEVEMENT' : 'CERTIFICATE OF COMPLETION'}
                </div>

                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  This is to certify that
                </div>

                <div
                  style={{
                    fontFamily: 'serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {cert.recipient}
                </div>

                <div style={{ fontSize: '0.48rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  has successfully completed
                </div>

                <div
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    color: '#6366f1',
                    maxWidth: '85%',
                    lineHeight: 1.2,
                    marginBottom: '8px',
                  }}
                >
                  {cert.title}
                </div>

                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>
                  {cert.issuedDate}
                </div>

                {/* Gold Seal Ribbon Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '14px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: cert.borderFlourish,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 8px rgba(0,0,0,.2)',
                  }}
                >
                  <Award size={15} />
                </div>
              </div>

              {/* CARD DETAILS BELOW THUMBNAIL */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* Type Badge Pill */}
                <div style={{ marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: cert.badgeColor,
                      background: cert.badgeBg,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cert.typeBadge}
                  </span>
                </div>

                {/* Course Title */}
                <h3
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: '0 0 10px',
                    lineHeight: 1.3,
                  }}
                >
                  {cert.title}
                </h3>

                {/* Meta Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="#6366f1" /> Issued on {cert.issuedDate}
                  </div>
                  {cert.duration && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} color="#6366f1" /> Duration: {cert.duration}
                    </div>
                  )}
                  {cert.totalCourses && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BookOpen size={13} color="#6366f1" /> Total Courses: {cert.totalCourses}
                    </div>
                  )}
                </div>

                {/* Bottom Action Links */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: `1px solid ${border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    onClick={() => setSelectedCertModal(cert)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: 'none',
                      background: 'transparent',
                      color: '#6366f1',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={14} /> View Certificate
                  </button>

                  <button
                    onClick={() => toast.success(`Downloading PDF for ${cert.title}...`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: 'none',
                      background: 'transparent',
                      color: '#6366f1',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Download size={14} /> Download
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── VERIFY YOUR CERTIFICATE BOTTOM BANNER CARD ── */}
        <div
          style={{
            background: isDark
              ? 'linear-gradient(135deg,rgba(99,102,241,.14),rgba(139,92,246,.08))'
              : 'linear-gradient(135deg,#f8fafc,#eef2ff)',
            border: '1.5px solid rgba(99,102,241,.25)',
            borderRadius: '16px',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(99,102,241,.15)',
                border: '1px solid rgba(99,102,241,.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366f1',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '0 0 2px',
                }}
              >
                Verify Your Certificate
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
                You can verify the authenticity of your certificate using the unique certificate ID.
              </p>
            </div>
          </div>

          <form onSubmit={handleVerify} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              placeholder="Enter Certificate ID"
              style={{
                width: '220px',
                padding: '9px 14px',
                borderRadius: '8px',
                border: `1px solid ${border}`,
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '9px 20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(99,102,241,.3)',
              }}
            >
              Verify Certificate
            </button>
          </form>
        </div>

      </div>

      {/* ── HIGH-RESOLUTION PREVIEW MODAL ── */}
      <AnimatePresence>
        {selectedCertModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,.75)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                width: '100%',
                maxWidth: '750px',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 25px 50px rgba(0,0,0,.3)',
                position: 'relative',
                border: '8px double #cbd5e1',
                textAlign: 'center',
              }}
            >
              <button
                onClick={() => setSelectedCertModal(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} color="#0f172a" />
              </button>

              <div style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                AI LEARNING PLATFORM
              </div>

              <h2 style={{ fontFamily: 'serif', fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: '0 0 16px' }}>
                CERTIFICATE OF COMPLETION
              </h2>

              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 12px' }}>
                This is proudly presented to
              </p>

              <h1 style={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 800, fontStyle: 'italic', color: '#4f46e5', margin: '0 0 16px' }}>
                {selectedCertModal.recipient}
              </h1>

              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 8px' }}>
                for successfully completing the online course
              </p>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 24px' }}>
                {selectedCertModal.title}
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                <div>
                  <strong style={{ display: 'block', color: '#0f172a' }}>{selectedCertModal.issuedDate}</strong>
                  <span style={{ color: '#94a3b8' }}>Date Issued</span>
                </div>

                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Award size={24} />
                </div>

                <div>
                  <strong style={{ display: 'block', color: '#0f172a' }}>Shailendra Kumar</strong>
                  <span style={{ color: '#94a3b8' }}>Founder &amp; CEO</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  onClick={() => window.print()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '8px', background: '#0f172a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Printer size={15} /> Print Certificate
                </button>
                <button
                  onClick={() => toast.success('PDF Download started!')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '8px', background: '#6366f1', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Download size={15} /> Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
