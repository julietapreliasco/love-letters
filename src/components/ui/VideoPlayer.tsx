"use client";
import React, { useState, useEffect } from "react";
import Plyr, { PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import PlayButton from "./PlayButton";
import { extractVideoId } from "@/utils/extractVideoId";
import Image from "next/image";

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoId = extractVideoId(videoUrl);

  useEffect(() => {
    setIsPlaying(false);
  }, [videoUrl]);

  const handleCustomPlay = () => {
    setIsPlaying(true);
  };

  const plyrSource: PlyrProps["source"] = {
    type: "video",
    sources: videoId
      ? [
          {
            src: videoId,
            provider: "youtube",
          },
        ]
      : [],
  };

  const Thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";

  return (
    <div className="relative w-full pb-[56.25%] bg-black z-20">
      {!isPlaying && videoId && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handleCustomPlay}
        >
          <Image
            src={Thumbnail}
            alt="Video Thumbnail"
            className="absolute inset-0 object-contain"
            fill
            priority
          />
          <div className="z-30">
            <PlayButton />
          </div>
        </div>
      )}
      {isPlaying && videoId && (
        <div className="absolute inset-0 w-full h-full z-10">
          <Plyr
            source={plyrSource}
            options={{
              controls: [
                "play",
                "pause",
                "progress",
                "mute",
                "volume",
                "fullscreen",
              ],
              autoplay: true,
              clickToPlay: true,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
