import React, { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Product', href: '/product' },
    { label: 'Technology', href: '/technology' },
    { label: 'Security', href: '/security' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled 
          ? 'bg-[#050505]/80 backdrop-blur-xl border-white/5 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group select-none relative z-50">
            <div className="relative w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-105">
              {/* Logo SVG */}
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="19" stroke="#3B82F6" strokeWidth="2.5" className="opacity-90" />
                <path d="M20 33.5L18.5 32.1C13.2 27.3 9.5 23.9 9.5 19.8C9.5 16.4 12.1 13.8 15.5 13.8C17.4 13.8 19.3 14.7 20 16.1C20.7 14.7 22.6 13.8 24.5 13.8C27.9 13.8 30.5 16.4 30.5 19.8C30.5 23.9 26.8 27.3 21.5 32.1L20 33.5Z" fill="#3B82F6" className="opacity-90" />
                <path d="M11 20H15L17.5 14L21.5 26L24.5 20H29" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="34" cy="6" r="4.5" fill="#050505" />
                <circle cx="34" cy="6" r="2.5" stroke="white" strokeWidth="1.5" fill="#3B82F6" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-lg md:text-xl font-bold tracking-tight font-sans leading-none">
                <span className="text-white">Hosp</span><span className="text-[#3B82F6]">Intel</span>
              </span>
              <span className="text-[8px] md:text-[9px] font-mono text-[#71717A] tracking-wider uppercase leading-none mt-1 group-hover:text-blue-400 transition-colors">
                OS v2.4
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered Pill */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
             <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-md shadow-lg shadow-black/20">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link 
                      key={link.label} 
                      to={link.href} 
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                        isActive 
                        ? 'text-white bg-blue-600/20 border border-blue-500/20' 
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
             </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6 relative z-50">
            {/* System Status - Technical Look */}
            <div className="hidden lg:flex flex-col items-end group cursor-help">
               <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-medium text-[#EDEDED] tracking-wide group-hover:text-blue-400 transition-colors">OPERATIONAL</span>
               </div>
               <span className="text-[9px] text-[#52525B] font-mono group-hover:text-[#71717A] transition-colors">LOS-1</span>
            </div>
            
            <div className="h-8 w-px bg-[#262626] hidden lg:block"></div>

            <div className="flex items-center gap-3">
              <Button size="sm" onClick={() => navigate('/request-demo')} className="bg-white text-black hover:bg-[#EDEDED] border-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Book Demo
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center relative z-50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#EDEDED] p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-[#262626] overflow-hidden absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-3 text-base font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-[#262626] my-4"></div>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <span className="text-xs font-mono text-blue-400">SYSTEMS OPERATIONAL</span>
                    <Activity size={14} className="text-blue-500" />
                 </div>
                <Button onClick={() => { navigate('/request-demo'); setMobileMenuOpen(false); }} className="w-full justify-center">Book Institutional Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};