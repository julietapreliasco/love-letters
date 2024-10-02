import { BannerType } from '@/types';
import Link from 'next/link';

interface BannerNavigationLink {
  title: string;
  link: string;
}

interface BannerNavigationProps {
  links: BannerNavigationLink[];
  onLinkHover: (index: number) => void;
  onLinkLeave: () => void;
  bannerType: BannerType;
}

const BannerNavigation = ({
  links,
  onLinkHover,
  onLinkLeave,
  bannerType,
}: BannerNavigationProps) => {
  return (
    <div
      className={`m-6 flex ${bannerType === BannerType.CAMPAIGN_BANNER ? 'flex-col' : 'flex-row gap-2'} text-center font-futura uppercase text-white sm:flex-row`}
    >
      {links.map((link, index) => (
        <Link
          href={link.link}
          key={index}
          className="truncate py-1 text-xs hover:cursor-pointer hover:text-custom-yellow sm:px-2 sm:text-sm lg:text-base"
          onMouseEnter={() => onLinkHover(index)}
          onMouseLeave={onLinkLeave}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default BannerNavigation;
