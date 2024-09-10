'use client';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AboutMeProps {
  data: PageType;
}

const AboutMe = ({ data }: AboutMeProps) => {
  const { description, bannerTitle, bannerImg } = data;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p key={node.data?.target?.sys?.id || Math.random()} className="mb-4 font-lato lg:text-xl xl:text-2xl">
          {children}
        </p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        const imageUrl = 'https:' + file.url;
        return (
          <img
            key={file.url}
            src={imageUrl}
            width={file.details.image.width}
            height={file.details.image.height}
            alt={title || ''}
            className="max-h-[500px] w-full object-cover object-top md:max-h-[437px] md:min-w-[40vw]"
          />
        );
      },
    },
  };

  const contentComponents = documentToReactComponents(description!, renderOptions);
  const contentArray = Array.isArray(contentComponents) ? contentComponents : [contentComponents];

  const groupedContent: JSX.Element[] = [];
  let i = 0;
  while (i <= contentArray.length) {
    const currentImage = contentArray[i]?.type === 'img' ? contentArray[i] : null;
    const nextParagraphs = contentArray.slice(i + 1, i + 3).filter(item => item.type === 'p');

    if (currentImage && nextParagraphs.length === 2) {
      const isOdd = groupedContent.length % 2 === 0;
      groupedContent.push(
        <div
          key={i}
          className={`flex flex-col gap-5 md:flex-row md:justify-between ${!isOdd ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="self-center">{currentImage}</div>
          <div className={`py-5 md:max-w-[50%] ${isOdd ? 'md:ml-10' : 'md:mr-10'}`}>
            {nextParagraphs}
          </div>
        </div>
      );
      i += 3
    } else {
      i++;
    }
  }

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.3]);

  return (
    <div className="flex flex-col bg-custom-lighter-gray">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-custom-gray md:h-screen md:flex-row">
        {bannerImg && (
          <motion.div className="z-0 flex items-center justify-center pt-20 md:w-[60%] md:pt-10" style={{ scale }}>
            <Image
              src={bannerImg.src}
              alt="Love Letters Home Banner"
              width={bannerImg.width}
              height={bannerImg.height}
              className="z-0 w-[85%] self-center object-cover shadow-xl md:w-full"
              priority
            />
          </motion.div>
        )}
        <div className="flex w-full p-10 text-center font-playfair-display text-2xl font-semibold tracking-wider text-custom-lighter-gray drop-shadow-2xl md:absolute md:left-10 md:top-[60%] md:max-w-[620px] md:text-start md:text-[46px] md:leading-[48px] md:text-white">
          <span>{bannerTitle}</span>
        </div>
      </div>
      <div className="space-y-10 px-6 py-10 md:px-24 md:py-20">
        {groupedContent}
      </div>
    </div>
  );
};

export default AboutMe;
