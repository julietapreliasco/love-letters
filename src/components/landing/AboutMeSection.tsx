import { LandingSectionType } from '@/contentful/landingSections';
import Image from 'next/image';
import Card from '../ui/Card';

interface AboutMeSectionProps {
  aboutMeData: LandingSectionType;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = async ({
  aboutMeData,
}) => {
  const aboutMeCard = aboutMeData.cards ? aboutMeData.cards[0] : null;

  return (
    <section className="relative mb-20 w-full md:h-[80vh]">
      {aboutMeData.backgroundImage?.src && (
        <div className="relative h-[50vh] w-full md:h-[80vh]">
          <Image
            src={aboutMeData.backgroundImage.src}
            alt="About me section img"
            fill
            className="-scale-x-100 transform object-cover object-center md:scale-x-100"
          />
        </div>
      )}
      <div className="flex w-full justify-center md:absolute md:left-0 md:top-1/2 md:block md:-translate-y-1/2 md:pl-[60px]">
        <Card linkTo="/about-me" buttonLabel="about me" card={aboutMeCard!} />
      </div>
    </section>
  );
};

export default AboutMeSection;
