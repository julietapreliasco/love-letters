'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PartnerType } from '@/contentful/partners';
import { CampaignType } from '@/contentful/campaign';

interface CampaignWithPlace extends CampaignType {
  placeId?: string;
}

interface PartnerCardProps {
  partner: PartnerType;
  relatedCampaigns: CampaignWithPlace[];
}

const PartnerCard = ({ partner, relatedCampaigns }: PartnerCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative mb-4 h-[450px] w-full [perspective:1000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          id={partner.id}
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {partner.photo && (
            <Image
              src={partner.photo.src}
              alt={partner.photo.alt}
              fill
              sizes=""
              className="rounded-lg object-cover"
            />
          )}
          <div className="absolute inset-0 rounded-lg bg-custom-black opacity-50"></div>
          <div className="absolute inset-x-0 bottom-10 flex flex-col justify-center gap-2 rounded-lg p-5 text-white md:p-10">
            <h2 className="font-futura text-xl font-bold tracking-wider md:text-3xl">
              {partner.name}
            </h2>
            {partner.shortDescription && (
              <p className="font-lato">{partner.shortDescription}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col gap-3 overflow-y-auto rounded-lg bg-custom-lighter-gray p-5 text-custom-black md:gap-5 md:p-10"
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
        >
          <h2 className="font-futura text-xl font-bold tracking-wide md:text-3xl">
            {partner.name}
          </h2>
          <p className="mb-3 font-lato text-sm md:mb-5 md:text-base">
            {partner.description}
          </p>
          {relatedCampaigns.length > 0 && (
            <div className="flex flex-col gap-3 md:gap-5">
              <h3 className="font-futura font-bold md:text-xl">
                Related Campaigns
              </h3>
              <ul>
                {relatedCampaigns.map((campaign) => (
                  <li key={campaign.id}>
                    {campaign.placeId && (
                      <Link
                        href={`/places/${campaign.placeId}?campaignId=${campaign.id}`}
                        className="font-lato text-custom-black hover:text-custom-yellow"
                      >
                        {campaign.bannerTitle ||
                          campaign.subtitle ||
                          'Campaign'}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PartnerCard;
