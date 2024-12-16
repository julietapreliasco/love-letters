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
import PartnerSection from '../ui/PartnerSection';
import ExternalLinks from '../ui/ExternalLinks';

interface CampaignProps {
  data: CampaignType;
  isAcademy?: boolean;
}

const Campaign = ({ data, isAcademy }: CampaignProps) => {
  const {
    bannerTitle,
    partner,
    subtitle,
    description,
    imageCaption,
    gallery,
    finalText,
    videos,
    press,
    videoCaption,
    videosTitle,
    externalLinks,
    variant,
  } = data;

  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const openVideoGallery = (index: number) => {
    setCurrentVideoIndex(index);
    setIsVideoGalleryOpen(true);
  };

  return (
    <>
      <div
        className={`${
          !isAcademy ? 'px-10 py-16 md:px-20 md:py-32 xl:px-48 xl:py-32' : ''
        }`}
      >
        <div
          className={`flex flex-col-reverse items-center justify-center md:flex-row ${partner && 'md:justify-between'}`}
        >
          <div
            className={`flex flex-col gap-3 pb-5 text-center md:pb-10 ${partner && 'md:w-[70%] md:text-start'}`}
          >
            <h3
              className={`text-center font-futura text-2xl font-medium leading-normal tracking-widest md:text-start md:text-4xl md:leading-normal ${
                !isAcademy ? 'lg:text-5xl lg:leading-normal' : ''
              }`}
            >
              {bannerTitle}
            </h3>
            {subtitle && (
              <p className="font-lato text-lg leading-normal md:text-xl md:leading-normal lg:text-2xl lg:leading-normal">
                {subtitle}
              </p>
            )}
          </div>
          {partner && (
            <PartnerSection isAcademy={isAcademy} partners={partner} />
          )}
        </div>

        {variant == 'VARIANT_1' && externalLinks && (
          <ExternalLinks links={externalLinks} />
        )}
        {videos && videos?.length > 0 && (
          <div className="">
            {variant == 'VARIANT_1' && videos[0].title && (
              <p className="my-10 text-center font-medium">{videos[0].title}</p>
            )}
            <VideoPlayer
              videoUrl={videos[0].videoUrl}
              thumbnail={videos[0].thumbnail}
            />
            {variant != 'VARIANT_1' && (
              <p className="my-4 text-center font-medium">{videos[0].title}</p>
            )}
            {videoCaption && (
              <p className="pt-3 text-center text-sm italic">{videoCaption}</p>
            )}
          </div>
        )}
        {description && (
          <div className="mb-5 md:mb-10">
            <Description
              description={description}
              imageCaption={imageCaption}
            />
          </div>
        )}

        {videosTitle && (
          <h3
            className={`my-10 text-center font-futura text-2xl font-medium leading-normal tracking-widest md:text-start md:text-3xl md:leading-normal ${
              !isAcademy ? 'lg:text-4xl lg:leading-normal' : ''
            }`}
          >
            {videosTitle}
          </h3>
        )}

        {videos && videos.length > 1 && (
          <div
            className={`relative grid grid-cols-1 gap-6 ${
              videos.length === 2
                ? 'sm:grid-cols-1'
                : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {videos.slice(1).map((video, index) => (
              <div
                key={video.videoUrl}
                className={`${videos.length > 2 ? 'mb-5' : 'my-2 md:my-10'} `}
              >
                {variant == 'VARIANT_1' && video.title && (
                  <p className="my-10 text-center font-medium">{video.title}</p>
                )}
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
                    <div className="relative aspect-video w-full">
                      <Image
                        src={video.thumbnail}
                        alt="Video Thumbnail"
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-custom-lighter-gray bg-opacity-70 p-4">
                      <IoMdPlay className="text-3xl text-custom-black" />
                    </div>
                  </div>
                </div>
                {variant != 'VARIANT_1' && (
                  <p className="mt-4 text-center font-medium">{video.title}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {variant != 'VARIANT_1' && externalLinks && (
          <ExternalLinks links={externalLinks} />
        )}

        {finalText && (
          <div>
            <FinalText finalText={finalText} />
          </div>
        )}
        {gallery != null && (
          <div id="gallery" className="mb-5 mt-10 lg:mt-12">
            <h3
              className={`mb-5 text-center font-futura text-xl font-medium leading-normal tracking-widest md:text-start md:text-4xl md:leading-normal lg:mb-11`}
            >
              Gallery
            </h3>
            <Gallery images={gallery!} />
          </div>
        )}
        <div className="flex justify-center">
          {press && press.length > 0 && <PressSection press={press!} />}
        </div>
        {!isAcademy && (
          <div className="mb-5 mt-14 flex justify-center md:mb-0">
            <ContactUsCard />
          </div>
        )}
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
