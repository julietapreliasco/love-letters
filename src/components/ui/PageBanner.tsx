'use client';
import { ContentImage } from '@/contentful/parseContentfulImage';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface PageBannerProps {
  bannerImg: ContentImage;
  bannerTitle: string;
  subtitle?: string;
}

const PageBanner = ({ bannerImg, bannerTitle, subtitle }: PageBannerProps) => {
  const [blurAmount, setBlurAmount] = useState('blur(0px)');
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerIsInView = useInView(bannerRef, { amount: 1.0 });
  const bannerControls = useAnimation();

  useEffect(() => {
    if (bannerIsInView) {
      setBlurAmount('blur(4px)');
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
          <div className="absolute inset-0 z-10 bg-custom-black opacity-30"></div>
        </motion.div>
      )}
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.2,
        }}
        className={`absolute bottom-2 m-10 w-full p-3 text-center font-futura text-2xl leading-normal tracking-wider text-custom-lighter-gray drop-shadow-2xl md:left-10 ${subtitle ? 'md:top-[50%]' : 'md:top-[60%]'} md:max-w-[620px] md:p-0 md:text-start md:text-[46px] md:leading-normal md:text-white lg:p-0`}
      >
        <span className="drop-shadow-2xl">{bannerTitle}</span>
        {subtitle && (
          <span className="text-base leading-normal drop-shadow-2xl">
            {subtitle}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default PageBanner;
