'use client';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => anim.destroy();
    }
  }, [animationData]);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;
