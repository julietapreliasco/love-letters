'use client';
import { CardType } from '@/contentful/cards';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Card from './Card';
import { useRef, useState, useEffect } from 'react';
import { CampaignType } from '@/contentful/campaign';

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
  const [campaign, setCampaign] = useState<CampaignType | null>(null);

  const projectScale = useTransform(progress, range, [1, targetScale]);

  useEffect(() => {
    const checkCampaign = async () => {
      if (project?.campaign instanceof Promise) {
        try {
          const resolvedCampaign = await project.campaign;
          setCampaign(resolvedCampaign);
        } catch (error) {
          console.error('Error resolving campaign:', error);
        }
      } else {
        setCampaign(project.campaign);
      }
    };

    checkCampaign();
  }, [project.campaign]);

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
          linkTo={campaign ? `campaigns/${campaign.id}` : '#'}
          card={{
            title: project.title,
            description: project.description,
            section: project.section,
            campaign: campaign,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
