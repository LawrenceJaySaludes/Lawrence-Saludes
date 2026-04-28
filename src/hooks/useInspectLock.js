import { useEffect, useState } from "react";

const DEVTOOLS_THRESHOLD = 170;
const DEVTOOLS_POLL_MS = 900;

function isBlockedDevtoolsShortcut(event) {
  const key = event.key.toLowerCase();
  const isModifierKey = event.ctrlKey || event.metaKey;

  if (event.key === "F12") {
    return true;
  }

  if (!isModifierKey) {
    return false;
  }

  if (event.shiftKey && ["i", "j", "c", "k"].includes(key)) {
    return true;
  }

  return key === "u";
}

function isLikelyDevtoolsOpen() {
  const widthGap = Math.abs(window.outerWidth - window.innerWidth);
  const heightGap = Math.abs(window.outerHeight - window.innerHeight);
  return widthGap > DEVTOOLS_THRESHOLD || heightGap > DEVTOOLS_THRESHOLD;
}

function useInspectLock() {
  const [isInspectLocked, setIsInspectLocked] = useState(false);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (isBlockedDevtoolsShortcut(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  useEffect(() => {
    const checkDevtools = () => {
      const isDesktop = window.innerWidth >= 900;
      const nextState = isDesktop && isLikelyDevtoolsOpen();
      setIsInspectLocked((previous) =>
        previous === nextState ? previous : nextState
      );
    };

    const intervalId = window.setInterval(checkDevtools, DEVTOOLS_POLL_MS);
    window.addEventListener("resize", checkDevtools);
    checkDevtools();

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("resize", checkDevtools);
    };
  }, []);

  return isInspectLocked;
}

export default useInspectLock;
