import { LandingSectionType } from '@/contentful/landingSections';
import AboutLoveLettersSVG from '../ui/AboutLoveLettersSVG';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import LottieAnimation from '../ui/LottieAnimation';
import animationData from '../../../public/about-love-letters-animation.json';

interface AboutLoveLettersProps {
  aboutLoveLettersData: LandingSectionType;
}

const AboutLoveLetters: React.FC<AboutLoveLettersProps> = ({
  aboutLoveLettersData,
}) => {
  const richDescription = aboutLoveLettersData.richDescription;

  return (
    <section
      id="aboutLoveLetters"
      className="flex flex-col items-center gap-14 bg-custom-lighter-gray px-[40px] py-20 md:px-[60px] lg:flex-row xl:gap-28"
    >
      <div className="flex flex-1 justify-center">
        <LottieAnimation
          autoplay={true}
          hover={false}
          animationData={animationData}
        />
      </div>
      <div className="flex flex-1 flex-col xl:gap-5">
        <p className="mb-5 text-center font-futura text-2xl leading-normal tracking-wider text-custom-black md:text-5xl md:leading-normal lg:text-start lg:leading-normal 2xl:text-5xl 2xl:leading-normal">
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
