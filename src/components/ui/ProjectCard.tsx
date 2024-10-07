'use client';

import { CardType } from '@/contentful/cards';
import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Card from './Card';
import { useRef, useState, useEffect } from 'react';
import { CampaignType } from '@/contentful/campaign';
import { PlaceType } from '@/contentful/places';

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

  const projectScale = useTransform(progress, range, [1, targetScale]);

  const cardProgress = useTransform(
    progress,
    [index / totalCards, (index + 1) / totalCards],
    [0, 1]
  );

  const blurAmount = useTransform(cardProgress, (value) => {
    if (index === totalCards - 1) return 0;
    return value > 0.7 ? (value - 0.9) * (3 / 0.3) : 0;
  });

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
        filter: useTransform(blurAmount, (value) => `blur(${value}px)`),
      }}
      className={`relative flex max-h-[70vh] flex-col items-center justify-center rounded-2xl md:max-h-[80vh] lg:max-h-[90vh] lg:flex-row`}
    >
      <motion.div className="relative h-screen w-full md:h-[850px] lg:h-[850px] xl:h-[500px]">
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
