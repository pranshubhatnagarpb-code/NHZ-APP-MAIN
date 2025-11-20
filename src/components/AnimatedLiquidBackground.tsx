import React from "react";
import { motion } from "framer-motion";

const AnimatedLiquidBackground = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated Liquid Background */}
      <div className="liquid-bg absolute inset-0">    
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-secondary/10 to-secondary/20" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedLiquidBackground;
