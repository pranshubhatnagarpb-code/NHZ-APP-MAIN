import React from "react";

const AnimatedLiquidBackground = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated Liquid Background */}
      <div className="liquid-bg absolute inset-0"></div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedLiquidBackground;
