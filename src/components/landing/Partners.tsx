'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LandingSectionType } from '@/contentful/landingSections';
import SharedSlider, { Types } from '../ui/SharedSlider';
import { PartnerType } from '@/contentful/partners';
import { CardType } from '@/contentful/cards';

interface PartnersProps {
  partnersPageData: LandingSectionType;
  partnersData: PartnerType[];
}

const Partners = ({ partnersPageData, partnersData }: PartnersProps) => {
  const partnersAsCards: CardType[] = partnersData.map((partner) => ({
    title: partner.name,
    description: partner.shortDescription,
    image: partner.photo,
    section: 'partners',
    campaign: null,
    url: `/partners/#${partner.id}`,
  }));

  return (
    <section
      id="partners"
      className="w-full px-5 md:mb-10 md:px-[70px] lg:mb-20"
    >
      <div className="flex w-full justify-center pb-10 lg:pb-6">
        <h2 className="font-futura text-3xl tracking-wider text-custom-black md:text-4xl xl:text-5xl 2xl:text-6xl">
          {partnersPageData.title}
        </h2>
      </div>
      <SharedSlider
        sliderData={partnersAsCards}
        type={Types.PARTNER}
        isPartners={true}
      />
    </section>
  );
};

export default Partners;
