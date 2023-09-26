import React, { FC, useEffect, useState } from "react";
import { ISlider } from "./types";
import styles from "./styles.module.scss";
import Arrow from "../Arrow";
import { ARROW_DIRECTION } from "../Arrow/types";
import Dots from "../Dots";
import Slide from "../Slide";

const SLIDE_NUM_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const ANIMATION_TIME = 200;

const Slider: FC<ISlider> = ({
  autoPlay = false,
  autoPlayTime = 5000,
  width = "100%",
  height = "100%",
}) => {
  // TODO: swipe, scroll, keyboard listeners

  const [indexCurrentSlide, setIndexCurrentSlide] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<-1 | 0 | 1>(0);
  const [numSlidesForRender, setNumSlidesForRender] = useState<number[]>([]);

  useEffect(() => {
    if (SLIDE_NUM_LIST[indexCurrentSlide - 1] === undefined) {
      setNumSlidesForRender([
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 2],
        SLIDE_NUM_LIST[SLIDE_NUM_LIST.length - 1],
        SLIDE_NUM_LIST[indexCurrentSlide],
        SLIDE_NUM_LIST[indexCurrentSlide + 1],
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

  const changeSlide = async (direction: -1 | 1) => {
    setAnimationDirection(direction);

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_TIME));

    setAnimationDirection(0);

    // TODO: переключение с крайнего слайда дальше, пока не закончилась анимация,
    //  провоцирует ошибку: indexCurrentSlide выходит за пределы

    if (direction > 0 && indexCurrentSlide >= SLIDE_NUM_LIST.length - 1) {
      setIndexCurrentSlide(0);
      return;
    }

    if (direction < 0 && indexCurrentSlide === 0) {
      setIndexCurrentSlide(SLIDE_NUM_LIST.length - 1);
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

      <div
        className={`${styles.slideList} ${
          animationDirection === -1 ? styles.slideList__goLeft : ""
        } ${animationDirection === 1 ? styles.slideList__goRight : ""}`}
      >
        {numSlidesForRender.map((num) => (
          <Slide key={num} number={num} className={styles.slide} />
        ))}
      </div>

      <Arrow
        direction={ARROW_DIRECTION.right}
        className={`${styles.arrow} ${styles.arrow_right}`}
        onClick={() => changeSlide(1)}
      />

      <Dots
        length={SLIDE_NUM_LIST.length}
        indexCurrentSlide={indexCurrentSlide}
        setIndexCurrentSlide={setIndexCurrentSlide}
        className={styles.dots}
      />
    </div>
  );
};

export default Slider;
