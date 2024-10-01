import Link from 'next/link';

interface BannerNavigationLink {
  title: string;
  link: string;
}

interface BannerNavigationProps {
  links: BannerNavigationLink[];
  onLinkHover: (index: number) => void;
  onLinkLeave: () => void;
}

const BannerNavigation = ({
  links,
  onLinkHover,
  onLinkLeave,
}: BannerNavigationProps) => {
  return (
    <div className="m-6 flex font-futura uppercase text-white">
      {links.map((link, index) => (
        <Link
          href={link.link}
          key={index}
          className="px-3 hover:cursor-pointer hover:text-custom-yellow"
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
