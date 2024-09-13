import { CardType } from '@/contentful/cards';
import Slider from 'react-slick';
import SharedCard, { CardStyles } from './PartnerCard';
import SliderButton from './SliderButton';

export enum Types {
  PARTNER = 'PARTNER',
  PRESS = 'MAIN',
}

interface SharedSliderProps {
  sliderData: CardType[];
  isPartners: boolean;
  type: Types;
}

const SharedSlider: React.FC<SharedSliderProps> = ({
  sliderData,
  isPartners,
  type,
}) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: isPartners,
    speed: isPartners ? 10000 : 500,
    cssEase: 'linear',
    nextArrow: !isPartners ? (
      <SliderButton isPartners={true} next={true} />
    ) : undefined,
    prevArrow: !isPartners ? <SliderButton isPartners={true} /> : undefined,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: !isPartners,
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: !isPartners,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: !isPartners,
          slidesToShow: 1,
          speed: isPartners ? 2000 : 500,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const pressCardStyles: CardStyles = {
    mainDivColor: 'bg-white',
    mainDivPadding: 'p-0 xl:p-0',
    image: 'h-full',
    mainDivHeight: 'h-auto',
    titleFont: 'text-xl',
  };

  return (
    <div className="flex max-h-[470px] justify-center md:max-h-[470px] lg:max-h-[350px]">
      <Slider className="mb-10 w-full" {...settings}>
        {sliderData?.map((card, index) => (
          <div className="mb-5 px-3" key={index}>
            {type === Types.PARTNER ? (
              <SharedCard cardData={card} />
            ) : (
              <SharedCard cardData={card} styles={pressCardStyles} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SharedSlider;
