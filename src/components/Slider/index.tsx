import React, { FC } from "react";
import { ISlider } from "./types";
import styles from "./styles.module.scss";
import Arrow from "../Arrow";
import { ARROW_DIRECTION } from "../Arrow/types";
import Dots from "../Dots";

const Slider: FC<ISlider> = ({
  autoPlay = false,
  autoPlayTime = 5000,
  width = "100%",
  height = "100%",
}) => {
  const changeSlide = (direction: -1 | 1) => {};

  return (
    <div className={styles.slider} style={{ width, height }}>
      <Arrow
        direction={ARROW_DIRECTION.left}
        className={`${styles.arrow} ${styles.arrow_left}`}
        onClick={() => changeSlide(-1)}
      />
      TODO: slider
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
