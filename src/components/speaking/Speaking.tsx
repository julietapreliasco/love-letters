'use client';

import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import PageBanner from '../ui/PageBanner';
import Workshops from './Workshops';
import { SlLocationPin } from 'react-icons/sl';

import VideoPlayer from '../ui/VideoPlayer';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { AnimatedCard } from './AnimatedCard';

interface SpeakingProps {
  data: PageType;
}

export default function Speaking({ data }: SpeakingProps) {
  const {
    richTextThree,
    bannerTitle,
    bannerImg,
    bannerSubtitle,
    videos,
    cards,
    title,
    richText,
  } = data;

  const contentRef = useRef(null);
  const contentIsInView = useInView(contentRef);
  const contentControls = useAnimation();

  useEffect(() => {
    if (contentIsInView) {
      contentControls.start('visible');
    }
  }, [contentIsInView, contentControls]);

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        if (children) {
          const [quote, author] = children.toString().split('-');
          const index =
            (renderOptions.renderNode[BLOCKS.PARAGRAPH] as any).index || 0;
          (renderOptions.renderNode[BLOCKS.PARAGRAPH] as any).index = index + 1;
          const alignmentClass =
            index % 2 === 0
              ? 'items-center sm:items-start'
              : 'items-center sm:items-end';

          return (
            <blockquote
              className={`my-6 flex flex-col ${alignmentClass} font-futura text-2xl`}
            >
              <div className="md:w-1/2">
                <p className="mb-4 text-lg italic tracking-wider lg:text-xl">
                  {quote.trim()}
                </p>
                {author && (
                  <span className="block text-base not-italic">
                    - {author.trim()}
                  </span>
                )}
              </div>
            </blockquote>
          );
        }
      },
    },
  };

  const contentComponents = documentToReactComponents(
    richTextThree!,
    renderOptions
  );

  const contentArray = Array.isArray(contentComponents)
    ? contentComponents
    : [contentComponents];

  return (
    <section>
      <PageBanner
        bannerImg={bannerImg!}
        bannerTitle={bannerTitle!}
        subtitle={bannerSubtitle!}
      />
      <div className="flex flex-col items-center px-6 py-10 md:px-16 xl:px-28">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <SlLocationPin color="#F3C937" size={40} className="m-6" />
        </motion.div>
        <h1 className="mb-5 text-center font-futura text-2xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
          {title}
        </h1>
        <div className="text-center font-futura text-xl">
          {richText && documentToReactComponents(richText)}
        </div>
        <Workshops />
      </div>
      <div className="bg-custom-lighter-gray px-6 pb-16 pt-10 md:px-16 xl:px-28">
        <h2 className="pb-5 text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:text-3xl md:leading-normal lg:pb-10 lg:text-4xl lg:leading-normal">
          TWO-TIME <span className="text-red-600">Tedx</span> Speaker
        </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          {videos &&
            videos.map((video) => (
              <div key={video.videoUrl} className="w-full md:w-1/2">
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  thumbnail={video.thumbnail}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="px-6 py-10 md:px-16 lg:py-20 xl:px-28">
        <h2 className="pb-10 text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
          Speaking topics
        </h2>
        <div className="flex flex-col items-center gap-6">
          {cards &&
            cards.map((card, index) => (
              <AnimatedCard key={index} card={card} />
            ))}
        </div>
      </div>

      <div className="px-6 pb-16 pt-10 md:px-16 xl:px-28">
        <div className="mx-auto" ref={contentRef}>
          <h2 className="mb-8 text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:pb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
            Testimonials
          </h2>
          {contentArray.map((component, index) => {
            const alignmentClass =
              index % 2 === 0
                ? 'text-center sm:text-left'
                : 'text-center sm:text-right self-end';
            return (
              <motion.div
                key={index}
                className={`${alignmentClass} px-10 py-2 md:px-20`}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={contentControls}
                transition={{
                  duration: 1,
                  delay: index * 0.5,
                  ease: 'easeOut',
                }}
              >
                {component}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
