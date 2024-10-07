'use client';
import { CampaignType } from '@/contentful/campaign';
import Description from './Description';
import ContactUsCard from '../ui/ContactUsCard';
import Gallery from '../ui/Gallery';
import FinalText from './FinalText';
import { useState } from 'react';

import Image from 'next/image';
import VideoPlayer from '../ui/VideoPlayer';
import { IoMdPlay } from 'react-icons/io';
import VideoGallery from '../ui/VideoGallery';
import PressSection from '../ui/PressSection';

interface CampaignProps {
  data: CampaignType;
}

const Campaign = ({ data }: CampaignProps) => {
  const {
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

  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
              <p className="font-lato text-base">
                {partner.map((partner) => partner.name)}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 pb-5 md:pb-10">
          <h3 className="font-futura text-2xl font-medium leading-normal tracking-widest md:text-4xl md:leading-normal lg:text-5xl lg:leading-normal">
            {bannerTitle}
          </h3>
          <p className="font-lato text-lg leading-normal md:text-xl md:leading-normal lg:text-2xl lg:leading-normal">
            {subtitle}
          </p>
        </div>
        {videos && videos?.length > 0 && (
          <div className="">
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
          <div className="my-5 md:my-10">
            <Description
              description={description}
              imageCaption={imageCaption}
            />
          </div>
        )}

        {videos && videos.length > 1 && (
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(1).map((video, index) => (
              <div key={video.videoUrl} className="mb-5 md:mb-10">
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
          {press && press.length > 0 && <PressSection press={press!} />}
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
    </>
  );
};

export default Campaign;
