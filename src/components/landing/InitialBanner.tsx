'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import { LandingSectionType } from '@/contentful/landingSections';

interface InitialBannerProps {
  bannerData: LandingSectionType;
}

const InitialBanner: React.FC<InitialBannerProps> = ({ bannerData }) => {
  const [scrollY, setScrollY] = useState(0);
  const [imageScale, setImageScale] = useState(1.2);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      const scaleValue = 1.2 - (scrollPosition / window.innerHeight) * 0.2;
      setImageScale(Math.max(scaleValue, 1));

      const imageHeight = window.innerHeight;
      const startOpacityChange = imageHeight / 2;

      if (scrollPosition > startOpacityChange) {
        const opacityValue =
          1 - (scrollPosition - startOpacityChange) / (imageHeight / 2);
        setImageOpacity(Math.max(opacityValue, 0));
      } else {
        setImageOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.section
      id="initial-banner"
      className="relative h-screen w-full overflow-hidden bg-custom-lighter-gray"
    >
      {bannerData?.backgroundImage?.src && (
        <motion.div
          animate={{
            scale: imageScale,
            opacity: imageOpacity,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
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
            className="object-cover object-bottom"
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
