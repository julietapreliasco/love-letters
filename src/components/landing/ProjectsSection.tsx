'use client';
import { LandingSectionType } from '@/contentful/landingSections';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { CardType } from '@/contentful/cards';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProjectsSectionClientProps {
  projectData: LandingSectionType;
}

const ProjectsSection: React.FC<ProjectsSectionClientProps> = ({
  projectData,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const projectCards = projectData.cards;

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 0.75]);

  return (
    <section ref={container} style={{ minHeight: '100vh' }}>
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
            <li
              key={index}
              className={`sticky top-28 z-10 m-10 h-[80vh] items-center justify-between overflow-hidden rounded-2xl ${index === 0 || index === 2 ? 'bg-custom-yellow' : 'bg-custom-gray'}`}
            >
              <div className="flex">
                <motion.div className="left-0" style={{ scale: scale }}>
                  <Image
                    src={project.image?.src!}
                    alt={project.image?.alt!}
                    layout="intrinsic"
                    width={2152}
                    height={1536}
                  />
                </motion.div>
                <div className="relative top-20 flex w-full flex-col items-end justify-center p-10">
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
