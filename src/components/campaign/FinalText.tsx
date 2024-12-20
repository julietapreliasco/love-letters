import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Button from '@/components/ui/Button';

interface FinalTextProps {
  finalText: Document;
  imageCaption?: string;
}

const FinalText = ({ finalText, imageCaption }: FinalTextProps) => {
  let paragraphIndex = 0;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        paragraphIndex++;
        return (
          <p className="py-4 text-justify text-base 2xl:text-xl">{children}</p>
        );
      },
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
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        return (
          <div className="my-4 flex justify-center">
            <Button
              label={children as string}
              linkTo={node.data.uri}
              variant="SECONDARY"
              className="inline-block"
              openInNewTab={true}
            />
          </div>
        );
      },
    },
  };

  return (
    <div className="mt-10">
      {documentToReactComponents(finalText, renderOptions)}
    </div>
  );
};

export default FinalText;
