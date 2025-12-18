import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  hueSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
  trail: { x: number; y: number; opacity: number }[];
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isShiftRef = useRef(false);
  const burstParticlesRef = useRef<Particle[]>([]);

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
          hue: Math.random() * 60 - 30, // Offset from primary hue
          hueSpeed: (Math.random() - 0.5) * 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          trail: [],
        });
      }
    };

    const createBurstParticles = (x: number, y: number) => {
      const burstCount = 15;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.5;
        const speed = 3 + Math.random() * 4;
        burstParticlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 4 + 2,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 1,
          hue: Math.random() * 60 - 30,
          hueSpeed: 0,
          pulsePhase: 0,
          pulseSpeed: 0,
          trail: [],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const computedStyle = getComputedStyle(document.documentElement);
      const primaryHsl = computedStyle.getPropertyValue('--primary').trim();
      const [baseHue] = primaryHsl.split(' ').map(v => parseFloat(v));
      const mouse = mouseRef.current;
      const interactionRadius = 150;
      const orbitRadius = 100;
      const time = Date.now() * 0.001;
      
      // Update and draw main particles
      particlesRef.current.forEach((particle) => {
        // Store trail position
        particle.trail.unshift({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > 8) particle.trail.pop();

        // Calculate distance from mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update hue for color shifting
        particle.hue += particle.hueSpeed;
        if (particle.hue > 60) particle.hue = -60;
        if (particle.hue < -60) particle.hue = 60;

        // Update pulse phase for breathing effect
        particle.pulsePhase += particle.pulseSpeed;
        const pulseFactor = 0.8 + Math.sin(particle.pulsePhase) * 0.3;

        if (distance < interactionRadius && distance > 0) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          
          if (isShiftRef.current) {
            // Attract to cursor when holding shift
            particle.x += Math.cos(angle) * force * 2;
            particle.y += Math.sin(angle) * force * 2;
          } else if (distance < orbitRadius && distance > 20) {
            // Gravity well / orbit effect
            const orbitForce = (orbitRadius - distance) / orbitRadius;
            const perpAngle = angle + Math.PI / 2;
            const orbitSpeed = orbitForce * 2;
            
            // Add orbital motion perpendicular to the direction to cursor
            particle.x += Math.cos(perpAngle) * orbitSpeed;
            particle.y += Math.sin(perpAngle) * orbitSpeed;
            
            // Slight pull toward cursor
            particle.x += Math.cos(angle) * orbitForce * 0.3;
            particle.y += Math.sin(angle) * orbitForce * 0.3;
          } else {
            // Repulsion effect
            particle.x -= Math.cos(angle) * force * 3;
            particle.y -= Math.sin(angle) * force * 3;
          }
        } else {
          // Normal movement
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

        // Draw particle trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = (1 - index / particle.trail.length) * 0.3 * particle.opacity;
          const trailSize = particle.size * (1 - index / particle.trail.length) * 0.8;
          const currentHue = baseHue + particle.hue;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${currentHue}, 70%, 60%, ${trailOpacity})`;
          ctx.fill();
        });

        // Calculate glow and size based on proximity and pulse
        const glowIntensity = distance < interactionRadius ? 1 + (1 - distance / interactionRadius) * 0.8 : 1;
        const currentSize = particle.size * pulseFactor * glowIntensity;
        const currentHue = baseHue + particle.hue;
        
        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3
        );
        gradient.addColorStop(0, `hsla(${currentHue}, 80%, 65%, ${particle.opacity * pulseFactor * 0.6})`);
        gradient.addColorStop(0.5, `hsla(${currentHue}, 70%, 55%, ${particle.opacity * pulseFactor * 0.2})`);
        gradient.addColorStop(1, `hsla(${currentHue}, 60%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${currentHue}, 85%, 70%, ${particle.opacity * pulseFactor * glowIntensity})`;
        ctx.fill();
      });

      // Update and draw burst particles
      burstParticlesRef.current = burstParticlesRef.current.filter((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedX *= 0.96;
        particle.speedY *= 0.96;
        particle.opacity -= 0.02;
        
        if (particle.opacity <= 0) return false;

        const currentHue = baseHue + particle.hue;
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `hsla(${currentHue}, 90%, 70%, ${particle.opacity * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${currentHue}, 80%, 60%, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${currentHue}, 70%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${currentHue}, 90%, 75%, ${particle.opacity})`;
        ctx.fill();

        return true;
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const avgHue = baseHue + (particle.hue + otherParticle.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${0.25 * (1 - distance / 180)})`;
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') isShiftRef.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') isShiftRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      createBurstParticles(e.clientX, e.clientY);
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
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleClick);
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
