'use client';
import { LandingSectionType } from '@/contentful/landingSections';
import Button from '../ui/Button';
import { CardType } from '@/contentful/cards';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';

interface ProjectsSectionClientProps {
  projectData: LandingSectionType;
}

const ProjectsSection = ({ projectData }: ProjectsSectionClientProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const projectCards = projectData.cards;

  const innerScale = useTransform(scrollYProgress, [0, 1], [0.8, 0.75]);
  const headerOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0.8, 1], [0, -50], {
    clamp: false,
  });

  const roundedTranslateY = useTransform(headerTranslateY, (value) =>
    Math.round(value)
  );

  return (
    <section ref={container}>
      <motion.div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${roundedTranslateY}px)`,
        }}
        className="sticky top-7 z-10 mt-[80px] flex h-auto flex-row justify-between md:mx-[60px]"
      >
        <div className="flex w-full justify-center lg:pb-6">
          <h2 className="font-futura text-3xl tracking-wider text-custom-black md:text-4xl xl:text-5xl 2xl:text-6xl">
            {projectData.title}
          </h2>
        </div>
      </motion.div>
      <div className="flex w-full flex-col items-center">
        <div className="relative w-[85%]">
          {projectCards &&
            projectCards.map((project: CardType, index) => {
              const targetScale = 1 - (projectCards.length - index) * 0.05;
              return (
                <div
                  key={index}
                  className="sticky top-16 mb-36 lg:top-20 lg:mb-28"
                >
                  <ProjectCard
                    innerScale={innerScale}
                    project={project}
                    index={index}
                    range={[index * 0.25, 1]}
                    progress={scrollYProgress}
                    targetScale={targetScale}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex justify-center">
        <Button linkTo="/campaigns" variant="SECONDARY" label={'See all'} />
      </div>
    </section>
  );
};

export default ProjectsSection;
