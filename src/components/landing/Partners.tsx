'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Partners: React.FC = () => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: 'linear',
  };

  return (
    <div className="slider-container w-1/2">
      <Slider {...settings}>
        <div className="h-36 bg-custom-yellow">
          <h3>1</h3>
        </div>
        <div className="h-36 w-36 bg-red-400">
          <h3>2</h3>
        </div>
        <div className="h-36 w-36 bg-custom-black">
          <h3>3</h3>
        </div>
        <div className="h-36 w-36 bg-custom-yellow">
          <h3>4</h3>
        </div>
        <div className="h-36 w-36 bg-custom-lighter-gray">
          <h3>5</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Partners;
