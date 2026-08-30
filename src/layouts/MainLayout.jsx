// ============================================================
// MainLayout — Composes Navbar + Sidebar + Content + Footer
// ============================================================

import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import ChatWidget from '../components/ui/ChatWidget';

export default function MainLayout({ children }) {
  const { collapsed, isMobile } = useSidebar();
  const location = useLocation();

  // Hide sidebar on Book Details, Checkout, Payment, and Order Success pages so they render full page
  const isBookDetailsPage = /^\/textbooks\/[^\/]+$/.test(location.pathname);
  const isCheckoutFlow = /^\/(checkout|payment|order-success)/.test(location.pathname);
  const hideSidebar = isBookDetailsPage || isCheckoutFlow;

  // Sidebar commented out to match full-width top navigation layout reference
  const sidebarWidth = 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      {/* <Sidebar /> */}

      {/* Main content — shifts right for sidebar or takes full width when sidebar is hidden */}
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col"
        style={{ minHeight: '100vh', paddingTop: 'var(--navbar-height)' }}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </motion.div>

      <ChatWidget />
    </div>
  );
}

