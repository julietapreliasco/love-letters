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
    <section className="relative mb-14 mt-10 w-full overflow-hidden p-3 md:p-20 lg:px-48 lg:py-20">
      <div className="relative z-10 flex w-full items-center justify-center">
        <div className="w-full xl:max-w-7xl">
          <VideoSlider videos={landingVideos} />
        </div>
      </div>
    </section>
  );
};

export default Videos;
