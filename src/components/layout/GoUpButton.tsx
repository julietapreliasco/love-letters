'use client';

import { useEffect, useState } from 'react';
import { IoChevronUp } from 'react-icons/io5';

export default function NavigationButtons() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollToTop(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-2 z-40 rounded-full bg-custom-lighter-gray bg-opacity-80 p-1 text-custom-black shadow-lg transition-colors duration-300 hover:bg-custom-gray md:right-4 md:p-2"
          aria-label="Scroll to top"
        >
          <IoChevronUp size={20} />
        </button>
      )}
    </>
  );
}
