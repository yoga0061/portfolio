import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Core coordinates motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for clean inertia
  const springConfig = { damping: 45, stiffness: 450, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Mobile & Touch Screen detection
    const checkDevice = () => {
      const mobileWidth = window.innerWidth < 768;
      const touchCapable = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobileWidth || touchCapable);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    // 2. Track mouse movements
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Apply global cursor hide class to body
    document.body.classList.add('custom-cursor-active');

    // 3. Interactive hover checks (links, buttons, text selections)
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const attachListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-glow, p, span, h1, h2, h3, h4, li'
      );
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();

      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-glow, p, span, h1, h2, h3, h4, li'
      );
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Center 4px Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-slate-900 dark:bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 2. Soft Glow Tracker (Linear/Apple-inspired) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9998 bg-slate-400/10 dark:bg-white/10 blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 40 : 20,
          height: isHovered ? 40 : 20,
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.06)' : 'rgba(255, 255, 255, 0.04)',
          border: isHovered ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? '0 0 10px rgba(0, 240, 255, 0.15)'
            : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      />
    </>
  );
};
export default CustomCursor;
