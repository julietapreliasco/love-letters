import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';
import { motion, useAnimation, useInView } from 'framer-motion';

interface QuotesBlockProps {
  quote: JSX.Element;
  image: JSX.Element;
  isOdd: boolean;
}

export const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
      if (children) {
        const [quote, author] = children.toString().split('-');
        return (
          <blockquote className="flex flex-col gap-5 font-futura">
            <p className="text-center text-lg italic leading-normal tracking-wider md:text-start lg:text-xl lg:leading-normal">
              {quote.trim()}
            </p>
            {author && (
              <span className="block text-center text-sm md:text-start md:text-base">
                - {author.trim()}
              </span>
            )}
          </blockquote>
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      const imageUrl = file.url.startsWith('//')
        ? `https:${file.url}`
        : file.url;
      const [isHovered, setIsHovered] = useState(false);

      return (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex h-40 w-40 items-center justify-center md:h-64 md:w-64"
        >
          <Image
            src={imageUrl}
            alt={title || 'Testimonial Image'}
            fill
            sizes=""
            className="rounded-full object-cover shadow-lg"
          />
        </div>
      );
    },
  },
};

const QuotesBlock = ({ quote, image, isOdd }: QuotesBlockProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: isOdd ? -100 : 100 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`my-20 flex w-full flex-col-reverse items-center justify-center gap-10 md:flex-row md:gap-16 ${
          isOdd ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="flex items-center md:w-1/2">{quote}</div>
        <div>{image}</div>
      </div>
    </motion.div>
  );
};

export default QuotesBlock;
