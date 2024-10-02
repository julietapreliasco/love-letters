'use client';
import { LandingSectionType } from '@/contentful/landingSections';
import Logo from '../ui/Logo';
import Image from 'next/image';
import BannerNavigation from '../ui/BannerNavigation';
import { useState } from 'react';
import AlternativeLogo from '../ui/AlternativeLogo';
import { BannerType } from '@/types';
import { motion } from 'framer-motion';
import { IoIosArrowDropdown } from 'react-icons/io';

interface CampaignData {
  campaignLinks: BannerNavigationLink[];
  title: string;
}

interface BannerNavigationLink {
  title: string;
  link: string;
}

interface InitialBannerProps {
  bannerData: LandingSectionType;
  bannerType: BannerType;
  campaignData?: CampaignData;
}

const images = [
  '/banner_img_1.png',
  '/banner_img_2.png',
  '/banner_img_3.png',
  '/banner_img_4.png',
];

const defaultLinks = [
  { title: 'Places', link: '/campaigns' },
  { title: 'Partners', link: '/#partners' },
  { title: 'Press', link: '/' },
  { title: 'About', link: '/about-me' },
];

const Banner = ({
  bannerData,
  bannerType,
  campaignData,
}: InitialBannerProps) => {
  const [activeImage, setActiveImage] = useState(
    bannerData?.bannerImages?.[0]?.src || images[0]
  );

  const handleMouseEnter = (index: number) => {
    if (bannerData?.bannerImages?.[index]?.src) {
      setActiveImage(bannerData.bannerImages[index].src);
    } else if (images[index]) {
      setActiveImage(images[index]);
    }
  };

  const handleMouseLeave = () => {
    setActiveImage(bannerData?.bannerImages?.[0]?.src || images[0]);
  };

  const scrollToSection = () => {
    const section = document.getElementById('aboutLoveLetters');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-custom-black">
      <motion.div
        className="absolute inset-0 z-0"
        key={activeImage}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
      >
        <Image
          src={activeImage!}
          alt="Love Letters Home Banner"
          fill
          className="object-cover object-top opacity-70"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="w-3/4 md:w-1/2">
          {bannerType === BannerType.MAIN_BANNER ? (
            <Logo />
          ) : (
            <AlternativeLogo />
          )}
          {bannerType === BannerType.CAMPAIGN_BANNER && (
            <p className="text-center font-futura text-2xl font-bold uppercase tracking-wider text-white sm:text-4xl lg:text-6xl 2xl:text-7xl">
              {campaignData?.title}
            </p>
          )}
        </div>
        <BannerNavigation
          links={campaignData?.campaignLinks ?? defaultLinks}
          bannerType={bannerType}
          onLinkHover={handleMouseEnter}
          onLinkLeave={handleMouseLeave}
        />
      </div>
      <motion.div
        className="absolute bottom-10 z-30 flex w-full cursor-pointer justify-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{
          duration: 1,
          delay: 2,
          ease: 'easeInOut',
        }}
        onClick={scrollToSection}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        >
          <IoIosArrowDropdown
            size={35}
            className="h-8 w-8 opacity-50 sm:h-10 sm:w-10 lg:h-8 lg:w-8"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
