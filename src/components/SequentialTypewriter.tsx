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
  const [isPaused, setIsPaused] = useState(false);
  // Track current phase and timers for robust pause/resume
  const phaseRef = useRef<'idle' | 'clearing' | 'typing' | 'waitingNext'>('idle');
  const currentIndexRef = useRef(0);
  const timersRef = useRef<{ typeInterval?: number; clearInterval?: number; startTimeout?: number; nextTimeout?: number }>({});

  const clearAllTimers = () => {
    if (timersRef.current.typeInterval) {
      clearInterval(timersRef.current.typeInterval);
      timersRef.current.typeInterval = undefined;
    }
    if (timersRef.current.clearInterval) {
      clearInterval(timersRef.current.clearInterval);
      timersRef.current.clearInterval = undefined;
    }
    if (timersRef.current.startTimeout) {
      clearTimeout(timersRef.current.startTimeout);
      timersRef.current.startTimeout = undefined;
    }
    if (timersRef.current.nextTimeout) {
      clearTimeout(timersRef.current.nextTimeout);
      timersRef.current.nextTimeout = undefined;
    }
  };

  useEffect(() => {
    const checkDialogOpen = () => {
      const openDialog = document.querySelector('[role="dialog"][data-state="open"]');
      setIsPaused(!!openDialog);
    };

    checkDialogOpen();

    const observer = new MutationObserver(() => {
      checkDialogOpen();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state", "aria-hidden", "style"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // On pause: cancel all timers and hold state
    if (isPaused) {
      clearAllTimers();
      return;
    }
    if (currentSegmentIndex >= segments.length) return;

    const currentSegment = segments[currentSegmentIndex];
    const startDelay = currentSegmentIndex === 0 ? delay : pauseBetween;

    const startClearing = () => {
      phaseRef.current = 'clearing';
      textLengthRef.current = displayText.length;
      timersRef.current.clearInterval = window.setInterval(() => {
        if (textLengthRef.current > 0) {
          textLengthRef.current--;
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          if (timersRef.current.clearInterval) {
            clearInterval(timersRef.current.clearInterval);
            timersRef.current.clearInterval = undefined;
          }
          // small pause before typing
          timersRef.current.startTimeout = window.setTimeout(() => {
            startTyping(0);
          }, 200);
        }
      }, speed / 2);
    };

    const startSequence = () => {
      if (currentSegmentIndex > 0) {
        // Clear previous text first
        setIsTyping(false);
        setShowCursor(false);
        startClearing();
      } else {
        // First segment - start typing immediately
        startTyping(displayText.length || 0);
      }
    };

    const startTyping = (startIndex = 0) => {
      setIsTyping(true);
      setShowCursor(true);
      phaseRef.current = 'typing';
      currentIndexRef.current = startIndex;

      timersRef.current.typeInterval = window.setInterval(() => {
        if (currentIndexRef.current < currentSegment.length) {
          setDisplayText(currentSegment.slice(0, currentIndexRef.current + 1));
          currentIndexRef.current++;
        } else {
          if (timersRef.current.typeInterval) {
            clearInterval(timersRef.current.typeInterval);
            timersRef.current.typeInterval = undefined;
          }
          setIsTyping(false);

          // Move to next segment after pause
          if (currentSegmentIndex < segments.length - 1) {
            phaseRef.current = 'waitingNext';
            timersRef.current.nextTimeout = window.setTimeout(() => {
              setCurrentSegmentIndex(prev => prev + 1);
            }, pauseBetween);
          } else {
            // Last segment - keep cursor for a moment then hide it
            setTimeout(() => setShowCursor(false), 1000);
            phaseRef.current = 'idle';
          }
        }
      }, speed);
    };

    // Resume appropriate phase after unpause
    if (phaseRef.current === 'typing') {
      startTyping(currentIndexRef.current || displayText.length || 0);
      return () => clearAllTimers();
    }
    if (phaseRef.current === 'clearing') {
      startClearing();
      return () => clearAllTimers();
    }

    timersRef.current.startTimeout = window.setTimeout(startSequence, startDelay);
    return () => clearAllTimers();
  }, [currentSegmentIndex, segments, speed, delay, pauseBetween, isPaused]);

  return (
    <span className={`${className} whitespace-pre-wrap break-words`}>
      {displayText}
      {showCursor && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

export default SequentialTypewriter;

