'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CampaignType } from '@/contentful/campaign';
import Description from './Description';
import ContactUsCard from '../ui/ContactUsCard';
import Gallery from '../ui/Gallery';
import VideoPlayer from '../ui/VideoPlayer';
import FinalText from './FinalText';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

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
    bannerColor,
    videoCaption,
  } = data;

  const [backToTopButton, setBackToTopButton] = useState(false);
  const videoURLs = videos?.map((item) => item.videoUrl);

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

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.3]);

  return (
    <section className="w-full">
      <div
        style={{ backgroundColor: bannerColor }}
        className={
          'relative flex w-full flex-col items-center justify-center overflow-hidden md:relative md:h-screen md:flex-row'
        }
      >
        {bannerImage && (
          <motion.div
            className="z-0 flex items-center justify-center pt-20 md:h-auto md:w-[60%] md:pt-10"
            style={{ scale }}
          >
            <Image
              src={bannerImage.src}
              alt="Love Letters Home Banner"
              width={bannerImage.width}
              height={bannerImage.height}
              className="z-0 w-[85%] self-center object-cover shadow-xl md:h-auto md:w-full"
              priority
            />
          </motion.div>
        )}
        <div className="flex w-full p-10 text-center font-playfair-display text-2xl font-semibold tracking-wider text-custom-lighter-gray drop-shadow-2xl md:absolute md:left-10 md:top-[60%] md:max-w-[620px] md:text-start md:text-[46px] md:leading-[48px] md:text-white">
          <span>{bannerTitle}</span>
        </div>
      </div>

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
        {videoURLs && videoURLs.length > 0 && videos && (
          <div className="my-10">
            <VideoPlayer videoUrl={videoURLs[0]} />
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
