"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import { extractVideoId } from "@/utils/extractVideoId";

const VideoSlider = ({ videoUrls }: { videoUrls: string[] }) => {
  const [selectedVideo, setSelectedVideo] = useState<string>(videoUrls[0]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Asegura que solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleThumbnailClick = (url: string) => {
    if (selectedVideo !== url) {
      setSelectedVideo(url);
    }
  };

  // Solo renderiza el componente si estamos en el cliente
  if (!isClient) {
    return null;
  }

  return (
    <div className="">
      <VideoPlayer key={selectedVideo} videoUrl={selectedVideo} />

      <Swiper spaceBetween={10} slidesPerView={3} className="mt-8">
        {videoUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative cursor-pointer ${
                selectedVideo === url ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleThumbnailClick(url)}
            >
              <Image
                src={`https://img.youtube.com/vi/${extractVideoId(url)}/hqdefault.jpg`}
                alt="Video Thumbnail"
                className="w-full h-auto object-cover"
                width={408}
                height={237}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
