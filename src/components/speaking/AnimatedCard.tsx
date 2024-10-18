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
        type: 'keyframes',
        duration: 0.15,
      }}
      className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out will-change-transform hover:scale-105"
    >
      {card.image && (
        <Image
          src={card.image.src}
          alt={card.image.alt || 'Speaking Topic'}
          fill
          sizes=""
          className="object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
        <h3 className="text-center font-futura text-base font-bold text-white md:text-2xl">
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
};
