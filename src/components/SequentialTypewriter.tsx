import React, { useState, useEffect, useRef } from "react";

interface SequentialTypewriterProps {
  segments: string[];
  className?: string;
  speed?: number;
  delay?: number;
  pauseBetween?: number;
}

const SequentialTypewriter = ({
  segments,
  className = "",
  speed = 50,
  delay = 0,
  pauseBetween = 2000
}: SequentialTypewriterProps) => {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const textLengthRef = useRef(0);

  useEffect(() => {
    if (currentSegmentIndex >= segments.length) return;

    const currentSegment = segments[currentSegmentIndex];
    const startDelay = currentSegmentIndex === 0 ? delay : pauseBetween;

    const startSequence = () => {
      if (currentSegmentIndex > 0) {
        // Clear previous text first
        setIsTyping(false);
        setShowCursor(false);

        // Clear text character by character
        textLengthRef.current = displayText.length;
        const clearTimer = setInterval(() => {
          if (textLengthRef.current > 0) {
            textLengthRef.current--;
            setDisplayText(prev => prev.slice(0, -1));
          } else {
            clearInterval(clearTimer);
            // Start typing new segment after a brief pause
            setTimeout(() => startTyping(), 200);
          }
        }, speed / 2);

        return () => clearInterval(clearTimer);
      } else {
        // First segment - start typing immediately
        startTyping();
      }
    };

    const startTyping = () => {
      setIsTyping(true);
      setShowCursor(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < currentSegment.length) {
          setDisplayText(currentSegment.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);

          // Move to next segment after pause
          if (currentSegmentIndex < segments.length - 1) {
            setTimeout(() => {
              setCurrentSegmentIndex(prev => prev + 1);
            }, pauseBetween);
          } else {
            // Last segment - keep cursor for a moment then hide it
            setTimeout(() => setShowCursor(false), 1000);
          }
        }
      }, speed);

      return () => clearInterval(typeInterval);
    };

    const timer = setTimeout(startSequence, startDelay);
    return () => clearTimeout(timer);
  }, [currentSegmentIndex, segments, speed, delay, pauseBetween]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

export default SequentialTypewriter;
