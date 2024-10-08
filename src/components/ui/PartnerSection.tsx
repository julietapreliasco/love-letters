import Image from 'next/image';
import { PartnerType } from '@/contentful/partners';
import Link from 'next/link';

interface PartnerSectionProps {
  partners: PartnerType[];
}

export default function PartnerSection({ partners }: PartnerSectionProps) {
  if (!partners || partners.length === 0) return null;

  const uniquePartners = partners.filter(
    (partner, index, self) =>
      index === self.findIndex((t) => t.id === partner.id)
  );

  return (
    <div className="w-fit rounded-xl border-2 border-custom-gray p-5 drop-shadow md:px-10">
      <h4 className="mb-8 font-futura text-lg tracking-wider md:text-xl">
        {partners.length > 1 ? 'Partners:' : 'Partner:'}
      </h4>
      <div className="flex flex-wrap justify-around md:gap-5">
        {uniquePartners.map((partner) => (
          <div
            key={partner.id}
            className="mb-8 flex flex-col items-center px-4"
          >
            <Link
              href={`/partners/#${partner.id}`}
              className="group relative h-20 w-20 overflow-hidden rounded-full drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 sm:h-28 sm:w-28"
            >
              {partner.photo && (
                <Image
                  src={partner.photo.src}
                  alt={partner.name}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </Link>
            <p className="mt-4 w-28 text-center font-lato text-xs font-bold md:text-sm">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
