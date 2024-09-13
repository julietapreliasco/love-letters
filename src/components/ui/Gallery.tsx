import { useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: ImageData[];
}

const Gallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setCurrentIndex(null);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex + 1) % images.length : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex !== null
        ? (prevIndex - 1 + images.length) % images.length
        : images.length - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (event.key === 'ArrowRight') {
          nextImage();
        } else if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'Escape') {
          closeImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          onClick={() => openImage(index)}
          className="cursor-pointer"
        >
          <Image
            src={image.src}
            alt={image.alt || `Imagen ${index + 1}`}
            width={image.width}
            height={image.height}
            className="max-h-[200px] min-h-[200px] object-cover"
          />
        </div>
      ))}

      {currentIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-52">
          <p className="absolute left-4 top-4 font-playfair-display text-custom-black">
            {`${currentIndex + 1}/${images.length}`}
          </p>
          <button
            onClick={closeImage}
            className="absolute right-4 top-4 text-custom-black"
          >
            <IoIosClose size={24} />
          </button>
          <button onClick={prevImage} className="absolute left-4 text-white">
            <IoArrowBackCircleOutline size={24} className="text-custom-black" />
          </button>

          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt || 'Love letters gallery'}
            width={images[currentIndex].width}
            height={images[currentIndex].height}
          />

          <button onClick={nextImage} className="absolute right-4 text-white">
            <IoArrowForwardCircleOutline
              size={24}
              className="text-custom-black"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
