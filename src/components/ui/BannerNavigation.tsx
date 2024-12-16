import { BannerType } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

const BannerNavigation = ({
  links,
  onLinkHover,
  onLinkLeave,
  bannerType,
  onCampaignChange,
  activeCampaignIndex,
  nextSectionRef,
}: BannerNavigationProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  const handleClick = (index: number, link: string) => {
    if (bannerType === BannerType.CAMPAIGN_BANNER && onCampaignChange) {
      onCampaignChange(index);
      if (nextSectionRef?.current) {
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isOddCount = links?.length === 7;

  return (
    <div
      className={`m-6 flex items-center justify-center ${
        links?.length === 1
          ? 'flex-col'
          : `${bannerType === BannerType.CAMPAIGN_BANNER ? 'grid grid-cols-2' : 'grid grid-cols-3'} md:flex`
      } ${
        isOddCount ? 'grid-cols-2 md:grid-cols-3' : ''
      } text-center font-futura uppercase text-white`}
    >
      {links?.map((link, index) => {
        const isLastItem = isOddCount && index === links.length - 1;

        const selectedClass = index === activeCampaignIndex ? 'underline' : '';
        return bannerType === BannerType.MAIN_BANNER ? (
          <Link
            key={index}
            href={link.link}
            className={`px-3 py-1 text-xs sm:text-sm lg:text-base ${selectedClass} ${
              !isTouchDevice
                ? 'hover:cursor-pointer hover:text-custom-yellow'
                : 'active:text-custom-yellow'
            } ${isLastItem ? 'col-span-full text-center' : ''}`}
            onMouseEnter={() => !isTouchDevice && onLinkHover(index)}
            onMouseLeave={() => !isTouchDevice && onLinkLeave()}
          >
            {link.title}
          </Link>
        ) : (
          <div
            key={index}
            className={`px-3 py-1 text-xs sm:text-sm lg:text-base ${selectedClass} ${
              !isTouchDevice
                ? 'hover:cursor-pointer hover:text-custom-yellow'
                : ''
            } ${isLastItem ? 'col-span-full text-center' : ''}`}
            onMouseEnter={() => !isTouchDevice && onLinkHover(index)}
            onMouseLeave={() => !isTouchDevice && onLinkLeave()}
            onClick={() => handleClick(index, link.link)}
          >
            {link.title}
          </div>
        );
      })}
    </div>
  );
};

export default BannerNavigation;
