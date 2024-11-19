import Image from 'next/image';
import { ExternalLinkType } from '@/contentful/externalLink';

interface ExternalLinksProps {
  links: ExternalLinkType[];
}

const ExternalLinks = ({ links }: ExternalLinksProps) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.link}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
        >
          <Image
            src={link.image?.src || ''}
            alt={link.title}
            layout="fill"
            className="object-cover transition-all duration-300 ease-in-out group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <h3 className="text-center font-lato text-xl font-medium uppercase text-white md:text-2xl">
              {link.title}
            </h3>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ExternalLinks;
