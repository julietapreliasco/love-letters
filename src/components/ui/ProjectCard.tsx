'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, MotionValue, useTransform, useScroll } from 'framer-motion';
import { CardType } from '@/contentful/cards';
import { CampaignType } from '@/contentful/campaign';
import { PlaceType } from '@/contentful/places';
import Card from './Card';

interface ProjectCardProps {
  project: CardType;
  index: number;
  innerScale: MotionValue<number>;
  range: [number, number];
  progress: MotionValue<number>;
  targetScale: number;
  places: PlaceType[];
  totalCards: number;
}

export default function ProjectCard({
  project,
  index,
  innerScale,
  range,
  progress,
  targetScale,
  places,
  totalCards,
}: ProjectCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const [campaign, setCampaign] = useState<CampaignType | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const projectScale = useTransform(progress, range, [1, targetScale]);

  const cardProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const opacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0, 0.3, 1, 1]);

  const blur = useTransform(cardProgress, [0, 0.5, 0.8, 1], [10, 5, 0, 0]);

  const blurFilter = useTransform(blur, (value) => `blur(${value}px)`);

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

  useEffect(() => {
    if (campaign && places.length > 0) {
      const foundPlace = places.find((place) =>
        place.campaigns?.some((c) => c.id === campaign.id)
      );
      setPlaceId(foundPlace ? foundPlace.id : null);
    }
  }, [campaign, places]);

  const topPosition = `calc(5vh + ${index * 2}rem + ${index * 1}vw)`;

  return (
    <motion.div
      ref={container}
      style={{
        scale: projectScale,
        top: topPosition,
        opacity,
        filter: blurFilter,
      }}
      className="relative flex flex-col items-center justify-center rounded-2xl lg:flex-row"
    >
      <motion.div className="relative h-[60vh] w-full xl:h-[70vh]">
        <Image
          src={project.image?.src!}
          alt={project.image?.alt!}
          fill
          sizes=""
          className="rounded-xl object-cover"
        />
      </motion.div>
      <motion.div
        style={{ scale: innerScale }}
        className="absolute opacity-95 lg:right-0 lg:z-10"
      >
        <Card
          buttonLabel="See more"
          linkTo={
            placeId && campaign
              ? `/places/${placeId}?campaignId=${campaign.id}`
              : '#'
          }
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
}
