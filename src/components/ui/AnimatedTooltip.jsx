import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "../../lib/utils";

export function AnimatedTooltip({ items = [], className = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.currentTarget.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className={cn("animated-tooltip", className)}>
      {items.map((item, idx) => (
        <div
          className="animated-tooltip-item"
          key={item.id ?? item.name ?? idx}
          onMouseEnter={() => setHoveredIndex(item.id ?? idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === (item.id ?? idx) && (
              <div className="animated-tooltip-bubble-anchor">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX,
                    rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="animated-tooltip-bubble"
                >
                  <div className="animated-tooltip-bubble-line animated-tooltip-bubble-line--emerald" />
                  <div className="animated-tooltip-bubble-line animated-tooltip-bubble-line--sky" />
                  <div className="animated-tooltip-name">{item.name}</div>
                  {item.designation ? (
                    <div className="animated-tooltip-designation">
                      {item.designation}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div
            onMouseMove={handleMouseMove}
            className="animated-tooltip-avatar"
            aria-label={item.name}
            role="img"
          >
            {item.image ? (
              <img
                height={100}
                width={100}
                src={item.image}
                alt={item.name}
                className="animated-tooltip-image"
              />
            ) : (
              <span
                className="animated-tooltip-icon"
                style={{ color: item.color }}
              >
                {item.icon}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
