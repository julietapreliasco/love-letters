import React, { useRef, useState, useCallback, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useTransform, useSpring, motion, useScroll } from 'framer-motion';

const SmoothScroll = ({ children }: any) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [pageHeight, setPageHeight] = useState(0);

  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [resizePageHeight]);

  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring }}
        className="scroll-container"
      >
        {children}
      </motion.div>
      <div style={{ height: `${pageHeight}px` }} />
    </>
  );
};

export default SmoothScroll;
