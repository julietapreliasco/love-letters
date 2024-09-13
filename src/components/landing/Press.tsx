'use client';

import { LandingSectionType } from '@/contentful/landingSections';
import SharedSlider, { Types } from '../ui/SharedSlider';
import { CardType } from '@/contentful/cards';

interface PressProps {
  pressData: LandingSectionType | CardType[];
}

const Press: React.FC<PressProps> = ({ pressData }) => {
  const pressCards = Array.isArray(pressData) ? pressData : pressData.cards;
  const title = Array.isArray(pressData)
    ? 'Press about the campaign'
    : pressData.title;

  return (
    <section className="mb-10 mt-10 min-h-[500px] w-full px-5 md:px-[70px] 2xl:min-h-[600px]">
      <div className="mb-6 flex w-full justify-between border-b border-custom-black py-2">
        <p className="font-playfair-display text-4xl font-semibold md:px-0 xl:text-5xl 2xl:text-6xl">
          {title}
        </p>
      </div>
      <div className="mt-10">
        <SharedSlider
          sliderData={pressCards!}
          type={Types.PRESS}
          isPartners={false}
        />
      </div>
    </section>
  );
};

export default Press;
