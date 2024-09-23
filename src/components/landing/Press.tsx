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
    <section className="mt-14 min-h-[500px] w-full px-5 md:min-h-[430px] md:px-[70px] lg:min-h-[500px] 2xl:min-h-[600px]">
      <div>
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
