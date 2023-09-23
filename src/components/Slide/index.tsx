import React, { FC } from "react";
import { ISlide } from "./types";
import styles from "./styles.module.scss";

const Slide: FC<ISlide> = ({ number, className }) => {
  switch (number) {
    case 0:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_red}`}>
          0
        </div>
      );
    case 1:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_orange}`}>
          1
        </div>
      );
    case 2:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_yellow}`}>
          2
        </div>
      );
    case 3:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_green}`}>
          3
        </div>
      );
    case 4:
      return (
        <div
          className={`${className} ${styles.slide} ${styles.slide_turquoise}`}
        >
          4
        </div>
      );
    case 5:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_blue}`}>
          5
        </div>
      );
    case 6:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_violet}`}>
          6
        </div>
      );
    case 7:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_white}`}>
          7
        </div>
      );
    case 8:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_black}`}>
          8
        </div>
      );

    default:
      return (
        <div className={`${className} ${styles.slide} ${styles.slide_white}`}>
          slide {number}
        </div>
      );
  }
};

export default Slide;
