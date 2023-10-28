import { RefObject, useEffect } from "react";

export const useKeyboardListener = ({
  sliderRef,
  changeSlide,
  isInFocus,
}: {
  sliderRef: RefObject<HTMLDivElement>;
  isInFocus: boolean;
  changeSlide: (direction: -1 | 1) => Promise<void>;
}) => {
  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const listener = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        changeSlide(1).catch((error) =>
          console.error("Error slider keyboard listener:::", error),
        );
      }

      if (event.key === "ArrowLeft") {
        changeSlide(-1).catch((error) =>
          console.error("Error slider keyboard listener:::", error),
        );
      }
    };

    sliderRef.current.addEventListener("keydown", listener);

    return () => sliderRef.current!.removeEventListener("keydown", listener);
  }, [isInFocus]);
};
