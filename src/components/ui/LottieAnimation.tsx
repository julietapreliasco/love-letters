'use client';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  autoplay?: boolean;
  loop?: boolean;
  hover?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  autoplay = true,
  loop = true,
  hover = false,
}) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: loop,
        autoplay: autoplay,
        animationData: animationData,
      });
      animationInstance.current = anim;

      return () => anim.destroy();
    }
  }, [animationData, autoplay, loop]);

  useEffect(() => {
    if (hover) {
      animationInstance.current?.play();
    } else {
      animationInstance.current?.pause();
    }
  }, [hover]);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;
