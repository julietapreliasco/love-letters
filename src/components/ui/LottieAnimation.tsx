'use client';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  autoplay?: boolean;
  loop?: boolean;
  hover?: boolean;
}

const LottieAnimation = ({
  animationData,
  autoplay = true,
  loop = true,
  hover = false,
}: LottieAnimationProps) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: loop,
        autoplay: false,
        animationData: animationData,
      });
      animationInstance.current = anim;

      return () => anim.destroy();
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

  return <div ref={animationContainer} />;
};

export default LottieAnimation;
