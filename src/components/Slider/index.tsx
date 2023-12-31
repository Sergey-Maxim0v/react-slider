import { FC, useRef, useState } from "react";
import { ISlider } from "./types";
import styles from "./styles.module.scss";
import Arrow from "../Arrow";
import { ARROW_DIRECTION } from "../Arrow/types";
import Dots from "../Dots";
import { useGetNumSlidesForRender } from "../../hooks/useGetNumSlidesForRender";
import { useAutoplayChangeSlides } from "../../hooks/useAutoplayChangeSlides";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import { useSwipe } from "../../hooks/useSwipe";
import { useGetSlideNodeList } from "../../hooks/useGetSlideNodeList";
import { useMouseMove } from "../../hooks/useMouseMove";

const ANIMATION_TIME = 200;
const SLIDES_COUNT = 12;

const Slider: FC<ISlider> = ({
  autoPlay = false,
  mouseDraggable = false,
  autoPlayTime = 5000,
  width = "100%",
  height = "100%",
}) => {
  // @ts-ignore
  const sliderRef = useRef<HTMLDivElement>(null);

  const [indexCurrentSlide, setIndexCurrentSlide] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<-1 | 0 | 1>(0);
  const [isInFocus, setIsInFocus] = useState(false);

  const slideNodeList = useGetSlideNodeList({
    slidesCount: SLIDES_COUNT,
    className: styles.slide,
  });

  const numListSlidesForRender = useGetNumSlidesForRender({
    SLIDES_COUNT,
    indexCurrentSlide,
  });

  const changeSlide = async (direction: -1 | 1) => {
    setAnimationDirection(direction);

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_TIME));

    setAnimationDirection(0);

    setIndexCurrentSlide((prevState) => {
      if (direction > 0 && prevState >= SLIDES_COUNT) {
        return 0;
      }

      if (direction < 0 && prevState === 0) {
        return SLIDES_COUNT;
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

  useKeyboardListener({ sliderRef, isInFocus, changeSlide });

  useSwipe({
    ref: sliderRef,
    onLeft: () => changeSlide(-1),
    onRight: () => changeSlide(1),
  });

  useMouseMove({
    mouseDraggable,
    ref: sliderRef,
    onLeft: () => changeSlide(-1),
    onRight: () => changeSlide(1),
  });

  return (
    <div
      className={styles.slider}
      style={{ width, height }}
      onFocus={() => setIsInFocus(true)}
      onBlur={() => setIsInFocus(false)}
      ref={sliderRef}
    >
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
        {numListSlidesForRender.map((num) => slideNodeList[num])}
      </div>

      <Arrow
        direction={ARROW_DIRECTION.right}
        className={`${styles.arrow} ${styles.arrow_right}`}
        onClick={() => changeSlide(1)}
      />

      <Dots
        length={SLIDES_COUNT}
        indexCurrentSlide={indexCurrentSlide}
        setIndexCurrentSlide={setIndexCurrentSlide}
        className={styles.dots}
      />
    </div>
  );
};

export default Slider;
