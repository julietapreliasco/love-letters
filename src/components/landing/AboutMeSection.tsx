import { fetchCards } from "@/contentful/cards";
import { LandingSectionType } from "@/contentful/landingSections";
import findSection from "@/utils/findSection";
import Image from "next/image";
import Card from "../ui/Card";

interface AboutMeSectionProps {
  aboutMeData: LandingSectionType;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = async ({
  aboutMeData,
}) => {
  const cards = await fetchCards({ preview: false });
  const aboutMeCard = findSection("aboutMe", cards);

  return (
    <section className="relative w-full h-screen">
      {aboutMeData.backgroundImage?.src && (
        <div className="relative w-full h-[50vh] md:h-screen">
          <Image
            src={aboutMeData.backgroundImage.src}
            alt="About me section img"
            fill
            className="object-cover object-center transform -scale-x-100 md:scale-x-100"
          />
        </div>
      )}
      <div className="absolute top-[50vh] left-0 w-full flex justify-center md:block z-10 md:left-0 md:top-1/2 md:-translate-y-1/2 md:pl-[60px]">
        <Card buttonLabel="about me" card={aboutMeCard!} />
      </div>
    </section>
  );
};

export default AboutMeSection;
