import styles from "./styles.module.scss";
import { FC, memo } from "react";
import { IDots } from "./types";
import Dot from "../Dot";

const DOT_WIDTH = 32;

const getDotsNumArr = (length: number) => {
  const result = [];

  for (let i = 0; i <= length; i++) {
    result.push(i);
  }
  return result;
};

const getTranslateNum = (indexCurrentSlide: number, length: number): number => {
  if (length <= 5) {
    return 0;
  }

  if (indexCurrentSlide >= length - 2) {
    return DOT_WIDTH * (length - 4) * -1;
  }

  if (indexCurrentSlide > 2) {
    return DOT_WIDTH * (indexCurrentSlide - 2) * -1;
  }

  return 0;
};

const Dots: FC<IDots> = memo(
  ({ length, indexCurrentSlide, setIndexCurrentSlide, className }) => {
    const dotsNumArr = getDotsNumArr(length);

    const translateNum = getTranslateNum(indexCurrentSlide, length);
    return (
      <div className={`${styles.dots} ${className}`}>
        <div
          className={styles.list}
          style={{ transform: `translateX(${translateNum}px)` }}
        >
          {dotsNumArr.map((el) => (
            <Dot
              key={el}
              isActive={indexCurrentSlide === el}
              onClick={() => setIndexCurrentSlide(el)}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default Dots;
