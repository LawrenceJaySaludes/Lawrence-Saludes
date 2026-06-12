import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const CarouselContext = createContext(null);

function Carousel({ className, setApi, children, ...props }) {
  const trackRef = useRef(null);
  const listenersRef = useRef(new Set());
  const selectionRef = useRef({
    canScrollPrev: false,
    canScrollNext: false,
    activeIndex: 0,
  });

  const getItems = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll(".carousel-item"));
  }, []);

  const getActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const items = getItems();
    if (items.length === 0) return 0;

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(itemCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [getItems]);

  const updateSelection = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
    selectionRef.current = {
      canScrollPrev: track.scrollLeft > 8,
      canScrollNext: track.scrollLeft < maxScrollLeft - 8,
      activeIndex: getActiveIndex(),
    };
    listenersRef.current.forEach((listener) => listener());
  }, [getActiveIndex]);

  const scrollToIndex = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;

      const items = getItems();
      if (items.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
      const item = items[clampedIndex];
      const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
      const targetLeft = Math.max(
        0,
        Math.min(
          maxScrollLeft,
          item.offsetLeft - (track.clientWidth - item.clientWidth) / 2
        )
      );

      track.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    },
    [getItems]
  );

  const scrollByOneCard = useCallback(
    (direction) => {
      const nextIndex = getActiveIndex() + (direction === "left" ? -1 : 1);
      scrollToIndex(nextIndex);
    },
    [getActiveIndex, scrollToIndex]
  );

  const getScrollProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
    if (maxScrollLeft === 0) return 0;
    return track.scrollLeft / maxScrollLeft;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const api = {
      scrollPrev: () => scrollByOneCard("left"),
      scrollNext: () => scrollByOneCard("right"),
      scrollToIndex,
      canScrollPrev: () => selectionRef.current.canScrollPrev,
      canScrollNext: () => selectionRef.current.canScrollNext,
      getActiveIndex: () => selectionRef.current.activeIndex,
      getScrollProgress,
      on: (event, callback) => {
        if (event !== "select") return;
        listenersRef.current.add(callback);
      },
      off: (event, callback) => {
        if (event !== "select") return;
        listenersRef.current.delete(callback);
      },
    };

    updateSelection();
    setApi?.(api);
    track.addEventListener("scroll", updateSelection, { passive: true });
    window.addEventListener("resize", updateSelection);

    return () => {
      track.removeEventListener("scroll", updateSelection);
      window.removeEventListener("resize", updateSelection);
    };
  }, [getScrollProgress, scrollByOneCard, scrollToIndex, setApi, updateSelection]);

  return (
    <CarouselContext.Provider value={trackRef}>
      <div className={className} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, children, ...props }) {
  const trackRef = useContext(CarouselContext);

  return (
    <div ref={trackRef} className={className} {...props}>
      {children}
    </div>
  );
}

function CarouselItem({ className, children, ...props }) {
  return (
    <div className={cn("carousel-item", className)} {...props}>
      {children}
    </div>
  );
}

export { Carousel, CarouselContent, CarouselItem };
