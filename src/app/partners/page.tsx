import { fetchPartners } from '@/contentful/partners';
import { fetchCampaigns } from '@/contentful/campaign';
import { fetchPlaces } from '@/contentful/places';
import ContactUsCard from '@/components/ui/ContactUsCard';
import PartnerCard from '@/components/partner/PartnerCard';

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
    <div className="flex flex-col gap-14 px-6 py-20 sm:px-10 md:px-20">
      <h2 className="self-center font-futura text-3xl tracking-wider 2xl:text-6xl">
        Partners
      </h2>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {partnersWithCampaigns.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            relatedCampaigns={partner.relatedCampaigns}
          />
        ))}
      </div>
      <div className="self-center xl:w-3/4">
        <ContactUsCard />
      </div>
    </div>
  );
};

export default Partners;
