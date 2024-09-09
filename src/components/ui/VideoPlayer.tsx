import React, { useState, useEffect, useRef } from 'react';
import { extractVideoId } from '@/utils/extractVideoId';
import Image from 'next/image';
import { IoMdPlay } from 'react-icons/io';
import { ContentImage } from '@/contentful/parseContentfulImage';

const VideoPlayer = ({
  videoUrl,
  thumbnail,
}: {
  videoUrl: string;
  thumbnail: ContentImage | null | undefined;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoId = extractVideoId(videoUrl);

  const handleCustomPlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative z-20 w-full bg-black pb-[56.25%]" ref={videoRef}>
      {!isPlaying && videoId && (
        <div className="absolute inset-0 flex items-center justify-center">
          {thumbnail && (
            <Image
              src={thumbnail?.src}
              alt="Video Thumbnail"
              className="absolute inset-0 object-contain"
              fill
              priority
            />
          )}
          <div
            className="z-30 cursor-pointer rounded-full bg-custom-lighter-gray bg-opacity-70 py-3 pl-4 pr-3 md:py-6 md:pl-7 md:pr-5 xl:py-7 xl:pl-8 xl:pr-6 2xl:py-8 2xl:pl-9 2xl:pr-7"
            onClick={handleCustomPlay}
          >
            <IoMdPlay className="text-xl text-custom-black md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" />
          </div>
        </div>
      )}
      {isPlaying && videoId && (
        <div className="absolute inset-0 z-10 h-full w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
