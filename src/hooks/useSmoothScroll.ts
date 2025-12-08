import { useCallback } from 'react';

export const useSmoothScroll = () => {
  // Smooth scroll to a specific Y position
  const scrollToTop = useCallback(() => {
    const duration = 1000; // 1 second duration
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const scroll = () => {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      
      // Easing function: easeOutQuart (Luxury feel)
      const ease = 1 - Math.pow(1 - time, 4);

      window.scroll(0, Math.ceil((ease * (0 - start)) + start));

      if (Math.ceil((ease * (0 - start)) + start) !== 0) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }, []);

  return { scrollToTop };
};