import { RefObject, useEffect, useRef } from "react";

export const useMouseMove = ({
  mouseDraggable,
  onLeft,
  onRight,
  onUp,
  onDown,
  ref,
}: {
  mouseDraggable?: boolean;
  ref: RefObject<HTMLElement>;
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}) => {
  if (!mouseDraggable) {
    return;
  }

  const moveRef = useRef({
    isStarted: false,
    moveStart: { x: 0, y: 0, time: Date.now() },
  });

  const fnsRef = useRef({ onLeft, onRight, onUp, onDown });

  const target = ref.current ?? window;

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      moveRef.current.isStarted = true;
      moveRef.current.moveStart.x = e.clientX;
      moveRef.current.moveStart.y = e.clientY;
      moveRef.current.moveStart.time = Date.now();
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!moveRef.current.isStarted) {
        return;
      }

      const threshold = 150;
      const swipeSpeed = 1; // sec;

      const moveEndX = e.clientX;
      const moveEndY = e.clientY;

      const moveStartX = moveRef.current.moveStart.x;
      const moveStartY = moveRef.current.moveStart.y;

      const elapsedTime = (Date.now() - moveRef.current.moveStart.time) / 1000;

      const xDistance = moveStartX - moveEndX;
      const yDistance = moveStartY - moveEndY;

      if (elapsedTime > swipeSpeed) {
        return;
      }

      if (Math.abs(xDistance) < threshold && Math.abs(yDistance) < threshold) {
        return;
      }

      if (Math.abs(xDistance) >= Math.abs(yDistance)) {
        xDistance > 0 ? fnsRef.current.onRight?.() : fnsRef.current.onLeft?.();
      } else {
        yDistance > 0 ? fnsRef.current.onDown?.() : fnsRef.current.onUp?.();
      }
    };

    target.addEventListener("mousedown", handleMouseDown as EventListener);
    window.addEventListener("mouseup", handleMouseUp as EventListener);

    return () => {
      target.removeEventListener("mousedown", handleMouseDown as EventListener);
      window.removeEventListener("mouseup", handleMouseUp as EventListener);
    };
  }, [ref.current]);
};
