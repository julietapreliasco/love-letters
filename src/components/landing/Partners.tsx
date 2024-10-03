'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LandingSectionType } from '@/contentful/landingSections';
import SharedSlider, { Types } from '../ui/SharedSlider';

interface PartnersProps {
  partnersData: LandingSectionType;
}

const Partners: React.FC<PartnersProps> = ({ partnersData }) => {
  const partnersCards = partnersData.cards;

  return (
    <section
      id="partners"
      className="w-full px-5 md:mb-10 md:px-[70px] lg:mb-20"
    >
      <div className="flex w-full justify-center pb-10 lg:pb-6">
        <h2 className="font-futura text-3xl tracking-wider text-custom-black md:text-4xl xl:text-5xl 2xl:text-6xl">
          {partnersData.title}
        </h2>
      </div>
      <SharedSlider
        sliderData={partnersCards!}
        type={Types.PARTNER}
        isPartners={true}
      />
    </section>
  );
};

export default Partners;
