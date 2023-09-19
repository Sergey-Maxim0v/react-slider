import styles from "./styles.module.scss";
import { FC } from "react";
import { IDots } from "./types";

const Dots: FC<IDots> = ({
  indexCurrentSlide,
  setIndexCurrentSlide,
  className,
}) => {
  return <div className={`${styles.dots} ${className}`}>// TODO: Dots</div>;
};

export default Dots;
