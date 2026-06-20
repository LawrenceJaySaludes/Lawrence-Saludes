import { useRef } from "react";
import { cn } from "../../lib/utils";

function GlareCard({ children, className = "" }) {
  const isPointerInside = useRef(false);
  const refElement = useRef(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const updateStyles = () => {
    if (!refElement.current) {
      return;
    }

    const { background, rotate, glare } = state.current;
    refElement.current.style.setProperty("--m-x", `${glare.x}%`);
    refElement.current.style.setProperty("--m-y", `${glare.y}%`);
    refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
    refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
    refElement.current.style.setProperty("--bg-x", `${background.x}%`);
    refElement.current.style.setProperty("--bg-y", `${background.y}%`);
  };

  const backgroundStyle = {
    background: `radial-gradient(
      farthest-corner circle at var(--m-x) var(--m-y),
      rgba(255, 255, 255, 0.42) 0%,
      rgba(255, 255, 255, 0.22) 26%,
      rgba(255, 255, 255, 0.08) 48%,
      rgba(255, 255, 255, 0) 74%
    )`,
    mixBlendMode: "screen",
    opacity: "var(--opacity)",
  };

  return (
    <div
      ref={refElement}
      className={cn("glare-card", className)}
      onPointerMove={(event) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5);
        rotate.y = (delta.y / 2) * rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current.style.setProperty("--r-x", "0deg");
          refElement.current.style.setProperty("--r-y", "0deg");
        }
      }}
    >
      <div className="glare-card-frame">
        <div className="glare-card-content">{children}</div>
        <div className="glare-card-glow" />
        <div className="glare-card-foil" style={backgroundStyle} />
      </div>
    </div>
  );
}

export default GlareCard;
