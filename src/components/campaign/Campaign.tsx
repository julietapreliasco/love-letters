'use client';
import Image from 'next/image';
import { useScroll } from 'framer-motion';
import { CampaignType } from '@/contentful/campaign';
import Description from './Description';
import ContactUsCard from '../ui/ContactUsCard';
import Gallery from '../ui/Gallery';
import FinalText from './FinalText';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import VideoSlider from '../ui/VideoSlider';
import PageBanner from '../ui/PageBanner';

interface CampaignProps {
  data: CampaignType;
}

const Campaign = ({ data }: CampaignProps) => {
  const {
    bannerImage,
    bannerTitle,
    date,
    partner,
    subtitle,
    description,
    imageCaption,
    gallery,
    finalText,
    videos,
    press,
    videoCaption,
  } = data;

  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full">
      <PageBanner bannerImg={bannerImage!} bannerTitle={bannerTitle!} />
      <div className="px-10 py-10 md:px-20 md:py-20 xl:px-48 xl:py-20">
        <div className="mb-8 justify-between md:mb-16 md:flex">
          {date && (
            <div>
              <p className="font-playfair-display text-2xl font-semibold">
                Date
              </p>
              <p className="font-lato text-base">{date}</p>
            </div>
          )}
          {partner && (
            <div>
              <p className="font-playfair-display text-2xl font-semibold">
                Partner
              </p>
              <p className="font-lato text-base">{partner}</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-11 font-playfair-display text-2xl font-medium tracking-widest md:text-4xl lg:text-5xl">
            {subtitle}
          </h3>
        </div>
        {videos && videos?.length > 0 && (
          <div className="my-10">
            <VideoSlider videos={videos} />
            {videoCaption && (
              <p className="pt-3 text-center text-sm italic">{videoCaption}</p>
            )}
          </div>
        )}
        {description && (
          <div>
            <Description
              description={description}
              imageCaption={imageCaption}
            />
          </div>
        )}
        {finalText && (
          <div className="my-10">
            <FinalText finalText={finalText} />
          </div>
        )}
        {gallery != null && (
          <div id="gallery" className="my-10">
            <p className="mb-5 font-playfair-display text-2xl font-medium tracking-widest md:text-4xl lg:mb-11 lg:text-5xl">
              Gallery
            </p>
            <Gallery images={gallery!} />
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <ContactUsCard />
        </div>
      </div>
      {backToTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-3 z-40 rounded-full bg-custom-yellow bg-opacity-20 p-3 text-white shadow-lg hover:bg-custom-gray lg:bg-opacity-40 2xl:bottom-20 2xl:right-20"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </section>
  );
};

export default Campaign;
