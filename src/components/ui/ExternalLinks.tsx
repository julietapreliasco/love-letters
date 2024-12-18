import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkType } from '@/contentful/externalLink';

interface ExternalLinksProps {
  links: ExternalLinkType[];
  variant?: 'default' | 'place';
}

const ExternalLinks = ({ links, variant = 'default' }: ExternalLinksProps) => {
  if (!links || links.length === 0) return null;

  const gridCols =
    links.length === 1
      ? 'grid-cols-1'
      : `sm:grid-cols-2 ${links.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`;

  return (
    <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
      {links.map((link) => (
        <Link
          key={link.link}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative ${
            variant === 'place' ? 'aspect-video' : 'aspect-[4/3]'
          } w-full cursor-pointer overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${
            links.length === 1
              ? 'col-span-full hover:scale-[1.01]'
              : 'hover:scale-[1.02]'
          }`}
        >
          <Image
            src={link.image?.src || ''}
            alt={link.title}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-300 ease-in-out"
          />
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all duration-300 ease-in-out ${
              variant === 'place'
                ? 'bg-black bg-opacity-50 group-hover:bg-opacity-0'
                : 'bg-black bg-opacity-0 group-hover:bg-opacity-50'
            }`}
          >
            {variant === 'default' && (
              <h3 className="mb-2 font-futura text-xl font-medium uppercase text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-2xl">
                {link.title}
              </h3>
            )}
            {variant === 'place' && (
              <p className="font-lato text-2xl uppercase text-white transition-opacity duration-300 group-hover:opacity-0 md:text-4xl">
                {link.shortDescription}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExternalLinks;
