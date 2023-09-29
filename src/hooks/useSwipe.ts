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
    moveStart: { x: 0, y: 0, time: Date.now() },
  });

  const fnsRef = useRef({ onLeft, onRight, onUp, onDown });

  const target = ref.current ?? window;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchCoordsRef.current.moveStart.x = e.targetTouches[0].clientX;
      touchCoordsRef.current.moveStart.y = e.targetTouches[0].clientY;
      touchCoordsRef.current.moveStart.time = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const threshold = 150;
      const swipeSpeed = 1; // sec;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchStartX = touchCoordsRef.current.moveStart.x;
      const touchStartY = touchCoordsRef.current.moveStart.y;
      const elapsedTime =
        (Date.now() - touchCoordsRef.current.moveStart.time) / 1000;
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

    target.addEventListener("touchstart", handleTouchStart);
    target.addEventListener("touchend", handleTouchEnd);

    return () => {
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref.current]);
};
