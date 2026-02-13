import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#262626] text-[#A1A1AA] hover:text-white hover:border-[#404040] hover:bg-[#171717] transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <div className="relative overflow-hidden w-5 h-5">
             <ArrowUp className="w-5 h-5 absolute inset-0 group-hover:-translate-y-full transition-transform duration-300 ease-in-out" />
             <ArrowUp className="w-5 h-5 absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-blue-400" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};