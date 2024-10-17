'use client';

import Image from 'next/image';
import { PartnerType } from '@/contentful/partners';
import Link from 'next/link';
import FlipCard from './FlipCard';
import { div } from 'framer-motion/client';

interface PartnerSectionProps {
  partners: PartnerType[];
  isPlacePage?: boolean;
  isAcademy?: boolean;
}

const PartnerSection = ({
  partners,
  isPlacePage = false,
  isAcademy,
}: PartnerSectionProps) => {
  if (!partners || partners.length === 0) return null;

  const uniquePartners = partners.filter(
    (partner, index, self) =>
      index === self.findIndex((t) => t.id === partner.id)
  );

  if (isPlacePage) {
    return (
      <div className="mx-auto w-full pb-5">
        <h3 className="mb-10 font-futura text-base tracking-widest md:text-xl">
          Partners that supported these campaigns:
        </h3>
        <div className="flex w-full">
          <div className={`grid w-full grid-cols-2 gap-6 md:grid-cols-4`}>
            {uniquePartners.map((partner) => (
              <div key={partner.id}>
                <FlipCard partner={partner} isPlacePage={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex w-fit gap-4">
      <div className="flex flex-wrap justify-around gap-6">
        {uniquePartners.map((partner) => (
          <div key={partner.id} className="mb-8 flex flex-col items-center">
            {isAcademy ? (
              <div className="group relative h-16 w-16 overflow-hidden rounded-full drop-shadow-xl sm:h-20 sm:w-20">
                {partner.photo && (
                  <Image
                    src={partner.photo.src}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
            ) : (
              <Link
                href={`/partners/#${partner.id}`}
                className="group relative h-16 w-16 overflow-hidden rounded-full drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 sm:h-20 sm:w-20"
              >
                {partner.photo && (
                  <Image
                    src={partner.photo.src}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </Link>
            )}
            <p className="mt-4 w-32 text-center font-futura text-xs tracking-wider text-custom-black md:text-sm">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerSection;
