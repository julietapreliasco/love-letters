import Campaign from '@/components/campaign/Campaign';
import ContactUsCard from '@/components/ui/ContactUsCard';
import { fetchPages } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Academy = async () => {
  const academyPage = (await fetchPages({ preview: false })).filter(
    (page) => page.page === 'Love letters academy'
  )[0];

  const { bannerTitle, description, campaigns } = academyPage;

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-20 sm:px-12 md:py-[120px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        {bannerTitle}
      </h2>
      {description && (
        <div className="font-lato text-xl leading-normal">
          {documentToReactComponents(description)}
        </div>
      )}
      {campaigns && (
        <div>
          {campaigns.map((campaign) => {
            return <Campaign isAcademy key={campaign.id} data={campaign} />;
          })}
        </div>
      )}
      <ContactUsCard
        customTitle="Interested in getting involved?"
        customDescription="Please send a message and we’d be most happy to connect you."
        customLabel="Get in touch"
      />
    </div>
  );
};

export default Academy;
