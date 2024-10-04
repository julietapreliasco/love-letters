'use client';

import { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronUp } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';

export default function NavigationButtons() {
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const banner = document.querySelector('.banner');
      const bannerHeight = banner?.clientHeight || 0;
      setShowButtons(scrollY > bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const banner = document.querySelector('.banner');
    if (banner) {
      const bannerHeight = banner.clientHeight;
      window.scrollTo({
        top: bannerHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const goBack = () => {
    router.back();
  };

  if (pathname === '/') return null;

  if (!showButtons) return null;

  return (
    <>
      <button
        onClick={goBack}
        className="fixed bottom-4 left-2 z-50 rounded-full bg-custom-lighter-gray bg-opacity-80 p-1 text-custom-black shadow-lg transition-colors duration-300 hover:bg-custom-gray md:left-4 md:p-2"
        aria-label="Go back"
      >
        <IoChevronBack size={20} />
      </button>

      <button
        onClick={scrollToTop}
        className="z-70 fixed bottom-4 right-2 rounded-full bg-custom-lighter-gray bg-opacity-80 p-1 text-custom-black shadow-lg transition-colors duration-300 hover:bg-custom-gray md:right-4 md:p-2"
        aria-label="Scroll to top"
      >
        <IoChevronUp size={20} />
      </button>
    </>
  );
}
