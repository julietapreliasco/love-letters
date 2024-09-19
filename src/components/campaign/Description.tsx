import { BLOCKS, Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface DescriptionProps {
  description: Document;
  imageCaption?: string;
}

const Description = ({ description, imageCaption }: DescriptionProps) => {
  let paragraphIndex = 0;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        paragraphIndex++;

        return (
          <p
            key={paragraphIndex}
            className="py-4 text-justify text-base 2xl:text-xl"
          >
            {children}
          </p>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <div className="my-10 border-y border-custom-black p-5">
          <h3
            key={paragraphIndex}
            className="font text-center font-playfair-display text-2xl font-medium"
          >
            {children}
          </h3>
        </div>
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        const imageUrl = file.url.startsWith('//')
          ? `https:${file.url}`
          : file.url;
        return (
          <div className="my-8 flex flex-col justify-center">
            <Image
              src={imageUrl}
              alt={title || 'Embedded Image'}
              width={file.details.image.width}
              height={file.details.image.height}
              className="w-full shadow-lg"
            />
            {imageCaption && (
              <p className="pt-3 text-center text-sm italic lg:text-base">
                {imageCaption}
              </p>
            )}
          </div>
        );
      },
    },
  };

  return <div>{documentToReactComponents(description, renderOptions)}</div>;
};

export default Description;
