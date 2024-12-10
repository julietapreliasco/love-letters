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

  const { bannerTitle, richText, campaigns } = academyPage;

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (
        _node: Block | Inline,
        children: React.ReactNode
      ) => <p className="mb-6">{children}</p>,
    },
  };

  return (
    <div className="flex flex-col items-center px-8 py-28 md:py-[150px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        {bannerTitle}
      </h2>
      {richText && (
        <div className="text-justify font-lato leading-normal md:text-xl md:leading-normal">
          {documentToReactComponents(richText, options)}
        </div>
      )}
      {campaigns && (
        <div className="flex flex-col">
          {campaigns.map((campaign) => {
            return <Campaign isAcademy key={campaign.id} data={campaign} />;
          })}
        </div>
      )}
      <div className="mt-14">
        <ContactUsCard
          customTitle="Interested in getting involved?"
          customDescription="Please send a message and we’d be most happy to connect you."
          customLabel="Contact Us Here"
        />
      </div>
    </div>
  );
};

export default Academy;
