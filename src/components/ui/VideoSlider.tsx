'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
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
  const videoThumbnails = videos.map((item) => item.thumbnail);
  const [selectedVideo, setSelectedVideo] = useState<string>(videoURLs[0]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<
    ContentImage | null | undefined
  >(videoThumbnails[0]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleThumbnailClick = (
    url: string,
    thumbnail: ContentImage | null | undefined
  ) => {
    if (selectedVideo !== url) {
      setSelectedVideo(url);
      setSelectedThumbnail(thumbnail);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, videoURLs.length),
    slidesToScroll: 1,
    centerMode: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    nextArrow:
      videoURLs.length > 3 && currentSlide < videoURLs.length - 3 ? (
        <SliderButton next={true} />
      ) : undefined,
    prevArrow:
      videoURLs.length > 3 && currentSlide > 0 ? <SliderButton /> : undefined,
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
        <VideoPlayer
          key={selectedVideo}
          videoUrl={selectedVideo}
          thumbnail={selectedThumbnail}
        />
      </div>

      {videoURLs.length > 1 && (
        <div className="mt-5 hidden md:block">
          <Slider {...settings}>
            {videoURLs.map((url, index) => (
              <div
                key={index}
                className="p-4"
                onClick={() =>
                  handleThumbnailClick(url, videoThumbnails[index])
                }
              >
                {videoThumbnails[index] ? (
                  <Image
                    src={videoThumbnails[index]?.src || ''}
                    alt="Video Thumbnail"
                    className="w-fit object-cover"
                    width={videoThumbnails[index]?.width}
                    height={videoThumbnails[index]?.height}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-300">
                    No Thumbnail
                  </div>
                )}
                <p className="truncate-2-lines mt-[10px] font-lato text-lg lg:text-xl">
                  {videoTitles[index]}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="block w-full md:hidden">
        <div className="w-full p-2">
          <VideoPlayer videoUrl={videoURLs[0]} thumbnail={videoThumbnails[0]} />
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
