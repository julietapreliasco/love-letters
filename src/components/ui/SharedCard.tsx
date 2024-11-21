import React from 'react';
import { CardType } from '@/contentful/cards';
import Image from 'next/image';
import Link from 'next/link';

export interface CardStyles {
  mainDivColor?: string;
  mainDivPadding?: string;
  image?: string;
  mainDivHeight?: string;
  titleFont?: string;
  contentWrapper?: string;
  linkWrapper?: string;
}

interface SharedCardProps {
  cardData: CardType;
  styles?: CardStyles;
  linkTo?: string;
  isPress?: boolean;
}

const SharedCard = ({
  cardData,
  styles,
  linkTo,
  isPress = false,
}: SharedCardProps) => {
  const { title, description, image, logo } = cardData;

  const isLogo =
    title === 'Bethlehem Chamber of Commerce' ||
    title === 'ScubbleBubbles Foundation' ||
    title === 'Augie Studios';

  return (
    <div
      className={`flex ${styles?.mainDivHeight ?? 'h-[400px]'} justify-center rounded-[10px] ${
        styles?.mainDivColor ?? 'border-2 border-custom-black bg-white'
      } ${styles?.mainDivPadding ?? 'p-6'} md:min-w-[210px] ${
        styles?.mainDivHeight ?? 'xl:h-[450px]'
      } ${!isPress ? 'flex-col' : ''}`}
    >
      <div
        className={`flex w-full flex-col ${styles?.contentWrapper ?? ''} ${!isPress ? 'h-full' : ''}`}
      >
        {image?.src && (
          <div
            className={`group relative flex justify-center ${
              !isPress ? 'h-[250px]' : (styles?.image ?? 'h-[160px]')
            }`}
          >
            {linkTo ? (
              <Link
                target={isPress ? '_blank' : undefined}
                href={linkTo}
                className="h-full w-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`transform rounded-[10px] ${isLogo ? 'object-contain' : 'object-cover'} transition-transform md:group-hover:scale-105 ${
                    isPress ? 'rounded-none' : ''
                  }`}
                />
              </Link>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`rounded-[10px] ${isPress ? 'object-cover' : ''}`}
              />
            )}
          </div>
        )}
        <div
          className={`mt-4 flex flex-col gap-2 text-custom-black ${styles?.linkWrapper ?? ''} ${
            !isPress ? 'flex-grow' : ''
          }`}
        >
          {title && (
            <h3
              className={`font-futura leading-tight ${
                styles?.titleFont ?? 'text-xl'
              } ${!isPress ? 'line-clamp-2' : ''}`}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={`font-lato text-sm leading-snug ${!isPress ? 'line-clamp-3' : 'truncate-2-lines'}`}
            >
              {description}
            </p>
          )}
          {linkTo && (
            <Link
              target={isPress ? '_blank' : undefined}
              href={linkTo}
              className={`mt-2 text-sm underline md:mt-1 ${!isPress ? 'mt-auto' : ''}`}
            >
              See more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedCard;
