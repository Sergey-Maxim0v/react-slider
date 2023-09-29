import { useEffect, useMemo, useState } from "react";

export const useGetNumSlidesForRender = ({
  SLIDES_COUNT,
  indexCurrentSlide,
}: {
  SLIDES_COUNT: number;
  indexCurrentSlide: number;
}) => {
  const [numListSlidesForRender, setNumListSlidesForRender] = useState<
    number[]
  >([]);

  const getSlideNumList = () => {
    const result = [];
    for (let i = 0; i <= SLIDES_COUNT; i++) {
      result.push(i);
    }
    return result;
  };

  const SLIDE_NUM_LIST = useMemo(() => getSlideNumList(), []);

  useEffect(() => {
    if (SLIDE_NUM_LIST[indexCurrentSlide - 1] === undefined) {
      setNumListSlidesForRender([
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 2],
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[indexCurrentSlide + 1],
        SLIDE_NUM_LIST[indexCurrentSlide + 2],
      ]);
      return;
    }

    if (SLIDE_NUM_LIST[indexCurrentSlide - 2] === undefined) {
      setNumListSlidesForRender([
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 1],
        SLIDE_NUM_LIST[indexCurrentSlide - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[indexCurrentSlide + 1],
        SLIDE_NUM_LIST[indexCurrentSlide + 2],
      ]);
      return;
    }

    if (SLIDE_NUM_LIST[indexCurrentSlide + 1] === undefined) {
      setNumListSlidesForRender([
        SLIDE_NUM_LIST[indexCurrentSlide - 2],
        SLIDE_NUM_LIST[indexCurrentSlide - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[0],
        SLIDE_NUM_LIST[1],
      ]);
      return;
    }

    if (SLIDE_NUM_LIST[indexCurrentSlide + 2] === undefined) {
      setNumListSlidesForRender([
        SLIDE_NUM_LIST[indexCurrentSlide - 2],
        SLIDE_NUM_LIST[indexCurrentSlide - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[indexCurrentSlide + 1],
        SLIDE_NUM_LIST[0],
      ]);
      return;
    }

    setNumListSlidesForRender([
      SLIDE_NUM_LIST[indexCurrentSlide - 2],
      SLIDE_NUM_LIST[indexCurrentSlide - 1],
      SLIDE_NUM_LIST[indexCurrentSlide],
      SLIDE_NUM_LIST[indexCurrentSlide + 1],
      SLIDE_NUM_LIST[indexCurrentSlide + 2],
    ]);
  }, [indexCurrentSlide]);

  return numListSlidesForRender;
};
