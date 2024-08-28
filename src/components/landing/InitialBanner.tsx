import { LandingSectionType } from "@/contentful/landingSections";
import Image from "next/image";
import Button from "../ui/Button";

interface InitialBannerProps {
  bannerData: LandingSectionType;
}

const InitialBanner: React.FC<InitialBannerProps> = ({ bannerData }) => {
  return (
    <div className="relative w-full h-screen">
      {bannerData?.backgroundImage?.src && (
        <Image
          src={bannerData.backgroundImage.src}
          alt="Love Letters Home Banner"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
      )}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white z-10 w-2/3 p-[20px] lg:p-[60px]">
        <div className="w-[260px] md:w-[460px] lg:w-[610px]">
          <h1 className="font-playfair-display text-[32px] md:text-[48px] leading[43px] md:leading[64px] font-bold text-left">
            {bannerData.title}
          </h1>
        </div>
        <div className="my-[20px]">
          <Button label="Join us" />
        </div>
      </div>
    </div>
  );
};

export default InitialBanner;
