import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafIdRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Initialize Lenis with inertia scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Start the animation frame loop
    rafIdRef.current = requestAnimationFrame(raf);

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.refresh();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [raf]);

  return <>{children}</>;
};

export default SmoothScrollProvider;
