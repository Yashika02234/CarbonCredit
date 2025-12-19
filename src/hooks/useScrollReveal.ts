import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el, index) => {
      (el as HTMLElement).style.setProperty('--reveal-delay', `${index * 120}ms`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};
