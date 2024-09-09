'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
import { extractVideoId } from '@/utils/extractVideoId';
import SliderButton from './SliderButton';
import { ContentImage } from '@/contentful/parseContentfulImage';

interface VideoFields {
  title?: string;
  videoUrl: string;
  section: string;
  thumbnail?: ContentImage | null | undefined;
}

const VideoSlider = ({ videos }: { videos: VideoFields[] }) => {
  const videoURLs = videos.map((item) => item.videoUrl);
  const videoTitles = videos.map((item) => item.title);

  const [selectedVideo, setSelectedVideo] = useState<string>(videoURLs[0]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleThumbnailClick = (url: string) => {
    if (selectedVideo !== url) {
      setSelectedVideo(url);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    nextArrow:
      currentSlide < videoURLs.length - 3 ? (
        <SliderButton next={true} />
      ) : undefined,
    prevArrow: currentSlide > 0 ? <SliderButton /> : undefined,
  };

  const mobileSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex md:flex-col">
      <div className="hidden md:block">
        <VideoPlayer key={selectedVideo} videoUrl={selectedVideo} />
      </div>

      {videoURLs.length > 1 && (
        <div className="mt-5 hidden md:block">
          <Slider {...settings}>
            {videoURLs.map((url, index) => (
              <div
                key={index}
                className={`p-4`}
                onClick={() => handleThumbnailClick(url)}
              >
                <Image
                  src={`https://img.youtube.com/vi/${extractVideoId(url)}/hqdefault.jpg`}
                  alt="Video Thumbnail"
                  className="h-auto object-cover"
                  width={408}
                  height={237}
                />
                <p className="truncate-2-lines mt-[10px] font-playfair-display text-xl lg:text-2xl">
                  {videoTitles[index]}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="block w-full md:hidden">
        <div className="w-full p-2">
          <VideoPlayer videoUrl={videoURLs[0]} />
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
