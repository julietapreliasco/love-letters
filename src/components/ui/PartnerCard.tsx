import { CardType, fetchCards } from '@/contentful/cards';
import Image from 'next/image';
import React from 'react';
import Button from './Button';
import findSection from '@/utils/findSection';

interface PartnerCardProps {
  card: CardType;
  buttonLabel?: string;
}

const PartnerCard: React.FC<PartnerCardProps> = async ({ card }) => {
  const { title, subtitle, image } = card;
  const cards = await fetchCards({ preview: false });

  return (
    <div className="flex w-fit flex-col gap-5 rounded-[10px] bg-white p-10">
      <div className="flex flex-col gap-5 font-playfair-display xs:flex-row">
        {image?.src && (
          <Image
            src={image.src}
            alt="Brian Rashid"
            width={image.width}
            height={image.height}
            className="flex h-[120px] w-[120px] self-center object-cover"
          />
        )}
        <div className="flex flex-col justify-center text-left text-custom-black">
          {title && (
            <span className="text-2xl font-bold md:text-4xl 2xl:text-5xl">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="max-w-[300px] text-xl font-bold md:text-2xl 2xl:text-3xl">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
