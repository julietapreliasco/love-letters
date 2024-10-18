'use client';

import { CardType } from '@/contentful/cards';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface AnimatedCardProps {
  card: CardType;
}

export const AnimatedCard = ({ card }: AnimatedCardProps) => {
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
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        type: 'spring',
        duration: 1,
        damping: 8,
        delay: 0.1,
        stiffness: 60,
      }}
      className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg md:h-80"
    >
      {card.image && (
        <Image
          src={card.image.src}
          alt={card.image.alt || 'Speaking Topic'}
          fill
          sizes=""
          className="object-cover object-top md:object-center"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
        <h3 className="text-center font-lato text-lg leading-normal text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_60%)] md:text-xl md:leading-normal">
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
};
