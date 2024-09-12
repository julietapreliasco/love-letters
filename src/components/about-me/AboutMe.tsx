'use client';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import { motion, useAnimation, useInView, useScroll } from 'framer-motion';
import LottieAnimation from '../ui/LottieAnimation';
import animationData from '../../../public/about-us-animation.json';
import { useEffect, useState, useRef } from 'react';

interface AboutMeProps {
  data: PageType;
}

const AboutMe = ({ data }: AboutMeProps) => {
  const { description, bannerTitle, bannerImg } = data;
  const [hoveredIndices, setHoveredIndices] = useState<number[]>([]);
  const [imageScale, setImageScale] = useState(1.2);
  const [imageOpacity, setImageOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const containerElement = containerRef.current;
      if (containerElement) {
        const containerTop =
          containerElement.getBoundingClientRect().top + window.scrollY;
        const containerBottom = containerTop + containerElement.offsetHeight;

        const isInView =
          scrollPosition >= containerTop && scrollPosition <= containerBottom;

        if (isInView) {
          const scaleValue = 1.2 - (scrollPosition / window.innerHeight) * 0.2;
          setImageScale(Math.max(scaleValue, 1));

          const imageHeight = window.innerHeight;
          const startOpacityChange = imageHeight / 2;

          if (scrollPosition > startOpacityChange) {
            const opacityValue =
              1 - (scrollPosition - startOpacityChange) / (imageHeight / 2);
            setImageOpacity(Math.max(opacityValue, 0));
          } else {
            setImageOpacity(1);
          }
        } else {
          setImageScale(1.2);
          setImageOpacity(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      const contentRef = useRef(null);
      const contentIsInView = useInView(contentRef, { amount: 0.6 });
      const controls = useAnimation();

      useEffect(() => {
        if (contentIsInView) {
          controls.start('visible');
        }
      }, [contentIsInView]);

      groupedContent.push(
        <motion.div
          key={i}
          ref={contentRef}
          variants={{
            hidden: { opacity: 0, translateY: 100 },
            visible: { opacity: 1, translateY: 0 },
          }}
          transition={{
            type: 'spring',
            duration: 0.3,
            damping: 8,
            delay: 0.1,
            stiffness: 60,
          }}
          initial="hidden"
          animate={controls}
          className={`flex flex-col md:flex-row ${
            !isOdd
              ? 'md:flex-row-reverse md:pl-10 lg:pl-20'
              : 'md:pr-10 lg:pr-20'
          }`}
        >
          <div className="flex flex-1 items-center justify-center">
            {currentImage}
          </div>
          <div className="flex flex-1 items-center justify-center px-10 sm:px-20 md:p-0">
            <div className="flex flex-col gap-4">{nextParagraphs}</div>
          </div>
        </motion.div>
      );
      i += 3;
    } else {
      i++;
    }
  }

  return (
    <div className="flex flex-col bg-custom-lighter-gray" ref={containerRef}>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden md:flex-row">
        {bannerImg && (
          <motion.div
            animate={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            initial={{
              scale: 1.2,
              opacity: 1,
            }}
            className="z-0 flex items-center justify-center pt-20"
          >
            <Image
              src={bannerImg.src}
              alt="Love Letters Home Banner"
              width={bannerImg.width}
              height={bannerImg.height}
              className="z-0 h-screen w-full self-center object-cover shadow-xl"
              priority
            />
          </motion.div>
        )}
        <div className="absolute bottom-2 w-full p-10 text-center font-playfair-display text-2xl font-semibold tracking-wider text-custom-lighter-gray drop-shadow-2xl md:left-10 md:top-[60%] md:max-w-[620px] md:text-start md:text-[46px] md:leading-[48px] md:text-white">
          <span>{bannerTitle}</span>
        </div>
      </div>
      <div className="px-6 py-10 lg:px-16 lg:py-10 xl:px-28">
        {groupedContent}
      </div>
    </div>
  );
};

export default AboutMe;
