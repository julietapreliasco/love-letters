'use client';

import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PageBanner from '../ui/PageBanner';
import Workshops from './Workshops';
import { SlLocationPin } from 'react-icons/sl';
import VideoPlayer from '../ui/VideoPlayer';
import { motion } from 'framer-motion';
import { AnimatedCard } from './AnimatedCard';
import ContactUsCard from '../ui/ContactUsCard';
import QuotesBlock, { renderOptions } from './QuotesBlock';

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

  const contentComponents = documentToReactComponents(
    richTextThree!,
    renderOptions
  );
  const contentArray = Array.isArray(contentComponents)
    ? contentComponents
    : [contentComponents];

  const groupedContent: JSX.Element[] = [];
  let i = 0;
  while (i < contentArray.length) {
    const currentQuote = contentArray[i];
    const nextImage = contentArray[i + 1];

    if (currentQuote && nextImage) {
      const isOdd = groupedContent.length % 2 === 0;
      groupedContent.push(
        <QuotesBlock
          key={i}
          quote={currentQuote}
          image={nextImage}
          isOdd={isOdd}
        />
      );
      i += 2;
    } else {
      i++;
    }
  }

  return (
    <section className="overflow-hidden">
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
      <div className="px-6 pb-16 pt-10 md:px-16 xl:px-28">
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
      <div className="px-6 py-10 md:px-16 md:py-16 xl:px-28">
        <h2 className="pb-10 text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
          Speaking topics
        </h2>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          {cards &&
            cards.map((card, index) => (
              <AnimatedCard key={index} card={card} />
            ))}
        </div>
      </div>

      <div className="px-6 py-10 md:px-16 md:py-16 xl:px-28">
        <div className="mx-auto">
          <h2 className="text-center font-futura text-xl font-medium uppercase leading-normal tracking-wider md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
            Testimonials
          </h2>
          {groupedContent}
        </div>
      </div>
      <div className="px-6 pb-16 pt-10 md:px-16 xl:px-28">
        <ContactUsCard
          customTitle="Bring Brian to your event!"
          customDescription="Brian's bags are always packed, send us his next destination."
          customLabel="Get in touch"
        />
      </div>
    </section>
  );
}
