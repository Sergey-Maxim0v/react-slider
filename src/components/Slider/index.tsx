import { FC, useState } from "react";
import { ISlider } from "./types";
import styles from "./styles.module.scss";
import Arrow from "../Arrow";
import { ARROW_DIRECTION } from "../Arrow/types";
import Dots from "../Dots";
import Slide from "../Slide";
import { useGetNumSlidesForRender } from "../../hooks/useGetNumSlidesForRender";
import { useAutoplayChangeSlides } from "../../hooks/useAutoplayChangeSlides";

const SLIDE_NUM_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const ANIMATION_TIME = 200;

const Slider: FC<ISlider> = ({
  autoPlay = false,
  autoPlayTime = 5000,
  width = "100%",
  height = "100%",
}) => {
  // TODO: swipe, scroll, keyboard listeners

  // TODO: scale rotate animations

  const [indexCurrentSlide, setIndexCurrentSlide] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<-1 | 0 | 1>(0);

  const numSlidesForRender = useGetNumSlidesForRender({
    SLIDE_NUM_LIST,
    indexCurrentSlide,
  });

  const changeSlide = async (direction: -1 | 1) => {
    setAnimationDirection(direction);

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_TIME));

    setAnimationDirection(0);

    setIndexCurrentSlide((prevState) => {
      if (direction > 0 && prevState >= SLIDE_NUM_LIST.length - 1) {
        return 0;
      }

      if (direction < 0 && prevState === 0) {
        return SLIDE_NUM_LIST.length - 1;
      }

      return prevState + direction;
    });
  };

  useAutoplayChangeSlides({
    autoPlay,
    autoPlayTime,
    changeSlide,
    indexCurrentSlide,
  });

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
          <Slide
            key={`${indexCurrentSlide} ${num} `}
            number={num}
            className={styles.slide}
          />
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
