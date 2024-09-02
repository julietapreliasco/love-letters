import { LandingSectionType } from '@/contentful/landingSections';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { CardType, fetchCards } from '@/contentful/cards';

interface ProjectsSectionClientProps {
  projectData: LandingSectionType;
}

const ProjectsSection: React.FC<ProjectsSectionClientProps> = async ({
  projectData,
}) => {
  const projectCards = projectData.cards;

  return (
    <section>
      <div className="mx-[20px] mb-[20px] mt-[80px] flex h-auto flex-row justify-between md:mx-[60px] md:mb-[40px]">
        <h1 className="font-playfair-display text-[32px] font-bold md:text-[64px]">
          {projectData.title}
        </h1>
        <div className="flex items-center">
          <div className="block md:hidden">
            <Button variant="SECONDARY" label={'View all '} />
          </div>
          <div className="hidden md:block">
            <Button variant="SECONDARY" label={'Check our projects'} />
          </div>
        </div>
      </div>
      <ul>
        {projectCards &&
          projectCards.map((project: CardType, index) => (
            <li key={index} className="relative">
              <div
                className="sticky top-0 z-10 h-[110vh] bg-black"
                style={{
                  backgroundImage: `url(${project?.image?.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                }}
              >
                <div className="absolute right-0 top-1/4 m-6">
                  <Card
                    buttonLabel="about me"
                    card={{
                      title: project.title,
                      description: project.description,
                      section: project.section,
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
