import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { CookieConsent } from './CookieConsent';
import { CommandPalette } from './CommandPalette';
import { ReadingProgress } from './ui/ReadingProgress';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Automatic Scroll Restoration on Route Change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check if we are on an article page to show reading progress
  const isArticlePage = location.pathname.includes('/insights/');

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-blue-500/30 selection:text-white relative overflow-x-hidden">
      <div className="bg-noise"></div>
      
      {/* Global Ambient Blue Effect - Subtle atmospheric glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[40vh] bg-indigo-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vh] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      <CommandPalette />
      {isArticlePage && <ReadingProgress />}

      <Navbar />
      
      <main className="relative z-10 pt-20 min-h-screen">
        {children}
      </main>

      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
};