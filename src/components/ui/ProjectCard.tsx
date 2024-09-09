'use client';
import { CardType } from '@/contentful/cards';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Card from './Card';
import { useRef } from 'react';

interface ProjectCardProps {
  project: CardType;
  index: number;
  innerScale: MotionValue<number>;
  range: [number, number];
  progress: MotionValue<number>;
  targetScale: number;
}

const ProjectCard = ({
  project,
  index,
  innerScale,
  range,
  progress,
  targetScale,
}: ProjectCardProps) => {
  const container = useRef<HTMLDivElement>(null);

  const projectScale = useTransform(progress, range, [1, targetScale]);

  return (
    <motion.div
      style={{
        scale: projectScale,
        top: `calc(5vh + ${index * 25}px)`,
      }}
      ref={container}
      className={`relative flex max-h-[450px] flex-col items-center justify-center rounded-2xl lg:max-h-[450px] lg:flex-row`}
    >
      <motion.div className="relative h-screen w-full lg:h-[450px] lg:w-screen">
        <Image
          src={project.image?.src!}
          alt={project.image?.alt!}
          fill
          className="rounded-xl object-cover"
        />
      </motion.div>
      <motion.div
        style={{ scale: innerScale }}
        className="absolute opacity-95 lg:right-0 lg:top-[20%] lg:z-10"
      >
        <Card
          buttonLabel="See more"
          card={{
            title: project.title,
            description: project.description,
            section: project.section,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
