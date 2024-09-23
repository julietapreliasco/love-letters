'use client';

import { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  autoplay?: boolean;
  loop?: boolean;
  hover?: boolean;
}

export default function Component({
  animationData,
  autoplay = true,
  loop = true,
  hover = false,
}: LottieAnimationProps) {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: loop,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      });
      animationInstance.current = anim;

      return () => {
        anim.destroy();
      };
    }
  }, [animationData, loop]);

  useEffect(() => {
    const animation = animationInstance.current;
    if (animation) {
      if (hover || (autoplay && !hover)) {
        animation.play();
      } else {
        animation.pause();
      }
    }
  }, [hover, autoplay]);

  return (
    <div
      ref={animationContainer}
      className="relative h-full w-full overflow-hidden"
    />
  );
}
