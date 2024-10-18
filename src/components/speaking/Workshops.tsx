'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MexicoFlag from '../ui/MexicoFlag';
import UsaFlag from '../ui/USAFlag';
import RussiaFlag from '../ui/RussiaFlag';
import IsraelFlag from '../ui/IsraelFlag';
import BelgiumFlag from '../ui/BelgiumFlag';
import ColombiaFlag from '../ui/ColombiaFlag';
import ArmeniaFlag from '../ui/ArmeniaFlag';

export default function Workshops() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const workshops = [
    {
      Flag: BelgiumFlag,
      text: 'Digital African Women Keynote | Brussels, Belgium',
    },
    { Flag: RussiaFlag, text: 'Skoklovo School of Business | Moscow, Russia' },
    { Flag: ArmeniaFlag, text: 'United World College | Dilijan, Armenia' },
    { Flag: MexicoFlag, text: 'TEC de Monterrey | Mexico City, Mexico' },
    { Flag: UsaFlag, text: 'Credit Karma | San Francisco, CA' },
    { Flag: ColombiaFlag, text: 'SuraAmerica | Medellin, Colombia' },
    { Flag: UsaFlag, text: 'Salesforce | San Francisco, CA' },
    { Flag: UsaFlag, text: 'Citigroup | San Francisco, CA' },
    { Flag: UsaFlag, text: ' Credit Suisse | New York, NY' },
    { Flag: UsaFlag, text: 'Twitter | San Francisco, CA' },
    { Flag: IsraelFlag, text: 'WeWork | Tel Aviv, Israel' },
    { Flag: UsaFlag, text: 'KPMG | San Francisco, CA' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.div className="flex flex-wrap justify-center gap-4">
        {workshops.map((workshop, index) => {
          const FlagComponent = workshop.Flag;
          return (
            <motion.div
              key={index}
              className="flex items-center rounded-lg border-2 border-custom-black px-3 py-2"
              variants={itemVariants}
            >
              <FlagComponent className="mr-2 h-6 w-6" aria-hidden="true" />
              <span className="font-medium">{workshop.text}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
