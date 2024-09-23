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
    <section className="flex flex-col items-center gap-14 bg-custom-lighter-gray px-[40px] py-20 md:px-[60px] lg:flex-row xl:gap-28">
      <div className="flex flex-1 justify-center">
        <LottieAnimation
          autoplay={true}
          hover={false}
          animationData={animationData}
        />
      </div>
      <div className="flex flex-1 flex-col xl:gap-5">
        <p className="mb-5 text-center font-playfair-display text-2xl font-bold text-custom-black md:text-5xl lg:text-start 2xl:text-6xl">
          {aboutLoveLettersData.title}
        </p>
        <div className="text-center font-lato text-sm text-custom-black md:text-xl lg:text-start 2xl:text-2xl">
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
