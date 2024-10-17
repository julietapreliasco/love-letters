import { fetchCampaigns } from '@/contentful/campaign';
import { fetchPlaces } from '@/contentful/places';
import ContactUsCard from '@/components/ui/ContactUsCard';
import FlipCard from '@/components/ui/FlipCard';
import { fetchPages } from '@/contentful/pages';

const Partners = async () => {
  const allCampaigns = await fetchCampaigns({ preview: false });
  const allPlaces = await fetchPlaces({ preview: false });
  const partnersPage = (await fetchPages({ preview: false })).filter(
    (page) => page.bannerTitle === 'Partners'
  );
  const partners = partnersPage[0].partners;

  const partnersWithCampaigns =
    partners &&
    (await Promise.all(
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
    ));

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-28 md:py-[150px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        {partnersPage[0].bannerTitle}
      </h2>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:gap-10">
        {partnersWithCampaigns?.map((partner) => (
          <FlipCard
            key={partner.id}
            partner={partner}
            relatedCampaigns={partner.relatedCampaigns}
          />
        ))}
      </div>
      <ContactUsCard />
    </div>
  );
};

export default Partners;
