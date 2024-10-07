import PartnerCard from '@/components/partner/PartnerCard';
import { fetchPartners } from '@/contentful/partners';
import { fetchCampaigns } from '@/contentful/campaign';
import { fetchPlaces } from '@/contentful/places';
import ContactUsCard from '@/components/ui/ContactUsCard';

const Partners = async () => {
  const partners = await fetchPartners({ preview: false });
  const allCampaigns = await fetchCampaigns({ preview: false });
  const allPlaces = await fetchPlaces({ preview: false });

  const partnersWithCampaigns = await Promise.all(
    partners.map(async (partner) => {
      const filteredCampaigns = allCampaigns.filter((campaign) =>
        campaign.partner?.some((p) => p.id === partner.id)
      );

      const campaignsWithPlace = filteredCampaigns.map((campaign) => {
        const place = allPlaces.find((place) =>
          place.campaigns?.some((c) => c.id === campaign.id)
        );
        return { ...campaign, placeId: place?.id };
      });

      return {
        ...partner,
        relatedCampaigns: campaignsWithPlace,
      };
    })
  );

  return (
    <div className="flex flex-col gap-10 px-6 py-20 sm:px-10 md:px-20 md:py-[120px] lg:px-32 xl:px-56 2xl:px-96">
      <h2 className="mb-2 self-center font-futura text-3xl tracking-wider 2xl:text-6xl">
        Partners
      </h2>
      {partnersWithCampaigns.map((partner) => (
        <PartnerCard
          key={partner.id}
          partner={partner}
          relatedCampaigns={partner.relatedCampaigns}
        />
      ))}
      <ContactUsCard />
    </div>
  );
};

export default Partners;
