import { FC } from "react";
import { ISlide } from "./types";
import styles from "./styles.module.scss";

const Slide: FC<ISlide> = ({ number, className }) => {
  const getColorClassName = () => {
    switch (number) {
      case 0:
        return styles.slide_red;
      case 1:
        return styles.slide_orange;
      case 2:
        return styles.slide_white;
      case 3:
        return styles.slide_green;
      case 4:
        return styles.slide_turquoise;
      case 5:
        return styles.slide_blue;
      case 6:
        return styles.slide_violet;
      case 7:
        return styles.slide_yellow;
      case 8:
        return styles.slide_black;

      default:
        return number % 2 ? styles.slide_blue : styles.slide_green;
    }
  };

  return (
    <div className={`${className} ${styles.slide} ${getColorClassName()}`}>
      {number}
    </div>
  );
};

export default Slide;
