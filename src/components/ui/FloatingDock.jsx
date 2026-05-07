import { useEffect, useRef, useState } from "react";
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
let activeScrollFrame = 0;

function getSectionScrollOffset(element) {
  const styles = window.getComputedStyle(element);
  const parsedMarginTop = Number.parseFloat(styles.scrollMarginTop);
  return Number.isFinite(parsedMarginTop) ? parsedMarginTop : 0;
}

function easeInOutCubic(progress) {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }

  return 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 700) {
  if (activeScrollFrame) {
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = 0;
  }

  const startY = window.scrollY;
  const scrollDistance = targetY - startY;

  if (Math.abs(scrollDistance) < 1) {
    return;
  }

  const startTime = performance.now();

  const animate = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    window.scrollTo(0, startY + scrollDistance * easedProgress);

    if (progress < 1) {
      activeScrollFrame = window.requestAnimationFrame(animate);
      return;
    }

    activeScrollFrame = 0;
  };

  activeScrollFrame = window.requestAnimationFrame(animate);
}

function handleSmoothSectionNavigation(event, href, onSelect, onComplete) {
  if (typeof href !== "string" || !href.startsWith("#")) {
    onSelect?.(href);
    onComplete?.();
    return;
  }

  const sectionId = href.slice(1);
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    onSelect?.(href);
    onComplete?.();
    return;
  }

  event.preventDefault();
  onSelect?.(href);
  const targetOffset = getSectionScrollOffset(targetSection);
  const targetY = Math.max(
    0,
    targetSection.getBoundingClientRect().top + window.scrollY - targetOffset
  );
  smoothScrollTo(targetY);

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", href);
  } else {
    window.location.hash = href;
  }

  onComplete?.();
}

export function FloatingDock({ items, desktopClassName, mobileClassName }) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#home");

  useEffect(() => {
    if (typeof window === "undefined" || !Array.isArray(items) || items.length === 0) {
      return undefined;
    }

    const sectionTargets = items
      .map((item) => {
        if (typeof item.href !== "string" || !item.href.startsWith("#")) {
          return null;
        }

        const id = item.href.slice(1);
        const element = document.getElementById(id);
        if (!element) {
          return null;
        }

        return { href: item.href, element };
      })
      .filter(Boolean)
      .sort((first, second) => first.element.offsetTop - second.element.offsetTop);

    if (sectionTargets.length === 0) {
      return undefined;
    }

    const intersectionByHref = new Map(
      sectionTargets.map((target) => [target.href, 0])
    );

    const updateActiveSection = () => {
      let bestHref = "";
      let bestRatio = 0;

      intersectionByHref.forEach((ratio, href) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestHref = href;
        }
      });

      if (bestRatio < 0.18) {
        const probeY = window.scrollY + window.innerHeight * 0.35;
        let fallbackHref = sectionTargets[0].href;

        sectionTargets.forEach((target) => {
          if (probeY >= target.element.offsetTop) {
            fallbackHref = target.href;
          }
        });

        bestHref = fallbackHref;
      }

      if (bestHref) {
        setActiveHref((prev) => (prev === bestHref ? prev : bestHref));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (!intersectionByHref.has(href)) {
            return;
          }

          intersectionByHref.set(href, entry.intersectionRatio);
        });

        updateActiveSection();
      },
      {
        root: null,
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
      }
    );

    sectionTargets.forEach((target) => observer.observe(target.element));
    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items]);

  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        activeHref={activeHref}
        onSelect={setActiveHref}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        activeHref={activeHref}
        onSelect={setActiveHref}
      />
    </>
  );
}

function FloatingDockMobile({ items, className, activeHref, onSelect }) {
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
                className={cn(
                  "floating-dock-mobile-item",
                  item.href === activeHref && "is-active"
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 8,
                  transition: { delay: idx * 0.03 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.03 }}
                onClick={(event) => {
                  handleSmoothSectionNavigation(
                    event,
                    item.href,
                    onSelect,
                    () => setOpen(false)
                  );
                }}
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

function FloatingDockDesktop({ items, className, activeHref, onSelect }) {
  const mouseY = useMotionValue(Infinity);

  return (
    <MotionNav
      aria-label="Site navigation"
      onMouseMove={(event) => mouseY.set(event.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={cn("floating-dock-desktop", className)}
    >
      {items.map((item) => (
        <IconContainer
          mouseY={mouseY}
          key={item.title}
          active={item.href === activeHref}
          onSelect={onSelect}
          {...item}
        />
      ))}
    </MotionNav>
  );
}

function IconContainer({ mouseY, title, icon, href, active, onSelect }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseY, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return value - bounds.y - bounds.height / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [38, 70, 38]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [38, 70, 38]);
  const widthIconTransform = useTransform(distance, [-150, 0, 150], [18, 30, 18]);
  const heightIconTransform = useTransform(
    distance,
    [-150, 0, 150],
    [18, 30, 18]
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
    <a
      href={href}
      className={cn("floating-dock-link", active && "is-active")}
      aria-label={title}
      onClick={(event) => {
        handleSmoothSectionNavigation(event, href, onSelect);
      }}
    >
      <MotionDiv
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn("floating-dock-icon-container", active && "is-active")}
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
