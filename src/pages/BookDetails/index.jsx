// ============================================================
// BookDetails Page — 1:1 Pixel-Perfect DITTO UI matching Reference Image
// ============================================================

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Star, Download, ShoppingCart, Heart, ShieldCheck,
  Truck, RotateCcw, Headphones, Globe, BookOpen, Layers, Award,
  CheckCircle2, ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react';
import { books, getBookById } from '../../data/books';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function BookDetails() {
  const { id } = useParams();
  const book = getBookById(id);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('about');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  if (!book) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>Book Not Found</h2>
          <button
            onClick={() => navigate('/textbooks')}
            style={{ marginTop: '16px', padding: '10px 20px', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
          >
            Back to Library
          </button>
        </div>
      </PageWrapper>
    );
  }

  // Sample page thumbnails for gallery
  const sampleThumbnails = [
    book.cover,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop',
  ];

  const handleBuyNow = () => {
    toast.success(`Redirecting to checkout for "${book.title}"...`);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    toast.success(`Added "${book.title}" to your cart!`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? `Removed from wishlist` : `Added "${book.title}" to wishlist!`);
  };

  const handleDownloadSample = () => {
    toast.success(`Downloading Sample PDF for "${book.title}"...`);
    if (book.downloadUrl && book.downloadUrl !== '#') {
      window.open(book.downloadUrl, '_blank');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success(`Subscribed ${newsletterEmail} to updates!`);
    setNewsletterEmail('');
  };

  // Calculate discount percentage
  const originalPrice = book.originalPrice || Math.round(book.price * 1.6);
  const discountPercent = Math.round(((originalPrice - book.price) / originalPrice) * 100);

  // Chapters mock data
  const chapters = [
    { title: '1. Introduction to Artificial Intelligence', page: '18' },
    { title: '2. History and Evolution of AI', page: '24' },
    { title: '3. How AI Works?', page: '26' },
    { title: '4. Machine Learning Basics', page: '28' },
    { title: '5. Supervised vs Unsupervised Learning', page: '34' },
  ];

  // Student reviews mock data
  const reviewsData = [
    {
      name: 'Aman Verma',
      rating: 5,
      comment: 'This book explains AI in the simplest way possible. Perfect for beginners!',
      time: '2 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
    },
    {
      name: 'Neha Patel',
      rating: 5,
      comment: 'Very helpful for students. Loved the projects and examples.',
      time: '3 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    },
    {
      name: 'Rahul Singh',
      rating: 5,
      comment: 'Best AI book I have read so far. Highly recommended!',
      time: '1 month ago',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
    },
  ];

  // FAQs mock data
  const faqs = [
    { q: 'Is this book good for absolute beginners?', a: 'Yes! It starts from the absolute basics with clear explanations and step-by-step practical examples.' },
    { q: 'Will I get PDF version of this book?', a: 'Yes, instant PDF download access is included with your purchase, accessible on any device.' },
    { q: 'How many days will it take for delivery?', a: 'Physical copies are delivered within 3-5 business days. Digital PDF access is instant.' },
    { q: 'What is your return policy?', a: 'We offer a 7-day no-questions-asked hassle-free return policy.' },
  ];

  // Related books
  const relatedBooks = [
    { id: '1', title: 'Machine Learning for Beginners', cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop', price: 549, originalPrice: 899, rating: 4.7, ratingsCount: 812 },
    { id: '2', title: 'Deep Learning Fundamentals', cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop', price: 599, originalPrice: 999, rating: 4.8, ratingsCount: 1021 },
    { id: '3', title: 'ChatGPT Mastery Guide', cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop', price: 399, originalPrice: 599, rating: 4.7, ratingsCount: 654 },
    { id: '4', title: 'Python Programming for AI', cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop', price: 499, originalPrice: 799, rating: 4.6, ratingsCount: 1120 },
    { id: '5', title: 'AI Projects Build & Learn', cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop', price: 499, originalPrice: 799, rating: 4.8, ratingsCount: 952 },
  ];

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#667085' }}>
          <Link to="/" style={{ color: '#667085', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <Link to="/textbooks" style={{ color: '#667085', textDecoration: 'none' }}>Books</Link>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#667085' }}>{book.category}</span>
          <ChevronRight size={13} color="#98a2b3" />
          <span style={{ color: '#101828', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
            {book.title}
          </span>
        </div>

        {/* ── TOP HERO PRODUCT SECTION (3-COLUMN DITTO LAYOUT) ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #eaecf0',
          borderRadius: '16px',
          padding: '28px 32px',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr minmax(240px, 280px)',
          gap: '32px',
          alignItems: 'start',
          boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
        }}>

          {/* COLUMN 1: Gallery Thumbnails + 3D Book Cover */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            {/* Gallery Thumbnails List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
              {sampleThumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '54px', height: '70px', borderRadius: '6px', overflow: 'hidden',
                    border: `2px solid ${selectedImage === idx ? '#2563eb' : '#dde5f5'}`,
                    cursor: 'pointer', opacity: selectedImage === idx ? 1 : 0.7, transition: 'all 0.15s',
                  }}
                >
                  <img src={thumb} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              <div style={{
                width: '54px', height: '54px', borderRadius: '6px',
                border: '1px border-dashed #d0d5dd', background: '#f9fafb',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.68rem', color: '#667085', fontWeight: 600, cursor: 'pointer', textAlign: 'center',
              }}>
                <span>+6</span>
                <span>More images</span>
              </div>
            </div>

            {/* Main 3D Book Cover Display */}
            <div style={{
              flex: 1, aspectRatio: '3/4', borderRadius: '10px', overflow: 'hidden',
              background: '#f8fafc',
              border: '1px solid #eaecf0',
              boxShadow: '-10px 14px 28px rgba(15, 23, 42, 0.18)',
              position: 'relative',
            }}>
              <img
                src={sampleThumbnails[selectedImage] || book.cover}
                alt={book.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* COLUMN 2: Book Title, Spec Grid, Pricing, Actions & Guarantee */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Bestseller Badge */}
            <div>
              <span style={{
                fontSize: '0.72rem', fontWeight: 500, color: '#344054',
                background: '#f2f4f7', border: '1px solid #eaecf0',
                padding: '3px 10px', borderRadius: '6px', letterSpacing: '0.01em',
              }}>
                Bestseller
              </span>
            </div>

            {/* Book Title */}
            <h1 style={{
              color: '#101828', fontFamily: 'Inter, sans-serif',
              fontSize: '1.6rem', fontWeight: 800,
              lineHeight: 1.25, margin: 0, letterSpacing: '-0.02em',
            }}>
              {book.title}
            </h1>

            {/* Subtitle */}
            <p style={{ color: '#475467', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
              {book.subtitle || 'A complete guide to understand AI from scratch with real-world examples and projects.'}
            </p>

            {/* Ratings & Students Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
              <span style={{ fontWeight: 800, color: '#101828' }}>{book.rating || 4.8}</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>
              <span style={{ color: '#667085' }}>({(book.ratingsCount || 1248).toLocaleString()} reviews)</span>
              <span style={{ color: '#d0d5dd' }}>•</span>
              <span style={{ color: '#475467', fontWeight: 500 }}>{(book.learnersCount || 10000).toLocaleString()}+ students</span>
            </div>

            {/* Key Spec Badges Box (Language, Pages, Edition, ISBN) */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
              padding: '12px 14px', borderRadius: '8px', background: '#ffffff',
              border: '1px solid #eaecf0', margin: '2px 0',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#667085', fontSize: '0.7rem', fontWeight: 500 }}>
                  <Globe size={12} /> Language
                </div>
                <div style={{ color: '#101828', fontSize: '0.8rem', fontWeight: 600, marginTop: '2px' }}>
                  English
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#667085', fontSize: '0.7rem', fontWeight: 500 }}>
                  <BookOpen size={12} /> Pages
                </div>
                <div style={{ color: '#101828', fontSize: '0.8rem', fontWeight: 600, marginTop: '2px' }}>
                  320 Pages
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#667085', fontSize: '0.7rem', fontWeight: 500 }}>
                  <Layers size={12} /> Edition
                </div>
                <div style={{ color: '#101828', fontSize: '0.8rem', fontWeight: 600, marginTop: '2px' }}>
                  Latest Edition
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#667085', fontSize: '0.7rem', fontWeight: 500 }}>
                  <Award size={12} /> ISBN
                </div>
                <div style={{ color: '#101828', fontSize: '0.75rem', fontWeight: 600, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  978-01-987654-3-2
                </div>
              </div>
            </div>

            {/* Price Tag Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
              <span style={{ fontSize: '1.9rem', fontWeight: 800, color: '#101828' }}>
                ₹{book.price || 499}
              </span>
              <span style={{ fontSize: '0.95rem', color: '#98a2b3', textDecoration: 'line-through' }}>
                ₹{originalPrice || 799}
              </span>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, color: '#027a48',
                background: '#ecfdf3', border: '1px solid #abefc6',
                padding: '2px 8px', borderRadius: '4px',
              }}>
                {discountPercent}% OFF
              </span>
            </div>

            {/* Action Buttons Stack (Buy Now, Add to Cart, Wishlist) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1.2, padding: '12px 24px', borderRadius: '8px', border: 'none',
                  background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', color: '#ffffff',
                  fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37,99,235,.35)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, padding: '11px 18px', borderRadius: '8px',
                  background: '#eff6ff', border: '1.5px solid #bfdbfe',
                  color: '#1d4ed8', fontSize: '0.86rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.borderColor = '#2563eb'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
              >
                Add to Cart
              </button>

              <button
                onClick={handleToggleWishlist}
                style={{
                  padding: '11px 14px', borderRadius: '8px', background: 'transparent',
                  border: 'none', color: isWishlisted ? '#ef4444' : '#344054',
                  display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                <Heart size={16} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
                <span>Wishlist</span>
              </button>
            </div>

            {/* Shipping & Return Badges Bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: '12px', borderTop: '1px solid #eaecf0',
              fontSize: '0.74rem', color: '#667085', marginTop: '4px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="#344054" />
                <div>
                  <strong style={{ color: '#101828', display: 'block', fontWeight: 600 }}>Free Shipping</strong>
                  <span>On all orders</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} color="#344054" />
                <div>
                  <strong style={{ color: '#101828', display: 'block', fontWeight: 600 }}>7 Days Return</strong>
                  <span>No questions asked</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#344054" />
                <div>
                  <strong style={{ color: '#101828', display: 'block', fontWeight: 600 }}>Secure Payment</strong>
                  <span>100% protected</span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: Secure Checkout Box & Value Props */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #eaecf0',
            borderRadius: '12px', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04)',
          }}>
            {/* Secure Checkout Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={17} color="#344054" />
              <h3 style={{ color: '#101828', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                Secure Checkout
              </h3>
            </div>

            {/* We accept icons */}
            <div>
              <span style={{ fontSize: '0.7rem', color: '#667085', display: 'block', marginBottom: '8px' }}>
                We accept
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ padding: '2px 7px', borderRadius: '4px', background: '#1a1f71', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>VISA</span>
                <span style={{ padding: '2px 7px', borderRadius: '4px', background: '#eb001b', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>Mastercard</span>
                <span style={{ padding: '2px 7px', borderRadius: '4px', background: '#0072b8', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>RuPay</span>
                <span style={{ padding: '2px 7px', borderRadius: '4px', background: '#5f259f', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>UPI</span>
                <span style={{ fontSize: '0.68rem', color: '#667085' }}>and more...</span>
              </div>
            </div>

            <div style={{ height: '1px', background: '#eaecf0' }} />

            {/* 4 Value Props List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <BookOpen size={15} color="#667085" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#101828', display: 'block', fontWeight: 600 }}>100% Original Books</strong>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>Sourced from trusted publishers</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Truck size={15} color="#667085" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#101828', display: 'block', fontWeight: 600 }}>On-time Delivery</strong>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>Quick and safe delivery</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <RotateCcw size={15} color="#667085" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#101828', display: 'block', fontWeight: 600 }}>Easy Returns</strong>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>Hassle-free return policy</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Headphones size={15} color="#667085" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#101828', display: 'block', fontWeight: 600 }}>24/7 Support</strong>
                  <span style={{ fontSize: '0.72rem', color: '#667085' }}>We're here to help you</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── MIDDLE TABBED SECTIONS (About this book | Table of contents | Preview | What you get) ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #eaecf0',
          borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
        }}>

          {/* Tab Navigation Header Bar */}
          <div style={{
            display: 'flex', borderBottom: '1px solid #eaecf0',
            background: '#ffffff', padding: '0 24px', overflowX: 'auto',
          }}>
            {[
              { id: 'about', label: 'About this book' },
              { id: 'toc', label: 'Table of contents' },
              { id: 'preview', label: 'Preview this book' },
              { id: 'learn', label: 'What you will get' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 20px', background: 'none', border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent',
                  color: activeTab === tab.id ? '#2563eb' : '#667085',
                  fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 700 : 500,
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Grid Area below Tabs */}
          <div style={{ padding: '28px' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px', alignItems: 'start',
            }}>

              {/* COLUMN 1: About this book & Bullet Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ color: '#475467', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                  This book is perfect for anyone who wants to understand the basics of Artificial Intelligence. It explains complex AI concepts in simple language with practical examples, projects, and exercises.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  {[
                    'Understand AI concepts in simple language',
                    'Learn ChatGPT and Prompt Engineering',
                    'Explore Machine Learning and Deep Learning',
                    'Build real-world AI projects',
                    'Prepare for future AI career opportunities',
                  ].map((pt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#344054' }}>
                      <span style={{ color: '#101828', fontWeight: 700 }}>✓</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2: Table of contents */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ color: '#101828', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                    Table of contents
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#667085', cursor: 'pointer' }}>
                    View all (20 chapters)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        fontSize: '0.8rem', color: '#344054', fontWeight: 400,
                      }}
                    >
                      <span style={{ color: '#344054' }}>{ch.title}</span>
                      <span style={{ flex: 1, borderBottom: '1px dotted #d0d5dd', margin: '0 8px', height: '14px' }} />
                      <span style={{ color: '#667085' }}>{ch.page}</span>
                    </div>
                  ))}
                  <div style={{ color: '#667085', fontSize: '0.8rem', letterSpacing: '0.1em' }}>...</div>
                </div>
              </div>

              {/* COLUMN 3: Preview this book & Download Sample PDF */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ color: '#101828', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Preview this book
                </h3>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {sampleThumbnails.map((thumb, idx) => (
                    <div key={idx} style={{ flex: 1, aspectRatio: '3/4', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eaecf0' }}>
                      <img src={thumb} alt="Preview page" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleDownloadSample}
                  style={{
                    marginTop: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '10px 16px', borderRadius: '8px', background: '#ffffff',
                    border: '1px solid #d0d5dd', color: '#344054',
                    fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
                >
                  <Download size={14} /> Download Sample PDF
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ── STUDENT REVIEWS & FREQUENTLY ASKED QUESTIONS SECTION ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px', alignItems: 'start',
        }}>

          {/* Student Reviews Box */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #eaecf0',
            borderRadius: '16px', padding: '24px',
            boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ color: '#101828', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                Student reviews
              </h3>
              <span style={{ fontSize: '0.74rem', color: '#667085', cursor: 'pointer' }}>
                View all reviews →
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {reviewsData.map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px', borderRadius: '10px', background: '#ffffff',
                    border: '1px solid #eaecf0', display: 'flex', flexDirection: 'column', gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={rev.avatar} alt={rev.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ color: '#101828', fontWeight: 700, fontSize: '0.82rem' }}>{rev.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={11} color="#fbbf24" fill="#fbbf24" />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: '#475467', fontSize: '0.78rem', lineHeight: 1.45, margin: 0 }}>
                    "{rev.comment}"
                  </p>
                  <span style={{ fontSize: '0.68rem', color: '#98a2b3' }}>{rev.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions Box */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #eaecf0',
            borderRadius: '16px', padding: '24px',
            boxShadow: '0 1px 3px rgba(16, 24, 40, 0.04)',
          }}>
            <h3 style={{ color: '#101828', fontSize: '1rem', fontWeight: 700, margin: '0 0 18px' }}>
              Frequently asked questions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #eaecf0', borderRadius: '8px',
                    overflow: 'hidden', background: '#ffffff',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%', padding: '12px 14px', background: 'none', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      textAlign: 'left', cursor: 'pointer', color: '#344054',
                      fontSize: '0.82rem', fontWeight: 500,
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={15} color="#667085" /> : <ChevronDown size={15} color="#667085" />}
                  </button>

                  {openFaq === idx && (
                    <div style={{ padding: '0 14px 12px', color: '#475467', fontSize: '0.78rem', lineHeight: 1.5, borderTop: '1px solid #eaecf0', paddingTop: '8px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── YOU MIGHT ALSO LIKE (RELATED BOOKS GRID WITH RIGHT ARROW) ── */}
        <div style={{ marginTop: '8px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ color: '#101828', fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              You might also like
            </h2>
            <button
              onClick={() => toast.success('Viewing more books...')}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#ffffff', border: '1px solid #eaecf0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#344054', boxShadow: '0 1px 3px rgba(16,24,40,0.08)',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
          }}>
            {relatedBooks.map((relBook) => {
              const relOriginal = relBook.originalPrice || Math.round(relBook.price * 1.5);
              const relDiscount = Math.round(((relOriginal - relBook.price) / relOriginal) * 100);

              return (
                <div
                  key={relBook.id}
                  onClick={() => {
                    navigate(`/textbooks/${relBook.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #eaecf0',
                    borderRadius: '12px', overflow: 'hidden', padding: '10px',
                    display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer',
                    transition: 'all 0.15s ease', boxShadow: '0 1px 2px rgba(16,24,40,0.03)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#dde5f5'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '6px', overflow: 'hidden', background: '#f8fafc', boxShadow: '-4px 6px 14px rgba(0,0,0,0.1)' }}>
                    <img src={relBook.cover} alt={relBook.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
                    <h4 style={{ color: '#101828', fontSize: '0.8rem', fontWeight: 600, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.35 }}>
                      {relBook.title}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', marginTop: 'auto' }}>
                      <span style={{ fontWeight: 800, color: '#101828' }}>₹{relBook.price}</span>
                      <span style={{ color: '#98a2b3', textDecoration: 'line-through', fontSize: '0.68rem' }}>₹{relOriginal}</span>
                      <span style={{ color: '#027a48', fontWeight: 700, fontSize: '0.66rem' }}>{relDiscount}% OFF</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#667085' }}>
                      <Star size={11} color="#fbbf24" fill="#fbbf24" />
                      <span style={{ fontWeight: 700, color: '#101828' }}>{relBook.rating || 4.7}</span>
                      <span>({(relBook.ratingsCount || 800).toLocaleString()})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM TRUST FOOTER BANNER ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
          padding: '20px', borderRadius: '12px', background: '#ffffff',
          border: '1px solid #eaecf0', textAlign: 'center', margin: '12px 0 20px',
        }}>
          <div>
            <strong style={{ color: '#101828', fontSize: '0.82rem', display: 'block', fontWeight: 600 }}>📦 100% Original Books</strong>
            <span style={{ fontSize: '0.72rem', color: '#667085' }}>Sourced from trusted publishers</span>
          </div>

          <div>
            <strong style={{ color: '#101828', fontSize: '0.82rem', display: 'block', fontWeight: 600 }}>🚚 Free Shipping</strong>
            <span style={{ fontSize: '0.72rem', color: '#667085' }}>On all orders</span>
          </div>

          <div>
            <strong style={{ color: '#101828', fontSize: '0.82rem', display: 'block', fontWeight: 600 }}>🔄 7 Days Return</strong>
            <span style={{ fontSize: '0.72rem', color: '#667085' }}>No questions asked</span>
          </div>

          <div>
            <strong style={{ color: '#101828', fontSize: '0.82rem', display: 'block', fontWeight: 600 }}>🛡️ Secure Payment</strong>
            <span style={{ fontSize: '0.72rem', color: '#667085' }}>100% protected</span>
          </div>
        </div>

        {/* ── DITTO FOOTER SECTION ── */}
        <footer style={{ borderTop: '1px solid #eaecf0', paddingTop: '32px', paddingBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ color: '#101828', fontSize: '1.1rem', fontWeight: 900, margin: '0 0 4px' }}>DevOpsX Learning</h3>
              <span style={{ fontSize: '0.72rem', color: '#667085', display: 'block', marginBottom: '8px' }}>Learn Skills. Build Future.</span>
              <p style={{ fontSize: '0.78rem', color: '#475467', lineHeight: 1.5, margin: '0 0 14px' }}>
                Empowering learners with quality AI education and resources.
              </p>
              <div style={{ display: 'flex', gap: '12px', color: '#667085', marginTop: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ cursor: 'pointer' }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ cursor: 'pointer' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ cursor: 'pointer' }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ cursor: 'pointer' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#101828', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 12px' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#475467' }}>
                <Link to="/about" style={{ color: '#475467', textDecoration: 'none' }}>About Us</Link>
                <Link to="/contact" style={{ color: '#475467', textDecoration: 'none' }}>Contact Us</Link>
                <span style={{ cursor: 'pointer' }}>Careers</span>
                <span style={{ cursor: 'pointer' }}>Blog</span>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#101828', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 12px' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#475467' }}>
                <span style={{ cursor: 'pointer' }}>Help Center</span>
                <span style={{ cursor: 'pointer' }}>Shipping & Delivery</span>
                <span style={{ cursor: 'pointer' }}>Returns</span>
                <span style={{ cursor: 'pointer' }}>Terms & Conditions</span>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#101828', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 12px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#475467' }}>
                <Link to="/textbooks" style={{ color: '#475467', textDecoration: 'none' }}>Books</Link>
                <Link to="/courses" style={{ color: '#475467', textDecoration: 'none' }}>Courses</Link>
                <span style={{ cursor: 'pointer' }}>Live Classes</span>
                <Link to="/dashboard" style={{ color: '#475467', textDecoration: 'none' }}>Dashboard</Link>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#101828', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 12px' }}>Stay updated</h4>
              <p style={{ fontSize: '0.78rem', color: '#475467', margin: '0 0 10px' }}>Subscribe to get updates on new books and courses.</p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: '6px',
                    border: '1px solid #d0d5dd', fontSize: '0.78rem', outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 14px', borderRadius: '6px', background: '#000000',
                    color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#98a2b3', borderTop: '1px solid #eaecf0', paddingTop: '16px' }}>
            © 2024 DevOpsX Learning. All rights reserved.
          </div>
        </footer>

      </div>
    </PageWrapper>
  );
}



