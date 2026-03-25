import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const observedElements = new WeakSet();

    const enqueueReveal = (element) => {
      window.requestAnimationFrame(() => {
        element.classList.add("show");
      });
    };

    const registerTargets = () => {
      document.querySelectorAll(".scroll-animate").forEach((element) => {
        if (element.classList.contains("show") || observedElements.has(element)) {
          return;
        }

        observedElements.add(element);
        observer.observe(element);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enqueueReveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    registerTargets();

    const mutationObserver = new MutationObserver(() => {
      registerTargets();
    });

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
