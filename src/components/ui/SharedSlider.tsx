'use client';

import React, { useRef, useEffect } from 'react';
import { CardType } from '@/contentful/cards';
import Slider from 'react-slick';
import SharedCard, { CardStyles } from './SharedCard';
import SliderButton from './SliderButton';

export enum Types {
  PARTNER = 'PARTNER',
  PRESS = 'MAIN',
}

interface SharedSliderProps {
  sliderData: CardType[];
  isPartners: boolean;
  type: Types;
}

const SharedSlider = ({ sliderData, isPartners, type }: SharedSliderProps) => {
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && isPartners) {
      slider.slickPlay();
    }
  }, [isPartners]);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: isPartners,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    rtl: false,
    speed: 1000,
    cssEase: 'ease-out',
    nextArrow: !isPartners ? (
      <SliderButton isPartners={true} next={true} />
    ) : undefined,
    prevArrow: !isPartners ? <SliderButton isPartners={true} /> : undefined,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: !isPartners,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: !isPartners,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const pressCardStyles: CardStyles = {
    mainDivColor: 'bg-white',
    mainDivPadding: 'p-0 xl:p-0',
    image: 'h-[220px] w-full object-cover',
    mainDivHeight: 'h-full',
    titleFont: 'text-xl',
    contentWrapper: 'h-full',
    linkWrapper: 'h-full flex flex-col justify-between',
  };

  const partnerCardStyles: CardStyles = {
    mainDivHeight: 'h-[400px]',
    image: 'rounded-[10px] object-cover h-[160px] w-full',
    titleFont: 'text-xl md:text-2xl',
  };

  return (
    <div className="flex justify-center">
      <Slider ref={sliderRef} className="w-full lg:mt-10" {...settings}>
        {sliderData?.map((card, index) => (
          <div className="mb-10 px-3 lg:mb-0" key={index}>
            {type === Types.PARTNER ? (
              <SharedCard
                linkTo={card.url}
                cardData={card}
                styles={partnerCardStyles}
              />
            ) : (
              <SharedCard
                cardData={card}
                styles={pressCardStyles}
                linkTo={card.url}
                isPress={true}
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SharedSlider;
