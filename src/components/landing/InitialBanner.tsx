'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import { LandingSectionType } from '@/contentful/landingSections';

interface InitialBannerProps {
  bannerData: LandingSectionType;
}

const InitialBanner: React.FC<InitialBannerProps> = ({ bannerData }) => {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const imageHeight = window.innerHeight;
    const opacityTarget =
      scrollY > imageHeight / 2
        ? Math.max(1 - (scrollY - imageHeight / 2) / (imageHeight / 2), 0.7)
        : 1;

    controls.start({
      scale: hasScrolled ? 1 : 1.2,
      opacity: opacityTarget,
      transition: { duration: 1, ease: 'easeOut' },
    });
  }, [scrollY, hasScrolled, controls]);

  return (
    <motion.section
      id="initial-banner"
      className="relative h-screen w-full overflow-hidden bg-custom-lighter-yellow"
    >
      {bannerData?.backgroundImage?.src && (
        <motion.div
          animate={controls}
          initial={{
            scale: 1.2,
            opacity: 1,
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={bannerData.backgroundImage.src}
            alt="Love Letters Home Banner"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}
      <div className="absolute left-0 top-1/2 z-10 w-2/3 -translate-y-1/2 p-[20px] text-white md:p-[60px]">
        <motion.div
          className="w-[260px] md:w-[460px] lg:w-[610px] 2xl:w-[810px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1.7, ease: 'easeIn', delay: 0.4 },
          }}
        >
          <h1 className="leading[43px] md:leading[64px] text-left font-playfair-display text-[32px] font-bold drop-shadow-2xl md:text-5xl 2xl:text-7xl">
            {bannerData.title}
          </h1>
        </motion.div>
        <motion.div
          className="my-5 2xl:my-7"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut', delay: 2 },
          }}
        >
          <Button label="Join us" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InitialBanner;
