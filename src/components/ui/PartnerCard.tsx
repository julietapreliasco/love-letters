import { CardType, fetchCards } from '@/contentful/cards';
import Image from 'next/image';
import React from 'react';

interface PartnerCardProps {
  partnerCardData: CardType;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partnerCardData }) => {
  const { title, description, image } = partnerCardData;

  return (
    <div className="flex h-[350px] justify-center rounded-[10px] bg-custom-lighter-yellow p-6 md:min-w-[210px] xl:h-80 xl:p-8">
      <div>
        {image?.src && (
          <div className="flex justify-center">
            <Image
              src={image.src}
              alt="Brian Rashid Partners"
              width={image.width}
              height={image.height}
              className="flex h-[160px] w-screen rounded-[10px] bg-white object-contain"
            />
          </div>
        )}
        <div className="mt-5 flex w-full flex-col justify-center text-custom-black">
          {title && (
            <p className="font-playfair-display text-2xl font-bold">{title}</p>
          )}
          {description && <p className="font-lato text-base">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
