import React, { FC, useEffect, useMemo, useState } from "react";
import { ISlider } from "./types";
import styles from "./styles.module.scss";
import Arrow from "../Arrow";
import { ARROW_DIRECTION } from "../Arrow/types";
import Dots from "../Dots";

const slideList = [
  <div key="slide_0" className={`${styles.slide} ${styles.slide_red}`}>
    0
  </div>,
  <div key="slide_1" className={`${styles.slide} ${styles.slide_orange}`}>
    1
  </div>,
  <div key="slide_2" className={`${styles.slide} ${styles.slide_yellow}`}>
    2
  </div>,
  <div key="slide_3" className={`${styles.slide} ${styles.slide_green}`}>
    3
  </div>,
  <div key="slide_4" className={`${styles.slide} ${styles.slide_turquoise}`}>
    4
  </div>,
  <div key="slide_5" className={`${styles.slide} ${styles.slide_blue}`}>
    5
  </div>,
  <div key="slide_6" className={`${styles.slide} ${styles.slide_violet}`}>
    6
  </div>,
];

const Slider: FC<ISlider> = ({
  autoPlay = false,
  autoPlayTime = 5000,
  width = "100%",
  height = "100%",
}) => {
  // TODO: swipe, scroll listeners

  const [indexCurrentSlide, setIndexCurrentSlide] = useState<number>(0);

  const slidesForRender = useMemo(() => {
    if (indexCurrentSlide === slideList.length - 1) {
      return [
        slideList[slideList.length - 2],
        slideList[slideList.length - 1],
        slideList[0],
      ];
    }

    if (indexCurrentSlide === 0) {
      return [slideList[slideList.length - 1], slideList[0], slideList[1]];
    }

    return slideList.slice(indexCurrentSlide - 1, indexCurrentSlide + 2);
  }, [indexCurrentSlide]);

  const changeSlide = async (direction: -1 | 1) => {
    if (direction > 0 && indexCurrentSlide >= slideList.length - 1) {
      setIndexCurrentSlide(0);
      return;
    }

    if (direction < 0 && indexCurrentSlide === 0) {
      setIndexCurrentSlide(slideList.length - 1);
      return;
    }

    setIndexCurrentSlide((prevState) => prevState + direction);
  };

  useEffect(() => {
    if (!autoPlay || !autoPlayTime) {
      return;
    }

    const interval = setInterval(() => changeSlide(1), autoPlayTime);

    return () => clearInterval(interval);
  }, [indexCurrentSlide]);

  return (
    <div className={styles.slider} style={{ width, height }}>
      <Arrow
        direction={ARROW_DIRECTION.left}
        className={`${styles.arrow} ${styles.arrow_left}`}
        onClick={() => changeSlide(-1)}
      />

      <div className={styles.slideList}>{slidesForRender.map((el) => el)}</div>

      <Arrow
        direction={ARROW_DIRECTION.right}
        className={`${styles.arrow} ${styles.arrow_right}`}
        onClick={() => changeSlide(1)}
      />

      <Dots
        length={slideList.length}
        indexCurrentSlide={indexCurrentSlide}
        setIndexCurrentSlide={setIndexCurrentSlide}
        className={styles.dots}
      />
    </div>
  );
};

export default Slider;
