import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface FinalTextProps {
  finalText: any;
}

const FinalText = ({ finalText }: FinalTextProps) => {
  let paragraphIndex = 0;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        paragraphIndex++;
        return (
          <p key={paragraphIndex} className="mb-4 leading-6">
            {children}
          </p>
        );
      },

      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3
          key={paragraphIndex}
          className="font mb-6 text-center font-playfair-display text-2xl font-semibold tracking-widest"
        >
          {children}
        </h3>
      ),
    },
  };

  return (
    <div className="mt-10">
      {documentToReactComponents(finalText, renderOptions)}
    </div>
  );
};

export default FinalText;
