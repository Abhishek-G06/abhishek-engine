import { useState, useEffect } from "react";
import heroAvatar from "@/assets/hero-avatar.png";

const CursorAvatar = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-primary/20 blur-xl animate-pulse" />
      
      {/* Avatar container */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/30">
        <img
          src={heroAvatar}
          alt="Cursor avatar"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Trail effect */}
      <div 
        className="absolute w-8 h-8 rounded-full bg-primary/30 blur-md -z-10"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CursorAvatar;
