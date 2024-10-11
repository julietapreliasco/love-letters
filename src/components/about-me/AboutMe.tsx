'use client';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import LottieAnimation from '../ui/LottieAnimation';
import animationData from '../../../public/about-us-animation.json';
import { useState } from 'react';
import ContentBlock from './ContentBlock';
import PageBanner from '../ui/PageBanner';
import Image from 'next/image';

interface AboutMeProps {
  data: PageType;
}

const AboutMe = ({ data }: AboutMeProps) => {
  const { richText, bannerTitle, bannerImg } = data;
  const [hoveredIndices, setHoveredIndices] = useState<number[]>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndices((prev) => [...prev, index]);
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndices((prev) => prev.filter((i) => i !== index));
  };

  let assetIndex = 0;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p
          key={node.data?.target?.sys?.id || Math.random()}
          className="text-justify font-lato lg:text-lg xl:text-xl"
        >
          {children}
        </p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        const imageUrl = file.url.startsWith('//')
          ? `https:${file.url}`
          : file.url;
        const currentAssetIndex = assetIndex;
        assetIndex += 1;

        const isHovered = hoveredIndices.includes(currentAssetIndex);

        return (
          <div
            onMouseEnter={() => handleMouseEnter(currentAssetIndex)}
            onMouseLeave={() => handleMouseLeave(currentAssetIndex)}
            className="relative flex h-[300px] w-[300px] items-center justify-center md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <LottieAnimation
                autoplay={false}
                hover={isHovered}
                animationData={animationData}
              />
            </div>

            <div className="relative flex h-[60%] w-[60%] items-center justify-center">
              <Image
                src={imageUrl}
                alt={title || 'Embedded Image'}
                width={file.details.image.width}
                height={file.details.image.height}
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        );
      },
    },
  };

  const contentComponents = documentToReactComponents(richText!, renderOptions);
  const contentArray = Array.isArray(contentComponents)
    ? contentComponents
    : [contentComponents];

  const groupedContent: JSX.Element[] = [];
  let i = 0;
  while (i < contentArray.length) {
    const currentImage =
      contentArray[i]?.type === 'div' ? contentArray[i] : null;
    const nextParagraphs = contentArray
      .slice(i + 1, i + 3)
      .filter((item) => item.type === 'p');

    if (currentImage && nextParagraphs.length === 2) {
      const isOdd = groupedContent.length % 2 === 0;
      groupedContent.push(
        <ContentBlock
          key={i}
          image={currentImage}
          paragraphs={nextParagraphs}
          isOdd={isOdd}
        />
      );
      i += 3;
    } else {
      i++;
    }
  }

  return (
    <div className="flex flex-col">
      <PageBanner bannerImg={bannerImg!} bannerTitle={bannerTitle!} />
      <div className="px-6 py-10 lg:px-16 lg:py-10 xl:px-28">
        {groupedContent}
      </div>
    </div>
  );
};

export default AboutMe;
