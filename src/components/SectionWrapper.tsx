import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
  return (
    <motion.section
      id={id}
      className={`py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for smooth acceleration
      }}
    >
      {children}
    </motion.section>
  );
};
export default SectionWrapper;
