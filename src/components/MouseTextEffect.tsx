import React, { useRef, useEffect, useState } from "react";

interface MouseTextEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  text?: string;
}

const MouseTextEffect = ({
  children,
  className = "",
  intensity = 0.1,
  text = "NUTRITION HAI ZARURI"
}: MouseTextEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePosition({
        x: (e.clientX - centerX) * intensity,
        y: (e.clientY - centerY) * intensity,
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`mouse-text-effect ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect */}
      <div className="mouse-text-glow" />

      {/* Content with 3D transform */}
      <div
        style={{
          transform: `translateZ(20px) translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
          transition: isHovered ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>

      {/* Additional light effect */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 5}% ${50 + mousePosition.y * 5}%,
            rgba(255,255,255,0.15) 0%,
            rgba(255,255,255,0.05) 40%,
            transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default MouseTextEffect;
