import { LandingSectionType } from '@/contentful/landingSections';
import AboutLoveLettersSVG from '../ui/AboutLoveLettersSVG';

interface AboutLoveLettersProps {
  data: LandingSectionType;
}

const AboutLoveLetters: React.FC<AboutLoveLettersProps> = ({ data }) => {
  const description = data.description;

  const firstDescription = description?.substring(0, 295);
  const secondDescription = description?.substring(295);

  return (
    <section className="flex flex-col items-center gap-14 bg-custom-lighter-gray px-[40px] py-20 md:px-[60px] lg:flex-row xl:gap-28">
      <div className="flex flex-1 justify-center">
        <AboutLoveLettersSVG />
      </div>
      <div className="flex flex-1 flex-col xl:gap-5">
        <p className="mb-5 text-center font-playfair-display text-2xl font-bold text-custom-black md:text-5xl lg:text-start 2xl:text-6xl">
          {data.title}
        </p>
        <div>
          <p className="mb-4 text-center font-lato text-sm text-custom-black md:text-xl lg:text-start 2xl:text-2xl">
            {firstDescription}
          </p>
          <p className="text-center font-lato text-sm text-custom-black md:text-xl lg:text-start 2xl:text-2xl">
            {secondDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutLoveLetters;
