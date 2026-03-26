import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import "./ShinyText.css";

function ShinyText({
  text,
  children,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  colors,
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(direction === "left" ? 0 : 100);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        const value = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? value : 100 - value);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const value = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? value : 100 - value);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }

      return;
    }

    const cycleDuration = animationDuration + delayDuration;
    const cycleTime = elapsedRef.current % cycleDuration;

    if (cycleTime < animationDuration) {
      const value = (cycleTime / animationDuration) * 100;
      progress.set(directionRef.current === 1 ? value : 100 - value);
    } else {
      progress.set(directionRef.current === 1 ? 100 : 0);
    }
  });

  useEffect(() => {
    directionRef.current = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    progress.set(direction === "left" ? 0 : 100);
  }, [direction, progress]);

  const backgroundPosition = useTransform(
    progress,
    (value) => `${150 - value * 2}% center, center center`
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, transparent 0%, transparent 43%, ${shineColor} 49%, ${shineColor} 51%, transparent 57%, transparent 100%), ${Array.isArray(colors) && colors.length > 0 ? `linear-gradient(90deg, ${colors.join(", ")})` : `linear-gradient(90deg, ${color}, ${color})`}`,
    backgroundSize: "200% 100%, 100% 100%",
    backgroundPosition,
    backgroundRepeat: "no-repeat, no-repeat",
  };

  return (
    <Motion.span
      className={`shiny-text ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Motion.span className="shiny-text-content" style={gradientStyle}>
        {children ?? text}
      </Motion.span>
    </Motion.span>
  );
}

export default ShinyText;
