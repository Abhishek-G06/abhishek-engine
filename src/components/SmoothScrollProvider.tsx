import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(instance);

    // Pause Lenis when Radix dialog opens (body gets data-scroll-locked)
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute('data-scroll-locked')) {
        instance.stop();
      } else {
        instance.start();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-scroll-locked'] });

    // Connect Lenis scroll to ScrollTrigger
    instance.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export default SmoothScrollProvider;
