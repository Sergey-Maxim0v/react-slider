import React, { FC, useEffect } from "react";
import { ISlider } from "./types";
import styles from "./styles.module.scss";
import Arrow from "../Arrow";
import { ARROW_DIRECTION } from "../Arrow/types";
import Dots from "../Dots";

const slideList = [
  <div className={`${styles.slide} ${styles.slide_red}`}>Slide 1</div>,
  <div className={`${styles.slide} ${styles.slide_orange}`}>Slide 2</div>,
  <div className={`${styles.slide} ${styles.slide_yellow}`}>Slide 3</div>,
  <div className={`${styles.slide} ${styles.slide_green}`}>Slide 4</div>,
  <div className={`${styles.slide} ${styles.slide_turquoise}`}>Slide 5</div>,
  <div className={`${styles.slide} ${styles.slide_blue}`}>Slide 6</div>,
  <div className={`${styles.slide} ${styles.slide_violet}`}>Slide 7</div>,
];

const Slider: FC<ISlider> = ({
  autoPlay = false,
  autoPlayTime = 5000,
  width = "100%",
  height = "100%",
}) => {
  const changeSlide = (direction: -1 | 1) => {};

  useEffect(() => {
    if (!autoPlayTime) {
      return;
    }

    const interval = setInterval(() => changeSlide(1), autoPlayTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider} style={{ width, height }}>
      <Arrow
        direction={ARROW_DIRECTION.left}
        className={`${styles.arrow} ${styles.arrow_left}`}
        onClick={() => changeSlide(-1)}
      />

      <div className={styles.slideList}>slideList</div>

      <Arrow
        direction={ARROW_DIRECTION.right}
        className={`${styles.arrow} ${styles.arrow_right}`}
        onClick={() => changeSlide(1)}
      />

      <Dots className={styles.dots} />
    </div>
  );
};

export default Slider;
