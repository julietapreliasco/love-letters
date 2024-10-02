'use client';

import { LandingSectionType } from '@/contentful/landingSections';
import Logo from '../ui/Logo';
import Image from 'next/image';
import BannerNavigation from '../ui/BannerNavigation';
import { useState, useEffect, useMemo, RefObject } from 'react';
import AlternativeLogo from '../ui/AlternativeLogo';
import { BannerType } from '@/types';
import { motion } from 'framer-motion';
import { IoIosArrowDropdown } from 'react-icons/io';
import { PlaceType } from '@/contentful/places';

interface BannerNavigationLink {
  title: string;
  link: string;
}

interface InitialBannerProps {
  bannerData?: LandingSectionType;
  bannerType: BannerType;
  placeData?: PlaceType;
  onCampaignChange?: (index: number) => void;
  activeCampaignIndex?: number | null;
  nextSectionRef?: RefObject<HTMLElement>;
  nextSectionId?: string;
}

const images = [
  '/banner_img_1.png',
  '/banner_img_2.png',
  '/banner_img_3.png',
  '/banner_img_4.png',
];

const defaultLinks: BannerNavigationLink[] = [
  { title: 'Places', link: '/places' },
  { title: 'Partners', link: '/#partners' },
  { title: 'Press', link: '/' },
  { title: 'About', link: '/about-me' },
];

const Banner = ({
  bannerData,
  bannerType,
  placeData,
  onCampaignChange,
  activeCampaignIndex = null,
  nextSectionRef,
  nextSectionId,
}: InitialBannerProps) => {
  const campaigns = useMemo(() => placeData?.campaigns || [], [placeData]);

  const [activeImage, setActiveImage] = useState(
    bannerType === BannerType.MAIN_BANNER
      ? bannerData?.bannerImages?.[0]?.src || images[0]
      : placeData?.backgroundImage?.src || ''
  );

  useEffect(() => {
    if (bannerType === BannerType.CAMPAIGN_BANNER) {
      if (campaigns.length > 0 && activeCampaignIndex !== null) {
        setActiveImage(
          campaigns[activeCampaignIndex]?.bannerImage?.src ||
            placeData?.backgroundImage?.src ||
            ''
        );
      } else {
        setActiveImage(placeData?.backgroundImage?.src || '');
      }
    }
  }, [activeCampaignIndex, campaigns, placeData, bannerType]);

  const handleMouseEnter = (index: number) => {
    if (bannerType === BannerType.MAIN_BANNER) {
      if (bannerData?.bannerImages?.[index]?.src) {
        setActiveImage(bannerData.bannerImages[index].src);
      } else if (images[index]) {
        setActiveImage(images[index]);
      }
    } else if (bannerType === BannerType.CAMPAIGN_BANNER) {
      if (campaigns.length > 0) {
        const campaignImage = campaigns[index]?.bannerImage?.src;
        if (campaignImage) {
          setActiveImage(campaignImage);
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (bannerType === BannerType.MAIN_BANNER) {
      setActiveImage(bannerData?.bannerImages?.[0]?.src || images[0]);
    } else if (bannerType === BannerType.CAMPAIGN_BANNER) {
      if (activeCampaignIndex !== null && campaigns.length > 0) {
        setActiveImage(
          campaigns[activeCampaignIndex]?.bannerImage?.src ||
            placeData?.backgroundImage?.src ||
            ''
        );
      } else {
        setActiveImage(placeData?.backgroundImage?.src || '');
      }
    }
  };

  const placeLinks: BannerNavigationLink[] =
    campaigns.map((campaign) => ({
      title: campaign?.bannerTitle || '',
      link: '',
    })) || [];

  const scrollToSection = () => {
    if (nextSectionRef && nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (nextSectionId) {
      const section = document.getElementById(nextSectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
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
          src={activeImage}
          alt="Love Letters Home Banner"
          fill
          className="object-cover object-top opacity-70"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center">
          {bannerType === BannerType.MAIN_BANNER ? (
            <Logo className="w-2/3 md:w-1/2" />
          ) : (
            <AlternativeLogo className="w-48 md:w-72" />
          )}
          {bannerType === BannerType.CAMPAIGN_BANNER && (
            <p className="text-center font-futura text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
              {placeData?.title}
            </p>
          )}
        </div>
        <BannerNavigation
          links={
            bannerType === BannerType.CAMPAIGN_BANNER
              ? placeLinks
              : defaultLinks
          }
          bannerType={bannerType}
          onLinkHover={handleMouseEnter}
          onLinkLeave={handleMouseLeave}
          onCampaignChange={onCampaignChange}
          activeCampaignIndex={activeCampaignIndex}
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
