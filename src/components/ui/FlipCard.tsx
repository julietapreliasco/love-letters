'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PartnerType } from '@/contentful/partners';
import { CampaignType } from '@/contentful/campaign';
import { CardType } from '@/contentful/cards';

interface CampaignWithPlace extends CampaignType {
  placeId?: string;
}

interface PartnerCardProps {
  partner?: PartnerType;
  pressCard?: CardType;
  relatedCampaigns?: CampaignWithPlace[];
  isPlacePage?: boolean;
}

export default function FlipCard({
  partner,
  relatedCampaigns,
  pressCard,
  isPlacePage = false,
}: PartnerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardHeight = isPlacePage
    ? 'h-[150px] md:h-[200px]'
    : pressCard
      ? 'h-[250px] md:h-[350px]'
      : 'h-[350px] sm:h-[400px] md:h-[450px] lg:h-[450px]';

  const handleMouseEnter = () => !isMobile && setIsFlipped(true);
  const handleMouseLeave = () => !isMobile && setIsFlipped(false);
  const handleClick = () => isMobile && setIsFlipped(!isFlipped);

  return (
    <div
      className={`relative ${cardHeight} mb-4 w-full [perspective:1000px]`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      id={partner ? partner.id : undefined}
    >
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className={`backface-hidden absolute inset-0 rounded-lg ${pressCard ? 'border-2 border-custom-black' : ''}`}
          style={{
            backfaceVisibility: 'hidden',
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
        >
          {pressCard
            ? pressCard.logo && (
                <div className="flex h-full items-center justify-center p-4">
                  <Image
                    src={pressCard.logo.src}
                    alt={pressCard.logo.alt}
                    width={150}
                    height={150}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )
            : partner?.photo && (
                <Image
                  src={partner.photo.src}
                  alt={partner.photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                />
              )}
          {!isPlacePage && partner && (
            <div className="absolute inset-0 rounded-lg bg-custom-black opacity-50"></div>
          )}
          {!isPlacePage && !pressCard && (
            <div className="absolute inset-x-0 bottom-10 flex flex-col justify-center gap-2 rounded-lg p-5 text-white md:p-10">
              <h2 className="font-futura text-xl font-bold tracking-wider md:text-3xl">
                {partner && partner?.name}
              </h2>
              {partner && partner?.shortDescription && (
                <p className="font-lato">{partner.shortDescription}</p>
              )}
            </div>
          )}
        </div>

        {/* Back face */}
        <div
          className={`backface-hidden absolute inset-0 rounded-lg ${pressCard ? 'border-2 border-custom-black' : 'bg-custom-lighter-gray'}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            zIndex: isFlipped ? 1 : 0,
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
        >
          {pressCard ? (
            <div className="relative flex h-full w-full items-center justify-center p-10">
              {pressCard.image && (
                <Image
                  src={pressCard.image.src}
                  alt={pressCard.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-md object-cover"
                />
              )}
              <div className="absolute inset-0 rounded-md bg-custom-black opacity-40"></div>
              <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center text-white">
                <p className="mb-4 font-lato text-base font-semibold leading-normal tracking-wide [text-shadow:_0_2px_0_rgb(0_0_0_/_20%)] md:text-lg md:leading-normal lg:text-xl lg:leading-normal">
                  {pressCard.subtitle}
                </p>
                <Link
                  href={pressCard.url!}
                  className="font-bold underline underline-offset-2 [text-shadow:_0_2px_0_rgb(0_0_0_/_20%)] hover:text-custom-yellow"
                  target="_blank"
                >
                  See more
                </Link>
              </div>
            </div>
          ) : (
            <div
              className={`h-full w-full ${
                isPlacePage
                  ? 'flex items-center justify-center'
                  : 'flex flex-col gap-3 overflow-y-auto'
              } p-6 text-custom-black ${!isPlacePage && 'md:gap-5 md:p-8 lg:p-10'}`}
            >
              {isPlacePage ? (
                <Link href={`/partners/#${partner?.id}`}>
                  <h2 className="text-center font-futura text-xs font-bold tracking-wide hover:text-custom-yellow md:text-[14px] lg:text-lg">
                    {partner?.name}
                  </h2>
                </Link>
              ) : (
                <>
                  <h2
                    className={`font-futura text-xl font-bold tracking-wide md:text-2xl lg:text-3xl`}
                  >
                    {partner?.name}
                  </h2>
                  <p className={`font-lato text-sm md:text-base lg:text-lg`}>
                    {partner?.description}
                  </p>
                  {partner &&
                    relatedCampaigns &&
                    relatedCampaigns.length > 0 && (
                      <div className="flex flex-col gap-3 md:gap-5">
                        <ul>
                          {relatedCampaigns.map((campaign) => (
                            <li key={campaign.id}>
                              {campaign.placeId && (
                                <Link
                                  href={`/places/${campaign.placeId}?campaignId=${campaign.id}`}
                                  className="font-lato font-bold text-custom-black hover:text-custom-yellow"
                                >
                                  {'See the campaign'}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
