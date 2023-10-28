import { RefObject, useEffect, useRef } from "react";

export const useSwipe = ({
  onLeft,
  onRight,
  onUp,
  onDown,
  ref,
}: {
  ref?: RefObject<HTMLElement>;
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}) => {
  const touchCoordsRef = useRef({
    touchStart: { x: 0, y: 0, time: Date.now() },
  });

  const fnsRef = useRef({ onLeft, onRight, onUp, onDown });

  const target = ref?.current ?? window;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchCoordsRef.current.touchStart.x = e.targetTouches[0].clientX;
      touchCoordsRef.current.touchStart.y = e.targetTouches[0].clientY;
      touchCoordsRef.current.touchStart.time = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const threshold = 150;
      const swipeSpeed = 1; // sec;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchStartX = touchCoordsRef.current.touchStart.x;
      const touchStartY = touchCoordsRef.current.touchStart.y;
      const elapsedTime =
        (Date.now() - touchCoordsRef.current.touchStart.time) / 1000;
      const xDistance = touchStartX - touchEndX;
      const yDistance = touchStartY - touchEndY;

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

    target.addEventListener("touchstart", handleTouchStart as EventListener);
    target.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      target.removeEventListener(
        "touchstart",
        handleTouchStart as EventListener,
      );
      target.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [ref?.current]);
};
