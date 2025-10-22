import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const TypewriterText = ({ text, className = "", speed = 50, delay = 0 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const startTyping = () => {
      setIsTyping(true);
      setShowCursor(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          // Keep cursor visible for a moment then hide it
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    };

    const timer = setTimeout(startTyping, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

export default TypewriterText;
