import React from 'react';
import VideoSlider from '../ui/VideoSlider';
import { LandingSectionType } from '@/contentful/landingSections';
import { fetchVideos } from '@/contentful/videos';
import Button from '../ui/Button';

interface VideosProps {
  videosData: LandingSectionType;
}

const Videos: React.FC<VideosProps> = async ({ videosData }) => {
  const videos = await fetchVideos({ preview: false });
  const landingVideos = videos.filter(
    (item) => item.section === 'landingVideo'
  );

  return (
    <section className="mb-8 w-full px-5 md:mb-0 md:px-[70px] md:py-20">
      <div className="mb-6 flex w-full justify-between border-b border-custom-black py-2">
        <span className="font-playfair-display text-4xl font-semibold md:px-0 xl:text-5xl 2xl:text-6xl">
          {videosData.title}
        </span>
        <div className="hidden md:block">
          <Button variant="SECONDARY" label="CHECK OUR VIDEOS" />
        </div>
        <div className="md:hidden">
          <Button variant="SECONDARY" label="View all" />
        </div>
      </div>
      <div className="md:px-10 md:py-5 lg:px-20 xl:px-32 2xl:px-64">
        <VideoSlider videos={landingVideos} />
      </div>
    </section>
  );
};

export default Videos;
