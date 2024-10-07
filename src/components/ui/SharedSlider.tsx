import { CardType } from '@/contentful/cards';
import Slider from 'react-slick';
import SharedCard, { CardStyles } from './SharedCard';
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
    image:
      'h-[220px] md:h-[180px] lg:min-h-[200px] 2xl:min-h-[300px] object-cover',
    mainDivHeight: 'h-full ',
    titleFont: 'text-xl',
    contentWrapper: 'h-full',
    linkWrapper: 'h-full flex flex-col justify-between',
  };

  const partnerCardStyles: CardStyles = {
    mainDivHeight: 'h-[350px] lg:h-[400px] xl:h-[380px]',
  };

  return (
    <div className="flex justify-center">
      <Slider className="w-full lg:mt-10" {...settings}>
        {sliderData?.map((card, index) => (
          <div className="mb-10 px-3 lg:mb-0" key={index}>
            {type === Types.PARTNER ? (
              <SharedCard
                linkTo={`/campaigns?partner=${encodeURIComponent(card.title!)}`}
                cardData={card}
                styles={partnerCardStyles}
              />
            ) : (
              <SharedCard
                cardData={card}
                styles={pressCardStyles}
                linkTo={card.url}
                isPress={true}
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SharedSlider;
