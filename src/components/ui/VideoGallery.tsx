import { useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from 'react-icons/io5';
import VideoPlayer from './VideoPlayer';
import { VideoType } from '@/contentful/videos';
import { useScrollLock } from '@/utils/scrollLock';

interface VideoGalleryProps {
  videos: VideoType[];
  currentIndex: number;
  onClose: () => void;
}

const VideoGallery = ({ videos, currentIndex, onClose }: VideoGalleryProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(currentIndex);
  useScrollLock();

  const nextVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextVideo(event as unknown as React.MouseEvent);
      } else if (event.key === 'ArrowLeft') {
        prevVideo(event as unknown as React.MouseEvent);
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-custom-black bg-opacity-90"
    >
      <p className="absolute left-4 top-4 font-futura text-custom-lighter-gray">
        {`${currentVideoIndex + 1}/${videos.length}`}
      </p>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-custom-lighter-gray hover:text-custom-yellow"
      >
        <IoIosClose size={44} />
      </button>

      <div
        className="relative w-full max-w-6xl px-16 py-10"
        onClick={handleContentClick}
      >
        <VideoPlayer
          videoUrl={videos[currentVideoIndex].videoUrl}
          thumbnail={videos[currentVideoIndex].thumbnail}
        />
        <p className="mt-4 text-center font-medium text-custom-lighter-gray">
          {videos[currentVideoIndex].title}
        </p>

        {videos.length > 1 && (
          <>
            <button
              onClick={prevVideo}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform text-custom-lighter-gray"
            >
              <IoArrowBackCircleOutline
                size={40}
                className="text-custom-lighter-gray transition-colors hover:text-custom-yellow"
              />
            </button>
            <button
              onClick={nextVideo}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform text-custom-lighter-gray"
            >
              <IoArrowForwardCircleOutline
                size={40}
                className="text-custom-lighter-gray transition-colors hover:text-custom-yellow"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoGallery;
