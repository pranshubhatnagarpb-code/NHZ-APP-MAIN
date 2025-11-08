import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedNumber = ({
  value,
  className = "",
  suffix = "",
  duration = 2
}: AnimatedNumberProps) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const rounded = useTransform(count, (latest) => {
    if (value % 1 === 0) {
      return Math.round(latest).toString();
    } else {
      return latest.toFixed(1);
    }
  });

  useEffect(() => {
    const unsubscribe = rounded.onChange((v) => {
      setDisplayValue(v);
    });

    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(count, value, {
            duration,
            ease: "easeOut",
          });

          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [count, value, duration, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </motion.span>
  );
};

export default AnimatedNumber;
