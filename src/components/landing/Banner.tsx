'use client';
import { LandingSectionType } from '@/contentful/landingSections';
import Logo from '../ui/Logo';
import Image from 'next/image';
import BannerNavigation from '../ui/BannerNavigation';
import { useState } from 'react';
import AlternativeLogo from '../ui/AlternativeLogo';
import { BannerType } from '@/types';

interface CampaignData {
  campaignLinks: BannerNavigationLink[];
  title: string;
}

interface BannerNavigationLink {
  title: string;
  link: string;
}

interface InitialBannerProps {
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

const Banner = ({ bannerType, campaignData }: InitialBannerProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleMouseEnter = (index: number) => {
    setActiveImage(images[index]);
  };

  const handleMouseLeave = () => {
    setActiveImage(images[0]);
  };

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-custom-black">
      <div>
        <Image
          src={activeImage}
          alt="Love Letters Home Banner"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 z-10 bg-custom-black opacity-20"></div>
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="w-1/2">
          {bannerType === BannerType.MAIN_BANNER ? (
            <Logo />
          ) : (
            <AlternativeLogo />
          )}
          {BannerType.CAMPAIGN_BANNER && (
            <p className="text-center font-futura text-7xl font-bold uppercase tracking-wider text-white">
              {campaignData?.title}
            </p>
          )}
        </div>
        <BannerNavigation
          links={campaignData?.campaignLinks ?? defaultLinks}
          onLinkHover={handleMouseEnter}
          onLinkLeave={handleMouseLeave}
        />
      </div>
    </section>
  );
};

export default Banner;
