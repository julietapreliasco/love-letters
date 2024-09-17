'use client';
import { ContentImage } from '@/contentful/parseContentfulImage';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface PageBannerProps {
  bannerImg: ContentImage;
  bannerTitle: string;
}

const PageBanner = ({ bannerImg, bannerTitle }: PageBannerProps) => {
  const [blurAmount, setBlurAmount] = useState('blur(0px)');
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerIsInView = useInView(bannerRef, { amount: 0.3 });
  const bannerControls = useAnimation();

  useEffect(() => {
    if (bannerIsInView) {
      setBlurAmount('blur(5px)');
      bannerControls.start('visible');
    } else {
      bannerControls.start('hidden');
      setBlurAmount('blur(0px)');
    }
  }, [bannerControls, bannerIsInView]);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden md:flex-row">
      {bannerImg && (
        <motion.div
          ref={bannerRef}
          variants={{
            hidden: { filter: blurAmount },
            visible: { filter: blurAmount },
          }}
          transition={{
            duration: 1,
            stiffness: 60,
            damping: 8,
            type: 'spring',
          }}
          initial="hidden"
          animate={bannerControls}
          className="z-0 flex items-center justify-center"
        >
          <Image
            src={bannerImg.src}
            alt={bannerImg.alt || 'Title Banner'}
            width={bannerImg.width}
            height={bannerImg.height}
            className="z-0 h-screen w-screen self-center object-cover object-[54%] shadow-xl"
            priority
          />
        </motion.div>
      )}
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          delay: 0.4,
        }}
        className="absolute bottom-2 w-full p-10 text-center font-playfair-display text-2xl font-semibold tracking-wider text-custom-lighter-gray drop-shadow-2xl md:left-10 md:top-[60%] md:max-w-[620px] md:text-start md:text-[46px] md:leading-[48px] md:text-white"
      >
        <span className="shadow-2xl">{bannerTitle}</span>
      </motion.div>
    </div>
  );
};

export default PageBanner;
