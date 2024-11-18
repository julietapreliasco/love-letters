import Button from '@/components/ui/Button';
import { fetchPageByName } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const Places = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'Coming next',
  });

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
        <p className="mb-4 text-justify">{children}</p>
      ),
    },
  };

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-28 md:py-[150px] xl:px-[160px]">
      <h2 className="text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        {page?.bannerTitle}
      </h2>
      {page?.richText && (
        <div className="font-lato xl:text-lg xl:leading-normal">
          {documentToReactComponents(page.richText, options)}
        </div>
      )}
      <Button
        className="md:self-start"
        label="donate"
        linkTo="https://buy.stripe.com/28o14adWR9BX5Lq5kl"
      />
      {page?.richTextTwo && (
        <div className="text-justify font-lato text-sm leading-normal md:self-start xl:text-base xl:leading-normal">
          {documentToReactComponents(page.richTextTwo, options)}
        </div>
      )}
    </div>
  );
};

export default Places;
