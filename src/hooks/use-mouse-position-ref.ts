import { RefObject, useEffect, useRef } from "react";

/**
 * Tracks the mouse (and touch) position in a ref — no re-renders.
 * When a containerRef is passed, the position is reported relative to
 * that element's top-left, even while the pointer is outside it.
 */
export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>,
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
};
