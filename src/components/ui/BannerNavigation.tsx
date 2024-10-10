import { BannerType } from '@/types';
import Link from 'next/link';

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
  const handleClick = (index: number, link: string) => {
    if (bannerType === BannerType.CAMPAIGN_BANNER && onCampaignChange) {
      onCampaignChange(index);
      if (nextSectionRef?.current) {
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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
            className="px-3 py-1 text-xs hover:cursor-pointer hover:text-custom-yellow sm:text-sm lg:text-base"
            onMouseEnter={() => onLinkHover(index)}
            onMouseLeave={onLinkLeave}
          >
            {link.title}
          </Link>
        ) : (
          <div
            key={index}
            className={`px-3 py-1 text-xs hover:cursor-pointer hover:text-custom-yellow sm:text-sm lg:text-base ${
              index === activeCampaignIndex ? 'text-custom-yellow' : ''
            }`}
            onMouseEnter={() => onLinkHover(index)}
            onMouseLeave={onLinkLeave}
            onClick={() => handleClick(index, link.link)}
          >
            {link.title}
          </div>
        )
      )}
    </div>
  );
};

export default BannerNavigation;
