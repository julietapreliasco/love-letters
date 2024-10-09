import Image from 'next/image';
import { PartnerType } from '@/contentful/partners';
import Link from 'next/link';

interface PartnerSectionProps {
  partners: PartnerType[];
}

const PartnerSection = ({ partners }: PartnerSectionProps) => {
  if (!partners || partners.length === 0) return null;

  const uniquePartners = partners.filter(
    (partner, index, self) =>
      index === self.findIndex((t) => t.id === partner.id)
  );

  return (
    <div className="mt-10 flex w-fit gap-4">
      <div className="flex flex-wrap justify-around gap-6">
        {uniquePartners.map((partner) => (
          <div key={partner.id} className="mb-8 flex flex-col items-center">
            <Link
              href={`/partners/#${partner.id}`}
              className="group relative h-16 w-16 overflow-hidden rounded-full drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 sm:h-20 sm:w-20"
            >
              {partner.photo && (
                <Image
                  src={partner.photo.src}
                  alt={partner.name}
                  fill
                  sizes=""
                  className="object-cover"
                />
              )}
            </Link>
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
