import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  trail: TrailPoint[];
}

interface BurstParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const burstParticlesRef = useRef<BurstParticle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const shiftRef = useRef(false);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.4,
          trail: [],
        });
      }
    };

    const maxTrailLength = 8;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.02;

      const computedStyle = getComputedStyle(document.documentElement);
      const primaryHsl = computedStyle.getPropertyValue('--primary').trim();
      const mouse = mouseRef.current;
      const interactionRadius = 120;
      
      particlesRef.current.forEach((particle) => {
        // Update trail - add current position before moving
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > maxTrailLength) {
          particle.trail.shift();
        }

        // Calculate distance from mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction - repel or attract based on shift key
        if (distance < interactionRadius && distance > 0) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          const direction = shiftRef.current ? 1 : -1; // attract if shift, repel otherwise
          particle.x += Math.cos(angle) * force * 3 * direction;
          particle.y += Math.sin(angle) * force * 3 * direction;
        } else {
          // Slowly return to base movement
          particle.x += particle.speedX;
          particle.y += particle.speedY;
        }

        // Update base position for drifting
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) { particle.x = canvas.width; particle.baseX = canvas.width; particle.trail = []; }
        if (particle.x > canvas.width) { particle.x = 0; particle.baseX = 0; particle.trail = []; }
        if (particle.y < 0) { particle.y = canvas.height; particle.baseY = canvas.height; particle.trail = []; }
        if (particle.y > canvas.height) { particle.y = 0; particle.baseY = 0; particle.trail = []; }

        // Breathing effect - each particle has its own phase
        const breathingPhase = timeRef.current + (particle.baseX + particle.baseY) * 0.01;
        const breathingScale = 1 + Math.sin(breathingPhase) * 0.2;
        const breathingOpacity = particle.opacity * (0.8 + Math.sin(breathingPhase) * 0.2);

        // Color shifting - subtle hue variation over time
        const hueShift = Math.sin(timeRef.current * 0.3 + breathingPhase * 0.5) * 15;
        const [h, s, l] = primaryHsl.split(' ').map((v) => parseFloat(v));
        const shiftedHue = ((h + hueShift) % 360 + 360) % 360;
        const particleColor = `${shiftedHue} ${s}% ${l}%`;

        // Draw trail with fading opacity
        if (particle.trail.length > 1) {
          ctx.shadowBlur = 0;
          for (let i = 0; i < particle.trail.length - 1; i++) {
            const trailOpacity = (i / particle.trail.length) * breathingOpacity * 0.3;
            const trailSize = particle.size * (0.3 + (i / particle.trail.length) * 0.5);
            
            ctx.beginPath();
            ctx.arc(particle.trail[i].x, particle.trail[i].y, trailSize, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${particleColor} / ${trailOpacity})`;
            ctx.fill();
          }
        }

        // Draw particle with glow effect
        const glowIntensity = distance < interactionRadius ? 1 + (1 - distance / interactionRadius) * 0.5 : 1;
        const finalSize = particle.size * glowIntensity * breathingScale;
        
        // Add subtle glow
        ctx.shadowBlur = 15 * glowIntensity * breathingScale;
        ctx.shadowColor = `hsl(${particleColor} / ${breathingOpacity * 0.8})`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${particleColor} / ${breathingOpacity * glowIntensity})`;
        ctx.fill();
        
        // Reset shadow for lines
        ctx.shadowBlur = 0;
      });

      // Draw and update burst particles
      const [hBase, sBase, lBase] = primaryHsl.split(' ').map((v) => parseFloat(v));
      burstParticlesRef.current = burstParticlesRef.current.filter((bp) => {
        bp.life -= 1;
        if (bp.life <= 0) return false;

        bp.x += bp.speedX;
        bp.y += bp.speedY;
        bp.speedX *= 0.98;
        bp.speedY *= 0.98;
        bp.speedY += 0.05; // slight gravity

        const lifeRatio = bp.life / bp.maxLife;
        const burstHue = ((hBase + Math.sin(timeRef.current) * 20) % 360 + 360) % 360;
        const burstColor = `${burstHue} ${sBase}% ${lBase}%`;

        ctx.shadowBlur = 10 * lifeRatio;
        ctx.shadowColor = `hsl(${burstColor} / ${bp.opacity * lifeRatio})`;

        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${burstColor} / ${bp.opacity * lifeRatio})`;
        ctx.fill();

        ctx.shadowBlur = 0;
        return true;
      });

      // Draw connections between nearby particles with color shift
      const lineHueShift = Math.sin(timeRef.current * 0.3) * 15;
      const lineHue = ((hBase + lineHueShift) % 360 + 360) % 360;
      const lineColor = `${lineHue} ${sBase}% ${lBase}%`;

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsl(${lineColor} / ${0.3 * (1 - distance / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleClick = (e: MouseEvent) => {
      const burstCount = 20;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.3;
        const speed = 3 + Math.random() * 4;
        burstParticlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: 2 + Math.random() * 3,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 0.6 + Math.random() * 0.4,
          life: 40 + Math.random() * 20,
          maxLife: 60,
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') shiftRef.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') shiftRef.current = false;
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticlesBackground;