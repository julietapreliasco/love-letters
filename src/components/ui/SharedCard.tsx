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
          <div
            className={`group relative flex justify-center ${styles?.image ?? 'h-[160px]'}`}
          >
            {linkTo ? (
              <Link href={linkTo} className="h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className={`transform rounded-[10px] transition-transform md:group-hover:scale-105 ${
                    isPress
                      ? 'rounded-none opacity-75 group-hover:opacity-100'
                      : ''
                  }`}
                />
              </Link>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-[10px] ${
                  isPress ? 'opacity-75 group-hover:opacity-100' : ''
                }`}
              />
            )}
            {isPress && logo?.src && (
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                {linkTo ? (
                  <Link href={linkTo}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="h-[80px] w-[80px] object-contain md:h-[100px] md:w-[100px]"
                    />
                  </Link>
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-[80px] w-[80px] object-contain md:h-[100px] md:w-[100px]"
                  />
                )}
              </div>
            )}
          </div>
        )}
        <div
          className={`mt-5 flex flex-col gap-2 text-custom-black ${styles?.linkWrapper ?? ''}`}
        >
          {title && (
            <h3
              className={`font-futura leading-normal ${
                styles?.titleFont ?? 'text-2xl'
              }`}
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="truncate-2-lines font-lato text-base leading-normal">
              {description}
            </p>
          )}
          {linkTo && (
            <Link href={linkTo} className={`mt-3 text-sm underline md:mt-1`}>
              Read more
              <span className="sr-only">{` about ${title}`}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedCard;
