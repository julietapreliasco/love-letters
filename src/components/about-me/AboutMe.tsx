'use client';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import LottieAnimation from '../ui/LottieAnimation';
import animationData from '../../../public/about-us-animation.json';
import { useState } from 'react';

interface AboutMeProps {
  data: PageType;
}

const AboutMe = ({ data }: AboutMeProps) => {
  const { description, bannerTitle, bannerImg } = data;
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
        const imageUrl = 'https:' + file.url;

        const isOdd = assetIndex % 2 === 0;
        const currentAssetIndex = assetIndex;
        assetIndex += 1;

        const isHovered = hoveredIndices.includes(currentAssetIndex);

        return (
          <div
            onMouseEnter={() => handleMouseEnter(currentAssetIndex)}
            onMouseLeave={() => handleMouseLeave(currentAssetIndex)}
            className={`relative flex h-[300px] w-[300px] items-center justify-center md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <LottieAnimation
                autoplay={false}
                hover={isHovered}
                animationData={animationData}
              />
            </div>

            <div className="relative flex h-[60%] w-[60%] items-center justify-center">
              <img
                key={file.url}
                src={imageUrl}
                alt={title || ''}
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        );
      },
    },
  };

  const contentComponents = documentToReactComponents(
    description!,
    renderOptions
  );
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
        <div
          key={i}
          className={`flex flex-col md:flex-row ${
            !isOdd
              ? 'md:ml-10 md:flex-row-reverse lg:ml-20'
              : 'md:mr-10 lg:mr-20'
          } `}
        >
          <div className="flex flex-1 items-center justify-center">
            {currentImage}
          </div>
          <div className="flex flex-1 items-center justify-center px-10 sm:px-20 md:p-0">
            <div className="flex flex-col gap-4">{nextParagraphs}</div>
          </div>
        </div>
      );
      i += 3;
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
          <motion.div
            className="z-0 flex items-center justify-center pt-20 md:w-[60%] md:pt-10"
            style={{ scale }}
          >
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
      <div className="px-6 py-10 lg:px-16 lg:py-10">{groupedContent}</div>
    </div>
  );
};

export default AboutMe;
