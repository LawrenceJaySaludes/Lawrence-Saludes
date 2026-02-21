import { useRef, useState } from "react";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "../../lib/utils";

const MotionNav = motion.nav;
const MotionDiv = motion.div;
const MotionA = motion.a;

export function FloatingDock({ items, desktopClassName, mobileClassName }) {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
}

function FloatingDockMobile({ items, className }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("floating-dock-mobile-wrap", className)}>
      <AnimatePresence>
        {open && (
          <MotionDiv
            layoutId="floating-dock-mobile"
            className="floating-dock-mobile-menu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {items.map((item, idx) => (
              <MotionA
                key={item.title}
                href={item.href}
                aria-label={item.title}
                className="floating-dock-mobile-item"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 8,
                  transition: { delay: idx * 0.03 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.03 }}
                onClick={() => setOpen(false)}
              >
                <span className="floating-dock-mobile-icon">{item.icon}</span>
              </MotionA>
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="floating-dock-mobile-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <IconLayoutNavbarCollapse className="floating-dock-mobile-toggle-icon" />
      </button>
    </div>
  );
}

function FloatingDockDesktop({ items, className }) {
  const mouseY = useMotionValue(Infinity);

  return (
    <MotionNav
      aria-label="Site navigation"
      onMouseMove={(event) => mouseY.set(event.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={cn("floating-dock-desktop", className)}
    >
      {items.map((item) => (
        <IconContainer mouseY={mouseY} key={item.title} {...item} />
      ))}
    </MotionNav>
  );
}

function IconContainer({ mouseY, title, icon, href }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseY, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return value - bounds.y - bounds.height / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 78, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 78, 42]);
  const widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 34, 20]);
  const heightIconTransform = useTransform(
    distance,
    [-150, 0, 150],
    [20, 34, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const heightIcon = useSpring(heightIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a href={href} className="floating-dock-link" aria-label={title}>
      <MotionDiv
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="floating-dock-icon-container"
      >
        <AnimatePresence>
          {hovered && (
            <MotionDiv
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              className="floating-dock-tooltip"
            >
              {title}
            </MotionDiv>
          )}
        </AnimatePresence>

        <MotionDiv
          style={{ width: widthIcon, height: heightIcon }}
          className="floating-dock-icon"
        >
          {icon}
        </MotionDiv>
      </MotionDiv>
    </a>
  );
}
