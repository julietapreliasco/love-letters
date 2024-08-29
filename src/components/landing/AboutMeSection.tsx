import { fetchCards } from '@/contentful/cards';
import { LandingSectionType } from '@/contentful/landingSections';
import findSection from '@/utils/findSection';
import Image from 'next/image';
import Card from '../ui/Card';

interface AboutMeSectionProps {
  aboutMeData: LandingSectionType;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = async ({
  aboutMeData,
}) => {
  const cards = await fetchCards({ preview: false });
  const aboutMeCard = findSection('aboutMe', cards);

  return (
    <section className="relative h-[80vh] w-full">
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
      <div className="absolute left-0 top-[50vh] z-10 flex w-full justify-center md:left-0 md:top-1/2 md:block md:-translate-y-1/2 md:pl-[60px]">
        <Card buttonLabel="about me" card={aboutMeCard!} />
      </div>
    </section>
  );
};

export default AboutMeSection;
