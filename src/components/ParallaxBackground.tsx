import { useParallax } from '@/hooks/use-parallax';

interface ParallaxBackgroundProps {
  variant?: 'hero' | 'about' | 'skills' | 'projects' | 'contact';
}

const ParallaxBackground = ({ variant = 'hero' }: ParallaxBackgroundProps) => {
  const offset1 = useParallax(0.1);
  const offset2 = useParallax(0.15);
  const offset3 = useParallax(0.08);

  const getElements = () => {
    switch (variant) {
      case 'hero':
        return (
          <>
            <div
              className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
              style={{ transform: `translateY(${offset1}px)` }}
            />
            <div
              className="absolute top-40 right-[15%] w-48 h-48 bg-accent/10 rounded-full blur-2xl"
              style={{ transform: `translateY(${offset2}px)` }}
            />
            <div
              className="absolute bottom-32 left-[20%] w-32 h-32 bg-primary/8 rounded-full blur-xl"
              style={{ transform: `translateY(${-offset3}px)` }}
            />
          </>
        );
      case 'about':
        return (
          <>
            <div
              className="absolute top-10 right-[5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"
              style={{ transform: `translateY(${offset1}px)` }}
            />
            <div
              className="absolute bottom-20 left-[10%] w-40 h-40 bg-accent/8 rounded-full blur-2xl"
              style={{ transform: `translateY(${-offset2}px)` }}
            />
          </>
        );
      case 'skills':
        return (
          <>
            <div
              className="absolute top-0 left-[5%] w-56 h-56 bg-accent/5 rounded-full blur-3xl"
              style={{ transform: `translateY(${offset2}px)` }}
            />
            <div
              className="absolute bottom-10 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
              style={{ transform: `translateY(${-offset1}px)` }}
            />
          </>
        );
      case 'projects':
        return (
          <>
            <div
              className="absolute top-20 right-[8%] w-80 h-80 bg-primary/5 rounded-full blur-3xl"
              style={{ transform: `translateY(${offset1}px)` }}
            />
            <div
              className="absolute bottom-40 left-[5%] w-48 h-48 bg-accent/8 rounded-full blur-2xl"
              style={{ transform: `translateY(${-offset3}px)` }}
            />
          </>
        );
      case 'contact':
        return (
          <>
            <div
              className="absolute top-10 left-[15%] w-60 h-60 bg-primary/5 rounded-full blur-3xl"
              style={{ transform: `translateY(${offset2}px)` }}
            />
            <div
              className="absolute bottom-20 right-[10%] w-44 h-44 bg-accent/6 rounded-full blur-2xl"
              style={{ transform: `translateY(${-offset1}px)` }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {getElements()}
    </div>
  );
};

export default ParallaxBackground;
