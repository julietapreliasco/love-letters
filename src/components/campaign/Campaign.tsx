'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CampaignType } from '@/contentful/campaign';
import Description from './Description';
import ContactUsCard from '../ui/ContactUsCard';
import Gallery from '../ui/Gallery';

interface CampaignProps {
  data: CampaignType;
}

const Campaign = ({ data }: CampaignProps) => {
  const {
    bannerImage,
    bannerTitle,
    date,
    partner,
    subtitle,
    description,
    imageCaption,
    gallery,
    finalText,
    videos,
    press,
  } = data;

  const videoURLs = videos?.map((item) => item.videoUrl);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.3]);
  return (
    <section className="w-full">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-custom-gray md:relative md:h-screen md:flex-row">
        {bannerImage && (
          <motion.div
            className="z-0 flex items-center justify-center pt-20 md:h-auto md:w-[60%] md:pt-10"
            style={{ scale }}
          >
            <Image
              src={bannerImage.src}
              alt="Love Letters Home Banner"
              width={bannerImage.width}
              height={bannerImage.height}
              className="z-0 w-[85%] self-center object-cover shadow-xl md:h-auto md:w-full"
              priority
            />
          </motion.div>
        )}
        <div className="flex w-full p-10 text-center font-playfair-display text-2xl font-semibold tracking-wider text-custom-lighter-gray drop-shadow-2xl md:absolute md:left-10 md:top-[60%] md:max-w-[620px] md:text-start md:text-[46px] md:leading-[48px] md:text-white">
          <span>{bannerTitle}</span>
        </div>
      </div>
      <div className="lg:px-48 lg:py-20">
        <div className="mb-16 flex justify-between">
          <div>
            <p className="font-playfair-display text-2xl font-semibold">Date</p>
            <p className="font-lato text-base">{date}</p>
          </div>
          <div>
            <p className="font-playfair-display text-2xl font-semibold">
              Partner
            </p>
            <p className="font-lato text-base">{partner}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-11 font-playfair-display text-5xl font-medium tracking-widest">
            {subtitle}
          </h3>
          {/* {videoURLs && videos && (
            <div className="mb-10">
              <VideoPlayer videoUrl={videoURLs[0]} />
            </div>
          )} */}
        </div>
        <div>
          <Description description={description} imageCaption={imageCaption} />
        </div>
        {gallery != null && (
          <div className="mt-5">
            <Gallery images={gallery!} />
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <ContactUsCard />
        </div>
      </div>
    </section>
  );
};

export default Campaign;
