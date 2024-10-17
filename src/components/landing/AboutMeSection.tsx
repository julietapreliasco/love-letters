import { LandingSectionType } from '@/contentful/landingSections';
import Image from 'next/image';
import Card from '../ui/Card';

interface AboutMeSectionProps {
  aboutMeData: LandingSectionType;
}

const AboutMeSection = async ({ aboutMeData }: AboutMeSectionProps) => {
  const aboutMeCard = aboutMeData.cards ? aboutMeData.cards[0] : null;

  return (
    <section className="relative mb-20 w-full md:h-[80vh] lg:h-[90vh]">
      {aboutMeData.backgroundImage?.src && (
        <div className="relative h-[50vh] w-full md:h-full">
          <Image
            src={aboutMeData.backgroundImage.src}
            alt="About me section img"
            fill
            className="-scale-x-100 transform object-cover object-center lg:scale-x-100"
          />
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center md:absolute md:inset-0 md:flex-row md:items-center md:justify-center lg:justify-start">
        <div className="w-fit md:w-2/3 lg:pl-[60px] xl:w-1/2">
          <Card
            subtitleSize="max-w-[300px] self-center text-base uppercase leading-normal md:text-xl md:leading-normal"
            linkTo="/about-me"
            buttonLabel="about me"
            card={aboutMeCard!}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
