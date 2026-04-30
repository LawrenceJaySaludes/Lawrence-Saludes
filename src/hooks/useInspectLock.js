import { useEffect } from "react";

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

function useInspectLock() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isBlockedDevtoolsShortcut(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
}

export default useInspectLock;
