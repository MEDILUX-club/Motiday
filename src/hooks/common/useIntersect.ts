import { MutableRefObject, useEffect, useRef } from 'react';

export type IntersectHandler = (entry: IntersectionObserverEntry) => void;

const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit,
): MutableRefObject<HTMLElement | null> => {
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry);
        }
      });
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [onIntersect, options]);

  return targetRef;
};

export default useIntersect;
