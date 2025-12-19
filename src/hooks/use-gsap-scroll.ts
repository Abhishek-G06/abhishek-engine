import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapScrollOptions {
  stagger?: number;
  duration?: number;
  y?: number;
  x?: number;
  start?: string;
  end?: string;
}

export const useGsapScroll = (options: UseGsapScrollOptions = {}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    stagger = 0.15,
    duration = 1.2,
    y = 40,
    x = 0,
    start = "top 85%",
    end = "top 20%",
  } = options;

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const animatedElements = contentRef.current?.querySelectorAll('[data-scroll]');
      
      if (!animatedElements?.length) return;

      // Set initial state
      gsap.set(animatedElements, {
        opacity: 0,
        y: y,
        x: x,
      });

      // Create scroll-triggered animation
      gsap.to(animatedElements, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        stagger: stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: start,
          end: end,
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stagger, duration, y, x, start, end]);

  return { sectionRef, contentRef };
};
