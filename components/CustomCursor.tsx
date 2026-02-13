import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use MotionValues for high performance without re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the outer ring (lag effect)
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('.group') !== null || // Detects our interactive cards
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide default cursor via CSS class injection to avoid inline style conflicts
    const style = document.createElement('style');
    style.id = 'cursor-style';
    style.innerHTML = `
      * { cursor: none !important; }
      body { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      const existingStyle = document.getElementById('cursor-style');
      if (existingStyle) existingStyle.remove();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Dot - Center (The actual pointer) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#EDEDED] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Outer Ring - Follower (The HUD element) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-blue-500/30 flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
          borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.15)',
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 30
        }}
      >
        {/* Technical Crosshair Marks - Only visible on hover/interact */}
        <motion.div 
            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5, rotate: isHovering ? 0 : 45 }} 
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
        >
             <div className="absolute top-1/2 -left-1 w-1.5 h-px bg-blue-500"></div>
             <div className="absolute top-1/2 -right-1 w-1.5 h-px bg-blue-500"></div>
             <div className="absolute -top-1 left-1/2 w-px h-1.5 bg-blue-500"></div>
             <div className="absolute -bottom-1 left-1/2 w-px h-1.5 bg-blue-500"></div>
        </motion.div>
      </motion.div>
    </>
  );
};