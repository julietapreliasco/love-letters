'use client';

import { LandingSectionType } from '@/contentful/landingSections';
import SharedSlider, { Types } from '../ui/SharedSlider';
import { CardType } from '@/contentful/cards';

interface PressProps {
  pressData: LandingSectionType | CardType[];
}

const Press: React.FC<PressProps> = ({ pressData }) => {
  const pressCards = Array.isArray(pressData) ? pressData : pressData.cards;

  return (
    <section className="mb-10 mt-10 min-h-[500px] w-full px-5 md:mt-20 md:px-[70px] lg:mb-28 2xl:mb-20 2xl:min-h-[600px]">
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
