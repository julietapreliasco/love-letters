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
import Image from 'next/image';

const Map = dynamic(() => import('../ui/Map'), { ssr: false });
import SharedCard from '../ui/SharedCard';
import VideoPlayer from '../ui/VideoPlayer';
import { IoMdPlay } from 'react-icons/io';
import VideoGallery from '../ui/VideoGallery';

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
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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

  const openVideoGallery = (index: number) => {
    setCurrentVideoIndex(index);
    setIsVideoGalleryOpen(true);
  };

  return (
    <>
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
          <h3 className="mb-5 font-futura text-2xl font-medium leading-normal tracking-widest md:text-4xl md:leading-normal lg:mb-10 lg:text-5xl lg:leading-normal">
            {subtitle}
          </h3>
        </div>
        {videos && videos?.length > 0 && (
          <div className="mb-10">
            <VideoPlayer
              videoUrl={videos[0].videoUrl}
              thumbnail={videos[0].thumbnail}
            />
            <p className="mt-4 text-center font-medium">{videos[0].title}</p>
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

        {videos && videos.length > 1 && (
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(1).map((video, index) => (
              <div key={video.videoUrl} className="mb-10">
                <div className="md:hidden">
                  <VideoPlayer
                    videoUrl={video.videoUrl}
                    thumbnail={video.thumbnail}
                  />
                </div>

                <div
                  className="relative hidden cursor-pointer md:block"
                  onClick={() => openVideoGallery(index + 1)}
                >
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail}
                      alt="Video Thumbnail"
                      className="object-cover"
                      width={400}
                      height={225}
                      layout="responsive"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-custom-lighter-gray bg-opacity-70 p-4">
                      <IoMdPlay className="text-3xl text-custom-black" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center font-medium">{video.title}</p>
              </div>
            ))}
          </div>
        )}

        {finalText && (
          <div>
            <FinalText finalText={finalText} />
          </div>
        )}
        {gallery != null && (
          <div id="gallery" className="mt-10 lg:mt-20">
            <p className="mb-5 font-futura text-xl font-medium leading-normal tracking-widest md:text-4xl md:leading-normal lg:mb-11">
              Gallery
            </p>
            <Gallery images={gallery!} />
          </div>
        )}
        <div className="mt-10 flex justify-center">
          {press && press.length > 0 && (
            <div className="mt-14 lg:mt-20">
              <p className="mb-6 font-futura text-xl font-medium tracking-widest md:text-4xl lg:mb-11">
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
      {isVideoGalleryOpen && (
        <VideoGallery
          videos={videos!}
          currentIndex={currentVideoIndex}
          onClose={() => setIsVideoGalleryOpen(false)}
        />
      )}

      {backToTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-3 z-40 rounded-full bg-custom-yellow bg-opacity-20 p-3 text-white shadow-lg hover:bg-custom-gray lg:bg-opacity-40 2xl:bottom-20 2xl:right-20"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Campaign;
