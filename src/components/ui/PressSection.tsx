import React from 'react';
import SharedCard from './SharedCard';
import { CardType } from '@/contentful/cards';

interface PressSectionProps {
  press: CardType[];
}

const PressSection: React.FC<PressSectionProps> = ({ press }) => {
  if (!press || press.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 w-full lg:mt-20">
      <p className="mb-6 font-futura text-3xl font-medium tracking-widest md:text-5xl lg:mb-11">
        Press
      </p>
      <div className="flex justify-center">
        <div
          className={`grid w-full max-w-[1400px] gap-8 lg:gap-14 ${
            press.length === 1
              ? 'grid-cols-1 md:grid-cols-1'
              : press.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
          }`}
        >
          {press.map((pressCard, index) => (
            <div key={index} className="lg:max-w-[700px]">
              <SharedCard
                styles={{
                  mainDivHeight: 'h-full',
                  mainDivPadding: 'p-0',
                  mainDivColor: 'bg-white',
                  image: 'h-[200px] lg:h-[300px] object-cover object-center',
                  titleFont: 'text-base md:text-xl',
                }}
                linkTo={pressCard.url}
                cardData={pressCard}
                isPress
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressSection;
