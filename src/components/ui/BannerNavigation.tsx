'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BannerType } from '@/types';

interface BannerNavigationLink {
  title: string;
  link: string;
}

interface BannerNavigationProps {
  links: BannerNavigationLink[] | undefined;
  onLinkHover: (index: number) => void;
  onLinkLeave: () => void;
  bannerType: BannerType;
  onCampaignChange?: (index: number) => void;
  activeCampaignIndex?: number | null;
  nextSectionRef?: React.RefObject<HTMLElement>;
}

export default function BannerNavigation({
  links,
  onLinkHover,
  onLinkLeave,
  bannerType,
  onCampaignChange,
  activeCampaignIndex,
  nextSectionRef,
}: BannerNavigationProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleInteraction = (index: number, link: string) => {
    if (isTouchDevice) {
      if (bannerType === BannerType.CAMPAIGN_BANNER && onCampaignChange) {
        onCampaignChange(index);
        if (nextSectionRef?.current) {
          nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      onLinkHover(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      onLinkLeave();
    }
  };

  return (
    <div
      className={`m-6 flex items-center justify-center ${
        links?.length === 1
          ? 'flex-col'
          : `${bannerType === BannerType.CAMPAIGN_BANNER ? 'grid grid-cols-2' : 'grid grid-cols-3'} md:flex`
      } text-center font-futura uppercase text-white`}
    >
      {links?.map((link, index) =>
        bannerType === BannerType.MAIN_BANNER ? (
          <Link
            key={index}
            href={link.link}
            className={`px-3 py-1 text-xs sm:text-sm lg:text-base ${
              isTouchDevice
                ? 'active:text-custom-yellow'
                : 'hover:text-custom-yellow'
            }`}
            onMouseEnter={() => handleInteraction(index, link.link)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction(index, link.link)}
          >
            {link.title}
          </Link>
        ) : (
          <div
            key={index}
            className={`px-3 py-1 text-xs sm:text-sm lg:text-base ${
              index === activeCampaignIndex
                ? 'text-custom-yellow'
                : isTouchDevice
                  ? 'active:text-custom-yellow'
                  : 'hover:text-custom-yellow'
            } cursor-pointer`}
            onMouseEnter={() => handleInteraction(index, link.link)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction(index, link.link)}
          >
            {link.title}
          </div>
        )
      )}
    </div>
  );
}
