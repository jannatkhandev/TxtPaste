'use client';

import { useState, useEffect } from 'react';

const ScrollAwareWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      {children}
    </div>
  );
};

export default ScrollAwareWrapper;