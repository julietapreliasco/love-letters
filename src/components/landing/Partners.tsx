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
    <section className="mb-10 w-full px-5 md:px-[70px]">
      <div className="mb-6 flex w-full justify-between border-b border-custom-black py-2">
        <p className="font-playfair-display text-4xl font-semibold md:px-0 xl:text-5xl 2xl:text-6xl">
          {partnersData.title}
        </p>
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
