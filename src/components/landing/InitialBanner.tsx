import { LandingSectionType } from '@/contentful/landingSections';
import Image from 'next/image';
import Button from '../ui/Button';

interface InitialBannerProps {
  bannerData: LandingSectionType;
}

const InitialBanner: React.FC<InitialBannerProps> = ({ bannerData }) => {
  return (
    <section id="initial-banner" className="relative h-screen w-full">
      {bannerData?.backgroundImage?.src && (
        <Image
          src={bannerData.backgroundImage.src}
          alt="Love Letters Home Banner"
          fill
          className="z-0 object-cover"
          priority
        />
      )}
      <div className="absolute left-0 top-1/2 z-10 w-2/3 -translate-y-1/2 p-[20px] text-white lg:p-[60px]">
        <div className="w-[260px] md:w-[460px] lg:w-[610px]">
          <h1 className="leading[43px] md:leading[64px] text-left font-playfair-display text-[32px] font-bold md:text-[48px]">
            {bannerData.title}
          </h1>
        </div>
        <div className="my-[20px]">
          <Button label="Join us" />
        </div>
      </div>
    </section>
  );
};

export default InitialBanner;
