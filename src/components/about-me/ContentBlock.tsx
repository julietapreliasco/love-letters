'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ContentBlockProps {
  image: JSX.Element;
  paragraphs: JSX.Element[];
  isOdd: boolean;
}

const ContentBlock = ({ image, paragraphs, isOdd }: ContentBlockProps) => {
  const contentRef = useRef(null);
  const contentIsInView = useInView(contentRef);
  const contentControls = useAnimation();

  useEffect(() => {
    if (contentIsInView) {
      contentControls.start('visible');
    }
  }, [contentIsInView, contentControls]);

  return (
    <motion.div
      ref={contentRef}
      variants={{
        hidden: { opacity: 0, translateY: 100 },
        visible: { opacity: 1, translateY: 0 },
      }}
      transition={{
        type: 'spring',
        duration: 0.3,
        damping: 8,
        delay: 0.1,
        stiffness: 60,
      }}
      initial="hidden"
      animate={contentControls}
      className={`flex flex-col md:flex-row ${
        !isOdd ? 'md:flex-row-reverse md:pl-10 lg:pl-20' : 'md:pr-10 lg:pr-20'
      }`}
    >
      <div className="flex flex-1 items-center justify-center">{image}</div>
      <div className="flex flex-1 items-center justify-center px-10 sm:px-20 md:p-0">
        <div className="flex flex-col gap-4">{paragraphs}</div>
      </div>
    </motion.div>
  );
};

export default ContentBlock;
