import React from 'react';
import VideoSlider from '../ui/VideoSlider';
import { LandingSectionType } from '@/contentful/landingSections';
import { fetchVideos } from '@/contentful/videos';

interface VideosProps {
  videosData: LandingSectionType;
}

const Videos = async ({ videosData }: VideosProps) => {
  const videos = await fetchVideos({ preview: false });
  const landingVideos = videos.filter(
    (item) => item.section === 'landingVideo'
  );

  return (
    <section className="w-full px-8 py-10 md:px-10 md:py-32 lg:px-28 xl:px-40">
      <div>
        <VideoSlider videos={landingVideos} />
      </div>
    </section>
  );
};

export default Videos;
