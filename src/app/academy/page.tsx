import Campaign from '@/components/campaign/Campaign';
import ContactUsCard from '@/components/ui/ContactUsCard';
import { fetchPages } from '@/contentful/pages';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';

const Academy = async () => {
  const academyPage = (await fetchPages({ preview: false })).filter(
    (page) => page.page === 'Love letters academy'
  )[0];

  const { bannerTitle, description, campaigns } = academyPage;

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (
        _node: Block | Inline,
        children: React.ReactNode
      ) => <p className="mb-6">{children}</p>,
    },
  };

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-20 sm:px-12 md:py-[120px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        {bannerTitle}
      </h2>
      {description && (
        <div className="text-justify font-lato leading-normal md:text-xl md:leading-normal">
          {documentToReactComponents(description, options)}
        </div>
      )}
      {campaigns && (
        <div className="flex flex-col gap-16 pb-5 pt-5 md:gap-24 md:pb-16 md:pt-12">
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
