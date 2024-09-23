import React from 'react';
import VideoSlider from '../ui/VideoSlider';
import { LandingSectionType } from '@/contentful/landingSections';
import { fetchVideos } from '@/contentful/videos';
import LottieAnimation from '../ui/LottieAnimation';
import animationData from '../../../public/videos-background.json';

interface VideosProps {
  videosData: LandingSectionType;
}

const Videos = async ({ videosData }: VideosProps) => {
  const videos = await fetchVideos({ preview: false });
  const landingVideos = videos.filter(
    (item) => item.section === 'landingVideo'
  );

  return (
    <section className="relative mb-14 mt-10 w-full overflow-hidden p-3 md:p-20 lg:px-48 lg:py-20">
      <div className="absolute inset-0 h-full w-full">
        <LottieAnimation
          animationData={animationData}
          autoplay={true}
          loop={true}
        />
      </div>
      <div className="relative z-10 flex w-full items-center justify-center">
        <div className="w-full xl:max-w-7xl">
          <VideoSlider videos={landingVideos} />
        </div>
      </div>
    </section>
  );
};

export default Videos;
