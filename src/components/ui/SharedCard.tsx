import { CardType } from '@/contentful/cards';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
}

const SharedCard = ({ cardData, styles, linkTo }: SharedCardProps) => {
  const { title, description, image } = cardData;

  return (
    <div
      className={`flex ${styles?.mainDivHeight ?? 'h-[350px]'} justify-center rounded-[10px] ${
        styles?.mainDivColor ?? 'border-2 border-custom-black bg-white'
      } ${styles?.mainDivPadding ?? 'p-6'} md:min-w-[210px] ${
        styles?.mainDivHeight ?? 'xl:h-80'
      }`}
    >
      <div className={`flex w-full flex-col ${styles?.contentWrapper ?? ''}`}>
        {image?.src && (
          <div className="flex justify-center">
            {linkTo ? (
              <Link href={linkTo} className="w-full">
                <Image
                  src={image.src}
                  alt="Brian Rashid Partners"
                  width={image.width}
                  height={image.height}
                  className={`transform transition-transform md:hover:scale-105 ${styles?.image ?? 'h-[160px] rounded-[10px]'} w-full bg-white object-contain`}
                />
              </Link>
            ) : (
              <Image
                src={image.src}
                alt="Brian Rashid Partners"
                width={image.width}
                height={image.height}
                className={`${styles?.image ?? 'h-[160px] rounded-[10px]'} w-full bg-white object-contain`}
              />
            )}
          </div>
        )}
        <div
          className={`mt-5 flex flex-col text-custom-black ${styles?.linkWrapper ?? ''}`}
        >
          {title && (
            <p
              className={`font-futura leading-normal ${
                styles?.titleFont ?? 'text-2xl'
              } font-semibold`}
            >
              {title}
            </p>
          )}
          {description && (
            <p className="truncate-2-lines font-lato text-base leading-normal">
              {description}
            </p>
          )}
          {linkTo && (
            <Link href={linkTo} className={`mt-3 text-sm underline md:mt-1`}>
              Read more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedCard;
