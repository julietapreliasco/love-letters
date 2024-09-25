'use client';
import { CampaignType } from '@/contentful/campaign';
import Description from './Description';
import ContactUsCard from '../ui/ContactUsCard';
import Gallery from '../ui/Gallery';
import FinalText from './FinalText';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import VideoSlider from '../ui/VideoSlider';
import PageBanner from '../ui/PageBanner';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../ui/Map'), { ssr: false });
import SharedCard from '../ui/SharedCard';

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
    location,
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
              <p className="font-futura text-xl font-semibold">Date</p>
              <p className="font-lato text-base">{date}</p>
            </div>
          )}
          {partner && (
            <div>
              <p className="font-futura text-xl font-semibold">Partner</p>
              <p className="font-lato text-base">{partner}</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-futura mb-5 text-2xl font-medium leading-normal tracking-widest md:text-4xl md:leading-normal lg:mb-10 lg:text-5xl lg:leading-normal">
            {subtitle}
          </h3>
        </div>
        {videos && videos?.length > 0 && (
          <div className="mb-10">
            <VideoSlider videos={videos} />
            {videoCaption && (
              <p className="pt-3 text-center text-sm italic">{videoCaption}</p>
            )}
          </div>
        )}
        {description && (
          <div className="my-10">
            <Description
              description={description}
              imageCaption={imageCaption}
            />
          </div>
        )}
        {finalText && (
          <div>
            <FinalText finalText={finalText} />
          </div>
        )}
        {gallery != null && (
          <div id="gallery" className="mt-10 lg:mt-20">
            <p className="font-futura mb-5 text-xl font-medium leading-normal tracking-widest md:text-4xl md:leading-normal lg:mb-11">
              Gallery
            </p>
            <Gallery images={gallery!} />
          </div>
        )}
        {location && (
          <div className="my-10">
            <p className="font-futura mb-5 text-xl font-medium tracking-widest md:text-4xl lg:mb-11">
              Campaign Location
            </p>
            <Map locations={location} />
          </div>
        )}
        <div className="mt-10 flex justify-center">
          {press && press.length > 0 && (
            <div className="mt-14 lg:mt-20">
              <p className="font-futura mb-6 text-xl font-medium tracking-widest md:text-4xl lg:mb-11">
                Press about this campaign
              </p>
              <div
                className={`grid gap-8 lg:gap-14 ${
                  press.length === 1
                    ? 'grid-cols-1'
                    : press.length === 2
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
                }`}
              >
                {press?.map((pressCard, index) => {
                  return (
                    <div key={index} className="w-full lg:max-w-[700px]">
                      <SharedCard
                        styles={{
                          mainDivHeight: 'h-full',
                          mainDivPadding: 'p-0',
                          mainDivColor: 'bg-white',
                          image: 'lg:h-[300px] object-cover object-center',
                          titleFont: 'text-base md:text-xl',
                        }}
                        cardData={pressCard}
                      ></SharedCard>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="mb-5 mt-14 flex justify-center md:mb-0">
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
