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
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-secondary/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedLiquidBackground;
