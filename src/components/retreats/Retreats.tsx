'use client';

import VideoPlayer from '@/components/ui/VideoPlayer';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface RetreatsProps {
  data: PageType;
}

const Retreats = ({ data }: RetreatsProps) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
        <p className="mb-4 text-justify">{children}</p>
      ),
    },
  };

  const richTextTwoOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
        <p className="mb-4 text-center">{children}</p>
      ),
    },
  };

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-28 md:py-[150px] xl:px-[160px]">
      <h2 className="text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        {data?.bannerTitle}
      </h2>

      {data?.videos && (
        <VideoPlayer
          videoUrl={data?.videos[0].videoUrl}
          thumbnail={data.videos[0].thumbnail}
        />
      )}
      {data?.richText && (
        <div className="font-lato xl:text-lg xl:leading-normal">
          {documentToReactComponents(data.richText, richTextOptions)}
        </div>
      )}
    </div>
  );
};

export default Retreats;
