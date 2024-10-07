import PartnerCard from '@/components/partner/PartnerCard';
import { fetchPartners } from '@/contentful/partners';

const Partners = async () => {
  const partners = await fetchPartners({ preview: false });

  return (
    <div className="flex flex-col gap-10 px-16 py-20 2xl:px-64">
      {partners.map((partner) => (
        <PartnerCard key={partner.id} partner={partner} />
      ))}
    </div>
  );
};

export default Partners;
