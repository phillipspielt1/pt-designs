"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useAnimationFrame } from "framer-motion";

import { cn } from "@/lib/utils";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

/**
 * Parallax container — children wrapped in <FloatingElement> drift in
 * response to the mouse, each at a speed set by its `depth`. Position
 * updates run in a single animation frame loop and are written
 * straight to element transforms (no React re-renders).
 */
const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >(),
  );
  const mousePositionRef = useMousePositionRef(containerRef);

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      });
    },
    [],
  );

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;

      const newTargetX = mousePositionRef.current.x * strength;
      const newTargetY = mousePositionRef.current.y * strength;

      const dx = newTargetX - data.currentPosition.x;
      const dy = newTargetY - data.currentPosition.y;

      data.currentPosition.x += dx * easingFactor;
      data.currentPosition.y += dy * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={cn("absolute top-0 left-0 w-full h-full", className)}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
};

export default Floating;

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export const FloatingElement = ({
  children,
  className,
  depth = 1,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !context) return;

    const nonNullDepth = depth ?? 0.01;
    const id = idRef.current;

    context.registerElement(id, element, nonNullDepth);
    return () => context.unregisterElement(id);
  }, [depth, context]);

  return (
    <div
      ref={elementRef}
      className={cn("absolute will-change-transform", className)}
    >
      {children}
    </div>
  );
};
