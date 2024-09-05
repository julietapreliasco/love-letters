'use client';

import { LandingSectionType } from '@/contentful/landingSections';
import SharedSlider, { Types } from '../ui/SharedSlider';

interface PressProps {
  pressData: LandingSectionType;
}

const Press: React.FC<PressProps> = ({ pressData }) => {
  const pressCards = pressData.cards;

  return (
    <section className="mb-10 mt-10 min-h-[500px] w-full px-5 md:px-[70px] 2xl:min-h-[600px]">
      <div className="mb-6 flex w-full justify-between border-b border-custom-black py-2">
        <p className="font-playfair-display text-4xl font-semibold md:px-0 xl:text-5xl 2xl:text-6xl">
          {pressData.title}
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
