import { CardType } from '@/contentful/cards';
import Slider from 'react-slick';
import PartnerCard from './PartnerCard';
import Card from './Card';

export enum CardTypes {
  PARTNER_CARD = 'PARTNER_CARD',
  MAIN_CARD = 'MAIN_CARD',
}

interface SharedSliderProps {
  sliderData: CardType[];
  autoPlay: boolean;
  cardType: CardTypes;
}

const SharedSlider: React.FC<SharedSliderProps> = ({
  sliderData,
  autoPlay,
  cardType,
}) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: autoPlay,
    speed: 10000,
    autoplaySpeed: 2000,
    cssEase: 'linear',

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          speed: 2000,
          autoplaySpeed: 3000,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container flex max-h-[350px] justify-center">
      <Slider className="w-full" {...settings}>
        {sliderData?.map((card, index) => (
          <div className="mb-5 px-3" key={index}>
            {cardType === CardTypes.PARTNER_CARD ? (
              <PartnerCard partnerCardData={card} />
            ) : (
              <Card card={card} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SharedSlider;
