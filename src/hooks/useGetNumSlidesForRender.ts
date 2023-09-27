import { useEffect, useState } from "react";

export const useGetNumSlidesForRender = ({
  SLIDE_NUM_LIST,
  indexCurrentSlide,
}: {
  SLIDE_NUM_LIST: number[];
  indexCurrentSlide: number;
}) => {
  const [numSlidesForRender, setNumSlidesForRender] = useState<number[]>([]);

  useEffect(() => {
    if (SLIDE_NUM_LIST[indexCurrentSlide - 1] === undefined) {
      setNumSlidesForRender([
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 2],
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[SLIDE_NUM_LIST + 1],
        SLIDE_NUM_LIST[indexCurrentSlide + 2],
      ]);
      return;
    }

    if (SLIDE_NUM_LIST[indexCurrentSlide - 2] === undefined) {
      setNumSlidesForRender([
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 1],
        SLIDE_NUM_LIST[indexCurrentSlide - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[indexCurrentSlide + 1],
        SLIDE_NUM_LIST[indexCurrentSlide + 2],
      ]);
      return;
    }

    if (SLIDE_NUM_LIST[indexCurrentSlide + 1] === undefined) {
      setNumSlidesForRender([
        SLIDE_NUM_LIST[indexCurrentSlide - 2],
        SLIDE_NUM_LIST[indexCurrentSlide - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[0],
        SLIDE_NUM_LIST[1],
      ]);
      return;
    }

    if (SLIDE_NUM_LIST[indexCurrentSlide + 2] === undefined) {
      setNumSlidesForRender([
        SLIDE_NUM_LIST[indexCurrentSlide - 2],
        SLIDE_NUM_LIST[indexCurrentSlide - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[indexCurrentSlide + 1],
        SLIDE_NUM_LIST[0],
      ]);
      return;
    }

    setNumSlidesForRender([
      SLIDE_NUM_LIST[indexCurrentSlide - 2],
      SLIDE_NUM_LIST[indexCurrentSlide - 1],
      SLIDE_NUM_LIST[indexCurrentSlide],
      SLIDE_NUM_LIST[indexCurrentSlide + 1],
      SLIDE_NUM_LIST[indexCurrentSlide + 2],
    ]);
  }, [indexCurrentSlide]);

  return numSlidesForRender;
};
