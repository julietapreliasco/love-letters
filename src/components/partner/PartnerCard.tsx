'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PartnerType } from '@/contentful/partners';

const PartnerCard = ({ partner }: { partner: PartnerType }) => {
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
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {partner.photo && (
            <Image
              src={partner.photo.src}
              alt={partner.photo.alt}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          )}
          <div className="absolute inset-0 rounded-lg bg-black opacity-30"></div>
          <div className="absolute inset-x-0 bottom-10 flex flex-col justify-center rounded-lg p-4 font-futura text-white">
            <h2 className="text-2xl font-bold">{partner.name}</h2>
            {partner.shortDescription && (
              <p className="mt-2 font-lato text-sm">
                {partner.shortDescription}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 overflow-y-auto rounded-lg bg-white p-4 text-black"
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
        >
          <h2 className="mb-2 text-2xl font-bold">{partner.name}</h2>
          <p className="text-sm">{partner.description}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PartnerCard;
