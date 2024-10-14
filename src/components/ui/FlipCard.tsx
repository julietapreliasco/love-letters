'use client';

import Image from 'next/image';
import { useState } from 'react';
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

const FlipCard = ({
  partner,
  relatedCampaigns,
  pressCard,
  isPlacePage = false,
}: PartnerCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardHeight = isPlacePage
    ? 'h-[150px] md:h-[200px]'
    : pressCard
      ? 'h-[250px] md:h-[350px]'
      : 'h-[350px] sm:h-[400px] md:h-[450px] lg:h-[450px]';

  return (
    <div
      className={`relative ${cardHeight} mb-4 w-full [perspective:1000px]`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={`relative h-full w-full rounded-lg border-2 border-custom-lighter-gray bg-custom-lighter-gray`}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          id={partner?.id}
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {pressCard
            ? pressCard.logo && (
                <Image
                  src={pressCard.logo.src}
                  alt={pressCard.logo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-contain p-4"
                />
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
          {!isPlacePage && (
            <div className="absolute inset-x-0 bottom-10 flex flex-col justify-center gap-2 rounded-lg p-5 text-white md:p-10">
              <h2 className="font-futura text-xl font-bold tracking-wider md:text-3xl">
                {partner && partner?.name}
              </h2>
              {partner && partner?.shortDescription && (
                <p className="font-lato">{partner.shortDescription}</p>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          className={`absolute inset-0 flex flex-col ${
            isPlacePage
              ? 'items-center justify-center'
              : 'gap-3 overflow-y-auto'
          } rounded-lg bg-custom-lighter-gray p-6 text-custom-black ${
            !isPlacePage && 'md:gap-5 md:p-8 lg:p-10'
          }`}
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
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
                {pressCard ? pressCard?.title : partner?.name}
              </h2>
              <p className={`font-lato text-sm md:text-base lg:text-lg`}>
                {pressCard ? pressCard.description : partner?.description}
              </p>
              {pressCard && (
                <Link
                  href={pressCard.url!}
                  className={`text-sm underline`}
                  target="_blank"
                >
                  Read more
                </Link>
              )}
              {partner && relatedCampaigns && relatedCampaigns.length > 0 && (
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
