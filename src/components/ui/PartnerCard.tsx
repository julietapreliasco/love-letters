import { CardType, fetchCards } from '@/contentful/cards';
import Image from 'next/image';
import React from 'react';

export interface CardStyles {
  mainDivColor: string;
  mainDivPadding: string;
  image: string;
  mainDivHeight: string;
  titleFont: string;
}
interface PartnerCardProps {
  cardData: CardType;
  styles?: CardStyles;
}

const SharedCard: React.FC<PartnerCardProps> = ({ cardData, styles }) => {
  const { title, description, image } = cardData;

  return (
    <div
      className={`flex ${styles?.mainDivHeight ?? 'h-[350px]'} justify-center rounded-[10px] ${styles?.mainDivColor ?? 'bg-custom-lighter-yellow'} ${styles?.mainDivPadding ?? 'p-6'} md:min-w-[210px] ${styles?.mainDivHeight ?? 'xl:h-80'} $`}
    >
      <div>
        {image?.src && (
          <div className="flex justify-center">
            <Image
              src={image.src}
              alt="Brian Rashid Partners"
              width={image.width}
              height={image.height}
              className={`"flex ${styles?.image ?? 'h-[160px] rounded-[10px]'} w-screen bg-white object-contain`}
            />
          </div>
        )}
        <div className="mt-5 flex w-full flex-col justify-center text-custom-black">
          {title && (
            <p
              className={`font-playfair-display ${styles?.titleFont ?? 'text-2xl'} font-bold`}
            >
              {title}
            </p>
          )}
          {description && <p className="font-lato text-base">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default SharedCard;
