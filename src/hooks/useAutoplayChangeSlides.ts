import { useEffect } from "react";

export const useAutoplayChangeSlides = ({
  autoPlay,
  autoPlayTime,
  changeSlide,
  indexCurrentSlide,
}: {
  changeSlide: (direction: -1 | 1) => Promise<void>;
  indexCurrentSlide: number;
  autoPlay?: boolean;
  autoPlayTime?: number;
}) =>
  useEffect(() => {
    if (!autoPlay || !autoPlayTime) {
      return;
    }

    const interval = setInterval(() => changeSlide(1), autoPlayTime);

    return () => clearInterval(interval);
  }, [indexCurrentSlide]);
