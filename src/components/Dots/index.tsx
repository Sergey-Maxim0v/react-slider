import styles from "./styles.module.scss";
import { FC } from "react";
import { IDots } from "./types";
import Dot from "../Dot";

const getDotsNumArr = (length) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(i);
  }
  return result;
};

const Dots: FC<IDots> = ({
  length,
  indexCurrentSlide,
  setIndexCurrentSlide,
  className,
}) => {
  const dotsNumArr = getDotsNumArr(length);

  return (
    <div className={`${styles.dots} ${className}`}>
      {dotsNumArr.map((el) => (
        <Dot
          key={el}
          isActive={indexCurrentSlide === el}
          onClick={() => setIndexCurrentSlide(el)}
        />
      ))}
    </div>
  );
};

export default Dots;
