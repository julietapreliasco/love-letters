'use client';
import { LandingSectionType } from '@/contentful/landingSections';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import VideoPlayer from '../ui/VideoPlayer';

interface AboutLoveLettersProps {
  aboutLoveLettersData: LandingSectionType;
}

const AboutLoveLetters: React.FC<AboutLoveLettersProps> = ({
  aboutLoveLettersData,
}) => {
  const richDescription = aboutLoveLettersData.richDescription;
  let video;

  if (aboutLoveLettersData.videos) {
    video = aboutLoveLettersData.videos[0];
  }

  return (
    <section
      id="aboutLoveLetters"
      className="customLg:flex-row flex flex-col items-center gap-14 bg-custom-lighter-gray px-[40px] py-20 md:flex-col-reverse md:px-[60px] xl:gap-28"
    >
      <div className="flex w-full justify-center lg:flex-1">
        <VideoPlayer videoUrl={video?.videoUrl!} thumbnail={video?.thumbnail} />
      </div>
      <div className="flex w-full flex-col gap-5 lg:flex-1">
        <p className="text-center font-futura text-2xl leading-normal tracking-wide text-custom-black md:text-5xl md:leading-normal lg:text-start lg:leading-normal 2xl:text-5xl 2xl:leading-normal">
          {aboutLoveLettersData.title}
        </p>
        <div className="text-center font-lato text-sm text-custom-black md:text-xl lg:text-start">
          {richDescription ? (
            <div className="space-y-4">
              {documentToReactComponents(richDescription)}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AboutLoveLetters;
